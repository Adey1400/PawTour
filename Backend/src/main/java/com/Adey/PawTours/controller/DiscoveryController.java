package com.Adey.PawTours.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Adey.PawTours.DTO.AccommodationDTO;
import com.Adey.PawTours.DTO.VendorDTO;
import com.Adey.PawTours.Entity.Accommodation;
import com.Adey.PawTours.Entity.Vendor;
import com.Adey.PawTours.Service.DiscoveryService;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/discovery")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DiscoveryController {

    private final DiscoveryService discoveryService;

    // ── Accommodation Endpoints ──────────────────────────────────────────

    @GetMapping("/accommodations")
    public ResponseEntity<List<AccommodationDTO>> getAccommodations(
            @RequestParam String city,
            @RequestParam(required = false) String type) {

        log.info("GET /accommodations - city={}, type={}", city, type);

        Accommodation.AccommodationType accType = type != null 
            ? Accommodation.AccommodationType.valueOf(type) 
            : null;

        List<Accommodation> accommodations = discoveryService.discoverAccommodations(city, accType);
        
        return ResponseEntity.ok(accommodations.stream()
            .map(this::toAccommodationDTO)
            .collect(Collectors.toList()));
    }

    @GetMapping("/accommodations/nearby")
    public ResponseEntity<List<AccommodationDTO>> getNearbyAccommodations(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "2.0") Double radiusKm) {

        log.info("GET /accommodations/nearby - lat={}, lng={}, radius={}", latitude, longitude, radiusKm);

        List<Accommodation> nearby = discoveryService.findNearbyAccommodations(latitude, longitude, radiusKm);
        
        return ResponseEntity.ok(nearby.stream()
            .map(this::toAccommodationDTO)
            .collect(Collectors.toList()));
    }

    // ── Vendor Endpoints ─────────────────────────────────────────────────

    @GetMapping("/vendors")
    public ResponseEntity<List<VendorDTO>> getVendors(
            @RequestParam String city,
            @RequestParam(required = false) String type) {

        log.info("GET /vendors - city={}, type={}", city, type);

        Vendor.VendorType vendorType = type != null 
            ? Vendor.VendorType.valueOf(type) 
            : null;

        List<Vendor> vendors = discoveryService.discoverVendors(city, vendorType);
        
        return ResponseEntity.ok(vendors.stream()
            .map(this::toVendorDTO)
            .collect(Collectors.toList()));
    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<VendorDTO>> getRestaurantsByCuisine(
            @RequestParam String city,
            @RequestParam String cuisine) {

        log.info("GET /restaurants - city={}, cuisine={}", city, cuisine);

        List<Vendor> restaurants = discoveryService.findRestaurantsByCuisine(city, cuisine);
        
        return ResponseEntity.ok(restaurants.stream()
            .map(this::toVendorDTO)
            .collect(Collectors.toList()));
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<VendorDTO>> getTopRatedVendors(
            @RequestParam(defaultValue = "4.0") Double minRating) {

        log.info("GET /top-rated - minRating={}", minRating);

        List<Vendor> vendors = discoveryService.getTopRatedVendors(minRating);
        
        return ResponseEntity.ok(vendors.stream()
            .map(this::toVendorDTO)
            .collect(Collectors.toList()));
    }

    // ── Helper mappers ──────────────────────────────────────────────────

   private AccommodationDTO toAccommodationDTO(Accommodation acc) {
        return AccommodationDTO.builder()
            .id(acc.getId())
            .name(acc.getName())
            .city(acc.getCity())
            .type(acc.getType().name())
            .description(acc.getDescription())
            .latitude(acc.getLatitude())
            .longitude(acc.getLongitude())
            .rating(acc.getRating())
            .pricePerNight(acc.getPricePerNight())
            .externalUrl(acc.getExternalUrl()) // This is your affiliate link
            .googleRating(acc.getExternalRating())
            .amenities(acc.getAmenities())
            .isFeatured(acc.getIsFeatured() != null ? acc.getIsFeatured() : false)
            .build();
    }

    private VendorDTO toVendorDTO(Vendor vendor) {
        return VendorDTO.builder()
            .id(vendor.getId())
            .name(vendor.getName())
            .city(vendor.getCity())
            .type(vendor.getType().name())
            .description(vendor.getDescription())
            .latitude(vendor.getLatitude())
            .longitude(vendor.getLongitude())
            .zomatoId(vendor.getZomatoId())
            .googleRating(vendor.getGoogleRating())
            .speciality(vendor.getSpeciality())
            .cuisines(vendor.getCuisines())
            .commissionPercentage(vendor.getCommissionPercentage())
            .isFeatured(vendor.getIsFeatured() != null ? vendor.getIsFeatured() : false)
            .affiliateUrl(vendor.getAffiliateUrl())
            .build();
    }
}
