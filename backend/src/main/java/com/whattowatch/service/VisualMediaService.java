package com.whattowatch.service;

import com.whattowatch.model.VisualMedia;
import com.whattowatch.repository.VisualMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisualMediaService {

    @Autowired
    private VisualMediaRepository visualMediaRepository;

    public List<VisualMedia> findAllVisualMedia() { return visualMediaRepository.findAll(); }

    public Optional<VisualMedia> findVisualMediaById(Long id) {
        return visualMediaRepository.findById(id);
    }

    public VisualMedia saveVisualMedia(VisualMedia visualMedia) { return visualMediaRepository.save(visualMedia); }

    public void deleteVisualMedia(Long id) { visualMediaRepository.deleteById(id); }

    public VisualMedia updateVisualMedia(Long id, VisualMedia visualMediaDetails) {
        return visualMediaRepository.findById(id)
                .map(visualMedia -> {
                    visualMedia.setTitle(visualMediaDetails.getTitle());
                    visualMedia.setStar(visualMediaDetails.getStar());
                    visualMedia.setRecommendedBy(visualMediaDetails.getRecommendedBy());
                    return visualMediaRepository.save(visualMedia);
                })
                .orElseThrow(() -> new RuntimeException("VisualMedia not found"));
    }
}