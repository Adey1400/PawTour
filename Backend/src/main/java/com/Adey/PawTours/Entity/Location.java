package com.Adey.PawTours.Entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "location")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quest_id", nullable = false)
    @ToString.Exclude   // prevents circular Lombok toString → StackOverflow
    private Quest quest;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String riddleText;

    private Double lat;
    private Double lng;

    @Column(nullable = false)
    private Integer sequenceOrder;
}