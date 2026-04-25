import { useState, useEffect, useCallback } from "react";

// ============================================================
// API CONFIG
// ============================================================
const BASE_URL = "http://localhost:8080/api";

const api = {
  get: (path) =>
    fetch(`${BASE_URL}${path}`).then((r) => {
      if (!r.ok) return r.json().then((e) => Promise.reject(e));
      return r.json();
    }),
  post: (path, body) =>
    fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => {
      if (!r.ok) return r.json().then((e) => Promise.reject(e));
      return r.json();
    }),
  put: (path, body) =>
    fetch(`${BASE_URL}${path}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => {
      if (!r.ok) return r.json().then((e) => Promise.reject(e));
      return r.json();
    }),
  patch: (path, body) =>
    fetch(`${BASE_URL}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }).then((r) => {
      if (!r.ok) return r.json().then((e) => Promise.reject(e));
      return r.json();
    }),
  delete: (path) =>
    fetch(`${BASE_URL}${path}`, { method: "DELETE" }).then((r) => {
      if (!r.ok) return r.json().then((e) => Promise.reject(e));
      return r.status === 204 ? null : r.json();
    }),
};

// ============================================================
// DESIGN TOKENS & GLOBAL STYLES
// ============================================================
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #CC0000;
    --red-dark: #990000;
    --red-light: #ff2222;
    --black: #0a0a0a;
    --dark: #111111;
    --dark2: #1a1a1a;
    --dark3: #222222;
    --border: rgba(255,255,255,0.08);
    --text: #f0f0f0;
    --muted: #888;
    --gold: #f0b429;
    --green: #22c55e;
    --radius: 10px;
  }

  body, #root {
    background: var(--black);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .bebas { font-family: 'Bebas Neue', cursive; }

  /* Layout */
  .app { display: flex; flex-direction: column; min-height: 100vh; }
  .main { flex: 1; padding: 0 0 80px; }
  .container { max-width: 900px; margin: 0 auto; padding: 0 16px; }
  .page { padding: 24px 0; }

  /* Nav */
  .nav {
    background: var(--dark);
    border-bottom: 2px solid var(--red);
    position: sticky; top: 0; z-index: 100;
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    height: 56px; max-width: 900px; margin: 0 auto; padding: 0 16px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Bebas Neue', cursive;
    font-size: 22px; color: var(--text); cursor: pointer;
    letter-spacing: 1px;
  }
  .logo-icon {
    width: 32px; height: 32px; background: var(--red);
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .nav-tabs { display: flex; gap: 2px; }
  .nav-tab {
    background: none; border: none; color: var(--muted);
    padding: 8px 14px; border-radius: 8px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    transition: all .15s;
  }
  .nav-tab:hover { color: var(--text); background: rgba(255,255,255,.05); }
  .nav-tab.active { color: var(--red-light); background: rgba(204,0,0,.12); }

  /* Bottom Nav (mobile) */
  .bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0;
    background: var(--dark); border-top: 1px solid var(--border);
    display: flex; z-index: 100;
  }
  .bottom-nav-btn {
    flex: 1; background: none; border: none; color: var(--muted);
    padding: 10px 4px 8px; cursor: pointer; font-size: 10px;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    transition: color .15s;
  }
  .bottom-nav-btn.active { color: var(--red-light); }
  .bottom-nav-btn svg { width: 20px; height: 20px; }

  /* Cards */
  .card {
    background: var(--dark2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px;
  }
  .card-red { border-color: rgba(204,0,0,.3); }

  /* Badges */
  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 100px;
    font-size: 11px; font-weight: 600; letter-spacing: .5px;
  }
  .badge-agendada { background: rgba(255,255,255,.08); color: var(--muted); }
  .badge-ativa { background: rgba(34,197,94,.15); color: #4ade80; }
  .badge-encerrada { background: rgba(255,255,255,.05); color: #555; }
  .badge-cancelada { background: rgba(204,0,0,.1); color: #f87171; }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 18px; border-radius: 8px; border: none;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600; transition: all .15s;
  }
  .btn:disabled { opacity: .4; cursor: not-allowed; }
  .btn-primary { background: var(--red); color: #fff; }
  .btn-primary:hover:not(:disabled) { background: var(--red-light); }
  .btn-ghost {
    background: rgba(255,255,255,.06); color: var(--text);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover:not(:disabled) { background: rgba(255,255,255,.1); }
  .btn-danger { background: rgba(204,0,0,.15); color: #f87171; border: 1px solid rgba(204,0,0,.25); }
  .btn-danger:hover:not(:disabled) { background: rgba(204,0,0,.25); }
  .btn-success { background: rgba(34,197,94,.15); color: #4ade80; border: 1px solid rgba(34,197,94,.25); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-full { width: 100%; justify-content: center; }

  /* Forms */
  .field { display: flex; flex-direction: column; gap: 6px; }
  .label { font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: .8px; }
  .input, .select {
    background: var(--dark3); border: 1px solid var(--border);
    border-radius: 8px; color: var(--text); padding: 10px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    transition: border-color .15s; outline: none; width: 100%;
  }
  .input:focus, .select:focus { border-color: var(--red); }
  .input::placeholder { color: var(--muted); }
  .select option { background: var(--dark3); }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

  /* Section header */
  .section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-family: 'Bebas Neue', cursive; font-size: 22px; letter-spacing: 1px; }
  .divider { height: 1px; background: var(--border); margin: 20px 0; }

  /* Toast */
  .toast-wrap {
    position: fixed; top: 16px; right: 16px; z-index: 999;
    display: flex; flex-direction: column; gap: 8px;
  }
  .toast {
    background: var(--dark2); border: 1px solid var(--border);
    border-radius: 8px; padding: 12px 16px;
    display: flex; align-items: center; gap: 10px;
    min-width: 260px; font-size: 14px;
    animation: slideIn .2s ease;
  }
  .toast-success { border-color: rgba(34,197,94,.3); }
  .toast-error { border-color: rgba(204,0,0,.3); }
  .toast-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .toast-success .toast-dot { background: #4ade80; }
  .toast-error .toast-dot { background: #f87171; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  /* Partida card */
  .partida-card {
    background: var(--dark2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 18px;
    display: flex; flex-direction: column; gap: 14px;
    transition: border-color .15s;
  }
  .partida-card:hover { border-color: rgba(204,0,0,.3); }
  .partida-card.ativa { border-color: rgba(34,197,94,.3); }
  .partida-top { display: flex; align-items: center; justify-content: space-between; }
  .partida-placar {
    display: flex; align-items: center; gap: 12px;
    justify-content: center;
  }
  .team-name { font-size: 14px; font-weight: 600; text-align: center; flex: 1; }
  .placar-gols {
    font-family: 'Bebas Neue', cursive; font-size: 36px;
    display: flex; gap: 8px; align-items: center;
  }
  .placar-sep { color: var(--muted); font-size: 28px; }
  .partida-meta { display: flex; gap: 16px; font-size: 12px; color: var(--muted); }
  .meta-item { display: flex; align-items: center; gap: 5px; }
  .partida-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  /* Ranking */
  .rank-table { width: 100%; border-collapse: collapse; }
  .rank-table th {
    font-size: 11px; font-weight: 600; color: var(--muted);
    text-transform: uppercase; letter-spacing: .8px;
    text-align: left; padding: 8px 12px; border-bottom: 1px solid var(--border);
  }
  .rank-table td { padding: 12px 12px; border-bottom: 1px solid rgba(255,255,255,.04); }
  .rank-table tr:last-child td { border-bottom: none; }
  .rank-table tr:hover td { background: rgba(255,255,255,.02); }
  .rank-pos {
    font-family: 'Bebas Neue', cursive; font-size: 20px;
    width: 36px; color: var(--muted);
  }
  .rank-pos.gold { color: var(--gold); }
  .rank-pos.silver { color: #aaa; }
  .rank-pos.bronze { color: #cd7f32; }
  .avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--red); display: flex; align-items: center;
    justify-content: center; font-weight: 700; font-size: 13px;
    flex-shrink: 0;
  }
  .rank-player { display: flex; align-items: center; gap: 10px; }
  .rank-pts { font-family: 'Bebas Neue', cursive; font-size: 22px; color: var(--red-light); }
  .stat-mini { font-size: 12px; color: var(--muted); }

  /* Palpite form */
  .score-input {
    display: flex; align-items: center; gap: 12px; justify-content: center;
    padding: 16px 0;
  }
  .score-num {
    display: flex; align-items: center; gap: 8px;
  }
  .score-btn {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid var(--border); background: var(--dark3);
    color: var(--text); font-size: 18px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all .1s;
  }
  .score-btn:hover { background: var(--red); border-color: var(--red); }
  .score-val {
    font-family: 'Bebas Neue', cursive; font-size: 42px;
    min-width: 44px; text-align: center;
  }
  .score-x { font-family: 'Bebas Neue', cursive; font-size: 28px; color: var(--muted); }

  /* Palpite item */
  .palpite-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.04);
  }
  .palpite-item:last-child { border-bottom: none; }
  .palpite-placar { font-family: 'Bebas Neue', cursive; font-size: 20px; }
  .pontos-badge {
    font-family: 'Bebas Neue', cursive; font-size: 16px;
    padding: 4px 10px; border-radius: 6px;
  }
  .pontos-3 { background: rgba(240,180,41,.15); color: var(--gold); }
  .pontos-1 { background: rgba(34,197,94,.12); color: #4ade80; }
  .pontos-0 { background: rgba(255,255,255,.05); color: var(--muted); }

  /* Loading */
  .spinner {
    width: 36px; height: 36px; border: 3px solid rgba(255,255,255,.1);
    border-top-color: var(--red); border-radius: 50%;
    animation: spin .7s linear infinite; margin: 40px auto;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-wrap { display: flex; justify-content: center; }
  .empty { text-align: center; color: var(--muted); padding: 40px; font-size: 14px; }

  /* Hero */
  .hero {
    background: linear-gradient(135deg, var(--dark2) 0%, rgba(100,0,0,.3) 100%);
    border-bottom: 1px solid var(--border);
    padding: 32px 0;
  }
  .hero-title { font-family: 'Bebas Neue', cursive; font-size: 48px; line-height: 1; }
  .hero-title span { color: var(--red); }
  .hero-sub { color: var(--muted); font-size: 14px; margin-top: 6px; }
  .hero-stats { display: flex; gap: 24px; margin-top: 20px; }
  .hero-stat { display: flex; flex-direction: column; gap: 2px; }
  .hero-stat-val { font-family: 'Bebas Neue', cursive; font-size: 28px; color: var(--red-light); }
  .hero-stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: .8px; }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; padding: 16px;
  }
  .modal {
    background: var(--dark2); border: 1px solid var(--border);
    border-radius: 14px; padding: 24px; width: 100%; max-width: 480px;
    max-height: 90vh; overflow-y: auto;
  }
  .modal-title { font-family: 'Bebas Neue', cursive; font-size: 22px; margin-bottom: 20px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end; }

  /* Tab pills */
  .tab-pills { display: flex; gap: 8px; margin-bottom: 20px; }
  .tab-pill {
    background: none; border: 1px solid var(--border);
    color: var(--muted); padding: 7px 16px; border-radius: 100px;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    transition: all .15s;
  }
  .tab-pill.active { background: var(--red); border-color: var(--red); color: #fff; }

  /* Responsive */
  @media (max-width: 600px) {
    .nav-tabs { display: none; }
    .hero-title { font-size: 36px; }
    .grid-2, .grid-3 { grid-template-columns: 1fr; }
    .placar-gols { font-size: 28px; }
  }
  @media (min-width: 601px) {
    .bottom-nav { display: none; }
    .main { padding-bottom: 24px; }
  }
`;

// ============================================================
// HELPERS
// ============================================================
const statusBadge = (status) => {
  const map = {
    AGENDADA: ["badge-agendada", "⏱ Agendada"],
    ATIVA: ["badge-ativa", "● Ativa"],
    ENCERRADA: ["badge-encerrada", "✓ Encerrada"],
    CANCELADA: ["badge-cancelada", "✕ Cancelada"],
  };
  const [cls, label] = map[status] || ["badge-agendada", status];
  return <span className={`badge ${cls}`}>{label}</span>;
};

const initials = (nome) =>
  nome
    ? nome
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

const fmtDate = (d) => {
  if (!d) return "";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
};

// ============================================================
// TOAST SYSTEM
// ============================================================
function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  return { toasts, push };
}

function ToastContainer({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <div className="toast-dot" />
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// PAGE: HOME
// ============================================================
function HomePage({ onNavigate }) {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/partidas"), api.get("/participantes/classificacao")])
      .then(([p, r]) => {
        setPartidas(p);
        setRanking(r.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  const ativa = partidas.find((p) => p.status === "ATIVA");
  const proximas = partidas.filter((p) => p.status === "AGENDADA").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="container">
          <h1 className="hero-title">
            BOLÃO DO <span>MENGÃO</span>
          </h1>
          <p className="hero-sub">Palpite na vitória rubro-negra</p>
          {!loading && (
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-val">{partidas.length}</span>
                <span className="hero-stat-label">Partidas</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-val">
                  {partidas.filter((p) => p.status === "ENCERRADA").length}
                </span>
                <span className="hero-stat-label">Encerradas</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-val">{ranking.length}</span>
                <span className="hero-stat-label">Líderes</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container page">
        {loading ? (
          <div className="loading-wrap">
            <div className="spinner" />
          </div>
        ) : (
          <>
            {/* Partida ativa */}
            {ativa && (
              <>
                <div className="section-head">
                  <h2 className="section-title bebas">🔴 BOLÃO ABERTO</h2>
                </div>
                <PartidaCard partida={ativa} onNavigate={onNavigate} showPalpite />
                <div className="divider" />
              </>
            )}

            {/* Top 3 */}
            {ranking.length > 0 && (
              <>
                <div className="section-head">
                  <h2 className="section-title bebas">🏆 TOP 3</h2>
                  <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("ranking")}>
                    Ver tudo
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {ranking.map((p) => (
                    <div key={p.participanteId} className="card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        className={`rank-pos ${p.posicao === 1 ? "gold" : p.posicao === 2 ? "silver" : "bronze"}`}
                        style={{ fontSize: 24, width: 32 }}
                      >
                        {p.posicao}°
                      </span>
                      <div className="avatar">{initials(p.nomeCompleto)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{p.nomeCompleto}</div>
                        <div className="stat-mini">{p.totalJogos} palpites</div>
                      </div>
                      <span className="rank-pts">{p.totalPontos}pts</span>
                    </div>
                  ))}
                </div>
                <div className="divider" />
              </>
            )}

            {/* Próximas */}
            {proximas.length > 0 && (
              <>
                <div className="section-head">
                  <h2 className="section-title bebas">📅 PRÓXIMAS</h2>
                  <button className="btn btn-ghost btn-sm" onClick={() => onNavigate("partidas")}>
                    Ver todas
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {proximas.map((p) => (
                    <PartidaCard key={p.id} partida={p} onNavigate={onNavigate} />
                  ))}
                </div>
              </>
            )}

            {partidas.length === 0 && (
              <div className="empty">Nenhuma partida cadastrada ainda.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PARTIDA CARD (componente reutilizável)
// ============================================================
function PartidaCard({ partida, onNavigate, showPalpite }) {
  return (
    <div className={`partida-card ${partida.status === "ATIVA" ? "ativa" : ""}`}>
      <div className="partida-top">
        {statusBadge(partida.status)}
        <span className="stat-mini">
          {fmtDate(partida.data)} {partida.horario && `• ${partida.horario.slice(0, 5)}`}
        </span>
      </div>

      <div className="partida-placar">
        <div className="team-name">{partida.timeCasa}</div>
        <div className="placar-gols">
          <span style={{ color: partida.golsTimeCasa != null ? "var(--text)" : "var(--muted)" }}>
            {partida.golsTimeCasa != null ? partida.golsTimeCasa : "-"}
          </span>
          <span className="placar-sep">×</span>
          <span style={{ color: partida.golsTimeFora != null ? "var(--text)" : "var(--muted)" }}>
            {partida.golsTimeFora != null ? partida.golsTimeFora : "-"}
          </span>
        </div>
        <div className="team-name">{partida.timeFora}</div>
      </div>

      {partida.estadio && (
        <div className="partida-meta">
          <span className="meta-item">🏟 {partida.estadio}</span>
        </div>
      )}

      {showPalpite && partida.status === "ATIVA" && (
        <button
          className="btn btn-primary btn-full"
          onClick={() => onNavigate("palpites", { partidaId: partida.id, partida })}
        >
          Fazer Palpite
        </button>
      )}
    </div>
  );
}

// ============================================================
// PAGE: PARTIDAS (admin)
// ============================================================
function PartidasPage({ toast }) {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showResultado, setShowResultado] = useState(null);
  const [form, setForm] = useState({ tipo: "Casa", adversario: "", data: "", horario: "", estadio: "" });
  const [resultForm, setResultForm] = useState({ golsTimeCasa: 0, golsTimeFora: 0 });

  const load = () => {
    setLoading(true);
    api.get("/partidas").then(setPartidas).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const cadastrar = async () => {
    try {
      await api.post("/partidas", form);
      toast("Partida cadastrada!", "success");
      setShowForm(false);
      setForm({ tipo: "Casa", adversario: "", data: "", horario: "", estadio: "" });
      load();
    } catch (e) {
      toast(e.message || "Erro ao cadastrar", "error");
    }
  };

  const ativar = async (id) => {
    try {
      await api.patch(`/partidas/${id}/ativar`);
      toast("Bolão ativado!", "success");
      load();
    } catch (e) {
      toast(e.message || "Erro", "error");
    }
  };

  const cancelarAtivo = async () => {
    try {
      await api.patch("/partidas/cancelar-ativo");
      toast("Bolão cancelado", "success");
      load();
    } catch (e) {
      toast(e.message || "Erro", "error");
    }
  };

  const registrarResultado = async () => {
    try {
      await api.patch(`/partidas/${showResultado}/resultado`, resultForm);
      toast("Resultado registrado e pontos calculados!", "success");
      setShowResultado(null);
      load();
    } catch (e) {
      toast(e.message || "Erro", "error");
    }
  };

  const [tab, setTab] = useState("todas");
  const filtered = tab === "todas" ? partidas : partidas.filter((p) => p.status === tab.toUpperCase());

  return (
    <div className="container page">
      <div className="section-head">
        <h2 className="section-title bebas">PARTIDAS</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
          + Nova Partida
        </button>
      </div>

      <div className="tab-pills">
        {["todas", "agendada", "ativa", "encerrada"].map((t) => (
          <button key={t} className={`tab-pill ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0 && <div className="empty">Nenhuma partida encontrada.</div>}
          {filtered.map((p) => (
            <div key={p.id} className={`partida-card ${p.status === "ATIVA" ? "ativa" : ""}`}>
              <div className="partida-top">
                {statusBadge(p.status)}
                <span className="stat-mini">#{p.id} • {fmtDate(p.data)}</span>
              </div>

              <div className="partida-placar">
                <div className="team-name">{p.timeCasa}</div>
                <div className="placar-gols">
                  <span>{p.golsTimeCasa != null ? p.golsTimeCasa : "-"}</span>
                  <span className="placar-sep">×</span>
                  <span>{p.golsTimeFora != null ? p.golsTimeFora : "-"}</span>
                </div>
                <div className="team-name">{p.timeFora}</div>
              </div>

              {p.estadio && (
                <div className="partida-meta">
                  <span className="meta-item">🏟 {p.estadio}</span>
                  {p.horario && <span className="meta-item">⏰ {p.horario.slice(0, 5)}</span>}
                </div>
              )}

              <div className="partida-actions">
                {p.status === "AGENDADA" && (
                  <button className="btn btn-success btn-sm" onClick={() => ativar(p.id)}>
                    ▶ Ativar Bolão
                  </button>
                )}
                {p.status === "ATIVA" && (
                  <>
                    <button className="btn btn-danger btn-sm" onClick={cancelarAtivo}>
                      ✕ Cancelar
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setShowResultado(p.id); setResultForm({ golsTimeCasa: 0, golsTimeFora: 0 }); }}>
                      ✓ Registrar Resultado
                    </button>
                  </>
                )}
                {p.status === "ENCERRADA" && (
                  <button className="btn btn-ghost btn-sm" onClick={() => { setShowResultado(p.id); setResultForm({ golsTimeCasa: p.golsTimeCasa, golsTimeFora: p.golsTimeFora }); }}>
                    📊 Ver Detalhes
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Nova Partida */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">NOVA PARTIDA</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="field">
                <label className="label">Flamengo joga</label>
                <select
                  className="select"
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                >
                  <option value="Casa">Em Casa (mandante)</option>
                  <option value="Fora">Fora (visitante)</option>
                </select>
              </div>
              <div className="field">
                <label className="label">Adversário</label>
                <input
                  className="input"
                  placeholder="Ex: Vasco"
                  value={form.adversario}
                  onChange={(e) => setForm({ ...form, adversario: e.target.value })}
                />
              </div>
              <div className="grid-2">
                <div className="field">
                  <label className="label">Data</label>
                  <input
                    type="date"
                    className="input"
                    value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label className="label">Horário</label>
                  <input
                    type="time"
                    className="input"
                    value={form.horario}
                    onChange={(e) => setForm({ ...form, horario: e.target.value })}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Estádio</label>
                <input
                  className="input"
                  placeholder="Ex: Maracanã"
                  value={form.estadio}
                  onChange={(e) => setForm({ ...form, estadio: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={cadastrar} disabled={!form.adversario || !form.data}>
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Resultado */}
      {showResultado && (
        <div className="modal-overlay" onClick={() => setShowResultado(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">REGISTRAR RESULTADO</h3>
            {(() => {
              const p = partidas.find((x) => x.id === showResultado);
              return p ? (
                <>
                  <p style={{ color: "var(--muted)", marginBottom: 16, fontSize: 14 }}>
                    {p.timeCasa} × {p.timeFora}
                  </p>
                  <div className="score-input">
                    <div style={{ textAlign: "center" }}>
                      <div className="stat-mini" style={{ marginBottom: 8 }}>{p.timeCasa}</div>
                      <div className="score-num">
                        <button className="score-btn" onClick={() => setResultForm((f) => ({ ...f, golsTimeCasa: Math.max(0, f.golsTimeCasa - 1) }))}>−</button>
                        <span className="score-val">{resultForm.golsTimeCasa}</span>
                        <button className="score-btn" onClick={() => setResultForm((f) => ({ ...f, golsTimeCasa: f.golsTimeCasa + 1 }))}>+</button>
                      </div>
                    </div>
                    <span className="score-x">×</span>
                    <div style={{ textAlign: "center" }}>
                      <div className="stat-mini" style={{ marginBottom: 8 }}>{p.timeFora}</div>
                      <div className="score-num">
                        <button className="score-btn" onClick={() => setResultForm((f) => ({ ...f, golsTimeFora: Math.max(0, f.golsTimeFora - 1) }))}>−</button>
                        <span className="score-val">{resultForm.golsTimeFora}</span>
                        <button className="score-btn" onClick={() => setResultForm((f) => ({ ...f, golsTimeFora: f.golsTimeFora + 1 }))}>+</button>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: "rgba(204,0,0,.08)", border: "1px solid rgba(204,0,0,.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "var(--muted)", marginBottom: 4 }}>
                    ⚡ Ao confirmar, os palpites serão calculados automaticamente (3pts placar exato, 1pt gols do Flamengo).
                  </div>
                </>
              ) : null;
            })()}
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowResultado(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={registrarResultado}>
                Confirmar Resultado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PAGE: PALPITES
// ============================================================
function PalpitesPage({ toast, initialData }) {
  const [partidas, setPartidas] = useState([]);
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartida, setSelectedPartida] = useState(initialData?.partidaId || null);
  const [palpites, setPalpites] = useState([]);
  const [loadingPalpites, setLoadingPalpites] = useState(false);

  const [form, setForm] = useState({ participanteId: "", golsCasa: 0, golsFora: 0 });

  useEffect(() => {
    Promise.all([api.get("/partidas/disponiveis"), api.get("/participantes")])
      .then(([p, part]) => {
        setPartidas(p);
        setParticipantes(part);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPartida) { setPalpites([]); return; }
    setLoadingPalpites(true);
    api.get(`/palpites/partida/${selectedPartida}`)
      .then(setPalpites)
      .finally(() => setLoadingPalpites(false));
  }, [selectedPartida]);

  const partida = partidas.find((p) => p.id === selectedPartida) ||
    (initialData?.partida ? initialData.partida : null);

  const registrar = async () => {
    if (!form.participanteId || !selectedPartida) {
      toast("Selecione participante e partida", "error"); return;
    }
    try {
      await api.post("/palpites", {
        participanteId: Number(form.participanteId),
        partidaId: selectedPartida,
        palpiteGolsCasa: form.golsCasa,
        palpiteGolsFora: form.golsFora,
      });
      toast("Palpite registrado! 🎯", "success");
      setForm({ participanteId: "", golsCasa: 0, golsFora: 0 });
      api.get(`/palpites/partida/${selectedPartida}`).then(setPalpites);
    } catch (e) {
      toast(e.message || "Erro ao registrar palpite", "error");
    }
  };

  if (loading) return <div className="loading-wrap" style={{ marginTop: 60 }}><div className="spinner" /></div>;

  return (
    <div className="container page">
      <h2 className="section-title bebas" style={{ marginBottom: 20 }}>PALPITES</h2>

      {/* Selecionar partida */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="field">
          <label className="label">Selecionar Partida</label>
          <select
            className="select"
            value={selectedPartida || ""}
            onChange={(e) => setSelectedPartida(Number(e.target.value) || null)}
          >
            <option value="">Escolha uma partida...</option>
            {partidas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nomeExibicao || `${p.timeCasa} × ${p.timeFora}`} — {fmtDate(p.data)} [{p.status}]
              </option>
            ))}
          </select>
        </div>

        {partida && (
          <>
            <div className="divider" />
            {/* Formulário de palpite */}
            <div style={{ marginBottom: 14 }}>
              <div className="label" style={{ marginBottom: 10 }}>Novo Palpite</div>
              <div className="field" style={{ marginBottom: 14 }}>
                <label className="label">Participante</label>
                <select
                  className="select"
                  value={form.participanteId}
                  onChange={(e) => setForm({ ...form, participanteId: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  {participantes.map((p) => (
                    <option key={p.id} value={p.id}>{p.nomeCompleto}</option>
                  ))}
                </select>
              </div>

              <div className="score-input">
                <div style={{ textAlign: "center" }}>
                  <div className="stat-mini" style={{ marginBottom: 8 }}>{partida.timeCasa}</div>
                  <div className="score-num">
                    <button className="score-btn" onClick={() => setForm((f) => ({ ...f, golsCasa: Math.max(0, f.golsCasa - 1) }))}>−</button>
                    <span className="score-val">{form.golsCasa}</span>
                    <button className="score-btn" onClick={() => setForm((f) => ({ ...f, golsCasa: f.golsCasa + 1 }))}>+</button>
                  </div>
                </div>
                <span className="score-x">×</span>
                <div style={{ textAlign: "center" }}>
                  <div className="stat-mini" style={{ marginBottom: 8 }}>{partida.timeFora}</div>
                  <div className="score-num">
                    <button className="score-btn" onClick={() => setForm((f) => ({ ...f, golsFora: Math.max(0, f.golsFora - 1) }))}>−</button>
                    <span className="score-val">{form.golsFora}</span>
                    <button className="score-btn" onClick={() => setForm((f) => ({ ...f, golsFora: f.golsFora + 1 }))}>+</button>
                  </div>
                </div>
              </div>

              <button className="btn btn-primary btn-full" onClick={registrar} disabled={!form.participanteId}>
                Registrar Palpite
              </button>
            </div>
          </>
        )}
      </div>

      {/* Lista de palpites */}
      {selectedPartida && (
        <div className="card">
          <div className="section-head" style={{ marginBottom: 12 }}>
            <span className="label">Palpites registrados</span>
            <span className="stat-mini">{palpites.length} total</span>
          </div>
          {loadingPalpites ? (
            <div className="loading-wrap"><div className="spinner" style={{ margin: "20px auto" }} /></div>
          ) : palpites.length === 0 ? (
            <div className="empty" style={{ padding: "20px 0" }}>Nenhum palpite ainda.</div>
          ) : (
            palpites.map((p) => (
              <div key={p.id} className="palpite-item">
                <div className="rank-player">
                  <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>
                    {initials(p.participanteNome)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.participanteNome}</div>
                    <div className="stat-mini">
                      {partida?.timeCasa} × {partida?.timeFora}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="palpite-placar">
                    {p.palpiteGolsCasa} × {p.palpiteGolsFora}
                  </span>
                  {p.pontos != null && (
                    <span className={`pontos-badge ${p.pontos === 3 ? "pontos-3" : p.pontos === 1 ? "pontos-1" : "pontos-0"}`}>
                      {p.pontos}pts
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PAGE: RANKING
// ============================================================
function RankingPage() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/participantes/classificacao").then(setRanking).finally(() => setLoading(false));
  }, []);

  const posStyle = (pos) => {
    if (pos === 1) return "gold";
    if (pos === 2) return "silver";
    if (pos === 3) return "bronze";
    return "";
  };

  return (
    <div className="container page">
      <h2 className="section-title bebas" style={{ marginBottom: 20 }}>🏆 CLASSIFICAÇÃO</h2>
      {loading ? (
        <div className="loading-wrap"><div className="spinner" /></div>
      ) : ranking.length === 0 ? (
        <div className="empty">Nenhum participante na classificação ainda.</div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="rank-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Participante</th>
                <th style={{ textAlign: "right" }}>Pts</th>
                <th style={{ textAlign: "right" }}>J</th>
                <th style={{ textAlign: "right" }}>V</th>
                <th style={{ textAlign: "right" }}>%V</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((p) => (
                <tr key={p.participanteId}>
                  <td>
                    <span className={`rank-pos ${posStyle(p.posicao)}`}>{p.posicao}°</span>
                  </td>
                  <td>
                    <div className="rank-player">
                      <div className="avatar">{initials(p.nomeCompleto)}</div>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{p.nomeCompleto}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span className="rank-pts">{p.totalPontos}</span>
                  </td>
                  <td style={{ textAlign: "right", color: "var(--muted)", fontSize: 13 }}>{p.totalJogos}</td>
                  <td style={{ textAlign: "right", color: "var(--muted)", fontSize: 13 }}>{p.totalVitorias}</td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: 11, fontWeight: 600, padding: "2px 8px",
                        borderRadius: 100,
                        background: p.taxaVitoria >= 50 ? "rgba(34,197,94,.15)" : "rgba(255,255,255,.06)",
                        color: p.taxaVitoria >= 50 ? "#4ade80" : "var(--muted)",
                      }}
                    >
                      {p.taxaVitoria}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="card" style={{ marginTop: 16, fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>
        <div style={{ fontWeight: 600, color: "var(--text)", marginBottom: 8, fontFamily: "'Bebas Neue', cursive", fontSize: 16 }}>SISTEMA DE PONTUAÇÃO</div>
        <div>🥇 <strong style={{ color: "var(--gold)" }}>3 pontos</strong> — Placar exato</div>
        <div>🥈 <strong style={{ color: "#4ade80" }}>1 ponto</strong> — Acertou os gols do Flamengo</div>
        <div>❌ <strong>0 pontos</strong> — Não acertou nenhum critério</div>
      </div>
    </div>
  );
}

// ============================================================
// PAGE: PARTICIPANTES
// ============================================================
function ParticipantesPage({ toast }) {
  const [participantes, setParticipantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: "", sobrenome: "", telefone: "" });
  const [palpitesModal, setPalpitesModal] = useState(null);
  const [palpites, setPalpites] = useState([]);

  const load = () => {
    setLoading(true);
    api.get("/participantes").then(setParticipantes).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const abrir = (p = null) => {
    if (p) {
      setEditando(p.id);
      setForm({ nome: p.nome, sobrenome: p.sobrenome, telefone: p.telefone });
    } else {
      setEditando(null);
      setForm({ nome: "", sobrenome: "", telefone: "" });
    }
    setShowForm(true);
  };

  const salvar = async () => {
    try {
      if (editando) {
        await api.put(`/participantes/${editando}`, form);
        toast("Participante atualizado!", "success");
      } else {
        await api.post("/participantes", form);
        toast("Participante cadastrado!", "success");
      }
      setShowForm(false);
      load();
    } catch (e) {
      toast(e.message || "Erro", "error");
    }
  };

  const desativar = async (id, nome) => {
    if (!confirm(`Desativar ${nome}?`)) return;
    try {
      await api.delete(`/participantes/${id}`);
      toast("Participante desativado", "success");
      load();
    } catch (e) {
      toast(e.message || "Erro", "error");
    }
  };

  const verPalpites = async (p) => {
    setPalpitesModal(p);
    const data = await api.get(`/palpites/participante/${p.id}`);
    setPalpites(data);
  };

  return (
    <div className="container page">
      <div className="section-head">
        <h2 className="section-title bebas">PARTICIPANTES</h2>
        <button className="btn btn-primary btn-sm" onClick={() => abrir()}>+ Cadastrar</button>
      </div>

      {loading ? (
        <div className="loading-wrap"><div className="spinner" /></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {participantes.length === 0 && <div className="empty">Nenhum participante cadastrado.</div>}
          {participantes.map((p) => (
            <div key={p.id} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="avatar">{initials(p.nomeCompleto)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{p.nomeCompleto}</div>
                <div className="stat-mini">{p.telefone} • {p.totalPontos}pts • {p.totalJogos} palpites</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => verPalpites(p)}>📊</button>
                <button className="btn btn-ghost btn-sm" onClick={() => abrir(p)}>✏️</button>
                <button className="btn btn-danger btn-sm" onClick={() => desativar(p.id, p.nomeCompleto)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Cadastro/Edição */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editando ? "EDITAR" : "NOVO"} PARTICIPANTE</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="grid-2">
                <div className="field">
                  <label className="label">Nome</label>
                  <input className="input" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                </div>
                <div className="field">
                  <label className="label">Sobrenome</label>
                  <input className="input" placeholder="Sobrenome" value={form.sobrenome} onChange={(e) => setForm({ ...form, sobrenome: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label className="label">Telefone</label>
                <input className="input" placeholder="(21) 99999-0000" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={salvar} disabled={!form.nome || !form.telefone}>
                {editando ? "Salvar" : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Palpites do Participante */}
      {palpitesModal && (
        <div className="modal-overlay" onClick={() => setPalpitesModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">PALPITES — {palpitesModal.nomeCompleto}</h3>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div className="rank-pts">{palpitesModal.totalPontos}</div>
                <div className="stat-mini">pontos</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="rank-pts" style={{ color: "var(--text)" }}>{palpitesModal.totalJogos}</div>
                <div className="stat-mini">palpites</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="rank-pts" style={{ color: "#4ade80" }}>{palpitesModal.totalVitorias}</div>
                <div className="stat-mini">exatos</div>
              </div>
            </div>
            <div>
              {palpites.length === 0 ? (
                <div className="empty" style={{ padding: "20px 0" }}>Sem palpites ainda.</div>
              ) : (
                palpites.map((p) => (
                  <div key={p.id} className="palpite-item">
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{p.partidaNome}</div>
                      <div className="stat-mini">Palpite: {p.palpiteGolsCasa} × {p.palpiteGolsFora}</div>
                    </div>
                    {p.pontos != null && (
                      <span className={`pontos-badge ${p.pontos === 3 ? "pontos-3" : p.pontos === 1 ? "pontos-1" : "pontos-0"}`}>
                        {p.pontos}pts
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setPalpitesModal(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// BOTTOM NAV ICONS
// ============================================================
const icons = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  partidas: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  palpites: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  ranking: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  participantes: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
};

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "partidas", label: "Partidas" },
  { key: "palpites", label: "Palpites" },
  { key: "ranking", label: "Ranking" },
  { key: "participantes", label: "Jogadores" },
];

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [pageData, setPageData] = useState(null);
  const { toasts, push: toast } = useToast();

  const navigate = (p, data = null) => {
    setPage(p);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNavigate={navigate} />;
      case "partidas": return <PartidasPage toast={toast} />;
      case "palpites": return <PalpitesPage toast={toast} initialData={pageData} />;
      case "ranking": return <RankingPage />;
      case "participantes": return <ParticipantesPage toast={toast} />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-inner">
            <div className="nav-logo" onClick={() => navigate("home")}>
              <div className="logo-icon">🔴</div>
              BOLÃO DO MENGÃO
            </div>
            <div className="nav-tabs">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  className={`nav-tab ${page === item.key ? "active" : ""}`}
                  onClick={() => navigate(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main className="main">{renderPage()}</main>

        <div className="bottom-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`bottom-nav-btn ${page === item.key ? "active" : ""}`}
              onClick={() => navigate(item.key)}
            >
              {icons[item.key]}
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </>
  );
}
