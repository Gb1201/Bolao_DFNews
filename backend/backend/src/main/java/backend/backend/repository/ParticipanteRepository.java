package backend.backend.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.backend.model.Participante;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, Long> {

    List<Participante> findAllByAtivoTrueOrderByNomeAsc();

    Optional<Participante> findByTelefone(String telefone);

    boolean existsByTelefone(String telefone);

    @Query("""
        SELECT p FROM Participante p
        LEFT JOIN FETCH p.palpites pa
        LEFT JOIN FETCH pa.partida
        WHERE p.ativo = true
        """)
    List<Participante> findAllAtivosComPalpites();
}
