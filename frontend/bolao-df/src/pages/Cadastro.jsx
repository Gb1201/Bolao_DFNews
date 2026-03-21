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
  hover:border-zinc-500 transition-all duration-200`;

// ─── Cadastro ────────────────────────────────────────────────────────────────
function Cadastro() {
  const [form, setForm] = useState({ nome: "", sobrenome: "", telefone: "" });
  const [enviado, setEnviado] = useState(false);

  const set = (campo) => (e) =>
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));

  // Máscara de telefone: (00) 00000-0000
  const handleTelefone = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    setForm((prev) => ({ ...prev, telefone: v }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("👤 Participante cadastrado:", form);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const nomeCompleto = [form.nome, form.sobrenome].filter(Boolean).join(" ") || "Participante";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">

        {/* ── Cabeçalho ── */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl text-2xl shadow-lg shadow-red-900/40 mb-2">
            👤
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Cadastrar <span className="text-red-500">Participante</span>
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Bolão Mengão</p>
        </div>

        {/* ── Preview do nome ── */}
        <div className="bg-black border border-zinc-800 rounded-xl px-6 py-4 text-center transition-all duration-300">
          <p className="text-xs uppercase tracking-widest text-zinc-600 mb-1 font-semibold">
            Novo participante
          </p>
          <p className="text-xl font-black text-white leading-tight transition-all duration-300">
            {nomeCompleto}
          </p>
          {form.telefone && (
            <p className="text-xs text-zinc-500 mt-1">📱 {form.telefone}</p>
          )}
        </div>

        {/* ── Formulário ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5 shadow-xl"
        >
          {/* Nome + Sobrenome lado a lado */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="👤 Nome">
              <input
                type="text"
                value={form.nome}
                onChange={set("nome")}
                placeholder="Digite o nome"
                className={inputClass}
                required
              />
            </Field>
            <Field label="👤 Sobrenome">
              <input
                type="text"
                value={form.sobrenome}
                onChange={set("sobrenome")}
                placeholder="Digite o sobrenome"
                className={inputClass}
                required
              />
            </Field>
          </div>

          {/* Telefone */}
          <Field label="📱 Telefone">
            <input
              type="tel"
              value={form.telefone}
              onChange={handleTelefone}
              placeholder="(00) 00000-0000"
              className={inputClass}
              required
            />
          </Field>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800
              text-white font-bold text-base py-3 rounded-xl
              transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/40
              border border-red-500 hover:border-red-400 mt-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviado ? "✅ Cadastrado!" : "🚀 Cadastrar Participante"}
          </button>

          {/* Feedback */}
          {enviado && (
            <p className="text-center text-xs text-green-400 font-semibold animate-pulse">
              Participante adicionado com sucesso!
            </p>
          )}
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

export default Cadastro;