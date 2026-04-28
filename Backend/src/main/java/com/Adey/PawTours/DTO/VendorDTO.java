package com.Adey.PawTours.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VendorDTO {
    private Long id;
    private String name;
    private String city;
    private String type; // RESTAURANT, SHOP, ARTISAN, LOCAL_GUIDE
    private String description;
    private Double latitude;
    private Double longitude;
    private String zomatoId;
    private Double googleRating;
    private String speciality;
    private String cuisines;
    private Double commissionPercentage;
    private Boolean isFeatured;
    private String affiliateUrl;
}
