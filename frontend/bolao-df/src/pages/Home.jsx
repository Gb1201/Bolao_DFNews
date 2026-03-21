import { useState } from "react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const participantes = [
  { id: 1,  nome: "Carlos Mendes",   jogos: 12, vitorias: 9, empates: 2, derrotas: 1 },
  { id: 2,  nome: "Ana Paula",       jogos: 12, vitorias: 8, empates: 3, derrotas: 1 },
  { id: 3,  nome: "Ricardo Lima",    jogos: 12, vitorias: 7, empates: 3, derrotas: 2 },
  { id: 4,  nome: "Fernanda Costa",  jogos: 12, vitorias: 6, empates: 4, derrotas: 2 },
  { id: 5,  nome: "Thiago Rocha",    jogos: 12, vitorias: 5, empates: 3, derrotas: 4 },
  { id: 6,  nome: "Juliana Ferraz",  jogos: 12, vitorias: 4, empates: 5, derrotas: 3 },
  { id: 7,  nome: "Marcos Andrade",  jogos: 12, vitorias: 3, empates: 4, derrotas: 5 },
  { id: 8,  nome: "Patrícia Nunes",  jogos: 12, vitorias: 2, empates: 3, derrotas: 7 },
];

const calcPontos = (p) => p.vitorias * 3 + p.empates;

const classificados = [...participantes].sort(
  (a, b) => calcPontos(b) - calcPontos(a)
);

