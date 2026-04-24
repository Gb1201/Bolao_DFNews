package backend.backend.controller;


import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.backend.dtos.PalpiteRequestDTO;
import backend.backend.dtos.PalpiteResponseDTO;
import backend.backend.interfaces.PalpiteService;

import java.util.List;

@RestController
@RequestMapping("/api/palpites")
@CrossOrigin(origins = "*")
public class PalpiteController {

    private final PalpiteService palpiteService;

    public PalpiteController(PalpiteService palpiteService) {
        this.palpiteService = palpiteService;
    }

    @PostMapping
    public ResponseEntity<PalpiteResponseDTO> registrar(@Valid @RequestBody PalpiteRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(palpiteService.registrar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PalpiteResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(palpiteService.buscarPorId(id));
    }

    @GetMapping("/partida/{partidaId}")
    public ResponseEntity<List<PalpiteResponseDTO>> listarPorPartida(@PathVariable Long partidaId) {
        return ResponseEntity.ok(palpiteService.listarPorPartida(partidaId));
    }

    @GetMapping("/participante/{participanteId}")
    public ResponseEntity<List<PalpiteResponseDTO>> listarPorParticipante(@PathVariable Long participanteId) {
        return ResponseEntity.ok(palpiteService.listarPorParticipante(participanteId));
    }
}
