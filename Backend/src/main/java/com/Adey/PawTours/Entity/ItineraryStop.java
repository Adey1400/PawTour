package com.Adey.PawTours.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "itinerary_stop")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItineraryStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Links this stop to its parent Itinerary
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "itinerary_id", nullable = false)
    @JsonIgnore // Prevents infinite loops when sending JSON to React
    private Itinerary itinerary;

    @Column(name = "stop_number")
    private Integer stopNumber; // To order them (1, 2, 3...)

    @Column(name = "location_name")
    private String locationName; 

    private String description;
    
    @Column(name = "time_suggestion")
    private String timeSuggestion; // e.g., "09:00 AM" or "Morning"

    @Column(name = "is_sponsored")
    private Boolean isSponsored; // Your monetization flag!
}