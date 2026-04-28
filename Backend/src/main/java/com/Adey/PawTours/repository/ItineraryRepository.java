package com.Adey.PawTours.repository;

import com.Adey.PawTours.Entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    
    // Fetch all itineraries for a specific city
    List<Itinerary> findByCityIgnoreCase(String city);
}