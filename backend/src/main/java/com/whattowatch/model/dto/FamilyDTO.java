package com.whattowatch.model.dto;

import java.util.List;

public record FamilyDTO(
        String lastName,
        List<Long> userIds
) {}

