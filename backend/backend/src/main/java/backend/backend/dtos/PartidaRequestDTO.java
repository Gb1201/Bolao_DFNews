package backend.backend.dtos;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

public class PartidaRequestDTO {

    /** "Casa" = Flamengo x Adversario | "Fora" = Adversario x Flamengo */
    @NotBlank(message = "Tipo e obrigatorio")
    private String tipo;

    @NotBlank(message = "Adversario e obrigatorio")
    @Size(min = 2, max = 100)
    private String adversario;

    @NotNull(message = "Data e obrigatoria")
    private LocalDate data;

    @NotNull(message = "Horario e obrigatorio")
    private LocalTime horario;

    @Size(max = 150)
    private String estadio;

    public PartidaRequestDTO() {}
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getAdversario() { return adversario; }
    public void setAdversario(String adversario) { this.adversario = adversario; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public LocalTime getHorario() { return horario; }
    public void setHorario(LocalTime horario) { this.horario = horario; }
    public String getEstadio() { return estadio; }
    public void setEstadio(String estadio) { this.estadio = estadio; }
}
