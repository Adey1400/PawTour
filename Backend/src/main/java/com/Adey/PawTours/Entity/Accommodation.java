package com.Adey.PawTours.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "accommodation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccommodationType type; // HOTEL, OTA, OYO, ECO_SHACK

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "rating")
    private Double rating; // 1-5 stars

    @Column(name = "price_per_night")
    private Double pricePerNight;

    @Column(name = "external_url")
    private String externalUrl; // Link to OTA/booking site

    @Column(name = "external_rating")
    private Double externalRating; // From Zomato, Google, OTA

    @Column(name = "amenities", columnDefinition = "TEXT")
    private String amenities; // JSON array

    @OneToMany(mappedBy = "accommodation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserRecommendation> recommendations;

    @Column(name = "is_featured", columnDefinition = "boolean default false")
    private Boolean isFeatured = false;
    
    public enum AccommodationType {
        HOTEL,
        OTA,
        OYO,
        ECO_SHACK,
        GUESTHOUSE
    }
}
