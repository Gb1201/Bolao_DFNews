package backend.backend.interfaces;

import java.util.List;

import backend.backend.dtos.PartidaRequestDTO;
import backend.backend.dtos.PartidaResponseDTO;
import backend.backend.dtos.ResultadoRequestDTO;

public interface PartidaService {
    PartidaResponseDTO cadastrar(PartidaRequestDTO dto);
    PartidaResponseDTO buscarPorId(Long id);
    List<PartidaResponseDTO> listarTodas();
    List<PartidaResponseDTO> listarDisponiveis();
    PartidaResponseDTO ativar(Long id);
    PartidaResponseDTO cancelarAtivo();
    PartidaResponseDTO registrarResultadoEEncerrar(Long id, ResultadoRequestDTO dto);
}
