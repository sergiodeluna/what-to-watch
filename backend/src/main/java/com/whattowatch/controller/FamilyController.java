package com.whattowatch.controller;

import com.whattowatch.model.dto.FamilyDTO;
import com.whattowatch.model.Family;
import com.whattowatch.service.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/family")
public class FamilyController {
    @Autowired
    private FamilyService service;

    @GetMapping
    public List<Family> getAllFamilies() { return service.getAllFamilies(); }

    @PostMapping
    public Family addFamily(@RequestBody FamilyDTO familyDTO) { return service.saveFamily(familyDTO); }

    @DeleteMapping("/{id}")
    public void deleteFamily(@PathVariable Long id) { service.deleteFamily(id); }

    @PutMapping("/{id}")
    public Family updateFamily(@PathVariable Long id, @RequestBody FamilyDTO familyDTODetails) {
        return service.updateFamily(id, familyDTODetails);
    }
}
