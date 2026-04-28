package com.Adey.PawTours.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_engagement")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEngagement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "loyalty_points")
    private Integer loyaltyPoints;

    @Column(name = "badges_earned", columnDefinition = "TEXT")
    private String badgesEarned; // JSON array

    @Column(name = "referral_code")
    private String referralCode;

    @Column(name = "referral_bonus")
    private Double referralBonus;

    @Column(name = "total_spent")
    private Double totalSpent;

    @Column(name = "tier")
    private String tier; // BRONZE, SILVER, GOLD, PLATINUM

    @Column(name = "affiliate_commission_earned")
    private Double affiliateCommissionEarned;

    @Column(name = "next_tier_threshold")
    private Integer nextTierThreshold;
}
