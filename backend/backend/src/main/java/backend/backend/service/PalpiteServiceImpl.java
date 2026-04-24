package backend.backend.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.backend.dtos.PalpiteRequestDTO;
import backend.backend.dtos.PalpiteResponseDTO;
import backend.backend.enums.StatusPartida;
import backend.backend.exception.BusinessException;
import backend.backend.exception.ResourceNotFoundException;
import backend.backend.interfaces.PalpiteService;
import backend.backend.model.Palpite;
import backend.backend.model.Participante;
import backend.backend.model.Partida;
import backend.backend.repository.PalpiteRepository;
import backend.backend.repository.ParticipanteRepository;
import backend.backend.repository.PartidaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PalpiteServiceImpl implements PalpiteService {

    private final PalpiteRepository palpiteRepository;
    private final PartidaRepository partidaRepository;
    private final ParticipanteRepository participanteRepository;

    public PalpiteServiceImpl(PalpiteRepository palpiteRepository,
                              PartidaRepository partidaRepository,
                              ParticipanteRepository participanteRepository) {
        this.palpiteRepository = palpiteRepository;
        this.partidaRepository = partidaRepository;
        this.participanteRepository = participanteRepository;
    }

    @Override
    public PalpiteResponseDTO registrar(PalpiteRequestDTO dto) {
        Participante participante = participanteRepository.findById(dto.getParticipanteId())
                .orElseThrow(() -> new ResourceNotFoundException("Participante", dto.getParticipanteId()));

        Partida partida = partidaRepository.findById(dto.getPartidaId())
                .orElseThrow(() -> new ResourceNotFoundException("Partida", dto.getPartidaId()));

        if (partida.getStatus() == StatusPartida.ENCERRADA) {
            throw new BusinessException("Nao e possivel registrar palpite em partida ja encerrada.");
        }
        if (partida.getStatus() == StatusPartida.CANCELADA) {
            throw new BusinessException("Nao e possivel registrar palpite em partida cancelada.");
        }
        if (palpiteRepository.existsByParticipanteAndPartida(participante, partida)) {
            throw new BusinessException(
                "Participante '" + participante.getNomeCompleto() + "' ja registrou palpite para esta partida."
            );
        }

        Palpite palpite = new Palpite(participante, partida, dto.getPalpiteGolsCasa(), dto.getPalpiteGolsFora());
        return toResponseDTO(palpiteRepository.save(palpite));
    }

    @Override
    @Transactional(readOnly = true)
    public PalpiteResponseDTO buscarPorId(Long id) {
        return toResponseDTO(palpiteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Palpite", id)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PalpiteResponseDTO> listarPorPartida(Long partidaId) {
        return palpiteRepository.findByPartidaIdComDetalhes(partidaId)
                .stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PalpiteResponseDTO> listarPorParticipante(Long participanteId) {
        return palpiteRepository.findByParticipanteIdComDetalhes(participanteId)
                .stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    /**
     * =========================================================================
     * REGRA DE NEGOCIO: CALCULO DE PONTUACAO
     * =========================================================================
     *
     * Exemplo: Palmeiras x Flamengo, resultado real 1x2
     *
     *   Palpite 1x2 (placar exato)            --> 3 pontos
     *   Palpite 0x2 (acertou gols do Flamengo) --> 1 ponto
     *   Palpite 1x1 (nao acertou nada)         --> 0 pontos
     *
     * O Flamengo e sempre o time de referencia para a regra do 1 ponto,
     * independentemente de ser mandante ou visitante.
     * =========================================================================
     */
    @Override
    public void calcularPontuacoes(Long partidaId) {
        Partida partida = partidaRepository.findById(partidaId)
                .orElseThrow(() -> new ResourceNotFoundException("Partida", partidaId));

        if (!partida.temResultado()) {
            throw new BusinessException("A partida ainda nao tem resultado registrado.");
        }

        int golsCasaReal = partida.getGolsTimeCasa();
        int golsForaReal = partida.getGolsTimeFora();
        int golsFlamengoReal = partida.getGolsFlamengo();

        List<Palpite> palpites = palpiteRepository.findByPartida(partida);

        for (Palpite palpite : palpites) {
            palpite.setPontos(calcularPontos(palpite, golsCasaReal, golsForaReal, golsFlamengoReal));
            palpite.setCalculadoEm(LocalDateTime.now());
        }

        palpiteRepository.saveAll(palpites);
    }

    /**
     * Logica central de calculo para um unico palpite.
     *
     * @param palpite          o palpite do participante
     * @param golsCasaReal     resultado real do time de casa
     * @param golsForaReal     resultado real do time de fora
     * @param golsFlamengoReal gols do Flamengo no resultado real
     * @return 3, 1 ou 0
     */
    private int calcularPontos(Palpite palpite, int golsCasaReal, int golsForaReal, int golsFlamengoReal) {
        // Verificacao 1: placar exato (3 pontos)
        boolean acertouPlacarExato =
                palpite.getPalpiteGolsCasa() == golsCasaReal &&
                palpite.getPalpiteGolsFora() == golsForaReal;

        if (acertouPlacarExato) {
            return 3;
        }

        // Verificacao 2: acertou os gols do Flamengo (1 ponto)
        boolean acertouGolsFlamengo =
                palpite.getPalpiteGolsFlamengo() != null &&
                palpite.getPalpiteGolsFlamengo() == golsFlamengoReal;

        if (acertouGolsFlamengo) {
            return 1;
        }

        return 0;
    }

    private PalpiteResponseDTO toResponseDTO(Palpite p) {
        PalpiteResponseDTO dto = new PalpiteResponseDTO();
        dto.setId(p.getId());
        dto.setParticipanteId(p.getParticipante().getId());
        dto.setParticipanteNome(p.getParticipante().getNomeCompleto());
        dto.setPartidaId(p.getPartida().getId());
        dto.setPartidaNome(p.getPartida().getNomeExibicao());
        dto.setPalpiteGolsCasa(p.getPalpiteGolsCasa());
        dto.setPalpiteGolsFora(p.getPalpiteGolsFora());
        dto.setPalpiteGolsFlamengo(p.getPalpiteGolsFlamengo());
        dto.setPalpiteGolsAdversario(p.getPalpiteGolsAdversario());
        dto.setPontos(p.getPontos());
        dto.setCriadoEm(p.getCriadoEm());
        dto.setCalculadoEm(p.getCalculadoEm());
        return dto;
    }
}