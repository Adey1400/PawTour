package com.Adey.PawTours.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Adey.PawTours.DTO.QuestProgressRequest;
import com.Adey.PawTours.Entity.Location;
import com.Adey.PawTours.Entity.Quest;
import com.Adey.PawTours.Entity.UserProgress;
import com.Adey.PawTours.Service.QuestService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/quests")
@CrossOrigin("*")
@RequiredArgsConstructor
public class QuestController {

    private final QuestService questService;

    // ── GET /api/quests ──────────────────────────────────────────────────────
    // Returns all quests. Pass ?city=Kolkata to filter by city.
    @GetMapping
    public ResponseEntity<List<Quest>> getAllQuests(
            @RequestParam(required = false) String city) {

        List<Quest> quests = (city != null && !city.isBlank())
                ? questService.getQuestsByCity(city)
                : questService.getAllQuests();

        return ResponseEntity.ok(quests);
    }

    // ── GET /api/quests/{questId} ────────────────────────────────────────────
    // Returns a single quest by ID.
    @GetMapping("/{questId}")
    public ResponseEntity<Quest> getQuestById(@PathVariable Long questId) {
        return ResponseEntity.ok(questService.getQuestById(questId));
    }

    // ── GET /api/quests/{questId}/locations ──────────────────────────────────
    // Returns all locations for a quest, ordered by sequenceOrder.
    @GetMapping("/{questId}/locations")
    public ResponseEntity<List<Location>> getQuestLocations(
            @PathVariable Long questId) {

        return ResponseEntity.ok(questService.getAllLocationsForQuest(questId));
    }

    // ── GET /api/quests/{questId}/clue?step=1 ───────────────────────────────
    // Returns the riddle/clue for a specific step in a quest.
    @GetMapping("/{questId}/clue")
    public ResponseEntity<Location> getClue(
            @PathVariable Long questId,
            @RequestParam int step) {

        log.info("Clue requested — questId={}, step={}", questId, step);
        return ResponseEntity.ok(questService.getClue(questId, step));
    }

    // ── POST /api/quests/verify ──────────────────────────────────────────────
    // Called when a player reaches a physical location.
    // Validates the step, advances progress, and marks quest COMPLETED if done.
    @PostMapping("/verify")
    public ResponseEntity<UserProgress> verifyLocation(
            @RequestBody QuestProgressRequest request) {

        log.info("Location verify — userId={}, questId={}, step={}",
                request.getUserId(), request.getQuestId(), request.getSequenceOrder());

        UserProgress progress = questService.verifyAndAdvance(
                request.getUserId(),
                request.getQuestId(),
                request.getSequenceOrder());

        return ResponseEntity.ok(progress);
    }

    // ── GET /api/quests/progress?userId=1&questId=2 ──────────────────────────
    // Returns a user's current progress on a specific quest.
    @GetMapping("/progress")
    public ResponseEntity<UserProgress> getProgress(
            @RequestParam Long userId,
            @RequestParam Long questId) {

        return ResponseEntity.ok(questService.getProgress(userId, questId));
    }
}