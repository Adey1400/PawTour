package com.Adey.PawTours.config;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.Adey.PawTours.Entity.FairPrice;
import com.Adey.PawTours.Entity.User;
import com.Adey.PawTours.repository.FairPriceRepository;
import com.Adey.PawTours.repository.UserRepository;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository         userRepository;
    private final FairPriceRepository    fairPriceRepository;

    @Override
    @Transactional
    public void run(String... args) {

        // ── Guard: only seed if the database is completely empty ─────────────
        if (userRepository.count() > 0) {
            log.info("🐾 PawTour database already seeded — skipping DataLoader.");
            return;
        }

        log.info("🌱 Empty database detected — seeding PawTour demo data...");

        seedUser();
        seedFairPrices();

        log.info("✅ PawTour demo data loaded successfully. Happy adventuring! 🐾");
    }

    // ── 1. Test User ─────────────────────────────────────────────────────────

    private void seedUser() {
        User user = new User();
        user.setUsername("demo_pawer");

        userRepository.save(user);
        log.info("  ✔ User created: '{}'", user.getUsername());
    }

    // ── 2. FairPrice Entries ────────────────────────────────────────────────

    private void seedFairPrices() {

        // — Transport ————————————————————————————————————————————————————————
        FairPrice taxiToVictoria = new FairPrice();
        taxiToVictoria.setCity("Kolkata");
        taxiToVictoria.setCategory("Transport");
        taxiToVictoria.setItemName("Taxi to Victoria Memorial");
        taxiToVictoria.setMinPrice(new BigDecimal("150.00"));
        taxiToVictoria.setMaxPrice(new BigDecimal("200.00"));

        FairPrice autoRickshaw = new FairPrice();
        autoRickshaw.setCity("Kolkata");
        autoRickshaw.setCategory("Transport");
        autoRickshaw.setItemName("Auto Rickshaw (Short Ride)");
        autoRickshaw.setMinPrice(new BigDecimal("30.00"));
        autoRickshaw.setMaxPrice(new BigDecimal("60.00"));

        // — Food ─────────────────────────────────────────────────────────────
        FairPrice masalaChai = new FairPrice();
        masalaChai.setCity("Kolkata");
        masalaChai.setCategory("Food");
        masalaChai.setItemName("Masala Chai");
        masalaChai.setMinPrice(new BigDecimal("10.00"));
        masalaChai.setMaxPrice(new BigDecimal("30.00"));

        FairPrice katiRoll = new FairPrice();
        katiRoll.setCity("Kolkata");
        katiRoll.setCategory("Food");
        katiRoll.setItemName("Kati Roll");
        katiRoll.setMinPrice(new BigDecimal("40.00"));
        katiRoll.setMaxPrice(new BigDecimal("80.00"));

        // — Souvenir ─────────────────────────────────────────────────────────
        FairPrice terracottaSouvenir = new FairPrice();
        terracottaSouvenir.setCity("Kolkata");
        terracottaSouvenir.setCategory("Souvenir");
        terracottaSouvenir.setItemName("Terracotta Figurine");
        terracottaSouvenir.setMinPrice(new BigDecimal("80.00"));
        terracottaSouvenir.setMaxPrice(new BigDecimal("150.00"));

        fairPriceRepository.saveAll(List.of(
                taxiToVictoria,
                autoRickshaw,
                masalaChai,
                katiRoll,
                terracottaSouvenir
        ));

        log.info("  ✔ 5 FairPrice entries seeded across Transport, Food, and Souvenir categories");
    }
}