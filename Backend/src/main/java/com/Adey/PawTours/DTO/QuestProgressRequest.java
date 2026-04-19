package com.Adey.PawTours.DTO;
import lombok.Data;

@Data
public class QuestProgressRequest {
    private Long userId;
    private Long questId;
    private Integer sequenceOrder;
}