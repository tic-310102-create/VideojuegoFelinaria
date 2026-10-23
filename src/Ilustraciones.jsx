// Ilustraciones originales hechas en SVG. Se ven sobre un círculo del color de acento.

function Tacos() {
  const taco = (x, y, s) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-64 0 A64 64 0 0 1 64 0 Z" fill="#e0a85a" />
      <path d="M-64 0 A64 64 0 0 1 64 0" fill="none" stroke="#b97d33" strokeWidth="4" />
      <circle cx="-34" cy="-56" r="15" fill="#8f2c14" />
      <circle cx="-10" cy="-66" r="16" fill="#a23518" />
      <circle cx="16" cy="-64" r="15" fill="#8f2c14" />
      <circle cx="38" cy="-54" r="13" fill="#a23518" />
      <rect x="-24" y="-76" width="12" height="12" rx="2" fill="#f5c33b" transform="rotate(20 -18 -70)" />
      <rect x="22" y="-72" width="12" height="12" rx="2" fill="#f5c33b" transform="rotate(-15 28 -66)" />
      <circle cx="3" cy="-76" r="6" fill="#3f8f3a" />
      <circle cx="-36" cy="-70" r="5" fill="#3f8f3a" />
      <circle cx="44" cy="-66" r="4" fill="#fff1d6" />
    </g>
  );

  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="Ilustración de tres tacos al pastor con piña y cilantro">
      <circle cx="200" cy="160" r="150" fill="var(--acento)" />
      <ellipse cx="200" cy="232" rx="165" ry="42" fill="#fff1d6" />
      <ellipse cx="200" cy="232" rx="135" ry="30" fill="none" stroke="#e8d3a8" strokeWidth="3" />
      {taco(100, 232, 0.95)}
      {taco(300, 232, 0.95)}
      {taco(200, 240, 1.1)}
      <circle cx="352" cy="262" r="22" fill="#4f8a2b" />
      <circle cx="352" cy="262" r="16" fill="#9ccc4e" />
      <path d="M352 262 L352 246 M352 262 L364 252 M352 262 L366 262 M352 262 L364 272 M352 262 L352 278 M352 262 L340 272 M352 262 L338 262 M352 262 L340 252" stroke="#4f8a2b" strokeWidth="2" />
    </svg>
  );
}

function Pastel() {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="Ilustración de un pastel de chocolate con cereza">
      <circle cx="200" cy="160" r="150" fill="var(--acento)" />
      <ellipse cx="200" cy="262" rx="150" ry="30" fill="#ffe3ee" />
      {/* cuerpo */}
      <path d="M105 150 V240 A95 22 0 0 0 295 240 V150 Z" fill="#7a4128" />
      <rect x="105" y="188" width="190" height="12" fill="#ffe3ee" />
      <path d="M105 150 V240 A95 22 0 0 0 150 260 V150 Z" fill="#000" opacity="0.08" />
      {/* cubierta */}
      <ellipse cx="200" cy="150" rx="95" ry="26" fill="#3d1d12" />
      <path d="M105 150 Q105 190 125 190 Q142 190 142 160 Q142 205 165 205 Q185 205 185 165 Q185 188 205 188 Q225 188 225 160 Q225 198 248 198 Q270 198 270 160 Q270 182 285 182 Q295 182 295 150 Z" fill="#3d1d12" />
      <ellipse cx="170" cy="144" rx="30" ry="6" fill="#fff" opacity="0.12" />
      {/* cereza */}
      <path d="M200 128 Q205 100 225 90" fill="none" stroke="#3f8f3a" strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="130" r="16" fill="#e0245e" />
      <circle cx="195" cy="125" r="4" fill="#fff" opacity="0.5" />
      {/* chispas */}
      <circle cx="150" cy="150" r="3" fill="#ffe3ee" />
      <circle cx="245" cy="146" r="3" fill="#ffe3ee" />
      <circle cx="220" cy="160" r="3" fill="#ffe3ee" />
      <circle cx="175" cy="162" r="3" fill="#ffe3ee" />
    </svg>
  );
}

const porReceta = { "tacos-al-pastor": Tacos, "pastel-de-chocolate": Pastel };

export default function Ilustracion({ receta }) {
  // Si la receta trae una foto propia (campo "foto"), se usa en lugar del dibujo.
  if (receta.foto) {
    return <img className="foto" src={receta.foto} alt={receta.nombre} />;
  }
  const Dibujo = porReceta[receta.id];
  return Dibujo ? <Dibujo /> : null;
}
