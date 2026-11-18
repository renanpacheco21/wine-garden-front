package br.com.wine_garden.backend.wine.controller;

import br.com.wine_garden.backend.wine.dto.WineRequestDTO;
import br.com.wine_garden.backend.wine.dto.WineResponseDTO;
import br.com.wine_garden.backend.wine.service.WineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vinhos")
@RequiredArgsConstructor
public class WineController {

    private final WineService service;

    @PostMapping
    public ResponseEntity<WineResponseDTO> save(
            @Valid @RequestBody WineRequestDTO dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.save(dto));
    }

    @GetMapping
    public ResponseEntity<List<WineResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WineResponseDTO> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WineResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody WineRequestDTO dto) {

        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
