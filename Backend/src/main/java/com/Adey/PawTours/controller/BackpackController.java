package com.Adey.PawTours.controller;
import com.Adey.PawTours.DTO.BackpackRequest;
import com.Adey.PawTours.Entity.BackpackItem;
import com.Adey.PawTours.Service.BackpackService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/backpack")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BackpackController {

    private final BackpackService backpackService;

    // ── POST /api/backpack/add ──────────────────────────────────────────────
    @PostMapping("/add")
    public ResponseEntity<BackpackItem> addToBackpack(@RequestBody BackpackRequest request) {
        return ResponseEntity.ok(backpackService.saveToBackpack(request));
    }

    // ── GET /api/backpack/{userId} ──────────────────────────────────────────
    @GetMapping("/{userId}")
    public ResponseEntity<List<BackpackItem>> getBackpack(@PathVariable Long userId) {
        return ResponseEntity.ok(backpackService.getUserBackpack(userId));
    }

    // ── DELETE /api/backpack/remove/{itemId} ────────────────────────────────
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<String> removeFromBackpack(@PathVariable Long itemId) {
        backpackService.removeFromBackpack(itemId);
        return ResponseEntity.ok("Item removed from backpack");
    }
}