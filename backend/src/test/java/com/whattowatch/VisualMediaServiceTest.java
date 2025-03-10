package com.whattowatch;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.whattowatch.model.VisualMedia;
import com.whattowatch.repository.VisualMediaRepository;
import com.whattowatch.service.VisualMediaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

class VisualMediaServiceTest {

    @Mock
    private VisualMediaRepository visualMediaRepository;

    @InjectMocks
    private VisualMediaService visualMediaService;

    private VisualMedia visualMedia;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        visualMedia = VisualMedia.builder()
                .id(1L)
                .title("Inception")
                .star(5)
                .recommendedBy("John Doe")
                .build();
    }

    @Test
    void testFindAllVisualMedia() {
        List<VisualMedia> visualMediaList = new ArrayList<>();
        visualMediaList.add(visualMedia);
        when(visualMediaRepository.findAll()).thenReturn(visualMediaList);

        List<VisualMedia> result = visualMediaService.findAllVisualMedia();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Inception", result.get(0).getTitle());
    }

    @Test
    void testFindVisualMediaById() {
        when(visualMediaRepository.findById(1L)).thenReturn(Optional.of(visualMedia));

        Optional<VisualMedia> result = visualMediaService.findVisualMediaById(1L);

        assertTrue(result.isPresent());
        assertEquals("Inception", result.get().getTitle());
    }

    @Test
    void testSaveVisualMedia() {
        when(visualMediaRepository.save(visualMedia)).thenReturn(visualMedia);

        VisualMedia result = visualMediaService.saveVisualMedia(visualMedia);

        assertNotNull(result);
        assertEquals("Inception", result.getTitle());
    }

    @Test
    void testUpdateVisualMedia() {
        VisualMedia updatedVisualMedia = VisualMedia.builder()
                .id(1L)
                .title("Matrix")
                .star(1)
                .recommendedBy("Neil")
                .build();

        when(visualMediaRepository.findById(1L)).thenReturn(Optional.of(visualMedia));
        when(visualMediaRepository.save(any(VisualMedia.class))).thenReturn(updatedVisualMedia);

        Optional<VisualMedia> result = visualMediaService.updateVisualMediaById(1L, updatedVisualMedia);

        assertTrue(result.isPresent());
        assertEquals("Matrix", result.get().getTitle());
        assertEquals(1, result.get().getStar());
        assertEquals("Neil", result.get().getRecommendedBy());
    }

    @Test
    void testDeleteVisualMedia() {
        doNothing().when(visualMediaRepository).deleteById(1L);

        visualMediaService.deleteVisualMedia(1L);

        verify(visualMediaRepository, times(1)).deleteById(1L);
    }
}
