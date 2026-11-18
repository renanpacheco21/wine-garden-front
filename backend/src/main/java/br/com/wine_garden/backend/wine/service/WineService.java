
package br.com.wine_garden.backend.wine.service;

import br.com.wine_garden.backend.wine.dto.WineRequestDTO;
import br.com.wine_garden.backend.wine.dto.WineResponseDTO;
import br.com.wine_garden.backend.wine.model.Wine;
import br.com.wine_garden.backend.wine.repository.WineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WineService {

    private final WineRepository repository;

    public WineResponseDTO save(WineRequestDTO dto) {

        Wine wine = Wine.builder()
                .nome(dto.getNome())
                .vinicola(dto.getVinicola())
                .regiao(dto.getRegiao())
                .pais(dto.getPais())
                .cor(dto.getCor())
                .docura(dto.getDocura())
                .uvas(dto.getUvas())
                .safra(dto.getSafra())
                .favorito(dto.isFavorito())
                .custoBeneficio(dto.isCustoBeneficio())
                .imagemUrl(dto.getImagemUrl())
                .build();

        Wine saved = repository.save(wine);

        return toResponseDTO(saved);
    }

    public List<WineResponseDTO> getAll() {

        return repository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public WineResponseDTO getById(Long id) {

        Wine wine = findWineById(id);

        return toResponseDTO(wine);
    }

    public WineResponseDTO update(Long id, WineRequestDTO dto) {

        Wine actual = findWineById(id);

        actual.setNome(dto.getNome());
        actual.setVinicola(dto.getVinicola());
        actual.setRegiao(dto.getRegiao());
        actual.setPais(dto.getPais());
        actual.setCor(dto.getCor());
        actual.setDocura(dto.getDocura());
        actual.setUvas(dto.getUvas());
        actual.setSafra(dto.getSafra());
        actual.setFavorito(dto.isFavorito());
        actual.setCustoBeneficio(dto.isCustoBeneficio());
        actual.setImagemUrl(dto.getImagemUrl());

        Wine updated = repository.save(actual);

        return toResponseDTO(updated);
    }

    public void delete(Long id) {

        Wine wine = findWineById(id);

        repository.delete(wine);
    }

    private Wine findWineById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Registro do vinho não encontrado"));
    }

    private WineResponseDTO toResponseDTO(Wine wine) {

        return WineResponseDTO.builder()
                .withId(wine.getId())
                .withNome(wine.getNome())
                .withVinicola(wine.getVinicola())
                .withRegiao(wine.getRegiao())
                .withPais(wine.getPais())
                .withCor(wine.getCor())
                .withDocura(wine.getDocura())
                .withUvas(wine.getUvas())
                .withSafra(wine.getSafra())
                .withFavorito(wine.isFavorito())
                .withCustoBeneficio(wine.isCustoBeneficio())
                .withImagemUrl(wine.getImagemUrl())
                .build();
    }
}
