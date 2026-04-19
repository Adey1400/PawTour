package com.Adey.PawTours.DTO;
import lombok.Data;

@Data
public class PriceCheckRequest {
    private String city;
    private String category;
    private String itemName;
    private double userPrice;
}