package com.whattowatch.controller;

import com.whattowatch.model.Family;
import com.whattowatch.service.FamilyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/families")
@RequiredArgsConstructor
public class FamilyController {
    private final FamilyService familyService;

    @GetMapping
    public List<Family> getAllFamilies() {
        return familyService.findAllFamilies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Family> getFamilyById(@PathVariable Long id) {
        return familyService.findFamilyById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Family addFamily(@RequestBody Family family) {
        return familyService.saveFamily(family);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Family> updateFamilyById(@PathVariable Long id, @RequestBody Family familyDetails) {
        return familyService.updateFamilyById(id, familyDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id) {
        familyService.deleteFamilyById(id);
        return ResponseEntity.noContent().build();
    }
}
