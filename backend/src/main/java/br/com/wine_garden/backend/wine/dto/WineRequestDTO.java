package br.com.wine_garden.backend.wine.dto;

import br.com.wine_garden.backend.wine.enums.WineCollors;
import br.com.wine_garden.backend.wine.enums.WineSweetness;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Builder(setterPrefix = "with")
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class WineRequestDTO {

    @NotBlank
    private String nome;

    @NotBlank
    private String vinicola;

    @NotBlank
    private String regiao;

    @NotBlank
    private String pais;

    @NotNull
    private WineCollors cor;

    @NotNull
    private WineSweetness docura;

    @NotBlank
    private String uvas;

    private Integer safra;

    @NotNull
    private boolean favorito;

    @NotNull
    private boolean custoBeneficio;

    @Size(max = 100)
    private String imagemUrl;

}