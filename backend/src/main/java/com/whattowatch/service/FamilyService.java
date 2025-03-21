package com.whattowatch.service;

import com.whattowatch.model.Family;
import com.whattowatch.model.User;
import com.whattowatch.repository.FamilyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
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
        return familyRepository.findWithUsersById(id);
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
        familyRepository.findById(id).ifPresent(family -> {
            Set<User> users = new HashSet<>(family.getUsers());
            users.forEach(user -> user.getFamilies().remove(family));
            family.getUsers().clear();

            userService.saveAll(users);
            familyRepository.delete(family);
        });
    }

    public Optional<Family> addUsersToFamily(Long familyId, List<Long> userIds) {
        return familyRepository.findById(familyId).map(family -> {
            Set<User> usersToAdd = fetchUsersByIds(userIds);
            addUsersToFamily(family, usersToAdd);
            return familyRepository.save(family);
        });
    }

    private Set<User> fetchUsersByIds(List<Long> userIds) {
        return userIds.stream()
                .map(userService::findUserById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
    }

    private void addUsersToFamily(Family family, Set<User> usersToAdd) {
        family.getUsers().addAll(usersToAdd);
        usersToAdd.forEach(user -> user.getFamilies().add(family));
    }

    public Optional<Family> removeUsersFromFamily(Long familyId, List<Long> userIds) {
        return familyRepository.findById(familyId).map(family -> {
            Set<User> usersToRemove = fetchUsersByIds(userIds);
            removeUsersFromFamily(family, usersToRemove);
            return familyRepository.save(family);
        });
    }

    private void removeUsersFromFamily(Family family, Set<User> usersToRemove) {
        family.getUsers().removeAll(usersToRemove);
        usersToRemove.forEach(user -> user.getFamilies().remove(family));
    }
}
