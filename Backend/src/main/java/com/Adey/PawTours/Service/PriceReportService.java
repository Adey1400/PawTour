package com.Adey.PawTours.Service;
import com.Adey.PawTours.DTO.PriceReportRequest;
import com.Adey.PawTours.Entity.FairPrice;
import com.Adey.PawTours.Entity.PriceReport;
import com.Adey.PawTours.Entity.User;
import com.Adey.PawTours.repository.FairPriceRepository;
import com.Adey.PawTours.repository.PriceReportRepository;
import com.Adey.PawTours.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PriceReportService {

    private final PriceReportRepository priceReportRepository;
    private final FairPriceRepository fairPriceRepository;
    private final UserRepository userRepository;

    // How many reports we need before we trust the crowd and change the database
    private static final int CROWD_THRESHOLD = 5; 

    @Transactional
    public String submitReport(PriceReportRequest request) {
        // 1. Fetch User
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 2. Fetch the existing FairPrice benchmark
        FairPrice fairPrice = fairPriceRepository.findByCityAndCategoryAndItemNameIgnoreCase(
                request.getCity(), request.getCategory(), request.getItemName())
                .orElseThrow(() -> new IllegalArgumentException("Benchmark item not found."));

        // 3. Save the new report
        BigDecimal reportedPrice = BigDecimal.valueOf(request.getReportedPrice()).setScale(2, RoundingMode.HALF_UP);
        PriceReport report = PriceReport.builder()
                .user(user)
                .fairPrice(fairPrice)
                .reportedPrice(reportedPrice)
                .build();
        priceReportRepository.save(report);
        
        log.info("User {} reported paying ₹{} for {}", user.getUsername(), reportedPrice, request.getItemName());

        // 4. Trigger the Dynamic Average Calculation
        recalculateFairPrice(fairPrice);

        return "Thank you! Your report helps keep the community safe from scams.";
    }

    private void recalculateFairPrice(FairPrice fairPrice) {
        List<PriceReport> reports = priceReportRepository.findByFairPriceId(fairPrice.getId());

        // Only update if we have reached the threshold of community reports
        if (reports.size() >= CROWD_THRESHOLD) {
            
            // Calculate the new average price
            double sum = reports.stream()
                    .mapToDouble(r -> r.getReportedPrice().doubleValue())
                    .sum();
            double average = sum / reports.size();

            // Set the new dynamic range: Min is 20% below average, Max is 20% above average
            BigDecimal newMin = BigDecimal.valueOf(average * 0.8).setScale(2, RoundingMode.HALF_UP);
            BigDecimal newMax = BigDecimal.valueOf(average * 1.2).setScale(2, RoundingMode.HALF_UP);

            fairPrice.setMinPrice(newMin);
            fairPrice.setMaxPrice(newMax);

            fairPriceRepository.save(fairPrice);
            log.info("Crowd consensus reached! Updated range for {} to ₹{} - ₹{}", 
                    fairPrice.getItemName(), newMin, newMax);
        }
    }
}