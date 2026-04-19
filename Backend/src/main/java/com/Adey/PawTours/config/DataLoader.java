package com.Adey.PawTours.config;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.Adey.PawTours.Entity.FairPrice;
import com.Adey.PawTours.Entity.Location;
import com.Adey.PawTours.Entity.Quest;
import com.Adey.PawTours.Entity.User;
import com.Adey.PawTours.repository.FairPriceRepository;
import com.Adey.PawTours.repository.LocationRepository;
import com.Adey.PawTours.repository.QuestRepository;
import com.Adey.PawTours.repository.UserRepository;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final UserRepository         userRepository;
    private final QuestRepository        questRepository;
    private final LocationRepository     locationRepository;
    private final FairPriceRepository    fairPriceRepository;

    @Override
    @Transactional
    public void run(String... args) {

        // ── Guard: only seed if the database is completely empty ─────────────
        if (questRepository.count() > 0) {
            log.info("🐾 PawTour database already seeded — skipping DataLoader.");
            return;
        }

        log.info("🌱 Empty database detected — seeding PawTour demo data...");

        seedUser();
        seedQuestWithLocations();
        seedFairPrices();

        log.info("✅ PawTour demo data loaded successfully. Happy adventuring! 🐾");
    }

    // ── 1. Test User ─────────────────────────────────────────────────────────

    private void seedUser() {
        User user = new User();
        user.setUsername("demo_pawer");
        user.setPoints(0);

        userRepository.save(user);
        log.info("  ✔ User created: '{}'", user.getUsername());
    }

    // ── 2. Quest + 3 Locations ───────────────────────────────────────────────

    private void seedQuestWithLocations() {

        // — Quest ————————————————————————————————————————————————————————————
        Quest quest = new Quest();
        quest.setCityName("Kolkata");
        quest.setTitle("Kolkata Heritage Walk");
        quest.setDescription(
                "Embark on a journey through the soul of the City of Joy! "
                + "Solve riddles, uncover hidden history, and earn PawPoints "
                + "at three of Kolkata's most iconic landmarks.");

        questRepository.save(quest);
        log.info("  ✔ Quest created: '{}'", quest.getTitle());

        // — Location 1: Victoria Memorial ————————————————————————————————————
        Location victoria = new Location();
        victoria.setQuest(quest);
        victoria.setName("Victoria Memorial");
        victoria.setRiddleText(
                "I am a grand white palace built not for a king, but for a Queen "
                + "who never set foot on Indian soil. Clad in Makrana marble, "
                + "I stand where the Maidan meets memory. "
                + "Find me, and your journey begins. What am I?");
        victoria.setLat(22.5448);
        victoria.setLng(88.3426);
        victoria.setSequenceOrder(1);

        // — Location 2: Indian Museum ————————————————————————————————————————
        Location museum = new Location();
        museum.setQuest(quest);
        museum.setName("Indian Museum");
        museum.setRiddleText(
                "I am the oldest and largest of my kind in all of Asia, "
                + "born in 1814 on the banks of curiosity. "
                + "Within my walls sleep mummies, meteorites, and Mughal miniatures. "
                + "Scholars call me the 'Pride of Asia'. Where do you find me?");
        museum.setLat(22.5574);
        museum.setLng(88.3512);
        museum.setSequenceOrder(2);

        // — Location 3: Howrah Bridge ————────────────────────────────────────
        Location howrah = new Location();
        howrah.setQuest(quest);
        howrah.setName("Howrah Bridge");
        howrah.setRiddleText(
                "I am a steel giant with no nuts or bolts — held together "
                + "by rivets alone. Every day, over a lakh souls cross my spine "
                + "above the Hooghly. I was once called New Howrah Bridge, "
                + "but the city renamed me after a poet. What is my current name?");
        howrah.setLat(22.5851);
        howrah.setLng(88.3468);
        howrah.setSequenceOrder(3);

        locationRepository.saveAll(List.of(victoria, museum, howrah));
        log.info("  ✔ 3 Locations created: Victoria Memorial → Indian Museum → Howrah Bridge");
    }

    // ── 3. FairPrice Entries ─────────────────────────────────────────────────

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