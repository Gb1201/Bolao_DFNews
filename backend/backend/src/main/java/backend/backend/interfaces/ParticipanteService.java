package backend.backend.interfaces;

import java.util.List;

import backend.backend.dtos.ClassificacaoResponseDTO;
import backend.backend.dtos.ParticipanteRequestDTO;
import backend.backend.dtos.ParticipanteResponseDTO;

public interface ParticipanteService {
    ParticipanteResponseDTO cadastrar(ParticipanteRequestDTO dto);
    ParticipanteResponseDTO buscarPorId(Long id);
    List<ParticipanteResponseDTO> listarTodos();
    List<ClassificacaoResponseDTO> getClassificacao();
    ParticipanteResponseDTO atualizar(Long id, ParticipanteRequestDTO dto);
    void desativar(Long id);
}