// ─── PodioCard ───────────────────────────────────────────────────────────────
function PodioCard({ participante, posicao }) {
  const configs = {
    1: {
      order: "order-2",
      height: "h-36",
      badge: "bg-red-600",
      glow: "shadow-[0_0_24px_4px_rgba(220,38,38,0.45)]",
      label: "🥇 1º",
      ring: "ring-4 ring-red-500",
      nameSize: "text-lg",
    },
    2: {
      order: "order-1",
      height: "h-24",
      badge: "bg-zinc-500",
      glow: "shadow-[0_0_12px_2px_rgba(113,113,122,0.35)]",
      label: "🥈 2º",
      ring: "ring-2 ring-zinc-400",
      nameSize: "text-base",
    },
    3: {
      order: "order-3",
      height: "h-20",
      badge: "bg-amber-700",
      glow: "shadow-[0_0_12px_2px_rgba(180,83,9,0.35)]",
      label: "🥉 3º",
      ring: "ring-2 ring-amber-600",
      nameSize: "text-base",
    },
  };

  const c = configs[posicao];

  return (
    <div
      className={`${c.order} flex flex-col items-center gap-2 
        transition-all duration-300 hover:scale-105 hover:-translate-y-1 group cursor-default`}
    >
      {/* Avatar */}
      <div
        className={`w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center 
          text-2xl font-black text-white ${c.ring} ${c.glow} 
          transition-all duration-300`}
      >
        {participante.nome.charAt(0)}
      </div>

      {/* Nome + Pontos */}
      <div className="text-center">
        <p className={`${c.nameSize} font-bold text-white leading-tight`}>
          {participante.nome.split(" ")[0]}
        </p>
        <p className="text-red-400 text-sm font-semibold">
          {calcPontos(participante)} pts
        </p>
      </div>

      {/* Pedestal */}
      <div
        className={`${c.height} w-24 ${c.badge} flex items-end justify-center pb-2 
          rounded-t-lg font-bold text-sm text-white 
          transition-all duration-300 group-hover:brightness-110`}
      >
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
    <tr
      className={`border-b border-zinc-800 transition-all duration-200 hover:bg-zinc-800/60
        ${index % 2 === 0 ? "bg-zinc-900/40" : "bg-zinc-900/10"}`}
    >
      {/* Posição */}
      <td className="py-3 px-4 text-center">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold
            ${pos === 1 ? "bg-red-600 text-white"
              : pos === 2 ? "bg-zinc-500 text-white"
              : pos === 3 ? "bg-amber-700 text-white"
              : "text-zinc-500"}`}
        >
          {pos}
        </span>
      </td>

      {/* Nome */}
      <td className="py-3 px-4">
        <span className={`font-semibold ${pos <= 3 ? "text-white" : "text-zinc-300"}`}>
          {participante.nome}
        </span>
      </td>

      <td className="py-3 px-4 text-center text-zinc-400">{participante.jogos}</td>
      <td className="py-3 px-4 text-center text-green-400 font-semibold">{participante.vitorias}</td>
      <td className="py-3 px-4 text-center text-yellow-400 font-semibold">{participante.empates}</td>
      <td className="py-3 px-4 text-center text-red-400 font-semibold">{participante.derrotas}</td>
      <td className="py-3 px-4 text-center text-white font-bold">{pts}</td>
    </tr>
  );
}

// ─── Home ────────────────────────────────────────────────────────────────────
function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-red-600/40 shadow-lg shadow-black/60">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white text-lg shadow-md shadow-red-900/50">
              🔥
            </div>
            <div className="leading-tight">
              <p className="text-xs text-zinc-500 uppercase tracking-widest hidden sm:block">Sistema de</p>
              <h1 className="text-white font-black text-base sm:text-lg tracking-tight">
                Bolão <span className="text-red-500">Mengão</span>
              </h1>
            </div>
          </div>

          {/* Título central */}
          <h2 className="hidden md:block text-xs font-semibold text-zinc-300 tracking-widest uppercase border border-zinc-700 px-4 py-1.5 rounded-full">
            🏆 Classificação Geral
          </h2>

          {/* Ações */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/participantes"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold 
                text-zinc-300 hover:text-red-400 border border-zinc-700 hover:border-red-500 
                px-3 py-1.5 rounded-full transition-all duration-200"
            >
              ⚙️ Gerenciar Participantes
            </a>
            <button
              className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-red-700 flex items-center 
                justify-center text-lg transition-all duration-200 hover:scale-105 
                border border-zinc-700 hover:border-red-500"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      {/* ── CONTEÚDO PRINCIPAL ─────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16 space-y-10">

        {/* ── CARDS DO BOLÃO ─── */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="border border-red-500/50 bg-red-950/20 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/30">
            <span className="text-3xl">⚽</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Bolão Atual</p>
              <p className="text-xl font-black text-white mt-0.5">Flamengo x Vasco</p>
            </div>
          </div>

          <div className="border border-zinc-700/50 bg-zinc-900/30 rounded-xl p-5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <span className="text-3xl">📅</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Próximo Bolão</p>
              <p className="text-xl font-black text-white mt-0.5">Flamengo x Palmeiras</p>
            </div>
          </div>
        </section>

        {/* ── PÓDIO ─── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-zinc-800"></span>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">🏆 Top 3 — Pódio</p>
            <span className="flex-1 h-px bg-zinc-800"></span>
          </div>

          <div className="flex justify-center items-end gap-4 sm:gap-10">
            <PodioCard participante={classificados[1]} posicao={2} />
            <PodioCard participante={classificados[0]} posicao={1} />
            <PodioCard participante={classificados[2]} posicao={3} />
          </div>
        </section>

        {/* ── TABELA ─── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-1 h-px bg-zinc-800"></span>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">📊 Classificação Completa</p>
            <span className="flex-1 h-px bg-zinc-800"></span>
          </div>

          <div className="rounded-xl border border-zinc-800 overflow-hidden shadow-xl shadow-black/40">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-black border-b border-red-600/40">
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-red-400 font-bold w-12">#</th>
                    <th className="py-3 px-4 text-left text-xs uppercase tracking-widest text-zinc-400 font-bold">Nome</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-zinc-400 font-bold">J</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-green-500 font-bold">V</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-yellow-500 font-bold">E</th>
                    <th className="py-3 px-4 text-center text-xs uppercase tracking-widest text-red-400 font-bold">D</th>
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

        {/* ── BOTÕES DE AÇÃO ─── */}
        <section className="grid sm:grid-cols-2 gap-4">
          <a
            href="/cadastro-participante"
            className="group flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 
              text-white font-bold text-base py-4 px-6 rounded-xl transition-all duration-200 
              hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/40 
              border border-red-500 hover:border-red-400"
          >
            <span className="text-xl transition-transform duration-200 group-hover:rotate-12">👤</span>
            Cadastrar Novo Participante
          </a>

          <a
            href="/cadastro-bolao"
            className="group flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 
              text-white font-bold text-base py-4 px-6 rounded-xl transition-all duration-200 
              hover:scale-[1.02] hover:shadow-lg hover:shadow-black/40 
              border border-zinc-700 hover:border-zinc-500"
          >
            <span className="text-xl transition-transform duration-200 group-hover:rotate-12">🏟️</span>
            Cadastrar Novo Bolão
          </a>
        </section>

      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-600">
        Bolão Mengão © {new Date().getFullYear()} — Nação Rubro-Negra 🔴⚫
      </footer>
    </div>
  );
}

export default Home;