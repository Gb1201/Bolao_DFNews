package backend.backend.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import backend.backend.enums.StatusPartida;

public class PartidaResponseDTO {
    private Long id;
    private String timeCasa;
    private String timeFora;
    private String nomeExibicao;
    private LocalDate data;
    private LocalTime horario;
    private String estadio;
    private Integer golsTimeCasa;
    private Integer golsTimeFora;
    private StatusPartida status;

    public PartidaResponseDTO() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTimeCasa() { return timeCasa; }
    public void setTimeCasa(String timeCasa) { this.timeCasa = timeCasa; }
    public String getTimeFora() { return timeFora; }
    public void setTimeFora(String timeFora) { this.timeFora = timeFora; }
    public String getNomeExibicao() { return nomeExibicao; }
    public void setNomeExibicao(String nomeExibicao) { this.nomeExibicao = nomeExibicao; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public LocalTime getHorario() { return horario; }
    public void setHorario(LocalTime horario) { this.horario = horario; }
    public String getEstadio() { return estadio; }
    public void setEstadio(String estadio) { this.estadio = estadio; }
    public Integer getGolsTimeCasa() { return golsTimeCasa; }
    public void setGolsTimeCasa(Integer golsTimeCasa) { this.golsTimeCasa = golsTimeCasa; }
    public Integer getGolsTimeFora() { return golsTimeFora; }
    public void setGolsTimeFora(Integer golsTimeFora) { this.golsTimeFora = golsTimeFora; }
    public StatusPartida getStatus() { return status; }
    public void setStatus(StatusPartida status) { this.status = status; }
}
