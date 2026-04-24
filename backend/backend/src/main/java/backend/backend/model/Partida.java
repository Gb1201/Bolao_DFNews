package backend.backend.model;



import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import backend.backend.enums.StatusPartida;

@Entity
@Table(name = "partidas")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Time de casa e obrigatorio")
    @Size(max = 100)
    @Column(name = "time_casa", nullable = false, length = 100)
    private String timeCasa;

    @NotBlank(message = "Time de fora e obrigatorio")
    @Size(max = 100)
    @Column(name = "time_fora", nullable = false, length = 100)
    private String timeFora;

    @NotNull(message = "Data e obrigatoria")
    @Column(nullable = false)
    private LocalDate data;

    @NotNull(message = "Horario e obrigatorio")
    @Column(nullable = false)
    private LocalTime horario;

    @Size(max = 150)
    @Column(length = 150)
    private String estadio;

    @Column(name = "gols_time_casa")
    private Integer golsTimeCasa;

    @Column(name = "gols_time_fora")
    private Integer golsTimeFora;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusPartida status = StatusPartida.AGENDADA;

    @OneToMany(mappedBy = "partida", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Palpite> palpites = new ArrayList<>();

    public Partida() {}

    public Partida(String timeCasa, String timeFora, LocalDate data, LocalTime horario, String estadio) {
        this.timeCasa = timeCasa;
        this.timeFora = timeFora;
        this.data = data;
        this.horario = horario;
        this.estadio = estadio;
    }

    public boolean isEncerrada() { return this.status == StatusPartida.ENCERRADA; }
    public boolean isAtiva() { return this.status == StatusPartida.ATIVA; }
    public boolean temResultado() { return golsTimeCasa != null && golsTimeFora != null; }

    public String getAdversario() {
        if ("Flamengo".equalsIgnoreCase(timeCasa)) return timeFora;
        return timeCasa;
    }

    public Integer getGolsFlamengo() {
        if (!temResultado()) return null;
        return "Flamengo".equalsIgnoreCase(timeCasa) ? golsTimeCasa : golsTimeFora;
    }

    public Integer getGolsAdversario() {
        if (!temResultado()) return null;
        return "Flamengo".equalsIgnoreCase(timeCasa) ? golsTimeFora : golsTimeCasa;
    }

    public String getNomeExibicao() { return timeCasa + " x " + timeFora; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTimeCasa() { return timeCasa; }
    public void setTimeCasa(String timeCasa) { this.timeCasa = timeCasa; }
    public String getTimeFora() { return timeFora; }
    public void setTimeFora(String timeFora) { this.timeFora = timeFora; }
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
    public List<Palpite> getPalpites() { return palpites; }
    public void setPalpites(List<Palpite> palpites) { this.palpites = palpites; }
}
