package com.Adey.PawTours.repository;

import com.Adey.PawTours.Entity.FairPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FairPriceRepository extends JpaRepository<FairPrice, Long> {

    // Exact lookup for price check feature (case-insensitive item name)
    Optional<FairPrice> findByCityAndCategoryAndItemNameIgnoreCase(
            String city, String category, String itemName);

    // Browse all items in a city+category (useful for listing UI)
    List<FairPrice> findByCityAndCategoryIgnoreCase(String city, String category);

    // Browse everything available for a city
    List<FairPrice> findByCityIgnoreCase(String city);
}
