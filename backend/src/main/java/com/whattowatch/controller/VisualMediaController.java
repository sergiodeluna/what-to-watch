package com.whattowatch.controller;

import com.whattowatch.model.VisualMedia;
import com.whattowatch.service.VisualMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/visual-media")
public class VisualMediaController {
    @Autowired
    private VisualMediaService visualMediaService;

    @GetMapping
    public List<VisualMedia> getAllVisualMedia() { return visualMediaService.findAllVisualMedia(); }

    @GetMapping("/{id}")
    public ResponseEntity<VisualMedia> getVisualMedialById(@PathVariable Long id) {
        return visualMediaService.findVisualMediaById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public VisualMedia addVisualMedia(@RequestBody VisualMedia visualMedia) { return visualMediaService.saveVisualMedia(visualMedia); }

    @DeleteMapping("/{id}")
    public void deleteVisualMedia(@PathVariable Long id) { visualMediaService.deleteVisualMedia(id); }

    @PutMapping("/{id}")
    public VisualMedia updateVisualMedia(@PathVariable Long id, @RequestBody VisualMedia visualMediaDetails) {
        return visualMediaService.updateVisualMedia(id, visualMediaDetails);
    }
}