import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Users, Trophy, User, Shield,
  BarChart2, Zap, ChevronRight
} from "lucide-react";

// 🔥 APIs
const API_PARTICIPANTES = "http://localhost:8080/api/participantes";
const API_CLASSIFICACAO = "http://localhost:8080/api/participantes/classificacao";
const API_PALPITES = "http://localhost:8080/api/palpites";

function Home({ bolaoAtivo }) {
  const navigate = useNavigate();

  const [participantes, setParticipantes] = useState([]);
  const [classificacao, setClassificacao] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Buscar participantes
  useEffect(() => {
    fetch(API_PARTICIPANTES)
      .then(res => res.json())
      .then(setParticipantes)
      .catch(console.error);

    fetch(API_CLASSIFICACAO)
      .then(res => res.json())
      .then(setClassificacao)
      .catch(console.error);
  }, []);

  // 🔥 Criar palpite
  const handlePalpite = async (participanteId) => {
    if (!bolaoAtivo) {
      alert("Ative um bolão primeiro!");
      return;
    }

    const golsCasa = prompt("Gols do time da casa:");
    const golsFora = prompt("Gols do visitante:");

    if (golsCasa === null || golsFora === null) return;

    setLoading(true);

    try {
      await fetch(API_PALPITES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participanteId,
          partidaId: bolaoAtivo.id,
          golsTimeCasa: Number(golsCasa),
          golsTimeFora: Number(golsFora)
        })
      });

      alert("Palpite registrado!");
    } catch {
      alert("Erro ao registrar palpite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 bg-zinc-950 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-black">
            Bolão <span className="text-red-500">Mengão</span>
          </h1>
          <button onClick={() => navigate("/profile")}>
            <User size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-20 space-y-10">

        {/* STATUS */}
        {!bolaoAtivo ? (
          <div className="bg-zinc-900 p-4 rounded-xl text-center">
            <p className="text-zinc-400">Nenhum bolão ativo</p>
            <button
              onClick={() => navigate("/ativar-bolao")}
              className="mt-3 bg-red-600 px-4 py-2 rounded-lg"
            >
              Ativar Bolão
            </button>
          </div>
        ) : (
          <div className="bg-red-950/20 border border-red-500 p-4 rounded-xl">
            <p className="text-red-400 text-sm">Bolão ativo</p>
            <p className="font-bold">
              {bolaoAtivo.timeCasa} × {bolaoAtivo.timeFora}
            </p>
          </div>
        )}

        {/* PARTICIPANTES */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Users size={18} className="text-red-500" />
            <h2 className="font-black">Participantes</h2>
          </div>

          <div className="space-y-3">
            {participantes.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
              >
                <p className="font-bold">{p.nome}</p>

                <button
                  onClick={() => handlePalpite(p.id)}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm font-bold"
                >
                  Palpitar
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 🔥 CLASSIFICAÇÃO (AGORA REAL) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 size={18} className="text-red-500" />
            <h2 className="font-black">Classificação</h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-800 text-zinc-400">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Nome</th>
                  <th className="p-3 text-center">Pontos</th>
                </tr>
              </thead>
              <tbody>
                {classificacao.map((c, index) => (
                  <tr key={index} className="border-t border-zinc-800">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-semibold">{c.nome}</td>
                    <td className="p-3 text-center font-bold text-red-500">
                      {c.pontuacaoTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AÇÕES */}
        <div className="grid sm:grid-cols-2 gap-3">
          <a href="/cadastro-participante" className="flex items-center gap-3 bg-zinc-900 p-4 rounded-xl">
            <Users size={18} />
            Novo Participante
          </a>

          <a href="/cadastro-bolao" className="flex items-center gap-3 bg-zinc-900 p-4 rounded-xl">
            <Zap size={18} />
            Novo Bolão
          </a>
        </div>

      </main>
    </div>
  );
}

export default Home;