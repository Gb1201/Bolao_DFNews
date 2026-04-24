package backend.backend.controller;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.backend.dtos.ClassificacaoResponseDTO;
import backend.backend.dtos.ParticipanteRequestDTO;
import backend.backend.dtos.ParticipanteResponseDTO;
import backend.backend.interfaces.ParticipanteService;

import java.util.List;

@RestController
@RequestMapping("/api/participantes")
@CrossOrigin(origins = "*")
public class ParticipanteController {

    private final ParticipanteService participanteService;

    public ParticipanteController(ParticipanteService participanteService) {
        this.participanteService = participanteService;
    }

    @PostMapping
    public ResponseEntity<ParticipanteResponseDTO> cadastrar(@Valid @RequestBody ParticipanteRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(participanteService.cadastrar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ParticipanteResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(participanteService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<ParticipanteResponseDTO>> listarTodos() {
        return ResponseEntity.ok(participanteService.listarTodos());
    }

    @GetMapping("/classificacao")
    public ResponseEntity<List<ClassificacaoResponseDTO>> getClassificacao() {
        return ResponseEntity.ok(participanteService.getClassificacao());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParticipanteResponseDTO> atualizar(
            @PathVariable Long id, @Valid @RequestBody ParticipanteRequestDTO dto) {
        return ResponseEntity.ok(participanteService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativar(@PathVariable Long id) {
        participanteService.desativar(id);
        return ResponseEntity.noContent().build();
    }
}
