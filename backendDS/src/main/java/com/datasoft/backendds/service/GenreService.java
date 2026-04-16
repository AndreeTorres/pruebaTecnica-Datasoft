package com.datasoft.backendds.service;

import com.datasoft.backendds.dto.GenreResponse;
import com.datasoft.backendds.repository.GenreRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GenreService {

    private final GenreRepository genreRepository;

    @Transactional(readOnly = true)
    public List<GenreResponse> findAll() {
        return genreRepository.findAll()
                .stream()
                .map(GenreResponse::fromEntity)
                .toList();
    }
}
