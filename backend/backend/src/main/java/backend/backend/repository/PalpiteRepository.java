package backend.backend.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.backend.model.Palpite;
import backend.backend.model.Participante;
import backend.backend.model.Partida;

import java.util.List;
import java.util.Optional;

@Repository
public interface PalpiteRepository extends JpaRepository<Palpite, Long> {

    List<Palpite> findByPartida(Partida partida);

    List<Palpite> findByParticipante(Participante participante);

    Optional<Palpite> findByParticipanteAndPartida(Participante participante, Partida partida);

    boolean existsByParticipanteAndPartida(Participante participante, Partida partida);

    @Query("""
        SELECT pal FROM Palpite pal
        JOIN FETCH pal.participante
        JOIN FETCH pal.partida
        WHERE pal.partida.id = :partidaId
        ORDER BY pal.pontos DESC
        """)
    List<Palpite> findByPartidaIdComDetalhes(@Param("partidaId") Long partidaId);

    @Query("""
        SELECT pal FROM Palpite pal
        JOIN FETCH pal.partida
        WHERE pal.participante.id = :participanteId
        ORDER BY pal.partida.data DESC
        """)
    List<Palpite> findByParticipanteIdComDetalhes(@Param("participanteId") Long participanteId);
}