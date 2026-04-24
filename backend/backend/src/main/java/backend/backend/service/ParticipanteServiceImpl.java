package backend.backend.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.backend.dtos.ClassificacaoResponseDTO;
import backend.backend.dtos.ParticipanteRequestDTO;
import backend.backend.dtos.ParticipanteResponseDTO;
import backend.backend.exception.BusinessException;
import backend.backend.exception.ResourceNotFoundException;
import backend.backend.interfaces.ParticipanteService;
import backend.backend.model.Participante;
import backend.backend.repository.ParticipanteRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ParticipanteServiceImpl implements ParticipanteService {

    private final ParticipanteRepository participanteRepository;

    public ParticipanteServiceImpl(ParticipanteRepository participanteRepository) {
        this.participanteRepository = participanteRepository;
    }

    @Override
    public ParticipanteResponseDTO cadastrar(ParticipanteRequestDTO dto) {
        if (participanteRepository.existsByTelefone(dto.getTelefone())) {
            throw new BusinessException("Ja existe um participante com o telefone: " + dto.getTelefone());
        }
        Participante p = new Participante(dto.getNome(), dto.getSobrenome(), dto.getTelefone());
        return toResponseDTO(participanteRepository.save(p));
    }

    @Override
    @Transactional(readOnly = true)
    public ParticipanteResponseDTO buscarPorId(Long id) {
        return toResponseDTO(participanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Participante", id)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ParticipanteResponseDTO> listarTodos() {
        return participanteRepository.findAllByAtivoTrueOrderByNomeAsc()
                .stream().map(this::toResponseDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClassificacaoResponseDTO> getClassificacao() {
        List<Participante> participantes = participanteRepository.findAllAtivosComPalpites();

        List<Participante> ordenados = participantes.stream()
                .sorted(Comparator.comparingInt(Participante::getTotalPontos).reversed()
                        .thenComparingLong(Participante::getTotalVitorias).reversed()
                        .thenComparing(Participante::getNomeCompleto))
                .collect(Collectors.toList());

        List<ClassificacaoResponseDTO> classificacao = new ArrayList<>();
        for (int i = 0; i < ordenados.size(); i++) {
            classificacao.add(toClassificacaoDTO(ordenados.get(i), i + 1));
        }
        return classificacao;
    }

    @Override
    public ParticipanteResponseDTO atualizar(Long id, ParticipanteRequestDTO dto) {
        Participante p = participanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Participante", id));

        participanteRepository.findByTelefone(dto.getTelefone())
                .filter(outro -> !outro.getId().equals(id))
                .ifPresent(outro -> { throw new BusinessException("Telefone ja cadastrado para outro participante."); });

        p.setNome(dto.getNome());
        p.setSobrenome(dto.getSobrenome());
        p.setTelefone(dto.getTelefone());
        return toResponseDTO(participanteRepository.save(p));
    }

    @Override
    public void desativar(Long id) {
        Participante p = participanteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Participante", id));
        p.setAtivo(false);
        participanteRepository.save(p);
    }

    private ParticipanteResponseDTO toResponseDTO(Participante p) {
        ParticipanteResponseDTO dto = new ParticipanteResponseDTO();
        dto.setId(p.getId());
        dto.setNome(p.getNome());
        dto.setSobrenome(p.getSobrenome());
        dto.setNomeCompleto(p.getNomeCompleto());
        dto.setTelefone(p.getTelefone());
        dto.setAtivo(p.isAtivo());
        dto.setTotalPontos(p.getTotalPontos());
        dto.setTotalJogos(p.getTotalJogos());
        dto.setTotalVitorias(p.getTotalVitorias());
        dto.setTotalEmpates(p.getTotalEmpates());
        dto.setTotalDerrotas(p.getTotalDerrotas());
        return dto;
    }

    private ClassificacaoResponseDTO toClassificacaoDTO(Participante p, int posicao) {
        ClassificacaoResponseDTO dto = new ClassificacaoResponseDTO();
        dto.setPosicao(posicao);
        dto.setParticipanteId(p.getId());
        dto.setNomeCompleto(p.getNomeCompleto());
        dto.setTotalPontos(p.getTotalPontos());
        dto.setTotalJogos(p.getTotalJogos());
        dto.setTotalVitorias(p.getTotalVitorias());
        dto.setTotalEmpates(p.getTotalEmpates());
        dto.setTotalDerrotas(p.getTotalDerrotas());
        int taxa = (p.getTotalJogos() > 0)
                ? (int) Math.round((double) p.getTotalVitorias() / p.getTotalJogos() * 100) : 0;
        dto.setTaxaVitoria(taxa);
        return dto;
    }
}