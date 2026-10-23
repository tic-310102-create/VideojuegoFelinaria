import { useEffect, useState } from "react";
import recetas from "./data/recetas.js";
import Ilustracion from "./Ilustraciones.jsx";

function estilo(r) {
  return { "--fondo": r.fondo, "--tinta": r.tinta, "--acento": r.acento };
}

function Inicio({ onVerRecetas }) {
  return (
    <main className="inicio">
      <div className="inicio-texto">
        <p className="inicio-saludo">Cocina de casa, dos recetas a la vez</p>
        <h1 className="inicio-titulo">
          Mi
          <br />
          Recetario
        </h1>
        <p className="inicio-desc">
          Unos tacos al pastor para la comida y un pastel de chocolate para el
          postre. Con lista del mandado y paso a paso.
        </p>
        <button className="inicio-cta" onClick={onVerRecetas}>
          Ver las recetas
        </button>
      </div>

      <div className="inicio-tiras" aria-hidden="true">
        {recetas.map((r) => (
          <div key={r.id} className="tira" style={estilo(r)}>
            <span>{r.nombre}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function Portada({ onAbrir, onInicio }) {
  return (
    <main className="portada">
      <button className="a-inicio" onClick={onInicio}>
        Inicio
      </button>
      {recetas.map((r) => (
        <button
          key={r.id}
          className="panel"
          style={estilo(r)}
          onClick={() => onAbrir(r.id)}
          aria-label={`Abrir receta de ${r.nombre}`}
        >
          <span className="panel-meta">
            {r.categoria}, {r.tiempo}, {r.porciones} porciones
          </span>
          <span className="panel-nombre">{r.nombre}</span>
          <span className="panel-desc">{r.descripcion}</span>
          <span className="panel-cta">Abrir receta</span>
        </button>
      ))}
    </main>
  );
}

function Receta({ receta, onVolver }) {
  const [tachados, setTachados] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const alTeclear = (e) => e.key === "Escape" && onVolver();
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [onVolver]);

  const alternar = (i) => setTachados((t) => ({ ...t, [i]: !t[i] }));
  const faltan =
    receta.ingredientes.length - Object.values(tachados).filter(Boolean).length;

  return (
    <main className="receta" style={estilo(receta)}>
      <button className="volver" onClick={onVolver}>
        Volver a las recetas
      </button>

      <header className="receta-cabeza">
        <div className="receta-info">
          <h1>{receta.nombre}</h1>
          <p className="receta-intro">{receta.descripcion}</p>
          <dl className="datos">
            <div>
              <dt>Tiempo</dt>
              <dd>{receta.tiempo}</dd>
            </div>
            <div>
              <dt>Rinde</dt>
              <dd>{receta.porciones} porciones</dd>
            </div>
            <div>
              <dt>Dificultad</dt>
              <dd>{receta.dificultad}</dd>
            </div>
          </dl>
        </div>
        <div className="receta-imagen">
          <Ilustracion receta={receta} />
        </div>
      </header>

      <div className="receta-cuerpo">
        <section className="mandado" aria-labelledby="t-ing">
          <h2 id="t-ing">Lista del mandado</h2>
          <p className="mandado-resumen">
            {faltan === 0 ? "Ya tienes todo." : `Te faltan ${faltan} por conseguir.`}
          </p>
          <ul>
            {receta.ingredientes.map((ing, i) => (
              <li key={i}>
                <label className={tachados[i] ? "listo" : ""}>
                  <input
                    type="checkbox"
                    checked={!!tachados[i]}
                    onChange={() => alternar(i)}
                  />
                  <span>{ing}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="pasos" aria-labelledby="t-pasos">
          <h2 id="t-pasos">Paso a paso</h2>
          <ol>
            {receta.pasos.map((p, i) => (
              <li key={i}>
                <span className="num" aria-hidden="true">
                  {i + 1}
                </span>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  // vista: "inicio" | "recetas" | id de una receta
  const [vista, setVista] = useState("inicio");
  const receta = recetas.find((r) => r.id === vista);

  if (receta) {
    return <Receta receta={receta} onVolver={() => setVista("recetas")} />;
  }
  if (vista === "recetas") {
    return <Portada onAbrir={setVista} onInicio={() => setVista("inicio")} />;
  }
  return <Inicio onVerRecetas={() => setVista("recetas")} />;
}
