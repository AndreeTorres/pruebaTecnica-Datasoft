package com.datasoft.backendds.service;

import com.datasoft.backendds.dto.BookRequest;
import com.datasoft.backendds.dto.BookResponse;
import com.datasoft.backendds.exception.ResourceNotFoundException;
import com.datasoft.backendds.model.Book;
import com.datasoft.backendds.model.Genre;
import com.datasoft.backendds.repository.BookRepository;
import com.datasoft.backendds.repository.GenreRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final GenreRepository genreRepository;

    @Transactional(readOnly = true)
    public List<BookResponse> findAll(Long genreId) {
        List<Book> books = genreId == null
                ? bookRepository.findAll()
                : bookRepository.findByGenreId(genreId);

        return books.stream()
                .map(BookResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public BookResponse findById(Long id) {
        return BookResponse.fromEntity(findBookById(id));
    }

    @Transactional
    public BookResponse update(Long id, BookRequest request) {
        Book book = findBookById(id);
        Genre genre = genreRepository.findById(request.genreId())
                .orElseThrow(() -> new ResourceNotFoundException("Genero no encontrado con id: " + request.genreId()));

        book.setTitle(request.title());
        book.setAuthor(request.author());
        book.setIsbn(request.isbn());
        book.setDescription(request.description());
        book.setPublishedYear(request.publishedYear());
        book.setPrice(request.price());
        book.setGenre(genre);

        return BookResponse.fromEntity(bookRepository.save(book));
    }

    private Book findBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Libro no encontrado con id: " + id));
    }
}
