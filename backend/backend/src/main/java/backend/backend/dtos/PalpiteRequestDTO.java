package backend.backend.dtos;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PalpiteRequestDTO {

    @NotNull(message = "ID do participante e obrigatorio")
    private Long participanteId;

    @NotNull(message = "ID da partida e obrigatorio")
    private Long partidaId;

    @NotNull(message = "Palpite de gols do time de casa e obrigatorio")
    @Min(value = 0, message = "Gols nao pode ser negativo")
    private Integer palpiteGolsCasa;

    @NotNull(message = "Palpite de gols do time de fora e obrigatorio")
    @Min(value = 0, message = "Gols nao pode ser negativo")
    private Integer palpiteGolsFora;

    public PalpiteRequestDTO() {}
    public Long getParticipanteId() { return participanteId; }
    public void setParticipanteId(Long v) { this.participanteId = v; }
    public Long getPartidaId() { return partidaId; }
    public void setPartidaId(Long v) { this.partidaId = v; }
    public Integer getPalpiteGolsCasa() { return palpiteGolsCasa; }
    public void setPalpiteGolsCasa(Integer v) { this.palpiteGolsCasa = v; }
    public Integer getPalpiteGolsFora() { return palpiteGolsFora; }
    public void setPalpiteGolsFora(Integer v) { this.palpiteGolsFora = v; }
}
