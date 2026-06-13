import React, { useState, useEffect, useRef } from "react";
import { Donation, StreamerProfile } from "../types";
import { TigerHeartMascot, RoosterMascot, SquirrelMascot } from "./Mascots";
import { Volume2, VolumeX, Sparkles, Send, Coins, Bell, ListFilter, Play, ArrowLeft, Heart, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TippingSimulatorProps {
  initialUsername: string;
  onExit: () => void;
}

export const TippingSimulator: React.FC<TippingSimulatorProps> = ({
  initialUsername,
  onExit,
}) => {
  // Profiles state
  const [profile, setProfile] = useState<StreamerProfile>({
    username: initialUsername.toLowerCase().trim() || "streamer_keren",
    displayName: initialUsername || "Streamer Keren",
    bio: "Halo semuanya! Selamat datang di saweria ku. Dukungan kalian sangat membantu saya untuk terus live-stream dan bikin konten kreatif! 🎬🚀",
    balance: 450000,
    donations: [
      {
        id: "1",
        sender: "Budi_Gamer",
        amount: 50000,
        message: "Semangat live streamingnya bro! Main terus sampe malem!",
        paymentMethod: "GOPAY",
        timestamp: new Date(Date.now() - 3600000 * 3),
      },
      {
        id: "2",
        sender: "Rian_SBY",
        amount: 100000,
        message: "Request lagu dangdut dong bang biar makin asyik, mantap!",
        paymentMethod: "QRIS",
        timestamp: new Date(Date.now() - 3600000 * 1),
      },
      {
        id: "3",
        sender: "Siti_Cantik",
        amount: 25000,
        message: "Halo kak, salam kenal dari Bandung yaa. Kontennya ramah bgt.",
        paymentMethod: "OVO",
        timestamp: new Date(Date.now() - 600000),
      },
    ],
  });

  // Simulator Mode: 'fan' (support page) or 'streamer' (alert setup & overview)
  const [activeTab, setActiveTab] = useState<"fan" | "streamer">("fan");

  // Input states for tipping
  const [donorName, setDonorName] = useState("");
  const [tipAmount, setTipAmount] = useState<number>(10000);
  const [customAmount, setCustomAmount] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("QRIS");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Settings states
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [alertDuration, setAlertDuration] = useState(6); // seconds
  const [alertColor, setAlertColor] = useState("#FFD166"); // orange-yellow

  // Active Live Alert on Stream Overlay
  const [activeAlert, setActiveAlert] = useState<Donation | null>(null);
  const [alertQueue, setAlertQueue] = useState<Donation[]>([]);
  const [notificationSound, setNotificationSound] = useState(true);

  // Ref to play synth sound
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Quick preset options for tipping
  const presets = [10000, 25000, 50000, 100000, 250000, 500000];

  // Payment channel options with hex colors
  const paymentChannels = [
    { id: "GOPAY", label: "GOPAY", provider: "Indonesia" },
    { id: "OVO", label: "OVO", provider: "Indonesia" },
    { id: "QRIS", label: "QRIS", provider: "Indonesia" },
    { id: "DANA", label: "DANA", provider: "Indonesia" },
    { id: "LINKAJA", label: "LinkAja", provider: "Indonesia" },
    { id: "MAYA", label: "MAYA", provider: "Filipina" },
    { id: "GRABPAY", label: "GRABPAY", provider: "Filipina" },
  ];

  // Play retro synth coin sound
  const playAlertSound = () => {
    if (!notificationSound) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Coin pickup chime: two consecutive high pitch sound
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc1.frequency.setValueAtTime(987.77, now + 0.16); // B5
      
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);
    } catch (e) {
      console.log("Audio contextual playback error blocked:", e);
    }
  };

  // Speaks out the Indonesian donation text
  const speakTextToSpeech = (donation: Donation) => {
    if (!ttsEnabled || !("speechSynthesis" in window)) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Text pattern in Indonesian: "[Sender] menyawer [Amount] rupiah: [Message]"
    const cleanMessage = donation.message.trim() ? `, dengan pesan: ${donation.message}` : "";
    const phrase = `${donation.sender} menyawer ${donation.amount.toLocaleString("id-ID")} rupiah ${cleanMessage}`;
    
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "id-ID";
    
    // Try to find an Indonesian voice
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(v => v.lang.startsWith("id-ID") || v.lang.includes("Indonesian"));
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Cute cheerful alert pitch
    
    window.speechSynthesis.speak(utterance);
  };

  // Handles tipping payment simulation
  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) {
      alert("Silakan masukkan nama panggilan Anda!");
      return;
    }

    const finalAmount = customAmount ? parseInt(customAmount.replace(/\D/g, "")) || 0 : tipAmount;
    if (finalAmount < 1000) {
      alert("Batas minimum menyawer di Indonesia adalah IDR 1.000");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Create new donation
      const newDonation: Donation = {
        id: Date.now().toString(),
        sender: donorName.trim(),
        amount: finalAmount,
        message: donorMessage.trim() || "Semangat berkarya!",
        paymentMethod: selectedPayment,
        timestamp: new Date(),
      };

      // Add to streamer donations logs
      setProfile(prev => ({
        ...prev,
        balance: prev.balance + finalAmount,
        donations: [newDonation, ...prev.donations],
      }));

      // Queue for the live alert overlapping overlay
      setAlertQueue(prev => [...prev, newDonation]);

      // Reset form variables
      setDonorName("");
      setDonorMessage("");
      setCustomAmount("");
      setIsSubmitting(false);

      // Flash feedback
      alert(`🎉 Sukses mensimulasikan dukungan sebesar IDR ${finalAmount.toLocaleString("id-ID")} via ${selectedPayment}! Beralihlah ke tab "Tampilan Streamer" untuk melihat alert langsung.`);
    }, 800);
  };

  // Monitor alert queue and process them one by one
  useEffect(() => {
    if (activeAlert) return; // Wait for current alert to finish
    if (alertQueue.length === 0) return;

    // Pop the first item from queue
    const nextAlert = alertQueue[0];
    setAlertQueue(prev => prev.slice(1));
    setActiveAlert(nextAlert);

    // Audio sound cues and Voice TTS speaker
    playAlertSound();
    
    // Slight delay before TTS starts to let alert sound chime play first
    const ttsTimer = setTimeout(() => {
      speakTextToSpeech(nextAlert);
    }, 550);

    // Turn alert off after set seconds
    const dismissTimer = setTimeout(() => {
      setActiveAlert(null);
    }, alertDuration * 1000);

    return () => {
      clearTimeout(ttsTimer);
      clearTimeout(dismissTimer);
    };
  }, [alertQueue, activeAlert, alertDuration]);

  // Load voices at boot to make sure WebSpeech API resolves early
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFFDF2] text-zinc-900 font-sans pb-16">
      {/* Simulation Header */}
      <div className="w-full sticky top-0 max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center bg-[#FFFDF2] border-b-3 border-black gap-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 bg-[#4EA8DE] hover:bg-[#3d91c1] border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000] transition-all"
            title="Kembali ke Landing Page"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-0.5 bg-[#FFD166] border border-black rounded-full font-bold">
                SIMULATOR LIVE
              </span>
              <span className="text-sm font-mono font-bold text-gray-500">
                saweria.co/{profile.username}
              </span>
            </div>
            <h1 className="text-xl font-bold font-sans tracking-tight">
              Dashboard / Halaman Dukungan
            </h1>
          </div>
        </div>

        {/* Simulator Tabs Toggle */}
        <div className="flex bg-[#FFF] border-2 border-black p-1.5 rounded-xl shadow-[3px_3px_0px_#000]">
          <button
            onClick={() => setActiveTab("fan")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "fan"
                ? "bg-[#FF9F1C] border-2 border-black"
                : "hover:bg-amber-50"
            }`}
          >
            <Coins className="w-4 h-4" />
            💸 Kirim Saweran (Supporter)
          </button>
          <button
            onClick={() => setActiveTab("streamer")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "streamer"
                ? "bg-[#4EA8DE] border-2 border-black"
                : "hover:bg-blue-50"
            }`}
          >
            <Bell className="w-4 h-4" />
            📡 Tampilan Streamer & Alerts
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ==================== FAN SIDE: THE TIPPING PAGEW ==================== */}
        {activeTab === "fan" && (
          <>
            {/* Supporter Form Grid Column */}
            <div className="lg:col-span-7 bg-[#FFF] border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div className="p-6 bg-[#FF9F1C] border-b-3 border-black text-black">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-white border-2 border-black rounded-xl">
                    <TigerHeartMascot className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">{profile.displayName}</h2>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                      saweria.co/{profile.username}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium bg-orange-50/80 border-2 border-black p-3 rounded-xl">
                  {profile.bio}
                </p>
              </div>

              <form onSubmit={handleSendTip} className="p-6 space-y-5">
                {/* 1. Donor Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-black font-sans text-gray-800">
                    Nama Panggilan Kamu *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Fans Berat, Gamer Kece, Anonim"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] shadow-[2px_2px_0px_#000]"
                  />
                </div>

                {/* 2. Presets or Custom Amount */}
                <div className="space-y-3">
                  <label className="block text-sm font-black text-gray-800">
                    Jumlah Dukungan (IDR) *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {presets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setTipAmount(preset);
                          setCustomAmount("");
                        }}
                        className={`py-2 text-xs font-black rounded-lg border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000] transition-all ${
                          tipAmount === preset && !customAmount
                            ? "bg-[#FFBF69] border-[#FF9F1C] text-black"
                            : "bg-[#FFF] hover:bg-[#FFFAD6]"
                        }`}
                      >
                        Rp {preset.toLocaleString("id-ID")}
                      </button>
                    ))}
                  </div>

                  {/* Custom Number Input */}
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-black text-gray-500">
                      IDR
                    </span>
                    <input
                      type="text"
                      placeholder="Atau masukkan nominal kustom lainnya..."
                      value={customAmount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setCustomAmount(val ? parseInt(val).toLocaleString("id-ID") : "");
                      }}
                      className="w-full pl-14 pr-4 py-3 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] shadow-[2px_2px_0px_#000]"
                    />
                  </div>
                </div>

                {/* 3. Messages */}
                <div className="space-y-2">
                  <label className="block text-sm font-black text-gray-800">
                    Pesan Dukungan (Dibacakan Robot TTS)
                  </label>
                  <textarea
                    rows={3}
                    maxLength={200}
                    placeholder="Tulis pesan semangat kamu di sini! Maksimal 200 karakter..."
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full p-4 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] shadow-[2px_2px_0px_#000]"
                  />
                </div>

                {/* 4. Payment Options */}
                <div className="space-y-2">
                  <label className="block text-sm font-black text-gray-800">
                    Moda Pembayaran (E-Wallet & QR)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {paymentChannels.map((channel) => (
                      <button
                        key={channel.id}
                        type="button"
                        onClick={() => setSelectedPayment(channel.id)}
                        className={`p-3 text-xs font-black border-2 border-black rounded-xl flex flex-col items-center justify-center shadow-[2px_2px_0px_#000] transition-all ${
                          selectedPayment === channel.id
                            ? "bg-[#FFF] border-[#FF9F1C] ring-2 ring-[#FF9F1C]"
                            : "bg-[#FFFDF2] hover:bg-white"
                        }`}
                      >
                        <span className="text-gray-400 text-[9px] uppercase tracking-wider font-mono">
                          {channel.provider}
                        </span>
                        <span className="text-sm text-black mt-0.5">{channel.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submitting button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-lg font-black bg-[#FF9F1C] hover:bg-[#ff9505] border-3 border-black rounded-xl shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] active:translate-y-1 active:shadow-[0px_0px_0px_#000] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Memproses Simulasi...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Dukungan (Simulasi)
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar quick visual support guide / walkthrough */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-[#FFFF] border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-black mb-3 text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Bagaimana Cara Kerjanya?
                </h3>
                <ul className="space-y-3.5 text-sm font-semibold text-gray-600 list-decimal pl-4">
                  <li>Isi nama kustom Anda, jumlah nominal, dan pesan menarik dukungan Anda.</li>
                  <li>Klik tombol <strong className="text-black">Kirim Dukungan</strong> di bagian bawah form.</li>
                  <li>Dukungan Anda akan terkirim secara digital ke streamer simulator ini.</li>
                  <li>
                    Beralih ke tab <strong className="text-black">"Tampilan Streamer"</strong> untuk menyaksikan suara robot (TTS) membacakan pesan Anda dan menampilkan alert menggemaskan yang menari secara real-time!
                  </li>
                </ul>
              </div>

              {/* Character illustrations cards */}
              <div className="p-6 bg-[#FFD166] border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
                <SquirrelMascot className="w-24 h-24 mb-3" />
                <h4 className="text-md font-black">Suara Robot Terintegrasi!</h4>
                <p className="text-xs font-semibold text-gray-800 mt-1">
                  Kami menggunakan Web Speech API untuk membacakan saweran secara otomatis dalam Bahasa Indonesia agar terasa 100% nyata bagi streamer anda!
                </p>
              </div>
            </div>
          </>
        )}

        {/* ==================== STREAMER SIDE: WIDGET PREVIEW & EVENT LOGS ==================== */}
        {activeTab === "streamer" && (
          <>
            {/* Stream View Overlay Graphic Window */}
            <div className="lg:col-span-8 space-y-6">
              {/* Virtual Stream Screen with alerts */}
              <div className="relative w-full aspect-video bg-zinc-900 border-4 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col justify-between p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950">
                {/* Simulated game play display */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%]"></div>
                
                {/* Live Stream badge & game detail */}
                <div className="flex justify-between items-center z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 bg-red-600 rounded-full animate-ping absolute"></span>
                    <span className="w-3.5 h-3.5 bg-red-600 rounded-full z-10"></span>
                    <span className="text-xs text-white font-mono font-bold tracking-widest bg-red-600 px-2 py-0.5 rounded">
                      LIVE
                    </span>
                    <span className="text-xs font-mono text-zinc-300 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded">
                      Mobile Legends / Chatting
                    </span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    Viewer: 2,841 • FPS: 60
                  </div>
                </div>

                {/* Dynamic animated Donation Alert Popup inside OBS Screen overlay */}
                <div className="flex-1 flex items-center justify-center">
                  <AnimatePresence>
                    {activeAlert && (
                      <motion.div
                        initial={{ scale: 0.3, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.7, opacity: 0, y: -50 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="p-5 max-w-[450px] border-3 border-black rounded-2xl text-center shadow-[4px_4px_0px_#000] relative mx-auto"
                        style={{ backgroundColor: alertColor }}
                      >
                        {/* Jumping cute character mascot depending on donation amount */}
                        <div className="w-24 h-24 mx-auto mb-2 select-none animate-bounce">
                          {activeAlert.amount >= 100000 ? (
                            <RoosterMascot className="w-20 h-20 mx-auto" />
                          ) : activeAlert.amount >= 50000 ? (
                            <TigerHeartMascot className="w-20 h-20 mx-auto" />
                          ) : (
                            <SquirrelMascot className="w-20 h-20 mx-auto" />
                          )}
                        </div>

                        {/* Title text */}
                        <h2 className="text-xl font-serif tracking-tight font-black text-black">
                          {activeAlert.sender}
                        </h2>
                        
                        {/* Support Amount badge */}
                        <div className="inline-block px-3 py-1 bg-white border-2 border-black rounded-lg text-sm font-extrabold text-red-600 mt-1 shadow-[2px_2px_0px_#000]">
                          Mendonasikan IDR {activeAlert.amount.toLocaleString("id-ID")} !
                        </div>

                        {/* Message description box styled with neon label */}
                        {activeAlert.message && (
                          <div className="mt-3.5 p-3 bg-white/70 border border-black rounded-xl text-black font-semibold text-sm leading-relaxed max-h-24 overflow-y-auto font-mono">
                            "{activeAlert.message}"
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Screen stream frame footer overlay simulation */}
                <div className="flex justify-between items-end z-10 w-full bg-black/40 backdrop-blur-xs -mx-4 -mb-4 p-3 border-t border-zinc-800">
                  <div className="text-zinc-300 text-[10px] font-mono">
                    Overlay ID: <span className="text-amber-400 font-bold">saweria-alert-1093</span>
                  </div>
                  <div className="flex gap-2 items-center text-xs font-mono text-zinc-100">
                    <span className="text-green-400 font-bold">● ONLINE</span>
                    <span className="text-zinc-400">Hubungkan OBS Streamlabs/SE</span>
                  </div>
                </div>
              </div>

              {/* Stream Overlay Alert Settings Panel */}
              <div className="p-6 bg-[#FFFF] border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-black mb-4 text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Kustomisasi Alert Overlay (Simulasi OBS)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Alert Display Theme color */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500">
                      Warna Background Alert
                    </label>
                    <div className="flex gap-1.5 h-10">
                      {[
                        { color: "#FFD166", label: "Orange" },
                        { color: "#FEEAFA", label: "Pink" },
                        { color: "#4EA8DE", label: "Sky" },
                        { color: "#9DF5DB", label: "Mint" },
                        { color: "#EF4444", label: "Red" },
                      ].map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => setAlertColor(item.color)}
                          className={`flex-1 rounded-lg border-2 border-black transition-all ${
                            alertColor === item.color ? "ring-2 ring-black scale-110" : ""
                          }`}
                          style={{ backgroundColor: item.color }}
                          title={item.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Alert duration timer slider */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500">
                      Durasi Tampil (detik)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="3"
                        max="15"
                        value={alertDuration}
                        onChange={(e) => setAlertDuration(parseInt(e.target.value))}
                        className="w-full accent-black h-1.5 bg-gray-200 rounded-lg cursor-pointer"
                      />
                      <span className="font-mono font-bold text-sm bg-gray-100 px-2 py-0.5 border border-black rounded">
                        {alertDuration}s
                      </span>
                    </div>
                  </div>

                  {/* Voice / Sounds Toggle switch */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-gray-500">
                      Pengaturan Audio
                    </label>
                    <div className="flex flex-col gap-1 text-xs">
                      <label className="flex items-center gap-1.5 font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ttsEnabled}
                          onChange={(e) => setTtsEnabled(e.target.checked)}
                          className="rounded border-black accent-black w-4 h-4 cursor-pointer"
                        />
                        <span>Aktifkan Robot TTS (Bicara)</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-bold cursor-pointer mt-1">
                        <input
                          type="checkbox"
                          checked={notificationSound}
                          onChange={(e) => setNotificationSound(e.target.checked)}
                          className="rounded border-black accent-black w-4 h-4 cursor-pointer"
                        />
                        <span>Aktifkan Chime Suara Koin</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Instant Try Test Button */}
                <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap gap-2 justify-end">
                  <button
                    onClick={() => {
                      const testDonations = [
                        { id: "test1", sender: "Bambang_Live", amount: 15000, message: "Kopi mana kopi bro! Mantul livenya!", paymentMethod: "GOPAY", timestamp: new Date() },
                        { id: "test2", sender: "Roti_Bakar", amount: 120000, message: "Hadir bos! Numpang lewat sekalian dukung, semoga berkah lancar rejekinya!", paymentMethod: "QRIS", timestamp: new Date() },
                        { id: "test3", sender: "Meme_Lover", amount: 50000, message: "Ayy yo look at this! Ngakak kenceng wkwkwk", paymentMethod: "OVO", timestamp: new Date() },
                      ];
                      const chosen = testDonations[Math.floor(Math.random() * testDonations.length)];
                      setAlertQueue(prev => [...prev, chosen]);
                    }}
                    className="px-4 py-2 bg-[#9DF5DB] hover:bg-[#86ecd0] border-2 border-black rounded-xl font-bold text-xs shadow-[2px_2px_0px_#000] active:translate-y-0.5 active:shadow-[0px_0px_0px_#000] transition-all flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 text-black" />
                    Simulasikan Alert Demo Acak
                  </button>
                </div>
              </div>
            </div>

            {/* Streamer Logs / Wallet panel column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Wallet Summary widget */}
              <div className="p-6 bg-[#4EA8DE] border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <span className="text-zinc-900 font-mono font-bold text-xs uppercase tracking-widest bg-white/75 px-2.5 py-0.5 rounded-full border border-black">
                  Dompet Saweria
                </span>
                <h2 className="text-3xl font-black mt-2 font-sans text-black">
                  Rp {profile.balance.toLocaleString("id-ID")}
                </h2>
                <p className="text-xs font-semibold text-sky-950 mt-1">
                  Seluruh dana siap dicairkan langsung ke akun bank/e-wallet Anda.
                </p>
                <div className="mt-4 pt-4 border-t border-sky-300 flex justify-between text-xs font-mono">
                  <span>Pencairan Aktif: <strong className="text-black">100%</strong></span>
                  <span>Biaya Potongan: <strong className="text-black">5%</strong></span>
                </div>
              </div>

              {/* Mini Feed of Latest Donations */}
              <div className="p-5 bg-white border-3 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                    <ListFilter className="w-4 h-4 text-blue-500" />
                    Log Event Dukungan ({profile.donations.length})
                  </h3>
                  <button
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        balance: 0,
                        donations: [],
                      }));
                      window.speechSynthesis.cancel();
                    }}
                    className="text-[10px] font-bold text-gray-400 hover:text-red-500 hover:underline flex items-center gap-1"
                  >
                    Reset List
                  </button>
                </div>

                <div className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1">
                  {profile.donations.length === 0 ? (
                    <div className="text-center py-6 text-gray-400 font-semibold text-xs font-mono">
                      Belum ada donasi masuk.
                      <button
                        onClick={() => setActiveTab("fan")}
                        className="block w-full text-center text-blue-500 hover:underline mt-1 font-sans text-sm font-black"
                      >
                        Kirim Saweran Sekarang!
                      </button>
                    </div>
                  ) : (
                    profile.donations.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-[#FFFDF2] border-2 border-black rounded-xl hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all text-xs space-y-1.5"
                      >
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-black font-extrabold">{item.sender}</span>
                          <span className="text-green-600 bg-green-50 px-2 py-0.5 border border-black rounded text-[10px] font-extrabold font-mono">
                            +Rp {item.amount.toLocaleString("id-ID")}
                          </span>
                        </div>
                        {item.message && (
                          <p className="text-gray-600 italic bg-white p-1.5 border border-dashed border-gray-300 rounded leading-relaxed text-[11px] font-mono">
                            "{item.message}"
                          </p>
                        )}
                        <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-1">
                          <span>Via {item.paymentMethod}</span>
                          <span>
                            {item.timestamp.toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
