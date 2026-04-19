package com.Adey.PawTours.repository;

import com.Adey.PawTours.Entity.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestRepository extends JpaRepository<Quest, Long> {

    List<Quest> findByCityNameIgnoreCase(String cityName);
}
