package backend.backend.dtos;


public class ParticipanteResponseDTO {
    private Long id;
    private String nome;
    private String sobrenome;
    private String nomeCompleto;
    private String telefone;
    private boolean ativo;
    private int totalPontos;
    private long totalJogos;
    private long totalVitorias;
    private long totalEmpates;
    private long totalDerrotas;

    public ParticipanteResponseDTO() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getSobrenome() { return sobrenome; }
    public void setSobrenome(String sobrenome) { this.sobrenome = sobrenome; }
    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
    public int getTotalPontos() { return totalPontos; }
    public void setTotalPontos(int totalPontos) { this.totalPontos = totalPontos; }
    public long getTotalJogos() { return totalJogos; }
    public void setTotalJogos(long totalJogos) { this.totalJogos = totalJogos; }
    public long getTotalVitorias() { return totalVitorias; }
    public void setTotalVitorias(long totalVitorias) { this.totalVitorias = totalVitorias; }
    public long getTotalEmpates() { return totalEmpates; }
    public void setTotalEmpates(long totalEmpates) { this.totalEmpates = totalEmpates; }
    public long getTotalDerrotas() { return totalDerrotas; }
    public void setTotalDerrotas(long totalDerrotas) { this.totalDerrotas = totalDerrotas; }
}
