package com.whattowatch.service;

import com.whattowatch.model.Family;
import com.whattowatch.model.User;
import com.whattowatch.repository.FamilyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FamilyService {

    private final FamilyRepository familyRepository;
    private final UserService userService;

    public List<Family> findAllFamilies() {
        return familyRepository.findAll();
    }

    public Optional<Family> findFamilyById(Long id) {
        return familyRepository.findById(id);
    }

    public Family saveFamily(Family family) {
        Set<User> users = family.getUsers().stream()
                .map(userService::findOrAddUser)
                .collect(Collectors.toSet());

        family.setUsers(users);
        return familyRepository.save(family);
    }

    public Optional<Family> updateFamilyById(Long id, Family familyDetails) {
        return familyRepository.findById(id).map(family -> {
            family.setLastName(familyDetails.getLastName());
            return familyRepository.save(family);
        });
    }

    public void deleteFamilyById(Long id) {
        familyRepository.deleteById(id);
    }
}
