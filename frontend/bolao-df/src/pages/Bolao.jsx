import { useState } from "react";

// ─── Campo reutilizável ───────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = `w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 
  rounded-lg px-4 py-2.5 text-sm outline-none 
  focus:border-red-500 focus:ring-1 focus:ring-red-500/40 
  transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed`;

// ─── Bolao ────────────────────────────────────────────────────────────────────
function Bolao() {
  const [form, setForm] = useState({
    tipo: "Casa",
    adversario: "",
    data: "",
    horario: "",
    estadio: "",
  });

  const set = (campo) => (e) =>
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));

  const timeCasa = form.tipo === "Casa" ? "Flamengo" : form.adversario || "Adversário";
  const timeFora = form.tipo === "Casa" ? form.adversario || "Adversário" : "Flamengo";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Bolão cadastrado:", { ...form, timeCasa, timeFora });
    alert(`Bolão cadastrado!\n${timeCasa} x ${timeFora}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">

        {/* ── Cabeçalho ── */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl text-2xl shadow-lg shadow-red-900/40 mb-2">
            🏟️
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Cadastrar <span className="text-red-500">Bolão</span>
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Novo jogo</p>
        </div>

        {/* ── Preview dinâmico ── */}
        <div className="bg-black border border-red-600/40 rounded-xl px-6 py-5 text-center shadow-lg shadow-red-900/10 transition-all duration-300">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2 font-semibold">
            ⚽ Preview do Jogo
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white leading-tight">
            <span className={timeCasa === "Flamengo" ? "text-red-500" : "text-zinc-300"}>
              {timeCasa}
            </span>
            <span className="text-zinc-600 mx-3">x</span>
            <span className={timeFora === "Flamengo" ? "text-red-500" : "text-zinc-300"}>
              {timeFora}
            </span>
          </p>
          {form.data && (
            <p className="text-xs text-zinc-500 mt-2">
              📅 {new Date(form.data + "T00:00").toLocaleDateString("pt-BR")}
              {form.horario && ` às ${form.horario}`}
            </p>
          )}
          {form.estadio && (
            <p className="text-xs text-zinc-500">🏟️ {form.estadio}</p>
          )}
        </div>

        {/* ── Formulário ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5 shadow-xl"
        >
          {/* Tipo */}
          <Field label="🔄 Tipo de Jogo">
            <select
              value={form.tipo}
              onChange={set("tipo")}
              className={inputClass + " cursor-pointer"}
            >
              <option value="Casa">🏠 Casa — Flamengo x Adversário</option>
              <option value="Fora">✈️ Fora — Adversário x Flamengo</option>
            </select>
          </Field>

          {/* Time fixo */}
          <Field label="⚽ Time Principal">
            <input
              type="text"
              value="Flamengo"
              disabled
              className={inputClass}
            />
          </Field>

          {/* Adversário */}
          <Field label="🆚 Adversário">
            <input
              type="text"
              value={form.adversario}
              onChange={set("adversario")}
              placeholder="Digite o nome do adversário"
              className={inputClass}
              required
            />
          </Field>

          {/* Data + Horário */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="📅 Data">
              <input
                type="date"
                value={form.data}
                onChange={set("data")}
                className={inputClass}
                required
              />
            </Field>
            <Field label="⏰ Horário">
              <input
                type="time"
                value={form.horario}
                onChange={set("horario")}
                className={inputClass}
                required
              />
            </Field>
          </div>

          {/* Estádio */}
          <Field label="🏟️ Estádio">
            <input
              type="text"
              value={form.estadio}
              onChange={set("estadio")}
              placeholder="Digite o nome do estádio"
              className={inputClass}
            />
          </Field>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 
              text-white font-bold text-base py-3 rounded-xl 
              transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/40
              border border-red-500 hover:border-red-400 mt-2"
          >
            🚀 Cadastrar Bolão
          </button>
        </form>

        {/* Voltar */}
        <p className="text-center text-xs text-zinc-600">
          <a href="/" className="hover:text-red-400 transition-colors duration-200">
            ← Voltar para o Dashboard
          </a>
        </p>

      </div>
    </div>
  );
}

export default Bolao;