import React, { useState } from "react";
import {
  HeroMascot,
  TigerHeartMascot,
  SquirrelMascot,
  RoosterMascot,
} from "./components/Mascots";
import { InteractiveGuestbook } from "./components/InteractiveGuestbook";
import {
  Mail,
  Instagram,
  Twitter,
  MessageSquare,
  Sparkles,
  ChevronRight,
  HelpCircle,
  X,
  Play,
  ArrowUpRight,
  Tv,
  ExternalLink,
  Code,
  Layers,
  Compass,
  FileDown,
  Github,
  MapPin,
  Calendar,
  Settings,
  Wrench,
  Check,
  RotateCcw,
  Sliders,
  Edit2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<any | null>(null);

  // States untuk kustomisasi live (Bisa diedit langsung dari tombol edit di layar, atau edit state ini secara permanen)
  const [pName, setPName] = useState(() => {
    return localStorage.getItem("portfolio_p_name") || "Uti Iffat";
  });
  const [pUsername, setPUsername] = useState(() => {
    return localStorage.getItem("portfolio_p_username") || "utiiffat";
  });
  const [pTagline, setPTagline] = useState(() => {
    return localStorage.getItem("portfolio_p_tagline") || "Jembatan interaksi antara ide brilian dan kode fungsional!";
  });
  const [pBio, setPBio] = useState(() => {
    return localStorage.getItem("portfolio_p_bio") || "Saya adalah seorang Creative Full-Stack Web Developer & Interaction Specialist yang berdomisili di Surabaya (SUB). Suka mendobrak estetika standar dengan desain berani, interaktif, dan performa tinggi!";
  });
  const [pEmail, setPEmail] = useState(() => {
    return localStorage.getItem("portfolio_p_email") || "utiifat2@gmail.com";
  });
  const [pLocation, setPLocation] = useState(() => {
    return localStorage.getItem("portfolio_p_location") || "Surabaya (SUB), Indonesia";
  });
  const [pExp, setPExp] = useState(() => {
    return localStorage.getItem("portfolio_p_exp") || "Pengalaman: 3+ Tahun Web Dev";
  });

  // State untuk Projects (Karya Unggulan)
  const [myProjects, setMyProjects] = useState(() => {
    const saved = localStorage.getItem("portfolio_p_projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "saweria-simulator",
        title: "Saweria Integration Overlay & Interactive Dashboard",
        category: "Full Stack Web & OBS Widget",
        desc: "Clone interaktif Saweria.co yang menyatukan simulasi pengiriman dukungan (Saweran) dengan widget visual live OBS overlays. Memanfaatkan Web Audio Synthesizer untuk chime koin retro serta Web Speech API untuk text-to-speech otomatis berbahasa Indonesia.",
        tech: ["React 19", "Vite", "Tailwind CSS", "Web Speech API", "Motion"],
        link: "https://saweria.co",
        color: "#FFD166",
        impact: "Simulasi 100% Client-Side dengan alert OBS interaktif.",
      },
      {
        id: "brutalist-ui",
        title: "Neobrutalism React Components Library",
        category: "Library & Open Source",
        desc: "Paket library komponen siap pakai dengan gaya desain neo-brutalis ala Figma dan Gumroad. Dilengkapi dengan bayangan hitam tajam, border tebal, warna neon pastel, dan responsivitas tinggi.",
        tech: ["React", "TypeScript", "Tailwind CSS", "npm package"],
        link: "https://github.com",
        color: "#FFC2C2",
        impact: "Meningkatkan kecepatan loading & rendering komponen hingga 40%.",
      },
      {
        id: "pixel-game",
        title: "Pixel Pet Space: Virtual Companion",
        category: "Interactive Canvas Game",
        desc: "Game asisten hewan peliharaan virtual yang berjalan langsung di browsermu dengan retro pixel-art dan simulasi status suasana hati real-time.",
        tech: ["HTML5 Canvas", "Tailwind CSS", "Local Storage", "Howler.js"],
        link: "https://github.com",
        color: "#4EA8DE",
        impact: "Mendukung auto-save status hewan peliharaan via web storage.",
      }
    ];
  });

  // Show/Hide Panel Live Editor
  const [showLiveEditor, setShowLiveEditor] = useState(false);
  const [activeTab, setActiveTab] = useState<"profil" | "proyek">("profil");

  const saveLiveConfig = (key: string, val: string) => {
    localStorage.setItem(key, val);
  };

  const handleUpdateProject = (index: number, field: string, value: any) => {
    const updated = [...myProjects];
    updated[index] = { ...updated[index], [field]: value };
    setMyProjects(updated);
    localStorage.setItem("portfolio_p_projects", JSON.stringify(updated));
  };

  const resetToDefault = () => {
    if (confirm("Reset seluruh teks portfolio kembali ke default (Uti Iffat)?")) {
      localStorage.removeItem("portfolio_p_name");
      localStorage.removeItem("portfolio_p_username");
      localStorage.removeItem("portfolio_p_tagline");
      localStorage.removeItem("portfolio_p_bio");
      localStorage.removeItem("portfolio_p_email");
      localStorage.removeItem("portfolio_p_location");
      localStorage.removeItem("portfolio_p_exp");
      localStorage.removeItem("portfolio_p_projects");
      window.location.reload();
    }
  };

  const portfolioFaq = [
    {
      q: `Apakah ${pName} menerima project freelance?`,
      a: "Ya! Saya selalu menyukai kolaborasi kreatif. Saya terbuka untuk proyek pembuatan landing page interaktif, dashboard admin, integrasi API, ataupun pengerjaan full-stack web application.",
    },
    {
      q: "Berapa lama estimasi pengerjaan website?",
      a: "Tergantung kompleksitas. Landing page interaktif berkisar antara 3-5 hari kerja. Sedangkan web app berskala menengah dengan integrasi database berkisar antara 2-3 minggu.",
    },
    {
      q: "Teknologi (Tech Stack) apa saja yang digunakan?",
      a: "Keahlian utama saya adalah React, Vite, Next.js, Node.js Express, TypeScript, Tailwind CSS, PostgreSQL, serta integrasi Cloud APIs seperti Firebase dan Gemini AI.",
    },
    {
      q: "Bagaimana cara mendiskusikan penawaran harga project?",
      a: `Anda dapat mengirimkan surel (email) langsung ke ${pEmail} atau mengisi formulir interaksi di panel 'Traktir Kopi / Buku Tamu' untuk meninggalkan pesan cepat!`,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFDF2] text-zinc-900 font-sans selection:bg-[#FF9F1C] selection:text-black">
      
      {/* 1. Promo Marquee Strip Style */}
      <div className="w-full bg-[#FFD166] border-b-3 border-black py-2.5 px-4 overflow-hidden relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono text-xs font-black text-black">
          <div className="flex items-center gap-2 animate-pulse">
            <span className="bg-[#E63946] text-white px-2 py-0.5 rounded border border-black text-[10px]">OPEN</span>
            <span>{pName} sedang terbuka untuk proyek baru! Hubungi di {pEmail}</span>
          </div>
          <a 
            href={`mailto:${pEmail}`}
            className="flex items-center gap-1 bg-white hover:bg-zinc-50 border border-black px-2 py-0.5 rounded-lg shadow-[1px_1px_0px_#000] active:translate-y-0.5 text-[11px] font-sans"
          >
            Hubungi Langsung <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 2. Portfolio Sticky Header (Saweria style) */}
      <header className="w-full max-w-7xl mx-auto px-4 md:px-8 py-5 flex justify-between items-center bg-transparent z-20 relative">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="p-1 px-2.5 bg-[#FFBF69] border-2 border-black rounded-lg text-lg font-display font-black text-black shadow-[2px_2px_0px_#000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#000] transition-all">
            {pUsername.substring(0, 2).toLowerCase()}
          </span>
          <span className="font-display font-bold text-xl tracking-tight">
            {pUsername}<span className="text-[#FF9F1C]">.dev</span>
          </span>
        </div>

        {/* Buttons in Header */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs md:text-sm font-bold bg-[#4EA8DE] hover:bg-[#3ea0d8] border-2 border-black rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_#000] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Github className="w-4 h-4" /> Github
          </a>
          <a
            href={`mailto:${pEmail}`}
            className="px-4 py-2 text-xs md:text-sm font-bold bg-[#FF9F1C] hover:bg-[#ff9505] border-2 border-black rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_#000] transition-all cursor-pointer"
          >
            Email Me
          </a>
        </div>
      </header>

      {/* 3. Hero Section (Saweria style with Mascots) */}
      <section className="max-w-4xl mx-auto px-4 pt-10 pb-12 flex flex-col items-center text-center relative z-10">
        
        {/* Adorable Mascot Trio */}
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300 select-none">
          <HeroMascot />
        </div>

        {/* Name Title */}
        <h1 className="font-display font-extrabold text-4xl md:text-5.5xl tracking-normal text-zinc-900 mt-2">
          {pUsername}.dev
        </h1>
        
        {/* Tagline / Subtitle */}
        <h2 className="font-display text-2xl md:text-3xl font-black tracking-tight text-zinc-800 max-w-xl mt-3 leading-tight">
          {pTagline}
        </h2>

        {/* Short Creative Bio description */}
        <p className="mt-4 text-sm font-medium text-gray-600 max-w-lg leading-relaxed">
          {pBio}
        </p>

        {/* Hero Actions links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
          <a
            href="#projects"
            className="px-8 py-3.5 text-sm font-bold bg-[#4EA8DE] hover:bg-[#3ea0d8] border-3 border-black rounded-2xl shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-y-1.5 active:shadow-[0px_0px_0px_#000] transition-all cursor-pointer min-w-[150px] inline-flex items-center justify-center gap-1.5"
          >
            <Compass className="w-4 h-4" /> Cari Tahu Karya
          </a>
          <button
            onClick={() => {
              alert(`📄 Berhasil mengunduh CV ${pName}! (Simulasi: CV berisi pengalaman yang sudah dikustomisasi)`);
            }}
            className="px-8 py-3.5 text-sm font-bold bg-[#FF9F1C] hover:bg-[#f68e0e] border-3 border-black rounded-2xl shadow-[5px_5px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-y-1.5 active:shadow-[0px_0px_0px_#000] transition-all cursor-pointer min-w-[150px] flex items-center justify-center gap-1.5"
          >
            <FileDown className="w-4 h-4" /> Unduh CV Saya
          </button>
        </div>

        {/* Meta details */}
        <div className="mt-8 flex flex-wrap gap-6 justify-center text-xs font-mono font-bold text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E63946]" />
            {pLocation}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#4EA8DE]" />
            {pExp}
          </div>
        </div>
      </section>

      {/* 4. Core Skills Block (Adapted from the payment methods box - Image 1) */}
      <section className="max-w-3xl mx-auto px-4 py-6 space-y-10">
        
        {/* Tech Stack Box */}
        <div className="bg-[#FFF] border-3 border-black rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <p className="text-sm md:text-base font-black text-gray-900 leading-relaxed font-sans">
            🚀 Saya menguasai ekosistem pengembangan modern demi memperlancar komunikasi digital dan kegunaan aplikasi:
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t-2 border-dashed border-gray-200">
            {/* Frontend Technologies list */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-1.5">
                <Code className="w-4 h-4 text-[#FF9F1C]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 font-mono">
                  Frontend Tech
                </h4>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {["React 19 / Next.js", "TypeScript", "Tailwind CSS", "Vite Bundler", "Motion Animation", "Redux Toolkit"].map((item) => (
                  <li key={item} className="p-2.5 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold text-center hover:bg-[#FFE9C9] transition-all flex items-center justify-center gap-1 shadow-[1.5px_1.5px_0px_#000]">
                    <span className="w-1.5 h-1.5 bg-[#FF9F1C] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Backend Technologies list */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 pb-1.5">
                <Layers className="w-4 h-4 text-[#4EA8DE]" />
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 font-mono">
                  Backend & Database
                </h4>
              </div>
              <ul className="grid grid-cols-2 gap-2 text-xs">
                {["Node.js Express", "Drizzle / Prisma ORM", "PostgreSQL", "Firebase / Firestore", "RESTful / GraphQL APIs", "Google Workspace SDK"].map((item) => (
                  <li key={item} className="p-2.5 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold text-center hover:bg-[#EAF5FC] transition-all flex items-center justify-center gap-1 shadow-[1.5px_1.5px_0px_#000]">
                    <span className="w-1.5 h-1.5 bg-[#4EA8DE] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-xs font-mono font-extrabold text-gray-500 bg-[#FFFDF2] border-2 border-black p-3.5 rounded-xl text-center">
            💡 Mengedepankan kode bersih (Clean Code), optimasi aset gambar, serta penulisan sistem bertipe terproteksi (TypeScript).
          </p>
        </div>

        {/* 5. Work flow / "Cara Memulai" adapted (Image 2) */}
        <div className="bg-[#FFF] border-3 border-black rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] relative pt-10">
          
          {/* Overlapping Pink Label Badge */}
          <div className="absolute -top-4 right-6 bg-[#FF8A8A] border-3 border-black px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_#000]">
            alur kerja
          </div>

          <h3 className="text-lg font-black mb-4 text-zinc-900 border-b border-gray-100 pb-2">
            Bagaimana Proses Kolaborasi Kerja Bersama Saya?
          </h3>

          <ol className="space-y-4 font-sans">
            {[
              { id: 1, title: "Brief Diskusi & Sketsa Konsep", desc: "Bertukar ide seru mengenai kebutuhan website atau sistem, target audiens, dan referensi visual fungsional." },
              { id: 2, title: "Desain UI & Interaktivitas", desc: "Sketsa desain brutalist yang berani, fungsional, dan ramah pengguna dengan tipografi modern." },
              { id: 3, title: "Coding & Pengembangan Inti", desc: "Penyusunan frontend React/Vite yang cepat, responsive, dan backend API yang andal." },
              { id: 4, title: "Poles Detail Micro-Animation", desc: "Pemberian animasi motion layout halus agar navigasi terasa menyenangkan saat disentuh maupun diklik." },
              { id: 5, title: "Peluncuran & Support Optimasi", desc: "Deploy website ke platform tangguh secepat kilat (seperti Cloud Run, Vercel) dan pemeliharaan siap siaga." },
            ].map((step) => (
              <li key={step.id} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                <span className="w-7 h-7 rounded-full bg-[#FFD166] border-2 border-black text-black flex items-center justify-center font-mono font-black text-xs shrink-0 shadow-[1.5px_1.5px_0px_#000]">
                  {step.id}
                </span>
                <div>
                  <h4 className="text-sm font-black text-zinc-800 leading-tight">
                    {step.title}
                  </h4>
                  <p className="text-xs font-medium text-[#71717a] mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Centered Yellow striped tiger illustration inside of list box */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col items-center">
            <TigerHeartMascot className="w-32 h-32 transform hover:scale-110 transition-transform duration-200 select-none" />
          </div>
        </div>

        {/* 6. PROJECTS EXHIBTION SECTION (Portfolionya!) */}
        <div id="projects" className="space-y-6 pt-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#4EA8DE] border-2 border-black rounded-lg text-xs font-mono font-black shadow-[2px_2px_0px_#000]">
              SHOWCASE
            </span>
            <h3 className="text-xl font-display font-black text-zinc-800">
              Karya Pilihan & Proyek Hebat
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveProject(p)}
                style={{ backgroundColor: p.color }}
                className="p-5 border-3 border-black rounded-2xl shadow-[4px_4px_0px_#000] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_#000] transition-all cursor-pointer flex flex-col justify-between h-72"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-500 bg-white/75 px-2 py-0.5 rounded-full border border-black inline-block mb-3">
                    {p.category}
                  </span>
                  <h4 className="text-md font-black text-zinc-950 font-display leading-tight line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-zinc-800 font-semibold mt-2.5 line-clamp-4 leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-black/10 text-xs font-mono font-bold mt-2">
                  <span>Lihat Detail</span>
                  <ChevronRight className="w-4 h-4 text-black" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. PORTFOLIO INTERACTIVE GUESTBOOK INTEGRATED (Original Saweria tipping look) */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#FFD166] border-2 border-black rounded-lg text-xs font-mono font-black shadow-[2px_2px_0px_#000]">
              PLAYGROUND
            </span>
            <h3 className="text-xl font-display font-black text-zinc-800">
              Buku Tamu Hubungan Interaktif
            </h3>
          </div>
          <InteractiveGuestbook />
        </div>

        {/* 8. Pricing Jasa adapted (Image 3) */}
        <div className="bg-[#FFF] border-3 border-black rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] relative pt-10">
          
          {/* Blue Label badge */}
          <div className="absolute -top-4 right-6 bg-[#4EA8DE] border-3 border-black px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest text-black shadow-[2px_2px_0px_#000]">
            freelance
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            
            {/* Cute Blue squirrel mascot on left side */}
            <div className="shrink-0 transform hover:-rotate-3 transition-transform select-none">
              <SquirrelMascot className="w-28 h-28" />
            </div>

            {/* Pricing / info column */}
            <div className="space-y-4 text-xs md:text-sm font-semibold leading-relaxed text-gray-700 font-sans">
              <div className="flex gap-2.5 items-start">
                <span className="w-4.5 h-4.5 bg-[#EF4444] rounded-full border border-black text-white shrink-0 flex items-center justify-center font-mono text-[9px] font-bold mt-1">
                  ✓
                </span>
                <p>
                  Setiap situs dikembangkan dengan standard modern: <strong className="text-black">100% cepat, SEO-friendly, dan ramah seluler</strong>.
                </p>
              </div>

              <div className="flex gap-2.5 items-start">
                <span className="w-4.5 h-4.5 bg-[#10B981] rounded-full border border-black text-white shrink-0 flex items-center justify-center font-mono text-[9px] font-bold mt-1">
                  IDR
                </span>
                <p>
                  Tarif project website dikalkulasikan secara transparan, dimulai dari <strong className="text-black">Rp 1.500.000</strong> per project depending on scope.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 9. FAQ Block (Image 4) */}
        <div className="bg-[#FFC2C2] border-3 border-black rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-6 items-center">
          
          {/* Rooster illustration */}
          <div className="shrink-0 transform hover:bounce hover:rotate-3 transition-transform select-none">
            <RoosterMascot className="w-24 h-24" />
          </div>

          {/* Center billing queries */}
          <div className="text-center md:text-left space-y-4 flex-1">
            <h3 className="font-display text-2.5xl font-black text-black leading-tight text-shadow">
              bingung?<br />ada pertanyaan?<br />mari cari tahu!
            </h3>
            
            {/* Interactive folding accordion item inside block */}
            <div className="bg-white/80 border-2 border-black p-3.5 rounded-xl text-left space-y-1.5 shadow-[1.5px_1.5px_0px_#000]">
              <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-wider block">
                Pertanyaan Populer
              </span>
              <div className="divide-y divide-gray-200">
                {portfolioFaq.map((faq, index) => (
                  <div key={index} className="py-2.5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex justify-between items-center text-left font-bold text-xs text-gray-800 hover:text-black hover:underline justify-between"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <span className="font-mono ml-2 text-[#E63946] shrink-0 font-black">
                        {openFaq === index ? "[-]" : "[+]"}
                      </span>
                    </button>
                    {openFaq === index && (
                      <p className="mt-1.5 text-xs text-gray-600 leading-relaxed font-semibold pl-1 font-sans">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Social interactions buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`mailto:${pEmail}`}
            className="w-full py-3.5 bg-[#FF9F1C] hover:bg-[#ff9505] border-3 border-black rounded-xl font-bold text-sm shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-[1.5px_1.5px_0px_#000] transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-black" />
            Hubungi Lewat Email
          </a>
          <button
            onClick={() => {
              alert(`📜 Membuka Resume: Pengalaman kerja ${pName} sebagai Developer profesional.`);
            }}
            className="w-full py-3.5 bg-[#4EA8DE] hover:bg-[#3ea0d8] border-3 border-black rounded-xl font-bold text-sm shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-[1.5px_1.5px_0px_#000] transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-black" />
            Resume Selengkapnya
          </button>
        </div>

      </section>

      {/* 10. Footer with SUB location coordinates & PT Harta Tahta Sukaria equivalent */}
      <footer className="w-full border-t-3 border-black bg-[#FFF] mt-12 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Footer Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="p-1 px-2.5 bg-[#FFBF69] border border-black rounded font-display font-black text-xs">
                {pUsername.substring(0,2).toLowerCase()}
              </span>
              <span className="font-display font-bold text-md">
                {pUsername}.dev
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 font-sans space-y-1">
              <p className="flex items-center gap-1">
                Made with <span className="text-[#EF4444] animate-pulse">💙</span> by <strong className="text-black">{pName}</strong>
              </p>
              <p>{pName} - Divisi Kreatif & Kode</p>
            </div>
          </div>

          {/* Right Footer Column */}
          <div className="flex flex-col md:items-end justify-between gap-6">
            
            {/* Legal / Policy route lists */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-gray-500 font-sans md:text-right">
              <button onClick={() => alert("Syarat & Ketentuan Portfolio")} className="hover:text-black hover:underline bg-transparent border-0 cursor-pointer p-0">
                Syarat dan Ketentuan
              </button>
              <button onClick={() => alert("Kebijakan Privasi Data Anda")} className="hover:text-black hover:underline bg-transparent border-0 cursor-pointer p-0">
                Kebijakan Privasi
              </button>
              <button onClick={() => alert("Buka FAQ Selengkapnya")} className="hover:text-black hover:underline bg-transparent border-0 cursor-pointer p-0">
                FAQ
              </button>
            </div>

            {/* Social Accounts items and links */}
            <div className="inline-flex gap-4">
              <a
                href={`mailto:${pEmail}`}
                className="p-2 border-2 border-black rounded-lg hover:bg-slate-50 transition-colors shadow-[1.5px_1.5px_0px_#000]"
                title="E-mail Direct"
              >
                <Mail className="w-4 h-4 text-black" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black rounded-lg hover:bg-slate-50 transition-colors shadow-[1.5px_1.5px_0px_#000]"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 text-black" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black rounded-lg hover:bg-slate-50 transition-colors shadow-[1.5px_1.5px_0px_#000]"
                title="Github"
              >
                <Github className="w-4 h-4 text-black" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 border-2 border-black rounded-lg hover:bg-slate-50 transition-colors shadow-[1.5px_1.5px_0px_#000]"
                title="Discord Server"
              >
                <MessageSquare className="w-4 h-4 text-black" />
              </a>
            </div>

          </div>
        </div>
      </footer>

      {/* Project Detail Dialog Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="w-full max-w-lg bg-[#FFF] border-4 border-black rounded-2xl p-6 relative shadow-[8px_8px_0px_#000]"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition-colors border-2 border-transparent hover:border-black"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2.5 py-1 rounded border border-black inline-block mb-3">
                {activeProject.category}
              </span>

              <h2 className="text-xl font-display font-black tracking-tight text-zinc-950 mb-3 leading-tight pr-8">
                {activeProject.title}
              </h2>

              <p className="text-xs font-semibold text-[#4b5563] leading-relaxed mb-4 font-sans">
                {activeProject.desc}
              </p>

              {/* Technologies list */}
              <div className="space-y-2 border-t border-b border-black/10 py-3 mb-4">
                <span className="text-[10px] font-mono font-bold uppercase text-gray-400 block">
                  Senjata Utama (Tech Stack)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((t: string) => (
                    <span key={t} className="px-2.5 py-0.5 bg-gray-100 border border-black rounded text-[10px] font-mono font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Impact */}
              <div className="mb-5 bg-[#FFFDF2] p-3 border-2 border-black rounded-xl">
                <span className="text-[10px] font-mono font-black text-rose-500 block uppercase">
                  Dampak Utama (Impact)
                </span>
                <p className="text-xs text-zinc-800 font-bold mt-1 font-sans">
                  {activeProject.impact}
                </p>
              </div>

              {/* Modal Trigger buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => alert(`🔗 Membuka link project: ${activeProject.title}`)}
                  className="flex-1 py-2.5 bg-[#FF9F1C] hover:bg-[#ff9505] border-2 border-black rounded-xl font-bold text-xs shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                  Kunjungi Website Aktif
                </button>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2.5 bg-[#FFF] hover:bg-gray-50 border-2 border-black rounded-xl font-bold text-xs shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Live Editor Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowLiveEditor(true)}
          className="flex items-center gap-2 p-4 bg-[#FF9F1C] text-black hover:bg-[#e68e1a] border-3 border-black rounded-2xl shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-[1.5px_1.5px_0px_#000] transition-all font-display font-black text-xs uppercase cursor-pointer"
        >
          <Sliders className="w-5 h-5 text-black" />
          Ubah Tulisan (Live Editor)
        </button>
      </div>

      {/* Live Customizer Sidebar */}
      <AnimatePresence>
        {showLiveEditor && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLiveEditor(false)}
              className="absolute inset-0 bg-black cursor-pointer"
            />

            {/* Sidebar Shell */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-[#FFF] border-l-4 border-black h-full shadow-[-6px_0px_0px_#000] flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-5 border-b-3 border-black bg-[#FFD166] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-black" />
                  <div className="text-left">
                    <h3 className="font-display font-black text-sm text-zinc-950 uppercase tracking-tight">Kustomisasi Teks (Live Sandbox)</h3>
                    <p className="text-[10px] font-bold text-zinc-800 font-mono">Ubah tulisan Anda di sini & lihat hasilnya langsung!</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLiveEditor(false)}
                  className="p-1.5 border-2 border-black rounded-lg bg-white hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>

              {/* Tabs Switcher */}
              <div className="flex border-b-3 border-black text-xs font-bold font-mono">
                <button
                  onClick={() => setActiveTab("profil")}
                  className={`flex-1 py-3 text-center border-r-3 border-black uppercase cursor-pointer ${activeTab === "profil" ? "bg-[#4EA8DE] text-black" : "bg-neutral-50 text-gray-500 hover:bg-neutral-100"}`}
                >
                  👤 Biodata Diri
                </button>
                <button
                  onClick={() => setActiveTab("proyek")}
                  className={`flex-1 py-3 text-center uppercase cursor-pointer ${activeTab === "proyek" ? "bg-[#FFC2C2] text-black" : "bg-neutral-50 text-gray-500 hover:bg-neutral-100"}`}
                >
                  🚀 Karya Proyek
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans text-xs">
                {activeTab === "profil" ? (
                  <div className="space-y-4 text-left">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 leading-relaxed font-semibold">
                      💡 <strong>Daftar File Kode:</strong> Jika ingin mengganti teks secara permanen di source-code, silakan sunting file <code>/src/App.tsx</code> dan sesuaikan state <code>pName, pUsername, pTagline, pBio, pEmail, pLocation</code>.
                    </div>

                    {/* Nama */}
                    <div className="space-y-1.5">
                      <label className="block font-black uppercase text-gray-500 font-mono text-[10px]">Nama Lengkap</label>
                      <input
                        type="text"
                        value={pName}
                        onChange={(e) => {
                          setPName(e.target.value);
                          saveLiveConfig("portfolio_p_name", e.target.value);
                        }}
                        className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs shadow-[1.5px_1.5px_0px_#000]"
                      />
                    </div>

                    {/* Domain / Call Name */}
                    <div className="space-y-1.5">
                      <label className="block font-black uppercase text-gray-500 font-mono text-[10px]">Username / Domain (.dev)</label>
                      <input
                        type="text"
                        value={pUsername}
                        onChange={(e) => {
                          setPUsername(e.target.value);
                          saveLiveConfig("portfolio_p_username", e.target.value);
                        }}
                        className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs shadow-[1.5px_1.5px_0px_#000]"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="block font-black uppercase text-gray-500 font-mono text-[10px]">Alamat Email (E-Mail)</label>
                      <input
                        type="email"
                        value={pEmail}
                        onChange={(e) => {
                          setPEmail(e.target.value);
                          saveLiveConfig("portfolio_p_email", e.target.value);
                        }}
                        className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs shadow-[1.5px_1.5px_0px_#000]"
                      />
                    </div>

                    {/* Tagline */}
                    <div className="space-y-1.5">
                      <label className="block font-black uppercase text-gray-500 font-mono text-[10px]">Tagline Utama</label>
                      <input
                        type="text"
                        value={pTagline}
                        onChange={(e) => {
                          setPTagline(e.target.value);
                          saveLiveConfig("portfolio_p_tagline", e.target.value);
                        }}
                        className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs shadow-[1.5px_1.5px_0px_#000]"
                      />
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5">
                      <label className="block font-black uppercase text-gray-500 font-mono text-[10px]">Deskripsi Bio Profil</label>
                      <textarea
                        rows={3}
                        value={pBio}
                        onChange={(e) => {
                          setPBio(e.target.value);
                          saveLiveConfig("portfolio_p_bio", e.target.value);
                        }}
                        className="w-full p-3 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs shadow-[1.5px_1.5px_0px_#000]"
                      />
                    </div>

                    {/* Location & Experience */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-black uppercase text-gray-500 font-mono text-[10px]">Domisili / Lokasi</label>
                        <input
                          type="text"
                          value={pLocation}
                          onChange={(e) => {
                            setPLocation(e.target.value);
                            saveLiveConfig("portfolio_p_location", e.target.value);
                          }}
                          className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs shadow-[1.5px_1.5px_0px_#000]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block font-black uppercase text-gray-500 font-mono text-[10px]">Pengalaman</label>
                        <input
                          type="text"
                          value={pExp}
                          onChange={(e) => {
                            setPExp(e.target.value);
                            saveLiveConfig("portfolio_p_exp", e.target.value);
                          }}
                          className="w-full px-3 py-2 bg-[#FFFDF2] border-2 border-black rounded-xl font-bold focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs shadow-[1.5px_1.5px_0px_#000]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 text-left">
                    {myProjects.map((project, idx) => (
                      <div key={project.id || idx} className="p-4 border-2 border-black rounded-2xl space-y-3 shadow-[2px_2px_0px_#000] bg-[#FFF] relative">
                        <span className="absolute -top-3 left-3 bg-black text-white px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase">
                          Proyek #{idx + 1}
                        </span>

                        {/* Title */}
                        <div className="space-y-1 pt-1.5">
                          <label className="block font-bold text-gray-500 text-[10px]">Judul Proyek</label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleUpdateProject(idx, "title", e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#FFFDF2] border border-black rounded-xl font-bold text-xs"
                          />
                        </div>

                        {/* Category */}
                        <div className="space-y-1">
                          <label className="block font-bold text-gray-500 text-[10px]">Kategori</label>
                          <input
                            type="text"
                            value={project.category}
                            onChange={(e) => handleUpdateProject(idx, "category", e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#FFFDF2] border border-black rounded-xl font-bold text-xs"
                          />
                        </div>

                        {/* Desc */}
                        <div className="space-y-1">
                          <label className="block font-bold text-gray-500 text-[10px]">Deskripsi Proyek</label>
                          <textarea
                            rows={3}
                            value={project.desc}
                            onChange={(e) => handleUpdateProject(idx, "desc", e.target.value)}
                            className="w-full p-2.5 bg-[#FFFDF2] border border-black rounded-xl font-bold text-xs"
                          />
                        </div>

                        {/* Impact */}
                        <div className="space-y-1">
                          <label className="block font-bold text-gray-500 text-[10px]">Dampak / Hasil Proyek</label>
                          <input
                            type="text"
                            value={project.impact}
                            onChange={(e) => handleUpdateProject(idx, "impact", e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#FFFDF2] border border-black rounded-xl font-bold text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Controls */}
              <div className="p-4 border-t-3 border-black bg-zinc-100 flex gap-3 shrink-0">
                <button
                  onClick={resetToDefault}
                  className="px-4 py-3 bg-neutral-200 hover:bg-neutral-300 border-2 border-black rounded-xl font-bold text-xs shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-all text-gray-700 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Default
                </button>
                <button
                  onClick={() => setShowLiveEditor(false)}
                  className="flex-1 py-3 bg-[#9DF5DB] hover:bg-[#86deb4] border-2 border-black rounded-xl font-display font-black text-xs uppercase tracking-wider text-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4 text-black" /> Selesai & Simpan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
