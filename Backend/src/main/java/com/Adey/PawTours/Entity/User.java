package com.Adey.PawTours.Entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // "user" is a reserved word in PostgreSQL
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private Integer points = 0;
}