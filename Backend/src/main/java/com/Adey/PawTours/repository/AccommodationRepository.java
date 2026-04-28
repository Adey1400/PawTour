package com.Adey.PawTours.repository;

import com.Adey.PawTours.Entity.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {

    // Find all accommodations in a city
    List<Accommodation> findByCity(String city);

    // Find accommodations by type
    List<Accommodation> findByType(Accommodation.AccommodationType type);

    // Find nearby accommodations (within radius)
    List<Accommodation> findByLatitudeBetweenAndLongitudeBetween(
        Double minLat, Double maxLat,
        Double minLng, Double maxLng
    );

    // Find by rating threshold
    List<Accommodation> findByRatingGreaterThanEqualOrderByRatingDesc(Double rating);
}
