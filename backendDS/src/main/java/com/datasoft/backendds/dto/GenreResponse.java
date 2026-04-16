package com.datasoft.backendds.dto;

import com.datasoft.backendds.model.Genre;

public record GenreResponse(
        Long id,
        String name,
        String description
) {

    public static GenreResponse fromEntity(Genre genre) {
        return new GenreResponse(genre.getId(), genre.getName(), genre.getDescription());
    }
}
