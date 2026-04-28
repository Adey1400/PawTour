package com.Adey.PawTours.repository;
import com.Adey.PawTours.Entity.PriceReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceReportRepository extends JpaRepository<PriceReport, Long> {

    // Fetch all reports for a specific benchmark item so we can calculate the new dynamic average
    List<PriceReport> findByFairPriceId(Long fairPriceId);
}