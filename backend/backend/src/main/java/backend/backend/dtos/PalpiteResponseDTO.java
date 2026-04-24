package backend.backend.dtos;


import java.time.LocalDateTime;

public class PalpiteResponseDTO {
    private Long id;
    private Long participanteId;
    private String participanteNome;
    private Long partidaId;
    private String partidaNome;
    private Integer palpiteGolsCasa;
    private Integer palpiteGolsFora;
    private Integer palpiteGolsFlamengo;
    private Integer palpiteGolsAdversario;
    private int pontos;
    private LocalDateTime criadoEm;
    private LocalDateTime calculadoEm;

    public PalpiteResponseDTO() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getParticipanteId() { return participanteId; }
    public void setParticipanteId(Long v) { this.participanteId = v; }
    public String getParticipanteNome() { return participanteNome; }
    public void setParticipanteNome(String v) { this.participanteNome = v; }
    public Long getPartidaId() { return partidaId; }
    public void setPartidaId(Long v) { this.partidaId = v; }
    public String getPartidaNome() { return partidaNome; }
    public void setPartidaNome(String v) { this.partidaNome = v; }
    public Integer getPalpiteGolsCasa() { return palpiteGolsCasa; }
    public void setPalpiteGolsCasa(Integer v) { this.palpiteGolsCasa = v; }
    public Integer getPalpiteGolsFora() { return palpiteGolsFora; }
    public void setPalpiteGolsFora(Integer v) { this.palpiteGolsFora = v; }
    public Integer getPalpiteGolsFlamengo() { return palpiteGolsFlamengo; }
    public void setPalpiteGolsFlamengo(Integer v) { this.palpiteGolsFlamengo = v; }
    public Integer getPalpiteGolsAdversario() { return palpiteGolsAdversario; }
    public void setPalpiteGolsAdversario(Integer v) { this.palpiteGolsAdversario = v; }
    public int getPontos() { return pontos; }
    public void setPontos(int pontos) { this.pontos = pontos; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
    public void setCriadoEm(LocalDateTime v) { this.criadoEm = v; }
    public LocalDateTime getCalculadoEm() { return calculadoEm; }
    public void setCalculadoEm(LocalDateTime v) { this.calculadoEm = v; }
}
