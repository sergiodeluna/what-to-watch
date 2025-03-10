package com.whattowatch.service;

import com.whattowatch.model.dto.FamilyDTO;
import com.whattowatch.model.Family;
import com.whattowatch.model.User;
import com.whattowatch.repository.FamilyRepository;
import com.whattowatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FamilyService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FamilyRepository repository;

    public List<Family> getAllFamilies() { return repository.findAll(); }

    public Family saveFamily(FamilyDTO familyDTO) {
        Family family = new Family();
        family.setLastName(familyDTO.lastName());

        List<Long> userIds = familyDTO.userIds();
        List<User> users = userRepository.findAllById(userIds);
        family.setUsers(users);

        return repository.save(family);
    }


    public void deleteFamily(Long id) { repository.deleteById(id); }

    public Family updateFamily(Long id, FamilyDTO familyDTODetails) {
        Family family = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Family not found"));

        family.setLastName(familyDTODetails.lastName());

        List<Long> userIds = familyDTODetails.userIds();
        List<User> users = userRepository.findAllById(userIds);
        family.setUsers(users);

        return repository.save(family);
    }

}
