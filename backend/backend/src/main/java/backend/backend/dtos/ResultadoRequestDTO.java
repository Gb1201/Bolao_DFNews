package backend.backend.dtos;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ResultadoRequestDTO {

    @NotNull(message = "Gols do time de casa sao obrigatorios")
    @Min(value = 0, message = "Gols nao pode ser negativo")
    private Integer golsTimeCasa;

    @NotNull(message = "Gols do time de fora sao obrigatorios")
    @Min(value = 0, message = "Gols nao pode ser negativo")
    private Integer golsTimeFora;

    public ResultadoRequestDTO() {}
    public ResultadoRequestDTO(Integer golsTimeCasa, Integer golsTimeFora) {
        this.golsTimeCasa = golsTimeCasa; this.golsTimeFora = golsTimeFora;
    }
    public Integer getGolsTimeCasa() { return golsTimeCasa; }
    public void setGolsTimeCasa(Integer v) { this.golsTimeCasa = v; }
    public Integer getGolsTimeFora() { return golsTimeFora; }
    public void setGolsTimeFora(Integer v) { this.golsTimeFora = v; }
}