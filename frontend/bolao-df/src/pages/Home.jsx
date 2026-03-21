import { useNavigate } from "react-router-dom";
import { Users, Trophy, Settings, User, Shield, Calendar, BarChart2, PlusCircle, Flag } from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const participantes = [
  { id: 1, nome: "Carlos Mendes",  jogos: 12, vitorias: 9, empates: 2, derrotas: 1 },
  { id: 2, nome: "Ana Paula",      jogos: 12, vitorias: 8, empates: 3, derrotas: 1 },
  { id: 3, nome: "Ricardo Lima",   jogos: 12, vitorias: 7, empates: 3, derrotas: 2 },
  { id: 4, nome: "Fernanda Costa", jogos: 12, vitorias: 6, empates: 4, derrotas: 2 },
  { id: 5, nome: "Thiago Rocha",   jogos: 12, vitorias: 5, empates: 3, derrotas: 4 },
  { id: 6, nome: "Juliana Ferraz", jogos: 12, vitorias: 4, empates: 5, derrotas: 3 },
  { id: 7, nome: "Marcos Andrade", jogos: 12, vitorias: 3, empates: 4, derrotas: 5 },
  { id: 8, nome: "Patrícia Nunes", jogos: 12, vitorias: 2, empates: 3, derrotas: 7 },
];

const calcPontos = (p) => p.vitorias * 3 + p.empates;

const classificados = [...participantes].sort(
  (a, b) => calcPontos(b) - calcPontos(a)
);

