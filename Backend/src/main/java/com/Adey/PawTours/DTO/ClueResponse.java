package com.Adey.PawTours.DTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClueResponse {
    private Long questId;
    private Long locationId;
    private int sequenceOrder;
    private int totalLocations;
    private String riddleText;
    private String locationName;
    private boolean isQuestComplete;
    private String message;
}