package com.Adey.PawTours.repository;

import com.Adey.PawTours.Entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    // Core lookup: where is this user in this quest?
    Optional<UserProgress> findByUserIdAndQuestId(Long userId, Long questId);

    // Fetch all quests a user has ever started or completed
    List<UserProgress> findByUserId(Long userId);

    // Fetch all progress records for a quest (leaderboard / admin use)
    List<UserProgress> findByQuestId(Long questId);
}
