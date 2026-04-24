package backend.backend.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "participantes")
public class Participante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome e obrigatorio")
    @Size(min = 2, max = 100)
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank(message = "Sobrenome e obrigatorio")
    @Size(min = 2, max = 100)
    @Column(nullable = false, length = 100)
    private String sobrenome;

    @NotBlank(message = "Telefone e obrigatorio")
    @Pattern(regexp = "^\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}$", message = "Telefone invalido. Use (00) 00000-0000")
    @Column(nullable = false, length = 20)
    private String telefone;

    @Column(nullable = false)
    private boolean ativo = true;

    @OneToMany(mappedBy = "participante", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Palpite> palpites = new ArrayList<>();

    public Participante() {}

    public Participante(String nome, String sobrenome, String telefone) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
    }

    public String getNomeCompleto() { return nome + " " + sobrenome; }

    public int getTotalPontos() {
        return palpites.stream().mapToInt(Palpite::getPontos).sum();
    }

    public long getTotalVitorias() {
        return palpites.stream().filter(p -> p.getPontos() == 3).count();
    }

    public long getTotalEmpates() {
        return palpites.stream().filter(p -> p.getPontos() == 1).count();
    }

    public long getTotalDerrotas() {
        return palpites.stream()
                .filter(p -> p.getPontos() == 0 && p.getPartida().isEncerrada()).count();
    }

    public long getTotalJogos() {
        return palpites.stream().filter(p -> p.getPartida().isEncerrada()).count();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
    public List<Palpite> getPalpites() { return palpites; }
    public void setPalpites(List<Palpite> palpites) { this.palpites = palpites; }
}
