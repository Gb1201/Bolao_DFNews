package backend.backend.enums;


/**
 * AGENDADA  -> Partida cadastrada, aguardando ativacao. Palpites podem ser registrados.
 * ATIVA     -> Bolao ativo para esta partida.
 * ENCERRADA -> Resultado registrado e pontuacoes calculadas.
 * CANCELADA -> Partida cancelada.
 */
public enum StatusPartida {
    AGENDADA,
    ATIVA,
    ENCERRADA,
    CANCELADA
}