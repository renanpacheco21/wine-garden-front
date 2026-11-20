package br.com.wine_garden.backend.wine.dto;

import br.com.wine_garden.backend.wine.enums.WineCollors;
import br.com.wine_garden.backend.wine.enums.WineSweetness;
import lombok.*;

@Getter
@ToString
@AllArgsConstructor
@Builder(setterPrefix = "with")
public class WineResponseDTO {

    private Long id;
    private String nome;
    private String vinicola;
    private String regiao;
    private String pais;
    private WineCollors cor;
    private WineSweetness docura;
    private String uvas;
    private String safra;
    private boolean favorito;
    private boolean custoBeneficio;
    private String imagemUrl;

}