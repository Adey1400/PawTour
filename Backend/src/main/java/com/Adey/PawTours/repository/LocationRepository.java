package com.Adey.PawTours.repository;

import com.Adey.PawTours.Entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    // Fetches a specific stop in a quest by its sequence position
    Optional<Location> findByQuestIdAndSequenceOrder(Long questId, int sequenceOrder);

    // Useful for loading all stops for a quest in order
    List<Location> findByQuestIdOrderBySequenceOrderAsc(Long questId);
}
