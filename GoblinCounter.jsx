import React, { useState } from "react";
import "./App.css";

export default function GoblinCounter() {
  const [untapped, setUntapped] = useState(0);
  const [tapped, setTapped] = useState(0);

  const addUntapped = () => setUntapped((n) => n + 1);
  const removeUntapped = () => setUntapped((n) => Math.max(0, n - 1));
  const addTapped = () => setTapped((n) => n + 1);
  const removeTapped = () => setTapped((n) => Math.max(0, n - 1));

  const tapGoblin = () => {
    if (untapped > 0) {
      setUntapped((n) => n - 1);
      setTapped((n) => n + 1);
    }
  };

  const untapGoblin = () => {
    if (tapped > 0) {
      setTapped((n) => n - 1);
      setUntapped((n) => n + 1);
    }
  };

  const reset = () => {
    setUntapped(0);
    setTapped(0);
  };

  const total = untapped + tapped;

  return (
    <main className="app">
      <section className="card">
        <div className="badge">MTG Token Tool</div>
        <h1>Goblin Counter</h1>
        <p className="subtitle">Track je tapped en untapped goblins.</p>

        <div className="counters">
          <CounterBox
            label="Untapped"
            value={untapped}
            onPlus={addUntapped}
            onMinus={removeUntapped}
            type="untapped"
          />
          <CounterBox
            label="Tapped"
            value={tapped}
            onPlus={addTapped}
            onMinus={removeTapped}
            type="tapped"
          />
        </div>

        <div className="actions">
          <button onClick={tapGoblin} disabled={untapped === 0}>
            Tap 1 Goblin
          </button>
          <button onClick={untapGoblin} disabled={tapped === 0}>
            Untap 1 Goblin
          </button>
        </div>

        <div className="total">
          <span>Total Goblins</span>
          <strong>{total}</strong>
        </div>

        <button className="reset" onClick={reset}>
          Reset
        </button>
      </section>
    </main>
  );
}

function CounterBox({ label, value, onPlus, onMinus, type }) {
  return (
    <div className={`counter ${type}`}>
      <h2>{label}</h2>
      <div className="number">{value}</div>
      <div className="small-buttons">
        <button onClick={onMinus}>−</button>
        <button onClick={onPlus}>+</button>
      </div>
    </div>
  );
}
