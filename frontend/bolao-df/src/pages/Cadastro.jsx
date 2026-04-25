import { useState } from "react";
import { UserPlus, User, Phone, ArrowLeft, CheckCircle } from "lucide-react";

// 🔥 URL base da API
const API_URL = "http://localhost:8080/api/participantes";

// ─── Campo reutilizável ───────────────────────────────────────────────────────
function Field({ label, icon: Icon, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-zinc-400 font-semibold">
        <Icon size={12} className="text-zinc-500" />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = `w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500
  rounded-lg px-4 py-2.5 text-sm outline-none
  focus:border-red-500 focus:ring-1 focus:ring-red-500/40
  hover:border-zinc-600 transition-all duration-200`;

// ─── Cadastro ────────────────────────────────────────────────────────────────
function Cadastro() {
  const [form, setForm] = useState({ nome: "", sobrenome: "", telefone: "" });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (campo) => (e) =>
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));

  const handleTelefone = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    setForm((prev) => ({ ...prev, telefone: v }));
  };

  // 🔥 INTEGRAÇÃO COM API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome,
          sobrenome: form.sobrenome,
          telefone: form.telefone
        }),
      });

      if (!response.ok) {
        const erro = await response.json();
        console.error("Erro backend:", erro);
        throw new Error("Erro ao cadastrar participante");
      }

      const data = await response.json();
      console.log("Participante criado:", data);

      setEnviado(true);
      setForm({ nome: "", sobrenome: "", telefone: "" });

      setTimeout(() => setEnviado(false), 3000);

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar participante");
    } finally {
      setLoading(false);
    }
  };

  const nomeCompletoPreview =
    [form.nome, form.sobrenome].filter(Boolean).join(" ") || "Participante";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">

        {/* ── Cabeçalho ── */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl shadow-lg shadow-red-900/40 mb-2">
            <UserPlus size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Cadastrar <span className="text-red-500">Participante</span>
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Bolão Mengão</p>
        </div>

        {/* ── Preview ── */}
        <div className="bg-black border border-zinc-800 rounded-xl px-6 py-4">
          <div className="flex items-center justify-center gap-2 text-zinc-600 mb-2">
            <User size={13} />
            <p className="text-xs uppercase tracking-widest font-semibold">Novo participante</p>
          </div>
          <p className="text-xl font-black text-white text-center">
            {nomeCompletoPreview}
          </p>
          {form.telefone && (
            <div className="flex items-center justify-center gap-1.5 mt-1.5">
              <Phone size={11} className="text-zinc-600" />
              <p className="text-xs text-zinc-500">{form.telefone}</p>
            </div>
          )}
        </div>

        {/* ── Formulário ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nome" icon={User}>
              <input
                type="text"
                value={form.nome}
                onChange={set("nome")}
                placeholder="Digite o nome"
                className={inputClass}
                required
              />
            </Field>
            <Field label="Sobrenome" icon={User}>
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

          <Field label="Telefone" icon={Phone}>
            <input
              type="tel"
              value={form.telefone}
              onChange={handleTelefone}
              placeholder="(00) 00000-0000"
              className={inputClass}
              required
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold text-sm py-3 rounded-xl mt-2 transition-all duration-200 border
              ${enviado
                ? "bg-green-700 border-green-600 text-white"
                : "bg-red-600 hover:bg-red-700 border-red-500/50 text-white"
              }`}
          >
            <span className="flex items-center justify-center gap-2">
              {enviado
                ? <><CheckCircle size={16} /> Cadastrado com sucesso</>
                : loading
                  ? "Cadastrando..."
                  : <><UserPlus size={16} /> Cadastrar Participante</>
              }
            </span>
          </button>
        </form>

        {/* Voltar */}
        <a
          href="/"
          className="flex items-center justify-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400"
        >
          <ArrowLeft size={13} />
          Voltar para o Dashboard
        </a>

      </div>
    </div>
  );
}

export default Cadastro;