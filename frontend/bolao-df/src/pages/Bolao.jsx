import { useState } from "react";
import {
  Home, Shield, Swords, CalendarDays, Clock,
  MapPin, ArrowLeft, Eye
} from "lucide-react";

// 🔥 URL da API
const API_URL = "http://localhost:8080/api/partidas";

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
  const [loading, setLoading] = useState(false);

  const set = (campo) => (e) =>
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));

  const timeCasa =
    form.tipo === "Casa" ? "Flamengo" : (form.adversario || "Adversário");

  const timeFora =
    form.tipo === "Casa" ? (form.adversario || "Adversário") : "Flamengo";

  // 🔥 INTEGRAÇÃO CORRETA COM BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      tipo: form.tipo,
      adversario: form.adversario,
      data: form.data,
      horario: form.horario,
      estadio: form.estadio
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const erro = await response.text();
        console.error("Erro backend:", erro);
        throw new Error("Erro ao cadastrar partida");
      }

      const data = await response.json();
      console.log("Sucesso:", data);

      setEnviado(true);
      setForm({
        tipo: "Casa",
        adversario: "",
        data: "",
        horario: "",
        estadio: "",
      });

      setTimeout(() => setEnviado(false), 3000);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
              <Shield size={18} />
            </div>
            <h1 className="font-black">Bolão <span className="text-red-500">Mengão</span></h1>
          </div>

          <a href="/" className="flex items-center gap-1 text-xs text-zinc-400">
            <ArrowLeft size={13} />
            Voltar
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex justify-center pt-24 pb-20 px-4">
        <div className="w-full max-w-xl space-y-6">

          {/* Título */}
          <h2 className="text-2xl font-black">
            Cadastrar <span className="text-red-500">Partida</span>
          </h2>

          {/* Preview */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <Eye size={14} className="mx-auto mb-2 text-zinc-500" />
            <p className="text-xl font-bold">{timeCasa} × {timeFora}</p>
            {form.estadio && (
              <p className="text-xs text-zinc-500 mt-1">{form.estadio}</p>
            )}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-5">

            <Field label="Tipo de Jogo" icon={Home}>
              <select value={form.tipo} onChange={set("tipo")} className={inputBase}>
                <option value="Casa">Casa</option>
                <option value="Fora">Fora</option>
              </select>
            </Field>

            <Field label="Adversário" icon={Swords} required>
              <input value={form.adversario} onChange={set("adversario")} className={inputBase} required />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Data" icon={CalendarDays} required>
                <input type="date" value={form.data} onChange={set("data")} className={inputBase} required />
              </Field>

              <Field label="Horário" icon={Clock} required>
                <input type="time" value={form.horario} onChange={set("horario")} className={inputBase} required />
              </Field>
            </div>

            {/* ✅ NOVO CAMPO ESTÁDIO */}
            <Field label="Estádio" icon={MapPin} required>
              <input
                type="text"
                value={form.estadio}
                onChange={set("estadio")}
                placeholder="Ex: Maracanã"
                className={inputBase}
                required
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold ${
                enviado
                  ? "bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {enviado
                ? "✓ Cadastrado com sucesso"
                : loading
                  ? "Cadastrando..."
                  : "Cadastrar Partida"}
            </button>

          </form>

        </div>
      </main>
    </div>
  );
}

export default Bolao;