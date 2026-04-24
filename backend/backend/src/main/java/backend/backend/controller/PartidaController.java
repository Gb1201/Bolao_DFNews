package backend.backend.controller;




import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.backend.dtos.PartidaRequestDTO;
import backend.backend.dtos.PartidaResponseDTO;
import backend.backend.dtos.ResultadoRequestDTO;
import backend.backend.interfaces.PartidaService;

import java.util.List;

@RestController
@RequestMapping("/api/partidas")
@CrossOrigin(origins = "*")
public class PartidaController {

    private final PartidaService partidaService;

    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @PostMapping
    public ResponseEntity<PartidaResponseDTO> cadastrar(@Valid @RequestBody PartidaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(partidaService.cadastrar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartidaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(partidaService.buscarPorId(id));
    }

    @GetMapping
    public ResponseEntity<List<PartidaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(partidaService.listarTodas());
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<PartidaResponseDTO>> listarDisponiveis() {
        return ResponseEntity.ok(partidaService.listarDisponiveis());
    }

    @PatchMapping("/{id}/ativar")
    public ResponseEntity<PartidaResponseDTO> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(partidaService.ativar(id));
    }

    @PatchMapping("/cancelar-ativo")
    public ResponseEntity<PartidaResponseDTO> cancelarAtivo() {
        return ResponseEntity.ok(partidaService.cancelarAtivo());
    }

    @PatchMapping("/{id}/resultado")
    public ResponseEntity<PartidaResponseDTO> registrarResultado(
            @PathVariable Long id, @Valid @RequestBody ResultadoRequestDTO dto) {
        return ResponseEntity.ok(partidaService.registrarResultadoEEncerrar(id, dto));
    }
}