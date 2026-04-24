package backend.backend.dtos;



public class ClassificacaoResponseDTO {
    private int posicao;
    private Long participanteId;
    private String nomeCompleto;
    private long totalJogos;
    private long totalVitorias;
    private long totalEmpates;
    private long totalDerrotas;
    private int totalPontos;
    private int taxaVitoria;

    public ClassificacaoResponseDTO() {}
    public int getPosicao() { return posicao; }
    public void setPosicao(int posicao) { this.posicao = posicao; }
    public Long getParticipanteId() { return participanteId; }
    public void setParticipanteId(Long participanteId) { this.participanteId = participanteId; }
    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }
    public long getTotalJogos() { return totalJogos; }
    public void setTotalJogos(long totalJogos) { this.totalJogos = totalJogos; }
    public long getTotalVitorias() { return totalVitorias; }
    public void setTotalVitorias(long totalVitorias) { this.totalVitorias = totalVitorias; }
    public long getTotalEmpates() { return totalEmpates; }
    public void setTotalEmpates(long totalEmpates) { this.totalEmpates = totalEmpates; }
    public long getTotalDerrotas() { return totalDerrotas; }
    public void setTotalDerrotas(long totalDerrotas) { this.totalDerrotas = totalDerrotas; }
    public int getTotalPontos() { return totalPontos; }
    public void setTotalPontos(int totalPontos) { this.totalPontos = totalPontos; }
    public int getTaxaVitoria() { return taxaVitoria; }
    public void setTaxaVitoria(int taxaVitoria) { this.taxaVitoria = taxaVitoria; }
}