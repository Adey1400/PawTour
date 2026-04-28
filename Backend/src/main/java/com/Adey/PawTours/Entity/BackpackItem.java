package com.Adey.PawTours.Entity;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "backpack_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BackpackItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user who saved the item
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // If they saved an accommodation, this will be populated (vendor will be null)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_id")
    private Accommodation accommodation;

    // If they saved a vendor, this will be populated (accommodation will be null)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @Column(name = "saved_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime savedAt = LocalDateTime.now();
    
    @Column(name = "notes")
    private String notes; // Just in case users want to add a note later like "Must visit on Day 1!"
}