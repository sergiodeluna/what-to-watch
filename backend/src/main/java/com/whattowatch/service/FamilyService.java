package com.whattowatch.service;

import com.whattowatch.model.Family;
import com.whattowatch.repository.FamilyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FamilyService {

    private final FamilyRepository familyRepository;

    public List<Family> findAllFamilies() {
        return familyRepository.findAll();
    }

    public Optional<Family> findFamilyById(Long id) {
        return familyRepository.findById(id);
    }

    public Family saveFamily(Family family) {
        return familyRepository.save(family);
    }

    public void deleteFamilyById(Long id) {
        familyRepository.deleteById(id);
    }
}
