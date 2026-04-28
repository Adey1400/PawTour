package com.Adey.PawTours.Service;

import com.Adey.PawTours.Entity.Accommodation;
import com.Adey.PawTours.Entity.Vendor;
import com.Adey.PawTours.Entity.UserRecommendation;
import com.Adey.PawTours.Entity.User;
import com.Adey.PawTours.repository.AccommodationRepository;
import com.Adey.PawTours.repository.VendorRepository;
import com.Adey.PawTours.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiscoveryService {

    private final AccommodationRepository accommodationRepository;
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    // ── Accommodation Discovery ──────────────────────────────────────────

    /**
     * Find accommodations in a city, optionally filtered by type.
     * Results are sorted by rating.
     */
  public List<Accommodation> discoverAccommodations(String city, Accommodation.AccommodationType type) {
        List<Accommodation> results = (type != null) ? 
            accommodationRepository.findByType(type) : accommodationRepository.findByCity(city);
        sortAccommodationsByFeatured(results);
        return results;
    }

    /**
     * Find accommodations near a location (within ~2km).
     */
    public List<Accommodation> findNearbyAccommodations(Double latitude, Double longitude, Double radiusKm) {
        log.info("Finding accommodations near {},{} within {}km", latitude, longitude, radiusKm);
        
        Double latDelta = radiusKm / 111.0; // 1 degree ~111km
        Double lngDelta = radiusKm / (111.0 * Math.cos(Math.toRadians(latitude)));
        
        return accommodationRepository.findByLatitudeBetweenAndLongitudeBetween(
            latitude - latDelta, latitude + latDelta,
            longitude - lngDelta, longitude + lngDelta
        );
    }

    // ── Vendor Discovery ─────────────────────────────────────────────────

    /**
     * Discover restaurants, shops, artisan vendors in a city.
     */
   public List<Vendor> discoverVendors(String city, Vendor.VendorType type) {
        List<Vendor> results = (type != null) ? 
            vendorRepository.findByType(type) : vendorRepository.findByCity(city);
        sortVendorsByFeatured(results);
        return results;
    }

    /**
     * Find restaurants by cuisine type.
     */
    public List<Vendor> findRestaurantsByCuisine(String city, String cuisine) {
        log.info("Finding {} restaurants in {}", cuisine, city);
        return vendorRepository.findByTypeAndCuisinesContainingIgnoreCase(
            Vendor.VendorType.RESTAURANT, cuisine
        );
    }

    /**
     * Get highly rated vendors (Google rating >= threshold).
     */
    public List<Vendor> getTopRatedVendors(Double minRating) {
        log.info("Fetching vendors with rating >= {}", minRating);
        return vendorRepository.findByGoogleRatingGreaterThanEqualOrderByGoogleRatingDesc(minRating);
    }

    // ── Recommendation Engine ────────────────────────────────────────────

    /**
     * Generate recommendations for a user based on their current location and preferences.
     */
    public List<UserRecommendation> generateRecommendations(Long userId, Double latitude, Double longitude, String city) {
        log.info("Generating recommendations for userId={} at {},{}", userId, latitude, longitude);
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        // Find nearby accommodations
        List<Accommodation> nearbyAccommodations = findNearbyAccommodations(latitude, longitude, 2.0);
        
        // Find top-rated vendors
        List<Vendor> topVendors = getTopRatedVendors(4.0);
        
        // Create recommendations (simplified for now)
        // In production, this would use ML-based similarity scores
        List<UserRecommendation> recommendations = new java.util.ArrayList<>();
        
        nearbyAccommodations.forEach(acc -> 
            recommendations.add(UserRecommendation.builder()
                .user(user)
                .accommodation(acc)
                .reason("Near your current location")
                .score(5.0)
                .distanceKm(calculateDistance(latitude, longitude, acc.getLatitude(), acc.getLongitude()))
                .build())
        );
        
        log.info("Generated {} recommendations", recommendations.size());
        return recommendations;
    }

    // ── Helper Methods ───────────────────────────────────────────────────

    /**
     * Calculate distance between two coordinates (Haversine formula).
     */
    private Double calculateDistance(Double lat1, Double lng1, Double lat2, Double lng2) {
        final int R = 6371; // Earth's radius in km
        Double latDistance = Math.toRadians(lat2 - lat1);
        Double lngDistance = Math.toRadians(lng2 - lng1);
        Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
            + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
            * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private void sortAccommodationsByFeatured(List<Accommodation> list) {
        list.sort((a, b) -> {
            boolean aFeatured = a.getIsFeatured() != null && a.getIsFeatured();
            boolean bFeatured = b.getIsFeatured() != null && b.getIsFeatured();
            return Boolean.compare(bFeatured, aFeatured); // true comes before false
        });
    }

    private void sortVendorsByFeatured(List<Vendor> list) {
        list.sort((a, b) -> {
            boolean aFeatured = a.getIsFeatured() != null && a.getIsFeatured();
            boolean bFeatured = b.getIsFeatured() != null && b.getIsFeatured();
            return Boolean.compare(bFeatured, aFeatured);
        });
    }
}
