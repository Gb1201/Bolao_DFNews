import { useState } from "react";
import { Home, Shield, Swords, CalendarDays, Clock, MapPin, ArrowLeft, Eye } from "lucide-react";

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
  hover:border-zinc-600 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed`;

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
    console.log("Bolão cadastrado:", { ...form, timeCasa, timeFora });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">

        {/* ── Cabeçalho ── */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl shadow-lg shadow-red-900/40 mb-2">
            <Shield size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Cadastrar <span className="text-red-500">Bolão</span>
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Novo jogo</p>
        </div>

        {/* ── Preview dinâmico ── */}
        <div className="bg-black border border-zinc-800 rounded-xl px-6 py-5 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 text-zinc-600 mb-3">
            <Eye size={13} />
            <p className="text-xs uppercase tracking-widest font-semibold">Preview do Jogo</p>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white leading-tight text-center">
            <span className={timeCasa === "Flamengo" ? "text-red-500" : "text-zinc-300"}>
              {timeCasa}
            </span>
            <span className="text-zinc-700 mx-3 font-light">x</span>
            <span className={timeFora === "Flamengo" ? "text-red-500" : "text-zinc-300"}>
              {timeFora}
            </span>
          </p>
          {(form.data || form.estadio) && (
            <div className="flex items-center justify-center gap-4 mt-3">
              {form.data && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <CalendarDays size={12} />
                  {new Date(form.data + "T00:00").toLocaleDateString("pt-BR")}
                  {form.horario && ` às ${form.horario}`}
                </span>
              )}
              {form.estadio && (
                <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <MapPin size={12} />
                  {form.estadio}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Formulário ── */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5 shadow-xl"
        >
          {/* Tipo */}
          <Field label="Tipo de Jogo" icon={Home}>
            <select
              value={form.tipo}
              onChange={set("tipo")}
              className={inputClass + " cursor-pointer"}
            >
              <option value="Casa">Casa — Flamengo x Adversário</option>
              <option value="Fora">Fora — Adversário x Flamengo</option>
            </select>
          </Field>

          {/* Time fixo */}
          <Field label="Time Principal" icon={Shield}>
            <input
              type="text"
              value="Flamengo"
              disabled
              className={inputClass}
            />
          </Field>

          {/* Adversário */}
          <Field label="Adversário" icon={Swords}>
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
            <Field label="Data" icon={CalendarDays}>
              <input
                type="date"
                value={form.data}
                onChange={set("data")}
                className={inputClass}
                required
              />
            </Field>
            <Field label="Horário" icon={Clock}>
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
          <Field label="Estádio" icon={MapPin}>
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
              text-white font-bold text-sm py-3 rounded-xl
              transition-all duration-200 hover:shadow-lg hover:shadow-red-950/50
              border border-red-500/50 hover:border-red-400 mt-2"
          >
            Cadastrar Bolão
          </button>
        </form>

        {/* Voltar */}
        <a
          href="/"
          className="flex items-center justify-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
        >
          <ArrowLeft size={13} />
          Voltar para o Dashboard
        </a>

      </div>
    </div>
  );
}

export default Bolao;