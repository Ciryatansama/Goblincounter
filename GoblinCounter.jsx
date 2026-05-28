import React, { useState } from "react";
import { motion } from "framer-motion";
import { Skull, RotateCcw, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-red-950 to-orange-950 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-black/30 border border-orange-500/30 rounded-full px-4 py-2 mb-4">
            <Skull className="w-5 h-5 text-orange-300" />
            <span className="uppercase tracking-widest text-xs text-orange-200">Magic Token Tool</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">Goblin Counter</h1>
          <p className="text-orange-100/80 mt-2">Track je tapped en untapped goblins.</p>
        </div>

        <Card className="bg-black/35 border-orange-500/30 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CounterBox
                label="Untapped"
                value={untapped}
                onPlus={addUntapped}
                onMinus={removeUntapped}
              />
              <CounterBox
                label="Tapped"
                value={tapped}
                tapped
                onPlus={addTapped}
                onMinus={removeTapped}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                onClick={tapGoblin}
                disabled={untapped === 0}
                className="h-14 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40"
              >
                Tap 1 Goblin
              </Button>
              <Button
                onClick={untapGoblin}
                disabled={tapped === 0}
                className="h-14 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40"
              >
                Untap 1 Goblin
              </Button>
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/10">
              <span className="text-orange-100/80">Total Goblins</span>
              <span className="text-2xl font-black">{total}</span>
            </div>

            <Button
              onClick={reset}
              variant="outline"
              className="w-full h-12 rounded-xl border-orange-300/30 bg-transparent text-orange-100 hover:bg-orange-500/20"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Reset
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function CounterBox({ label, value, onPlus, onMinus, tapped = false }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
      <div className="text-sm uppercase tracking-widest text-orange-100/70 mb-2">{label}</div>
      <motion.div
        key={value}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className={`text-6xl font-black ${tapped ? "rotate-12 text-orange-300" : "text-emerald-300"}`}
      >
        {value}
      </motion.div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button onClick={onMinus} className="rounded-xl bg-black/40 hover:bg-black/60">
          <Minus className="w-4 h-4" />
        </Button>
        <Button onClick={onPlus} className="rounded-xl bg-black/40 hover:bg-black/60">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
