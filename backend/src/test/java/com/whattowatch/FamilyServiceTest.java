package com.whattowatch;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.whattowatch.model.Family;
import com.whattowatch.repository.FamilyRepository;
import com.whattowatch.service.FamilyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

class FamilyServiceTest {

    @Mock
    private FamilyRepository familyRepository;

    @InjectMocks
    private FamilyService familyService;

    private Family family;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        family = Family.builder()
                .id(1L)
                .lastName("Smith")
                .build();
    }

    @Test
    void testFindAllFamilies() {
        List<Family> families = new ArrayList<>();
        families.add(family);
        when(familyRepository.findAll()).thenReturn(families);

        List<Family> result = familyService.findAllFamilies();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Smith", result.getFirst().getLastName());
    }

    @Test
    void testFindFamilyById() {
        when(familyRepository.findById(1L)).thenReturn(Optional.of(family));

        Optional<Family> result = familyService.findFamilyById(1L);

        assertTrue(result.isPresent());
        assertEquals("Smith", result.get().getLastName());
    }

    @Test
    void testSaveFamily() {
        when(familyRepository.save(family)).thenReturn(family);

        Family result = familyService.saveFamily(family);

        assertNotNull(result);
        assertEquals("Smith", result.getLastName());
    }

    @Test
    void testDeleteFamilyById() {
        doNothing().when(familyRepository).deleteById(1L);

        familyService.deleteFamilyById(1L);

        verify(familyRepository, times(1)).deleteById(1L);
    }
}
