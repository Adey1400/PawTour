package com.Adey.PawTours.controller;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Adey.PawTours.DTO.PriceCheckRequest;
import com.Adey.PawTours.DTO.PriceCheckResponse;
import com.Adey.PawTours.DTO.PriceReportRequest;
import com.Adey.PawTours.Service.PriceReportService;
import com.Adey.PawTours.Service.ScamProtectionService;

@Slf4j
@RestController
@RequestMapping("/api/scam")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ScamController {

    private final ScamProtectionService scamProtectionService;
    private final PriceReportService priceReportService;
    // ── POST /api/scam/check ─────────────────────────────────────────────────
    // Primary price-check endpoint. Accepts a city, category, item, and the
    // price the traveller was quoted. Returns a verdict + message.
    @PostMapping("/check")
    public ResponseEntity<PriceCheckResponse> checkPrice(
            @RequestBody PriceCheckRequest request) {

        log.info("Scam check — city={}, category={}, item={}, quotedPrice={}",
                request.getCity(), request.getCategory(),
                request.getItemName(), request.getUserPrice());

        PriceCheckResponse response = scamProtectionService.checkPrice(
                request.getCity(),
                request.getCategory(),
                request.getItemName(),
                request.getUserPrice());

        return ResponseEntity.ok(response);
    }

    // ── GET /api/scam/check ──────────────────────────────────────────────────
    // Convenience GET variant so you can test in the browser or Swagger
    // without needing a POST body. Don't expose this in production.
    @GetMapping("/check")
    public ResponseEntity<PriceCheckResponse> checkPriceGet(
            @RequestParam String city,
            @RequestParam String category,
            @RequestParam String itemName,
            @RequestParam double userPrice) {

        log.info("Scam check (GET) — city={}, category={}, item={}, quotedPrice={}",
                city, category, itemName, userPrice);

        PriceCheckResponse response = scamProtectionService.checkPrice(
                city, category, itemName, userPrice);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/report")
    public ResponseEntity<String> reportActualPrice(@RequestBody PriceReportRequest request) {
        log.info("Receiving price report from user {} for {} in {}", 
                request.getUserId(), request.getItemName(), request.getCity());
        
        String responseMessage = priceReportService.submitReport(request);
        return ResponseEntity.ok(responseMessage);
    }
}