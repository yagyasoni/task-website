import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, Database, Trash2, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, User, MessageSquare, Calendar } from 'lucide-react';

// --- STYLES ---
const glassClass = "backdrop-blur-lg bg-white/70 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]";
const inputClass = "w-full p-4 rounded-2xl bg-white/50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300";

// --- CUSTOM CAROUSEL (White Theme) ---
const CustomCarousel = () => {
  const [curr, setCurr] = useState(0);
  const slides = [
    { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200", title: "Modern Architecture", desc: "Design that inspires innovation." },
    { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200", title: "Creative Spaces", desc: "Built for high-performance teams." },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurr(c => (c === slides.length - 1 ? 0 : c + 1)), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-b-[40px] shadow-2xl">
      <div className="flex transition-transform duration-1000 ease-in-out h-full" style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="min-w-full relative">
            <img src={s.url} className="w-full h-full object-cover" alt={s.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent flex items-end pb-20 px-12">
              <div className="max-w-2xl animate-fadeIn">
                <h2 className="text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">{s.title}</h2>
                <p className="text-xl text-slate-700">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 right-12 flex gap-4">
        <button onClick={() => setCurr(curr === 0 ? slides.length - 1 : curr - 1)} className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all active:scale-90"><ChevronLeft size={24}/></button>
        <button onClick={() => setCurr(curr === slides.length - 1 ? 0 : curr + 1)} className="p-3 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all active:scale-90"><ChevronRight size={24}/></button>
      </div>
    </div>
  );
};

// --- NAVIGATION ---
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
      <div className={`max-w-5xl mx-auto flex justify-between items-center px-8 py-4 rounded-3xl ${glassClass}`}>
        <Link to="/" className="text-2xl font-black tracking-tighter text-blue-600">NEXUS<span className="text-slate-400">.</span></Link>
        <div className="flex gap-8 items-center text-sm font-bold text-slate-600 uppercase tracking-widest">
          <button onClick={() => handleNav('home')} className="hover:text-blue-600 transition">Home</button>
          <button onClick={() => handleNav('contact')} className="hover:text-blue-600 transition">Contact</button>
          <Link to="/admin" className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
            <Database size={16}/> Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

// --- PAGES ---

const LandingPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', description: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = JSON.parse(localStorage.getItem('user_data') || '[]');
    localStorage.setItem('user_data', JSON.stringify([...db, { ...formData, id: Date.now(), time: new Date().toLocaleString() }]));
    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', description: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <section id="home pt-24"><CustomCarousel /></section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Contact Us</span>
            <h2 className="text-5xl font-black text-slate-900 mt-4 mb-8 leading-tight">Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">remarkable.</span></h2>
            <div className="space-y-6">
              {[ {Icon: Phone, t: "+1 (555) 000-9999"}, {Icon: Mail, t: "hello@nexus-web.com"}, {Icon: MapPin, t: "99 Wall Street, New York"} ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><item.Icon size={24}/></div>
                  <span className="font-semibold text-slate-700">{item.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-10 rounded-[40px] ${glassClass}`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input required className={inputClass} placeholder="Your Name" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="email" className={inputClass} placeholder="Email" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
                <input required className={inputClass} placeholder="Phone" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})} />
              </div>
              <textarea required rows="4" className={inputClass} placeholder="Project Details..." value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})} />
              <button type="submit" className="bg-blue-600 text-blue w-full py-5 rounded-2xl font-bold text-lg shadow-md hover:bg-blue-700 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3">
                {success ? <><CheckCircle size={22}/> Submitted Successfully</> : <><Send size={22}/> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto h-[450px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
          <iframe title="map" width="100%" height="100%" frameBorder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901361!2d-74.003693!3d40.71327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a21fb017c29%3A0x1420743f888849!2sWall%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1633000000000"></iframe>
        </div>
      </section>
    </div>
  );
};

const AdminPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => { setData(JSON.parse(localStorage.getItem('user_data') || '[]')); }, []);

  const deleteItem = (id) => {
    const updated = data.filter(d => d.id !== id);
    localStorage.setItem('user_data', JSON.stringify(updated));
    setData(updated);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-12 px-6 w-screen">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <Link to="/" className="text-blue-600 flex items-center gap-2 font-bold mb-3 hover:gap-3 transition-all"><ArrowLeft size={18}/> Return Home</Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Lead Dashboard</h1>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
               <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><User size={20}/></div>
               <div><p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Total Leads</p><p className="text-xl font-black">{data.length}</p></div>
             </div>
          </div>
        </div>

        <div className={`${glassClass} rounded-[32px] overflow-hidden shadow-xl`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-6 text-xs uppercase tracking-widest font-bold">Contact Info</th>
                  <th className="p-6 text-xs uppercase tracking-widest font-bold">Project Description</th>
                  <th className="p-6 text-xs uppercase tracking-widest font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.length === 0 ? (
                  <tr><td colSpan="3" className="p-20 text-center text-slate-400 font-medium italic">No submissions yet...</td></tr>
                ) : data.map((item) => (
                  <tr key={item.id} className="bg-white/50 hover:bg-white transition-colors group">
                    <td className="p-6">
                      <p className="font-bold text-slate-900 text-lg">{item.name}</p>
                      <p className="text-blue-600 text-sm font-medium">{item.email}</p>
                      <p className="text-slate-400 text-xs mt-1 flex items-center gap-1"><Calendar size={12}/> {item.time}</p>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <MessageSquare size={18} className="shrink-0 text-slate-300"/>
                        <p className="text-sm leading-relaxed italic">"{item.description}"</p>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <button onClick={() => deleteItem(item.id)} className="p-4 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                        <Trash2 size={22}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
      <footer className="bg-white border-t border-slate-100 py-12 text-center">
        <p className="text-slate-400 font-bold tracking-widest text-xs uppercase italic">© 2026 Nexus Systems</p>
      </footer>
    </Router>
  );
}