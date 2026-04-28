package com.Adey.PawTours.Service;

import com.Adey.PawTours.Entity.Itinerary;
import com.Adey.PawTours.repository.ItineraryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItineraryService {

    private final ItineraryRepository itineraryRepository;

    public List<Itinerary> getItinerariesByCity(String city) {
        return itineraryRepository.findByCityIgnoreCase(city);
    }
}