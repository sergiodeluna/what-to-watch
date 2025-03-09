package com.whattowatch.controller;

import com.whattowatch.model.VisualMedia;
import com.whattowatch.service.VisualMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/visual-media")
public class VisualMediaController {
    @Autowired
    private VisualMediaService service;

    @GetMapping
    public List<VisualMedia> getAllVisualMedia() { return service.getAllVisualMedia(); }

    @PostMapping
    public VisualMedia addVisualMedia(@RequestBody VisualMedia visualMedia) { return service.saveVisualMedia(visualMedia); }

    @DeleteMapping("/{id}")
    public void deleteVisualMedia(@PathVariable Long id) { service.deleteVisualMedia(id); }

    @PutMapping("/{id}")
    public VisualMedia updateVisualMedia(@PathVariable Long id, @RequestBody VisualMedia visualMediaDetails) {
        return service.updateVisualMedia(id, visualMediaDetails);
    }
}