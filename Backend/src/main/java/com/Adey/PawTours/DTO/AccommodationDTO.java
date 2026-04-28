package com.Adey.PawTours.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccommodationDTO {
    private Long id;
    private String name;
    private String city;
    private String type; // HOTEL, OTA, OYO, ECO_SHACK
    private String description;
    private Double latitude;
    private Double longitude;
    private Double rating;
    private Double pricePerNight;
    private String externalUrl;
    private Double googleRating;
    private String amenities;
    private Double distanceKm; // For nearby search results
    private Boolean isFeatured;
}
