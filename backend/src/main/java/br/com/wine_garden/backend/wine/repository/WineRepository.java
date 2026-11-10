package br.com.wine_garden.backend.wine.repository;

import br.com.wine_garden.backend.wine.model.Wine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WineRepository extends JpaRepository<Wine, Long> {

}
