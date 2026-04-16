package com.datasoft.backendds.controller;

import com.datasoft.backendds.dto.GenreResponse;
import com.datasoft.backendds.service.GenreService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<List<GenreResponse>> findAll() {
        return ResponseEntity.ok(genreService.findAll());
    }
}
