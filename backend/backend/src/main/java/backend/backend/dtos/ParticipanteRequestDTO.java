package backend.backend.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ParticipanteRequestDTO {

    @NotBlank(message = "Nome e obrigatorio")
    @Size(min = 2, max = 100)
    private String nome;

    @NotBlank(message = "Sobrenome e obrigatorio")
    @Size(min = 2, max = 100)
    private String sobrenome;

    @NotBlank(message = "Telefone e obrigatorio")
    @Pattern(regexp = "^\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}$", message = "Telefone invalido. Use (00) 00000-0000")
    private String telefone;

    public ParticipanteRequestDTO() {}
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
}