// ─── SectionTitle ─────────────────────────────────────────────────────────────
function SectionTitle({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="flex-1 h-px bg-zinc-800" />
      <div className="flex items-center gap-2 text-zinc-500">
        <Icon size={13} />
        <p className="text-xs uppercase tracking-widest font-semibold">{label}</p>
      </div>
      <span className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

// ─── PodioCard ───────────────────────────────────────────────────────────────
function PodioCard({ participante, posicao }) {
  const configs = {
    1: {
      order: "order-2", height: "h-36", pedestal: "bg-red-600",
      glow: "shadow-[0_0_28px_4px_rgba(220,38,38,0.4)]", ring: "ring-4 ring-red-500",
      nameSize: "text-lg", label: "1º", ptsColor: "text-red-400",
    },
    2: {
      order: "order-1", height: "h-24", pedestal: "bg-zinc-600",
      glow: "shadow-[0_0_14px_2px_rgba(113,113,122,0.3)]", ring: "ring-2 ring-zinc-400",
      nameSize: "text-base", label: "2º", ptsColor: "text-zinc-400",
    },
    3: {
      order: "order-3", height: "h-20", pedestal: "bg-amber-700",
      glow: "shadow-[0_0_14px_2px_rgba(180,83,9,0.3)]", ring: "ring-2 ring-amber-600",
      nameSize: "text-base", label: "3º", ptsColor: "text-amber-600",
    },
  };
  const c = configs[posicao];
  return (
    <div className={`${c.order} flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group cursor-default`}>
      <div className={`w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center font-black text-white text-xl ${c.ring} ${c.glow} transition-all duration-300`}>
        {participante.nome.charAt(0)}
      </div>
      <div className="text-center">
        <p className={`${c.nameSize} font-bold text-white leading-tight`}>{participante.nome.split(" ")[0]}</p>
        <p className={`text-sm font-semibold ${c.ptsColor}`}>{calcPontos(participante)} pts</p>
      </div>
      <div className={`${c.height} w-24 ${c.pedestal} flex items-end justify-center pb-2.5 rounded-t-lg font-black text-sm text-white tracking-wide transition-all duration-300 group-hover:brightness-110`}>
        {c.label}
      </div>
    </div>
  );
}

// ─── TabelaRow ───────────────────────────────────────────────────────────────
function TabelaRow({ participante, index }) {
  const pos = index + 1;
  const pts = calcPontos(participante);
  return (
    <tr className={`border-b border-zinc-800/60 transition-all duration-150 hover:bg-zinc-800/50 ${index % 2 === 0 ? "bg-zinc-900/30" : "bg-transparent"}`}>
      <td className="py-3 px-4 text-center">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${pos === 1 ? "bg-red-600 text-white" : pos === 2 ? "bg-zinc-600 text-white" : pos === 3 ? "bg-amber-700 text-white" : "text-zinc-500 font-medium"}`}>
          {pos}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className={`font-semibold ${pos <= 3 ? "text-white" : "text-zinc-300"}`}>{participante.nome}</span>
      </td>
      <td className="py-3 px-4 text-center text-zinc-500 text-sm">{participante.jogos}</td>
      <td className="py-3 px-4 text-center text-green-400 font-semibold text-sm">{participante.vitorias}</td>
      <td className="py-3 px-4 text-center text-yellow-400 font-semibold text-sm">{participante.empates}</td>
      <td className="py-3 px-4 text-center text-red-400 font-semibold text-sm">{participante.derrotas}</td>
      <td className="py-3 px-4 text-center text-white font-bold">{pts}</td>
    </tr>
  );
}

// ─── Home ────────────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-b border-zinc-800 shadow-xl shadow-black/50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center shadow-md shadow-red-900/50">
              <Shield size={17} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest hidden sm:block">Sistema de</p>
              <h1 className="text-white font-black text-base tracking-tight">
                Bolão <span className="text-red-500">Mengão</span>
              </h1>
            </div>
          </div>

          {/* Título central */}
          <div className="hidden md:flex items-center gap-2 border border-zinc-800 px-4 py-1.5 rounded-full">
            <Trophy size={13} className="text-red-500" />
            <span className="text-xs font-semibold text-zinc-400 tracking-widest uppercase">
              Classificação Geral
            </span>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/participantes"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold
                text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600
                px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <Settings size={13} />
              Gerenciar Participantes
            </a>

            {/* ── Botão de perfil com navegação ── */}
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-600 flex items-center justify-center transition-all duration-200 border border-zinc-800 hover:border-red-500 hover:scale-105"
            >
              <User size={15} className="text-zinc-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16 space-y-12">

        {/* ── CARDS DO BOLÃO ── */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="group border border-red-600/30 bg-red-950/10 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:border-red-600/60 hover:bg-red-950/20 hover:shadow-lg hover:shadow-red-950/30">
            <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600/30 transition-all duration-300">
              <Flag size={18} className="text-red-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-0.5">Bolão Atual</p>
              <p className="text-lg font-black text-white">Flamengo x Vasco</p>
            </div>
          </div>
          <div className="group border border-zinc-800 bg-zinc-900/20 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/40 hover:shadow-lg">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700 transition-all duration-300">
              <Calendar size={18} className="text-zinc-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-0.5">Próximo Bolão</p>
              <p className="text-lg font-black text-white">Flamengo x Palmeiras</p>
            </div>
          </div>
        </section>

        {/* ── PÓDIO ── */}
        <section>
          <SectionTitle icon={Trophy} label="Top 3 — Pódio" />
          <div className="flex justify-center items-end gap-4 sm:gap-10">
            <PodioCard participante={classificados[1]} posicao={2} />
            <PodioCard participante={classificados[0]} posicao={1} />
            <PodioCard participante={classificados[2]} posicao={3} />
          </div>
        </section>

        {/* ── TABELA ── */}
        <section>
          <SectionTitle icon={BarChart2} label="Classificação Completa" />
          <div className="rounded-xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/40">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-900/80 border-b border-zinc-800">
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-zinc-500 font-bold w-12">#</th>
                    <th className="py-3 px-4 text-left text-xs uppercase tracking-widest text-zinc-500 font-bold">Nome</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-zinc-500 font-bold">J</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-green-600 font-bold">V</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-yellow-600 font-bold">E</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-red-500 font-bold">D</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-white font-bold">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {classificados.map((p, i) => (
                    <TabelaRow key={p.id} participante={p} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── BOTÕES ── */}
        <section className="grid sm:grid-cols-2 gap-4">
          <a
            href="/cadastro-participante"
            className="group flex items-center justify-center gap-2.5 bg-red-600 hover:bg-red-700
              text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all duration-200
              hover:shadow-lg hover:shadow-red-950/50 border border-red-500/50 hover:border-red-400"
          >
            <Users size={17} className="transition-transform duration-200 group-hover:scale-110" />
            Cadastrar Novo Participante
          </a>
          <a
            href="/cadastro-bolao"
            className="group flex items-center justify-center gap-2.5 bg-zinc-800 hover:bg-zinc-700
              text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all duration-200
              hover:shadow-lg hover:shadow-black/40 border border-zinc-700 hover:border-zinc-500"
          >
            <PlusCircle size={17} className="transition-transform duration-200 group-hover:scale-110" />
            Cadastrar Novo Bolão
          </a>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-700">
        Bolão Mengão &copy; {new Date().getFullYear()} — Nação Rubro-Negra
      </footer>
    </div>
  );
}

export default Home;