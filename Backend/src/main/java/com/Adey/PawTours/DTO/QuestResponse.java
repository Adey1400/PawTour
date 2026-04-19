package com.Adey.PawTours.DTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestResponse {
    private Long id;
    private String cityName;
    private String title;
    private String description;
    private int totalLocations;
}