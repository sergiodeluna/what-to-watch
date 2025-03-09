package com.whattowatch.service;

import com.whattowatch.model.VisualMedia;
import com.whattowatch.repository.VisualMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisualMediaService {

    @Autowired
    private VisualMediaRepository repository;

    public List<VisualMedia> getAllVisualMedia() { return repository.findAll(); }

    public VisualMedia saveVisualMedia(VisualMedia visualMedia) { return repository.save(visualMedia); }

    public void deleteVisualMedia(Long id) { repository.deleteById(id); }

    public VisualMedia updateVisualMedia(Long id, VisualMedia visualMediaDetails) {
        return repository.findById(id)
                .map(visualMedia -> {
                    visualMedia.setTitle(visualMediaDetails.getTitle());
                    visualMedia.setStar(visualMediaDetails.getStar());
                    visualMedia.setRecommendedBy(visualMediaDetails.getRecommendedBy());
                    return repository.save(visualMedia);
                })
                .orElseThrow(() -> new RuntimeException("VisualMedia not found"));
    }
}