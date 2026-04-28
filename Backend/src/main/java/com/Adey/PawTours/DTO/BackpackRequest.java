package com.Adey.PawTours.DTO;
import lombok.Data;

@Data
public class BackpackRequest {
    private Long userId;
    private String itemType; // "ACCOMMODATION" or "VENDOR"
    private Long itemId;
    private String notes;
}