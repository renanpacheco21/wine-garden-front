
package br.com.wine_garden.backend.wine.model;

import br.com.wine_garden.backend.wine.enums.WineCollors;
import br.com.wine_garden.backend.wine.enums.WineSweetness;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "wines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String nome;

    @Column(nullable = false, length = 50)
    private String vinicola;

    @Column(nullable = false, length = 50)
    private String regiao;

    @Column(nullable = false, length = 50)
    private String pais;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WineCollors cor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WineSweetness docura;

    @Column(nullable = false, length = 200)
    private String uvas;

    @Column(nullable = true, length = 4)
    private Integer safra;

    @Column(nullable = false)
    private boolean favorito;

    @Column(nullable = false)
    private boolean custoBeneficio;

    @Column(length = 500)
    private String imagemUrl;
}