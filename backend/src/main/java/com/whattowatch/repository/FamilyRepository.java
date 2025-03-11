package com.whattowatch.repository;

import com.whattowatch.model.Family;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FamilyRepository extends JpaRepository<Family, Long> {
    @EntityGraph(attributePaths = {"users"})
    Optional<Family> findWithUsersById(Long id);
}