package com.Adey.PawTours.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vendor")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VendorType type; // RESTAURANT, SHOP, ARTISAN, LOCAL_GUIDE

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "zomato_id")
    private String zomatoId; // Link to Zomato API

    @Column(name = "google_rating")
    private Double googleRating;

    @Column(name = "speciality")
    private String speciality; // e.g., "Bengali Cuisine", "Handmade Textiles"

    @Column(name = "commission_percentage")
    private Double commissionPercentage; // For affiliate tracking

    @Column(columnDefinition = "TEXT")
    private String cuisines; // JSON array for restaurants
    
    @Column(name = "is_featured", columnDefinition = "boolean default false")
    private Boolean isFeatured = false;

    @Column(name = "affiliate_url", columnDefinition = "TEXT")
    private String affiliateUrl;
    public enum VendorType {
        RESTAURANT,
        CAFE,
        SHOP,
        ARTISAN,
        LOCAL_GUIDE,
        TRANSPORT
    }
}
