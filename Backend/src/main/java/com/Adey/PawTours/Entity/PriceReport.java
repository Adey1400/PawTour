package com.Adey.PawTours.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "price_report")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The user who submitted the report
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // The benchmark item they are reporting on (e.g., "Masala Chai in Kolkata")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fair_price_id", nullable = false)
    private FairPrice fairPrice;

    // What they actually paid
    @Column(name = "reported_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal reportedPrice;

    @Column(name = "reported_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime reportedAt = LocalDateTime.now();
}