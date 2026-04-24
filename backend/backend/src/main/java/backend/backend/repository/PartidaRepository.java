package backend.backend.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.backend.enums.StatusPartida;
import backend.backend.model.Partida;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {

    List<Partida> findAllByOrderByDataAscHorarioAsc();

    List<Partida> findByStatusOrderByDataAscHorarioAsc(StatusPartida status);

    Optional<Partida> findByStatus(StatusPartida status);

    boolean existsByStatus(StatusPartida status);

    @Query("SELECT p FROM Partida p WHERE p.status IN ('AGENDADA', 'ATIVA') ORDER BY p.data ASC, p.horario ASC")
    List<Partida> findPartidasDisponiveis();
}
