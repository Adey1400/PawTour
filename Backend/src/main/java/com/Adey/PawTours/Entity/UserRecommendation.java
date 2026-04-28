package com.Adey.PawTours.Entity;

import jakarta.persistence.*;
import lombok.*;
import com.Adey.PawTours.Entity.Accommodation;
import com.Adey.PawTours.Entity.Vendor;

@Entity
@Table(name = "user_recommendation")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @Column(name = "recommendation_reason")
    private String reason; // "Near your current quest", "Based on your preferences"

    @Column(name = "score")
    private Double score; // ML similarity score

    @Column(name = "distance_km")
    private Double distanceKm;

    @Column(name = "clicked", columnDefinition = "boolean default false")
    private Boolean clicked;

    @Column(name = "booked", columnDefinition = "boolean default false")
    private Boolean booked;
}
