import { useState } from "react";
import { Home, Shield, Swords, CalendarDays, Clock, MapPin, ArrowLeft, Eye, ChevronRight } from "lucide-react";

// ─── Campo reutilizável ───────────────────────────────────────────────────────
function Field({ label, icon: Icon, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500">
        <Icon size={11} className="text-zinc-600" />
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputBase = `
  w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600
  rounded-xl px-4 py-3 text-sm outline-none
  focus:border-red-500 focus:ring-1 focus:ring-red-500/30
  hover:border-zinc-700 transition-all duration-200
  disabled:opacity-40 disabled:cursor-not-allowed
`;

// ─── Bolao ────────────────────────────────────────────────────────────────────
function Bolao() {
  const [form, setForm] = useState({
    tipo: "Casa",
    adversario: "",
    data: "",
    horario: "",
    estadio: "",
  });
  const [enviado, setEnviado] = useState(false);

  const set = (campo) => (e) =>
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));

  const timeCasa = form.tipo === "Casa" ? "Flamengo" : (form.adversario || "Adversário");
  const timeFora = form.tipo === "Casa" ? (form.adversario || "Adversário") : "Flamengo";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Bolão cadastrado:", { ...form, timeCasa, timeFora });
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shadow-md shadow-red-950/50">
              <Shield size={18} className="text-white" />
            </div>
            <div className="leading-none">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest hidden sm:block">Sistema de</p>
              <h1 className="text-white font-black text-base tracking-tight">
                Bolão <span className="text-red-500">Mengão</span>
              </h1>
            </div>
          </div>
          <a href="/" className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-full transition-all duration-200">
            <ArrowLeft size={13} />
            Dashboard
          </a>
        </div>
      </header>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 pt-24 pb-20">
        <div className="w-full max-w-xl space-y-6">

          {/* Cabeçalho da página */}
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-2xl shadow-lg shadow-red-950/40 mb-4">
              <Shield size={22} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Cadastrar <span className="text-red-500">Bolão</span>
            </h2>
            <p className="text-sm text-zinc-500 mt-1">Registre um novo jogo para o bolão</p>
          </div>

          {/* Preview do jogo */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-6">
            <div className="flex items-center gap-2 text-zinc-600 mb-4">
              <Eye size={13} />
              <p className="text-[10px] font-bold uppercase tracking-widest">Preview do Jogo</p>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white text-center leading-tight">
              <span className={timeCasa === "Flamengo" ? "text-red-500" : "text-zinc-200"}>
                {timeCasa}
              </span>
              <span className="text-zinc-700 mx-3 font-light text-2xl">×</span>
              <span className={timeFora === "Flamengo" ? "text-red-500" : "text-zinc-200"}>
                {timeFora}
              </span>
            </p>
            {(form.data || form.estadio) && (
              <div className="flex items-center justify-center flex-wrap gap-4 mt-4 pt-4 border-t border-zinc-800">
                {form.data && (
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <CalendarDays size={11} />
                    {new Date(form.data + "T00:00").toLocaleDateString("pt-BR")}
                    {form.horario && ` às ${form.horario}`}
                  </span>
                )}
                {form.estadio && (
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <MapPin size={11} />
                    {form.estadio}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-xl">

            <Field label="Tipo de Jogo" icon={Home}>
              <select value={form.tipo} onChange={set("tipo")} className={inputBase + " cursor-pointer"}>
                <option value="Casa">Casa — Flamengo × Adversário</option>
                <option value="Fora">Fora — Adversário × Flamengo</option>
              </select>
            </Field>

            <Field label="Time Principal" icon={Shield}>
              <input type="text" value="Flamengo" disabled className={inputBase} />
            </Field>

            <Field label="Adversário" icon={Swords} required>
              <input
                type="text"
                value={form.adversario}
                onChange={set("adversario")}
                placeholder="Nome do adversário"
                className={inputBase}
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Data" icon={CalendarDays} required>
                <input type="date" value={form.data} onChange={set("data")} className={inputBase} required />
              </Field>
              <Field label="Horário" icon={Clock} required>
                <input type="time" value={form.horario} onChange={set("horario")} className={inputBase} required />
              </Field>
            </div>

            <Field label="Estádio" icon={MapPin}>
              <input
                type="text"
                value={form.estadio}
                onChange={set("estadio")}
                placeholder="Nome do estádio"
                className={inputBase}
              />
            </Field>

            <button
              type="submit"
              className={`
                w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-2xl
                transition-all duration-200 border mt-2 active:scale-[0.98]
                ${enviado
                  ? "bg-emerald-700 border-emerald-600 text-white cursor-default"
                  : "bg-red-600 hover:bg-red-700 border-red-500/50 hover:border-red-400 text-white shadow-lg shadow-red-950/30"
                }
              `}
            >
              {enviado ? (
                <>✓ Bolão cadastrado com sucesso!</>
              ) : (
                <>
                  <Shield size={16} />
                  Cadastrar Bolão
                </>
              )}
            </button>

          </form>

        </div>
      </main>

    </div>
  );
}

export default Bolao;