package backend.backend.interfaces;


import java.util.List;

import backend.backend.dtos.PalpiteRequestDTO;
import backend.backend.dtos.PalpiteResponseDTO;

public interface PalpiteService {
    PalpiteResponseDTO registrar(PalpiteRequestDTO dto);
    PalpiteResponseDTO buscarPorId(Long id);
    List<PalpiteResponseDTO> listarPorPartida(Long partidaId);
    List<PalpiteResponseDTO> listarPorParticipante(Long participanteId);
    void calcularPontuacoes(Long partidaId);
}
