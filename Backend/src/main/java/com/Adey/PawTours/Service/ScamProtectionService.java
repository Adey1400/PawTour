package com.Adey.PawTours.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.Adey.PawTours.DTO.PriceCheckResponse;
import com.Adey.PawTours.Entity.FairPrice;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScamProtectionService {

    private final com.Adey.PawTours.repository.FairPriceRepository fairPriceRepository;

    /**
     * Checks whether a price a traveller was quoted is fair, a scam,
     * or a suspiciously good deal, based on local benchmark data.
     *
     * @param city      the city where the transaction is happening
     * @param category  the item category (e.g. "food", "transport", "souvenir")
     * @param itemName  the specific item being priced (e.g. "Masala Chai")
     * @param userPrice the price the traveller was actually quoted
     * @return          a PriceCheckResponse DTO with verdict, range, and message
     */
    public PriceCheckResponse checkPrice(String city,
                                         String category,
                                         String itemName,
                                         double userPrice) {

        BigDecimal quotedPrice = toBigDecimal(userPrice);

        log.info("Price check requested — city={}, category={}, item={}, quotedPrice={}",
                city, category, itemName, quotedPrice);

        Optional<FairPrice> result =
                fairPriceRepository.findByCityAndCategoryAndItemNameIgnoreCase(
                        city, category, itemName);

        // ── Item not in our database ─────────────────────────────────────────
        if (result.isEmpty()) {
            log.warn("No benchmark data found for item='{}' in city='{}'", itemName, city);
            return PriceCheckResponse.builder()
                    .itemFound(false)
                    .isScam(false)
                    .city(city)
                    .category(category)
                    .itemName(itemName)
                    .userPrice(quotedPrice)
                    .verdict(PriceCheckResponse.Verdict.UNKNOWN_ITEM)
                    .message(String.format(
                            "🐾 PawTour doesn't have benchmark data for '%s' in %s yet. "
                            + "Use your best judgement, and maybe check with a local!", itemName, city))
                    .build();
        }

        // ── Item found — evaluate the quoted price ───────────────────────────
        FairPrice benchmark = result.get();
        BigDecimal minPrice = benchmark.getMinPrice();
        BigDecimal maxPrice = benchmark.getMaxPrice();

        boolean isScam    = quotedPrice.compareTo(maxPrice) > 0;
        boolean isGreatDeal = quotedPrice.compareTo(minPrice) < 0;

        PriceCheckResponse.Verdict verdict;
        String message;

        if (isScam) {
            BigDecimal overchargeAmount = quotedPrice.subtract(maxPrice)
                                                     .setScale(2, RoundingMode.HALF_UP);
            verdict = PriceCheckResponse.Verdict.SCAM_ALERT;
            message = String.format(
                    "🚨 Scam Alert! You're being overcharged by ₹%s for '%s' in %s. "
                    + "The fair price range is ₹%s – ₹%s. "
                    + "Politely negotiate or walk away!",
                    overchargeAmount, itemName, city, minPrice, maxPrice);

        } else if (isGreatDeal) {
            verdict = PriceCheckResponse.Verdict.GREAT_DEAL;
            message = String.format(
                    "✅ Great deal! ₹%s for '%s' in %s is below the usual minimum of ₹%s. "
                    + "Enjoy the bargain — you've earned it! 🐾",
                    quotedPrice, itemName, city, minPrice);

        } else {
            verdict = PriceCheckResponse.Verdict.FAIR_PRICE;
            message = String.format(
                    "✅ Fair price! ₹%s for '%s' in %s is within the expected range of ₹%s – ₹%s.",
                    quotedPrice, itemName, city, minPrice, maxPrice);
        }

        log.info("Price check result — verdict={}, item='{}', quotedPrice={}, range=[{}, {}]",
                verdict, itemName, quotedPrice, minPrice, maxPrice);

        return PriceCheckResponse.builder()
                .itemFound(true)
                .isScam(isScam)
                .city(city)
                .category(category)
                .itemName(itemName)
                .userPrice(quotedPrice)
                .minPrice(minPrice)
                .maxPrice(maxPrice)
                .verdict(verdict)
                .message(message)
                .build();
    }

    // ── Private helpers ──────────────────────────────────────────────────────

    private BigDecimal toBigDecimal(double value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_UP);
    }
}