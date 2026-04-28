package com.Adey.PawTours.repository;



import com.Adey.PawTours.Entity.BackpackItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BackpackItemRepository extends JpaRepository<BackpackItem, Long> {

    // Fetch everything a specific user has saved, ordered by newest first
    List<BackpackItem> findByUserIdOrderBySavedAtDesc(Long userId);

    // Check if a user already saved a specific accommodation (to prevent duplicates)
    Optional<BackpackItem> findByUserIdAndAccommodationId(Long userId, Long accommodationId);

    // Check if a user already saved a specific vendor (to prevent duplicates)
    Optional<BackpackItem> findByUserIdAndVendorId(Long userId, Long vendorId);
}