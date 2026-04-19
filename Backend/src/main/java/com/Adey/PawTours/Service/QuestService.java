package com.Adey.PawTours.Service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.Adey.PawTours.DTO.ClueResponse;
import com.Adey.PawTours.DTO.QuestResponse;
import com.Adey.PawTours.DTO.VerifyLocationResponse;
import com.Adey.PawTours.Entity.Location;
import com.Adey.PawTours.Entity.Quest;
import com.Adey.PawTours.Entity.User;
import com.Adey.PawTours.Entity.UserProgress;
import com.Adey.PawTours.repository.LocationRepository;
import com.Adey.PawTours.repository.QuestRepository;
import com.Adey.PawTours.repository.UserProgressRepository;
import com.Adey.PawTours.repository.UserRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestService {

    private static final int POINTS_PER_LOCATION = 50;
    private static final int STARTING_SEQUENCE   = 1;

    private final QuestRepository        questRepository;
    private final LocationRepository     locationRepository;
    private final UserProgressRepository userProgressRepository;
    private final UserRepository         userRepository;

    // ── 1. Get all quests for a city ─────────────────────────────────────────

    public List<QuestResponse> getAllQuestsByCity(String city) {
        log.info("Fetching all quests for city='{}'", city);

        return questRepository.findByCityNameIgnoreCase(city)
                .stream()
                .map(this::toQuestResponse)
                .toList();
    }

    // ── 2. Get current clue ──────────────────────────────────────────────────

    @Transactional
    public ClueResponse getCurrentClue(Long userId, Long questId) {
        log.info("getCurrentClue called — userId={}, questId={}", userId, questId);

        User  user  = findUserOrThrow(userId);
        Quest quest = findQuestOrThrow(questId);

        // Look up existing progress, or bootstrap a fresh one at step 1
        UserProgress progress = userProgressRepository
                .findByUserIdAndQuestId(userId, questId)
                .orElseGet(() -> createFreshProgress(user, quest));

        if (progress.getStatus() == UserProgress.Status.COMPLETED) {
            log.info("userId={} has already completed questId={}", userId, questId);
            return ClueResponse.builder()
                    .questId(questId)
                    .isQuestComplete(true)
                    .totalLocations(quest.getLocations().size())
                    .message("🏆 You've already completed this quest! Check the leaderboard.")
                    .build();
        }

        Location currentLocation = findLocationOrThrow(questId, progress.getCurrentLocationOrder());
        int      totalLocations  = quest.getLocations().size();

        log.info("Returning clue — userId={}, questId={}, sequenceOrder={}",
                userId, questId, currentLocation.getSequenceOrder());

        return toClueResponse(quest, currentLocation, totalLocations, false,
                "🐾 Here's your next clue. Good luck, explorer!");
    }

    // ── 3. Verify location guess ─────────────────────────────────────────────

    @Transactional
    public VerifyLocationResponse verifyLocation(Long userId,
                                                  Long questId,
                                                  Long guessedLocationId) {
        log.info("verifyLocation called — userId={}, questId={}, guessedLocationId={}",
                userId, questId, guessedLocationId);

        User         user     = findUserOrThrow(userId);
        Quest        quest    = findQuestOrThrow(questId);
        UserProgress progress = findProgressOrThrow(userId, questId);

        if (progress.getStatus() == UserProgress.Status.COMPLETED) {
            return VerifyLocationResponse.builder()
                    .correct(false)
                    .questCompleted(true)
                    .totalPoints(user.getPoints())
                    .message("🏆 You've already completed this quest!")
                    .build();
        }

        Location expectedLocation =
                findLocationOrThrow(questId, progress.getCurrentLocationOrder());

        // ── Wrong guess ──────────────────────────────────────────────────────
        if (!expectedLocation.getId().equals(guessedLocationId)) {
            log.info("Wrong guess — userId={}, expected locationId={}, got={}",
                    userId, expectedLocation.getId(), guessedLocationId);
            return VerifyLocationResponse.builder()
                    .correct(false)
                    .questCompleted(false)
                    .pointsAwarded(0)
                    .totalPoints(user.getPoints())
                    .message("❌ That's not quite right. Re-read the clue and try again!")
                    .build();
        }

        // ── Correct guess — award points ─────────────────────────────────────
        user.setPoints(user.getPoints() + POINTS_PER_LOCATION);
        userRepository.save(user);
        log.info("Awarded {} points to userId={}, new total={}",
                POINTS_PER_LOCATION, userId, user.getPoints());

        int totalLocations  = quest.getLocations().size();
        int nextOrder       = progress.getCurrentLocationOrder() + 1;
        boolean isLastStop  = nextOrder > totalLocations;

        // ── Quest completed ──────────────────────────────────────────────────
        if (isLastStop) {
            progress.setStatus(UserProgress.Status.COMPLETED);
            userProgressRepository.save(progress);
            log.info("Quest COMPLETED — userId={}, questId={}", userId, questId);

            return VerifyLocationResponse.builder()
                    .correct(true)
                    .questCompleted(true)
                    .pointsAwarded(POINTS_PER_LOCATION)
                    .totalPoints(user.getPoints())
                    .message(String.format(
                            "🎉 Quest complete! You've earned %d points. "
                            + "Total: %d points. You're a true PawTour explorer! 🐾",
                            POINTS_PER_LOCATION, user.getPoints()))
                    .nextClue(null)
                    .build();
        }

        // ── Advance to next clue ─────────────────────────────────────────────
        progress.setCurrentLocationOrder(nextOrder);
        userProgressRepository.save(progress);

        Location nextLocation = findLocationOrThrow(questId, nextOrder);
        ClueResponse nextClue = toClueResponse(quest, nextLocation, totalLocations, false,
                String.format("✅ Correct! +%d points. Here's your next clue 👇",
                        POINTS_PER_LOCATION));

        log.info("Advancing userId={} to sequenceOrder={} in questId={}", userId, nextOrder, questId);

        return VerifyLocationResponse.builder()
                .correct(true)
                .questCompleted(false)
                .pointsAwarded(POINTS_PER_LOCATION)
                .totalPoints(user.getPoints())
                .message(String.format("✅ Correct! +%d points. Keep going!", POINTS_PER_LOCATION))
                .nextClue(nextClue)
                .build();
    }

    // ── 4. Get all quests ───────────────────────────────────────────────────

    public List<Quest> getAllQuests() {
        log.info("Fetching all quests");
        return questRepository.findAll();
    }

    // ── 5. Get all quests by city (alternative name) ─────────────────────────

    public List<Quest> getQuestsByCity(String city) {
        log.info("Fetching all quests for city='{}'", city);
        return questRepository.findByCityNameIgnoreCase(city);
    }

    // ── 6. Get quest by ID ───────────────────────────────────────────────────

    public Quest getQuestById(Long questId) {
        log.info("Fetching quest by id={}", questId);
        return findQuestOrThrow(questId);
    }

    // ── 7. Get all locations for a quest ─────────────────────────────────────

    public List<Location> getAllLocationsForQuest(Long questId) {
        log.info("Fetching all locations for questId={}", questId);
        return locationRepository.findByQuestIdOrderBySequenceOrderAsc(questId);
    }

    // ── 8. Get clue for a specific step ──────────────────────────────────────

    public Location getClue(Long questId, int step) {
        log.info("Fetching clue for questId={}, step={}", questId, step);
        return findLocationOrThrow(questId, step);
    }

    // ── 9. Verify and advance user progress ──────────────────────────────────

    @Transactional
    public UserProgress verifyAndAdvance(Long userId, Long questId, Integer step) {
        log.info("verifyAndAdvance called — userId={}, questId={}, step={}", userId, questId, step);

        User user = findUserOrThrow(userId);
        Quest quest = findQuestOrThrow(questId);

        UserProgress progress = userProgressRepository
                .findByUserIdAndQuestId(userId, questId)
                .orElseGet(() -> createFreshProgress(user, quest));

        if (progress.getStatus() == UserProgress.Status.COMPLETED) {
            log.info("Quest already completed — userId={}, questId={}", userId, questId);
            return progress;
        }

        Location expectedLocation = findLocationOrThrow(questId, progress.getCurrentLocationOrder());

        if (!expectedLocation.getSequenceOrder().equals(step)) {
            log.warn("Invalid step verification — userId={}, expected={}, got={}",
                    userId, expectedLocation.getSequenceOrder(), step);
            return progress;
        }

        // Award points
        user.setPoints(user.getPoints() + POINTS_PER_LOCATION);
        userRepository.save(user);

        int totalLocations = quest.getLocations().size();
        int nextOrder = progress.getCurrentLocationOrder() + 1;

        if (nextOrder > totalLocations) {
            progress.setStatus(UserProgress.Status.COMPLETED);
        } else {
            progress.setCurrentLocationOrder(nextOrder);
        }

        userProgressRepository.save(progress);
        log.info("Progress advanced — userId={}, questId={}, newOrder={}", userId, questId, nextOrder);

        return progress;
    }

    // ── 10. Get user progress ────────────────────────────────────────────────

    public UserProgress getProgress(Long userId, Long questId) {
        log.info("Fetching progress for userId={}, questId={}", userId, questId);
        return findProgressOrThrow(userId, questId);
    }

    // ── Private helpers ──────────────────────────────────────────────────────

    private UserProgress createFreshProgress(User user, Quest quest) {
        log.info("Creating fresh UserProgress — userId={}, questId={}",
                user.getId(), quest.getId());
        UserProgress fresh = new UserProgress();
        fresh.setUser(user);
        fresh.setQuest(quest);
        fresh.setCurrentLocationOrder(STARTING_SEQUENCE);
        fresh.setStatus(UserProgress.Status.IN_PROGRESS);
        return userProgressRepository.save(fresh);
    }

    private User findUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found with id: " + userId));
    }

    private Quest findQuestOrThrow(Long questId) {
        return questRepository.findById(questId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Quest not found with id: " + questId));
    }

    private Location findLocationOrThrow(Long questId, int sequenceOrder) {
        return locationRepository.findByQuestIdAndSequenceOrder(questId, sequenceOrder)
                .orElseThrow(() -> new IllegalArgumentException(
                        String.format("Location not found — questId=%d, sequenceOrder=%d",
                                questId, sequenceOrder)));
    }

    private UserProgress findProgressOrThrow(Long userId, Long questId) {
        return userProgressRepository.findByUserIdAndQuestId(userId, questId)
                .orElseThrow(() -> new IllegalStateException(
                        String.format("No progress found — userId=%d, questId=%d. "
                                + "Call getCurrentClue first to initialise progress.",
                                userId, questId)));
    }

    private QuestResponse toQuestResponse(Quest quest) {
        return QuestResponse.builder()
                .id(quest.getId())
                .cityName(quest.getCityName())
                .title(quest.getTitle())
                .description(quest.getDescription())
                .totalLocations(quest.getLocations().size())
                .build();
    }

    private ClueResponse toClueResponse(Quest quest, Location location,
                                         int totalLocations, boolean isComplete,
                                         String message) {
        return ClueResponse.builder()
                .questId(quest.getId())
                .locationId(location.getId())
                .locationName(location.getName())
                .sequenceOrder(location.getSequenceOrder())
                .totalLocations(totalLocations)
                .riddleText(location.getRiddleText())
                .isQuestComplete(isComplete)
                .message(message)
                .build();
    }
}