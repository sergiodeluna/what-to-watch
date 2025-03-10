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
    void testDeleteVisualMedia() {
        doNothing().when(visualMediaRepository).deleteById(1L);

        visualMediaService.deleteVisualMedia(1L);

        verify(visualMediaRepository, times(1)).deleteById(1L);
    }

    @Test
    void testUpdateVisualMedia() {
        VisualMedia updatedVisualMedia = new VisualMedia(1L, "Inception Updated", 4, "Jane Doe");
        when(visualMediaRepository.findById(1L)).thenReturn(Optional.of(visualMedia));
        when(visualMediaRepository.save(any(VisualMedia.class))).thenReturn(updatedVisualMedia);

        VisualMedia result = visualMediaService.updateVisualMedia(1L, updatedVisualMedia);

        assertNotNull(result);
        assertEquals("Inception Updated", result.getTitle());
        assertEquals(4, result.getStar());
        assertEquals("Jane Doe", result.getRecommendedBy());
    }

    @Test
    void testUpdateVisualMediaNotFound() {
        VisualMedia updatedVisualMedia = new VisualMedia(1L, "Inception Updated", 4, "Jane Doe");
        when(visualMediaRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> visualMediaService.updateVisualMedia(1L, updatedVisualMedia));
    }
}
