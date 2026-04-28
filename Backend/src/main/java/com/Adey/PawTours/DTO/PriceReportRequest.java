package com.Adey.PawTours.DTO;
import lombok.Data;
@Data
public class PriceReportRequest {
    private Long userId;
    private String city;
    private String category;
    private String itemName;
    private double reportedPrice;
}