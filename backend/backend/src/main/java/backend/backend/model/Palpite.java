package backend.backend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "palpites",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"participante_id", "partida_id"},
        name = "uk_palpite_participante_partida"
    )
)
public class Palpite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "participante_id", nullable = false)
    private Participante participante;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "partida_id", nullable = false)
    private Partida partida;

    @NotNull
    @Min(0)
    @Column(name = "palpite_gols_casa", nullable = false)
    private Integer palpiteGolsCasa;

    @NotNull
    @Min(0)
    @Column(name = "palpite_gols_fora", nullable = false)
    private Integer palpiteGolsFora;

    /**
     * Pontuacao calculada apos encerramento:
     *   3 = acertou placar exato
     *   1 = acertou gols do Flamengo
     *   0 = nao acertou nada
     */
    @Column(nullable = false)
    private int pontos = 0;

    @Column(name = "criado_em", nullable = false, updatable = false)
    private LocalDateTime criadoEm = LocalDateTime.now();

    @Column(name = "calculado_em")
    private LocalDateTime calculadoEm;

    public Palpite() {}

    public Palpite(Participante participante, Partida partida, Integer palpiteGolsCasa, Integer palpiteGolsFora) {
        this.participante = participante;
        this.partida = partida;
        this.palpiteGolsCasa = palpiteGolsCasa;
        this.palpiteGolsFora = palpiteGolsFora;
    }

    public Integer getPalpiteGolsFlamengo() {
        if ("Flamengo".equalsIgnoreCase(partida.getTimeCasa())) return palpiteGolsCasa;
        return palpiteGolsFora;
    }

    public Integer getPalpiteGolsAdversario() {
        if ("Flamengo".equalsIgnoreCase(partida.getTimeCasa())) return palpiteGolsFora;
        return palpiteGolsCasa;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Participante getParticipante() { return participante; }
    public void setParticipante(Participante participante) { this.participante = participante; }
    public Partida getPartida() { return partida; }
    public void setPartida(Partida partida) { this.partida = partida; }
    public Integer getPalpiteGolsCasa() { return palpiteGolsCasa; }
    public void setPalpiteGolsCasa(Integer v) { this.palpiteGolsCasa = v; }
    public Integer getPalpiteGolsFora() { return palpiteGolsFora; }
    public void setPalpiteGolsFora(Integer v) { this.palpiteGolsFora = v; }
    public int getPontos() { return pontos; }
    public void setPontos(int pontos) { this.pontos = pontos; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime v) { this.criadoEm = v; }
    public LocalDateTime getCalculadoEm() { return calculadoEm; }
    public void setCalculadoEm(LocalDateTime v) { this.calculadoEm = v; }
}
