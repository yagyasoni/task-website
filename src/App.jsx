import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, Database, Trash2, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';

// --- STYLES ---
const glassClass = "backdrop-blur-2xl bg-white/80 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]";
const inputClass = "w-full p-4 rounded-2xl bg-white/40 border border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300";

// --- SEAMLESS FORWARD CAROUSEL ---
const SeamlessCarousel = () => {
  const slides = [
    { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", title: "Future Architecture", desc: "Nexus leading digital transformation." },
    { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200", title: "Cloud Synergy", desc: "Seamless integration across platforms." },
    { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", title: "Global Network", desc: "Connecting the world through data." }
  ];

  // Logic for seamless forward movement
  const [curr, setCurr] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurr((curr) => (curr + 1) % totalSlides);
          return 0;
        }
        return prev + 1;
      });
    }, 50); // Progress speed
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => { setCurr((curr + 1) % totalSlides); setProgress(0); };
  const prevSlide = () => { setCurr((curr - 1 + totalSlides) % totalSlides); setProgress(0); };

  return (
    <div className="relative h-[550px] w-full overflow-hidden rounded-b-[50px] shadow-2xl bg-slate-100">
      <div className="flex transition-transform duration-1000 ease-in-out h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="min-w-full relative">
            <img src={s.url} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent flex items-end pb-24 px-12">
              <div className="max-w-2xl">
                <h2 className="text-6xl font-black text-slate-900 mb-2 tracking-tighter">{s.title}</h2>
                <p className="text-xl text-slate-600 font-medium">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ONE MORE THING: Auto-Progress Timer Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-200/50">
        <div className="h-full bg-blue-600 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 right-12 flex gap-3">
        <button onClick={prevSlide} className="p-4 rounded-2xl bg-white/80 hover:bg-white shadow-xl transition-all active:scale-90"><ChevronLeft/></button>
        <button onClick={nextSlide} className="p-4 rounded-2xl bg-white/80 hover:bg-white shadow-xl transition-all active:scale-90"><ChevronRight/></button>
      </div>
    </div>
  );
};

// --- NAVIGATION (Fixed Links) ---
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 w-full z-[100] px-6">
      <div className={`max-w-6xl mx-auto flex justify-between items-center px-8 py-5 rounded-[30px] ${glassClass}`}>
        <Link to="/" className="text-2xl font-black tracking-tighter text-blue-600 italic">NEXUS</Link>
        <div className="flex gap-10 items-center text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
          <button onClick={() => handleNav('home')} className="hover:text-blue-600 transition cursor-pointer">Home</button>
          <button onClick={() => handleNav('contact')} className="hover:text-blue-600 transition cursor-pointer">Contact</button>
          <Link to="/admin" className="bg-slate-900 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
            <Database size={14}/> Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- ADMIN PAGE (Improved UI) ---
const AdminPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => { setData(JSON.parse(localStorage.getItem('nexus_db') || '[]')); }, []);

  const clear = (id) => {
    const updated = data.filter(d => d.id !== id);
    localStorage.setItem('nexus_db', JSON.stringify(updated));
    setData(updated);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-36 pb-20 px-6 w-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <Link to="/" className="text-blue-600 font-bold flex items-center gap-2 mb-3 hover:underline"><ArrowLeft size={16}/> Back Home</Link>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">System Logs</h1>
          </div>
          <div className="px-6 py-4 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
             <Clock size={20} className="text-blue-500"/>
             <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Active Entries:</span>
             <span className="text-xl font-black">{data.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-8 text-xs uppercase font-bold tracking-[0.1em]">User Information</th>
                <th className="p-8 text-xs uppercase font-bold tracking-[0.1em]">Message Detail</th>
                <th className="p-8 text-xs uppercase font-bold text-center tracking-[0.1em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data.length === 0 ? (
                <tr><td colSpan="3" className="p-32 text-center text-slate-300 font-bold text-2xl italic">Storage Empty</td></tr>
              ) : data.map(item => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-8">
                    <div className="text-xl font-black text-slate-800">{item.name}</div>
                    <div className="text-blue-600 font-bold text-sm">{item.email}</div>
                    <div className="text-slate-400 text-[10px] mt-2 font-mono uppercase">{item.date}</div>
                  </td>
                  <td className="p-8">
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                      "{item.desc}"
                    </div>
                  </td>
                  <td className="p-8 text-center">
                    <button onClick={() => clear(item.id)} className="p-5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-3xl transition-all">
                      <Trash2 size={24}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', desc: '' });
  const [sent, setSent] = useState(false);

  const save = (e) => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('nexus_db') || '[]');
    localStorage.setItem('nexus_db', JSON.stringify([...db, { ...form, id: Date.now(), date: new Date().toLocaleString() }]));
    setSent(true); setForm({ name: '', email: '', phone: '', desc: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="bg-white">
      <section id="home"><SeamlessCarousel /></section>
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-6xl font-black text-slate-900 leading-tight mb-8">Ready to <br/><span className="text-blue-600">Sync with Nexus?</span></h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-center font-bold text-slate-600"><div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Mail size={20}/></div> connect@nexus.com</div>
              <div className="flex gap-4 items-center font-bold text-slate-600"><div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Phone size={20}/></div> +91 (800) NEXUS-01</div>
            </div>
          </div>
          <div className={`p-10 rounded-[45px] ${glassClass}`}>
            <form onSubmit={save} className="space-y-5">
              <input required className={inputClass} placeholder="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
              <div className="grid grid-cols-2 gap-5">
                <input required type="email" className={inputClass} placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
                <input required type="tel" className={inputClass} placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value.replace(/\D/g, '')})} pattern="[0-9]{10}" maxLength={10}/>
              </div>
              <textarea required rows="4" className={inputClass} placeholder="Project Details" value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} />
              <button type="submit" className="text-blue w-full py-5 rounded-2xl font-bold text-lg shadow-md hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3">
                {sent ? <><CheckCircle size={22}/> Submission Recorded</> : <><Send size={22}/> INITIATE CONTACT</>}
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto h-[450px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
          <iframe title="map" width="100%" height="100%" frameBorder="0" src="https://www.google.com/maps?q=20.5937,78.9629&z=4&output=embed"></iframe>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <footer className="py-12 text-center bg-gray-100 text-slate-500 font-bold uppercase tracking-[0.4em] text-[10px]">© 2026 NEXUS CORE • HIGH END GLASS UI</footer>
    </Router>
  );
}