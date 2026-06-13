import React, { useState, useEffect, useRef } from "react";
import { TigerHeartMascot, SquirrelMascot, RoosterMascot } from "./Mascots";
import { Send, Coffee, Award, Sparkles, Volume2, VolumeX, List, Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface GuestbookMessage {
  id: string;
  sender: string;
  itemBought: string; // "Coffee", "Boba", "Pizza", "Donut"
  price: number;
  message: string;
  timestamp: Date;
}

export const InteractiveGuestbook: React.FC = () => {
  // Load messages from localStorage if there
  const [messages, setMessages] = useState<GuestbookMessage[]>(() => {
    try {
      const saved = localStorage.getItem("portfolio_messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      }
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: "1",
        sender: "Asep Tech",
        itemBought: "☕ Kopi Tubruk",
        price: 15000,
        message: "Keren banget design portfolio-nya bang! Brutalist tapi super rapih & responsive.",
        timestamp: new Date(Date.now() - 3600000 * 2),
      },
      {
        id: "2",
        sender: "Clara Desain",
        itemBought: "🧋 Boba Brown Sugar",
        price: 25000,
        message: "Suka banget sama animasi transisi dan mascot-mascot imutnya! Sukses terus ya Uti Iffat!",
        timestamp: new Date(Date.now() - 3600000 * 1),
      },
    ];
  });

  // Entry inputs
  const [sender, setSender] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedItem, setSelectedItem] = useState<{ name: string; price: number; icon: string }>({
    name: "☕ Kopi Tubruk",
    price: 15000,
    icon: "Coffee",
  });

  const itemsList = [
    { name: "🍩 Donut Manis", price: 10000, icon: "🍩" },
    { name: "☕ Kopi Tubruk", price: 15000, icon: "☕" },
    { name: "🧋 Boba Sugar", price: 25000, icon: "🧋" },
    { name: "🍕 Pizza Keju", price: 50000, icon: "🍕" },
    { name: "🚀 Roket Booster", price: 100000, icon: "🚀" },
  ];

  // System states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeAlert, setActiveAlert] = useState<GuestbookMessage | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound generator
  const triggerCoinChime = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(880.00, now + 0.16); // A5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.log("Audio contextual playback blocked or unsupported:", e);
    }
  };

  const triggerTTS = (msg: GuestbookMessage) => {
    if (!ttsEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    
    const text = `${msg.sender} mengirimkan ${msg.itemBought}. Pesan: ${msg.message || "Tancap gas terus!"}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    
    // Find Indonesian voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith("id-ID") || v.lang.includes("Indonesian"));
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 1.05;
    utterance.pitch = 1.15;
    window.speechSynthesis.speak(utterance);
  };

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.trim()) {
      alert("Masukkan nama panggilan Anda dulu!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: GuestbookMessage = {
        id: Date.now().toString(),
        sender: sender.trim(),
        itemBought: selectedItem.name,
        price: selectedItem.price,
        message: messageText.trim() || "Semangat terus berkarya & coding!",
        timestamp: new Date(),
      };

      const updated = [newMessage, ...messages];
      setMessages(updated);
      try {
        localStorage.setItem("portfolio_messages", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      // Show alert & sound
      setActiveAlert(newMessage);
      triggerCoinChime();
      
      setTimeout(() => {
        triggerTTS(newMessage);
      }, 500);

      // Reset
      setSender("");
      setMessageText("");
      setIsSubmitting(false);
    }, 600);
  };

  // Close active alert after 6 seconds
  useEffect(() => {
    if (activeAlert) {
      const t = setTimeout(() => {
        setActiveAlert(null);
      }, 6500);
      return () => clearTimeout(t);
    }
  }, [activeAlert]);

  const clearGuestbook = () => {
    if (confirm("Hapus semua pesan simulasi buku tamu?")) {
      setMessages([]);
      localStorage.removeItem("portfolio_messages");
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Simulation Overlay Banner */}
      <AnimatePresence>
        {activeAlert && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -100 }}
              className="bg-[#FFD166] text-black border-4 border-black p-6 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] text-center max-w-sm pointer-events-auto"
            >
              <div className="w-20 h-20 mx-auto mb-2 animate-bounce">
                {activeAlert.price >= 50000 ? (
                  <RoosterMascot className="w-16 h-16 mx-auto" />
                ) : activeAlert.price >= 25000 ? (
                  <TigerHeartMascot className="w-16 h-16 mx-auto" />
                ) : (
                  <SquirrelMascot className="w-16 h-16 mx-auto" />
                )}
              </div>
              <h4 className="text-lg font-black font-display text-zinc-950 uppercase tracking-tight">
                {activeAlert.sender}
              </h4>
              <span className="inline-block px-3 py-1 bg-white border-2 border-black rounded-lg text-xs font-black text-rose-600 mt-1 shadow-[1.5px_1.5px_0px_#000]">
                Traktir {activeAlert.itemBought} (+Rp {activeAlert.price.toLocaleString("id-ID")})
              </span>
              <p className="mt-3 bg-white/80 p-3 border-2 border-black rounded-xl font-semibold text-xs leading-relaxed font-mono">
                "{activeAlert.message}"
              </p>
              <button
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setActiveAlert(null);
                }}
                className="mt-3 px-3 py-1 bg-white hover:bg-yellow-50 border-2 border-black rounded-lg text-[9px] font-mono font-bold"
              >
                [ Tutup Alert ]
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Guestbook Form Card */}
      <div className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] p-5 md:p-6 space-y-5">
        <div className="flex justify-between items-center bg-[#FF9F1C]/10 border-2 border-[#FF9F1C] p-3.5 rounded-xl">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#FF9F1C]" />
            <div>
              <h3 className="text-sm font-black text-zinc-900">Traktir Kopi / Tinggalkan Pesan</h3>
              <p className="text-[11px] font-bold text-gray-500 font-mono">Dukung portfolio saya & saksikan robot (TTS) bersuara!</p>
            </div>
          </div>
          <div className="flex gap-2 text-zinc-700 shrink-0">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                triggerCoinChime();
              }}
              className={`p-1.5 border border-black rounded-lg transition-all ${soundEnabled ? "bg-[#9DF5DB]" : "bg-gray-100"}`}
              title="Suara Koin"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-black" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`p-1.5 border border-black rounded-lg text-xs font-mono font-bold transition-all ${ttsEnabled ? "bg-[#FFBF69]" : "bg-gray-100"}`}
              title="Suara Robot (TTS)"
            >
              TTS: {ttsEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        <form onSubmit={handlePostMessage} className="space-y-4">
          {/* Guest Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase text-gray-500 font-mono">Nama Pengunjung *</label>
              <input
                type="text"
                required
                maxLength={40}
                placeholder="Asep, Bro, Recruiter Hebat, Anonim"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF9F1C] text-xs shadow-[2px_2px_0px_#000]"
              />
            </div>

            {/* Select Item to Treat */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase text-gray-500 font-mono">Pilih Traktiran Kustom</label>
              <select
                value={selectedItem.name}
                onChange={(e) => {
                  const found = itemsList.find(i => i.name === e.target.value);
                  if (found) setSelectedItem({ name: found.name, price: found.price, icon: found.icon });
                }}
                className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-[#FF9F1C] text-xs shadow-[2px_2px_0px_#000] cursor-pointer"
              >
                {itemsList.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.icon} {item.name} (Rp {item.price.toLocaleString("id-ID")})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guest message text */}
          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase text-gray-500 font-mono">Pesan Semangat / Feedback</label>
            <textarea
              rows={2}
              maxLength={150}
              placeholder="Wah, mantap dan interaktif banget portfolionya! Ayo ngobrol atau hire saya..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full p-3 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF9F1C] text-xs shadow-[2px_2px_0px_#000]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#FFD166] hover:bg-[#f2c253] border-3 border-black rounded-xl font-display font-black text-xs uppercase tracking-wider text-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Mengirim Dukungan...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-black" />
                Kirim Traktiran Virtual & Bersuara!
              </>
            )}
          </button>
        </form>
      </div>

      {/* Guest Feed */}
      <div className="bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] p-5 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-black text-zinc-900 flex items-center gap-1.5">
            <List className="w-4 h-4 text-blue-500" />
            Interaksi Pengunjung ({messages.length})
          </h4>
          {messages.length > 0 && (
            <button
              onClick={clearGuestbook}
              className="text-[10px] font-heading font-black text-rose-500 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Hapus Histori
            </button>
          )}
        </div>

        <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs font-mono font-bold">
              Belum ada pesan. Yuk, jadi yang pertama mengirim pesan dukungan!
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className="p-3 bg-[#FFFDF2] border-2 border-black rounded-xl hover:shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] transition-all text-xs"
              >
                <div className="flex justify-between items-center font-bold">
                  <span className="text-zinc-900 font-extrabold">{m.sender}</span>
                  <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 border border-black rounded-[6px] text-[10px] font-black">
                    {m.itemBought}
                  </span>
                </div>
                <p className="text-gray-600 italic mt-1.5 bg-white p-2 border border-dashed border-gray-200 rounded leading-relaxed text-[11px] font-semibold whitespace-pre-wrap font-mono">
                  "{m.message}"
                </p>
                <div className="text-[9px] text-gray-400 font-mono text-right mt-1.5">
                  {m.timestamp.toLocaleDateString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};
