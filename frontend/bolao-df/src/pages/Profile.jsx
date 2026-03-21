import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Camera, Trash2, Save, ArrowLeft, Phone, Tag, CheckCircle, AlertCircle, Shield } from "lucide-react";

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

// ─── Profile ─────────────────────────────────────────────────────────────────
function Profile() {
  const navigate  = useNavigate();
  const fileRef   = useRef(null);

  const [foto, setFoto]       = useState(null);
  const [form, setForm]       = useState({ nome: "", apelido: "", telefone: "" });
  const [erro, setErro]       = useState("");
  const [salvo, setSalvo]     = useState(false);

  const set = (campo) => (e) => {
    setErro("");
    setSalvo(false);
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));
  };

  // Máscara de telefone
  const handleTelefone = (e) => {
    setErro("");
    setSalvo(false);
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    setForm((prev) => ({ ...prev, telefone: v }));
  };

  // Upload de foto
  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Remover foto
  const removerFoto = () => {
    setFoto(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // Salvar
  const handleSave = (e) => {
    e.preventDefault();
    if (!form.nome.trim()) {
      setErro("O nome é obrigatório.");
      return;
    }
    console.log("Perfil salvo:", { ...form, foto: foto ? "[imagem]" : null });
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">

        {/* ── Cabeçalho ── */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl shadow-lg shadow-red-900/40 mb-2">
            <Shield size={22} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Meu <span className="text-red-500">Perfil</span>
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Bolão Mengão</p>
        </div>

        {/* ── Card ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-2xl shadow-black/50">
          <form onSubmit={handleSave} className="space-y-6">

            {/* ── Foto de perfil ── */}
            <div className="flex flex-col items-center gap-4">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-700 bg-zinc-800 flex items-center justify-center transition-all duration-300 group-hover:border-red-500">
                  {foto ? (
                    <img src={foto} alt="Foto de perfil" className="w-full h-full object-cover" />
                  ) : (
                    <User size={36} className="text-zinc-600" />
                  )}
                </div>
                {/* Overlay de câmera ao hover */}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200"
                >
                  <Camera size={22} className="text-white" />
                </button>
              </div>

              {/* Botões de foto */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white
                    border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-full
                    transition-all duration-200 hover:bg-zinc-800"
                >
                  <Camera size={13} />
                  {foto ? "Trocar foto" : "Adicionar foto"}
                </button>

                {foto && (
                  <button
                    type="button"
                    onClick={removerFoto}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300
                      border border-red-500/30 hover:border-red-500/60 px-3 py-1.5 rounded-full
                      transition-all duration-200 hover:bg-red-950/30"
                  >
                    <Trash2 size={13} />
                    Remover
                  </button>
                )}
              </div>

              {/* Input file oculto */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFoto}
                className="hidden"
              />
            </div>

            {/* Divisor */}
            <div className="h-px bg-zinc-800" />

            {/* ── Campos ── */}
            <div className="space-y-4">
              <Field label="Nome" icon={User}>
                <input
                  type="text"
                  value={form.nome}
                  onChange={set("nome")}
                  placeholder="Digite seu nome"
                  className={inputClass}
                />
              </Field>

              <Field label="Apelido" icon={Tag}>
                <input
                  type="text"
                  value={form.apelido}
                  onChange={set("apelido")}
                  placeholder="Como te chamam? (opcional)"
                  className={inputClass}
                />
              </Field>

              <Field label="Telefone" icon={Phone}>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={handleTelefone}
                  placeholder="(00) 00000-0000"
                  className={inputClass}
                />
              </Field>
            </div>

            {/* ── Feedback ── */}
            {erro && (
              <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/30 rounded-lg px-3 py-2.5">
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400 font-medium">{erro}</p>
              </div>
            )}

            {salvo && (
              <div className="flex items-center gap-2 bg-green-950/40 border border-green-500/30 rounded-lg px-3 py-2.5">
                <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                <p className="text-xs text-green-400 font-medium">Perfil atualizado com sucesso!</p>
              </div>
            )}

            {/* ── Botão salvar ── */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700
                active:bg-red-800 text-white font-bold text-sm py-3 rounded-xl
                transition-all duration-200 hover:shadow-lg hover:shadow-red-950/50
                border border-red-500/50 hover:border-red-400"
            >
              <Save size={16} />
              Salvar Alterações
            </button>
          </form>
        </div>

        {/* ── Voltar ── */}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
        >
          <ArrowLeft size={13} />
          Voltar para o Dashboard
        </button>

      </div>
    </div>
  );
}

export default Profile;