package com.Adey.PawTours.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PriceCheckResponse {

    private boolean isScam;
    private boolean itemFound;
    private String itemName;
    private String category;
    private String city;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal userPrice;
    private String message;
    private Verdict verdict;

    public enum Verdict {
        SCAM_ALERT,     // userPrice > maxPrice
        FAIR_PRICE,     // minPrice <= userPrice <= maxPrice
        GREAT_DEAL,     // userPrice < minPrice (suspiciously cheap)
        UNKNOWN_ITEM    // not found in DB
    }
}