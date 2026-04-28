package com.Adey.PawTours.repository;

import com.Adey.PawTours.Entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    // Find vendors in a city
    List<Vendor> findByCity(String city);

    // Find vendors by type
    List<Vendor> findByType(Vendor.VendorType type);

    // Find restaurants by cuisine
    List<Vendor> findByTypeAndCuisinesContainingIgnoreCase(Vendor.VendorType type, String cuisine);

    // Find highly rated vendors
    List<Vendor> findByGoogleRatingGreaterThanEqualOrderByGoogleRatingDesc(Double rating);

    // Find by speciality
    List<Vendor> findBySpecialityContainingIgnoreCase(String speciality);
}
