package com.datasoft.backendds.dto;

import com.datasoft.backendds.model.Book;

public record BookResponse(
        Long id,
        String title,
        String author,
        String isbn,
        String description,
        Integer publishedYear,
        Double price,
        GenreResponse genre
) {

    public static BookResponse fromEntity(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getDescription(),
                book.getPublishedYear(),
                book.getPrice(),
                GenreResponse.fromEntity(book.getGenre())
        );
    }
}
