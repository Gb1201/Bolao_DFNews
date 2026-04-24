package backend.backend.service;


import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.backend.dtos.PartidaRequestDTO;
import backend.backend.dtos.PartidaResponseDTO;
import backend.backend.dtos.ResultadoRequestDTO;
import backend.backend.enums.StatusPartida;
import backend.backend.exception.BusinessException;
import backend.backend.exception.ResourceNotFoundException;
import backend.backend.interfaces.PalpiteService;
import backend.backend.interfaces.PartidaService;
import backend.backend.model.Partida;
import backend.backend.repository.PartidaRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PartidaServiceImpl implements PartidaService {

    private final PartidaRepository partidaRepository;
    private final PalpiteService palpiteService;

    // @Lazy evita dependencia circular entre PartidaService e PalpiteService
    public PartidaServiceImpl(PartidaRepository partidaRepository,
                              @Lazy PalpiteService palpiteService) {
        this.partidaRepository = partidaRepository;
        this.palpiteService = palpiteService;
    }

    @Override
    public PartidaResponseDTO cadastrar(PartidaRequestDTO dto) {
        Partida partida = new Partida();
        preencherPartida(partida, dto);
        return toResponseDTO(partidaRepository.save(partida));
    }

    @Override
    @Transactional(readOnly = true)
    public PartidaResponseDTO buscarPorId(Long id) {
        return toResponseDTO(findOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PartidaResponseDTO> listarTodas() {
        return partidaRepository.findAllByOrderByDataAscHorarioAsc()
                .stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PartidaResponseDTO> listarDisponiveis() {
        return partidaRepository.findPartidasDisponiveis()
                .stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    /**
     * Ativa o bolao para uma partida. Apenas uma pode estar ATIVA por vez.
     * A partida anterior volta para AGENDADA automaticamente.
     */
    @Override
    public PartidaResponseDTO ativar(Long id) {
        partidaRepository.findByStatus(StatusPartida.ATIVA).ifPresent(ativa -> {
            ativa.setStatus(StatusPartida.AGENDADA);
            partidaRepository.save(ativa);
        });

        Partida partida = findOrThrow(id);

        if (partida.isEncerrada()) {
            throw new BusinessException("Nao e possivel ativar uma partida ja encerrada.");
        }
        partida.setStatus(StatusPartida.ATIVA);
        return toResponseDTO(partidaRepository.save(partida));
    }

    /**
     * Cancela o bolao ativo sem encerrar a partida (volta para AGENDADA).
     */
    @Override
    public PartidaResponseDTO cancelarAtivo() {
        Partida ativa = partidaRepository.findByStatus(StatusPartida.ATIVA)
                .orElseThrow(() -> new BusinessException("Nenhum bolao esta ativo no momento."));
        ativa.setStatus(StatusPartida.AGENDADA);
        return toResponseDTO(partidaRepository.save(ativa));
    }

    /**
     * Registra o placar real, encerra a partida e dispara o calculo de pontuacoes.
     *
     * Regras de pontuacao (aplicadas em PalpiteServiceImpl):
     *   3 pontos -> acertou o placar exato
     *   1 ponto  -> acertou apenas os gols do Flamengo
     *   0 pontos -> nao acertou nenhum criterio
     */
    @Override
    public PartidaResponseDTO registrarResultadoEEncerrar(Long id, ResultadoRequestDTO dto) {
        Partida partida = findOrThrow(id);

        if (partida.isEncerrada()) {
            throw new BusinessException("Esta partida ja foi encerrada.");
        }

        partida.setGolsTimeCasa(dto.getGolsTimeCasa());
        partida.setGolsTimeFora(dto.getGolsTimeFora());
        partida.setStatus(StatusPartida.ENCERRADA);
        Partida salva = partidaRepository.save(partida);

        palpiteService.calcularPontuacoes(salva.getId());

        return toResponseDTO(salva);
    }

    private Partida findOrThrow(Long id) {
        return partidaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Partida", id));
    }

    private void preencherPartida(Partida partida, PartidaRequestDTO dto) {
        boolean emCasa = "Casa".equalsIgnoreCase(dto.getTipo());
        partida.setTimeCasa(emCasa ? "Flamengo" : dto.getAdversario());
        partida.setTimeFora(emCasa ? dto.getAdversario() : "Flamengo");
        partida.setData(dto.getData());
        partida.setHorario(dto.getHorario());
        partida.setEstadio(dto.getEstadio());
    }

    private PartidaResponseDTO toResponseDTO(Partida p) {
        PartidaResponseDTO dto = new PartidaResponseDTO();
        dto.setId(p.getId());
        dto.setTimeCasa(p.getTimeCasa());
        dto.setTimeFora(p.getTimeFora());
        dto.setNomeExibicao(p.getNomeExibicao());
        dto.setData(p.getData());
        dto.setHorario(p.getHorario());
        dto.setEstadio(p.getEstadio());
        dto.setGolsTimeCasa(p.getGolsTimeCasa());
        dto.setGolsTimeFora(p.getGolsTimeFora());
        dto.setStatus(p.getStatus());
        return dto;
    }
}
