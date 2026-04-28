package com.Adey.PawTours.controller;

import com.Adey.PawTours.Entity.Itinerary;
import com.Adey.PawTours.Service.ItineraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itineraries")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class ItineraryController {

    private final ItineraryService itineraryService;

    @GetMapping("/{city}")
    public ResponseEntity<List<Itinerary>> getItinerariesByCity(@PathVariable String city) {
        List<Itinerary> itineraries = itineraryService.getItinerariesByCity(city);
        return ResponseEntity.ok(itineraries);
    }
}