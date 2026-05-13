package com.healthgov.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.healthgov.model.Citizen;

public interface CitizenRepository extends JpaRepository<Citizen, Long> {
    Optional<Citizen> findByUserId(Long userId);
}
