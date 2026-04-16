package com.datasoft.backendds.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record BookRequest(
        @NotBlank String title,
        @NotBlank String author,
        String isbn,
        String description,
        Integer publishedYear,
        @PositiveOrZero Double price,
        @NotNull Long genreId
) {
}
