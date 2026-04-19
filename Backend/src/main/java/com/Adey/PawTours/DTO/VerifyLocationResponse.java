package com.Adey.PawTours.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerifyLocationResponse {
    private boolean correct;
    private int pointsAwarded;
    private int totalPoints;
    private String message;
    private ClueResponse nextClue;
    private boolean questCompleted;
}