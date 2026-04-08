import { useState, useEffect } from "react";

// ── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  t1: '#C4714F', t2: '#D4896A', t3: '#EDD5C8', t4: '#F5E4D8',
  b1: '#F5EDE3', b2: '#E2CEBC', b3: '#D4B89A',
  cream: '#FDF8F4', dark: '#2E1A0E', mid: '#7A5540', soft: '#A07060',
  gold: '#C9A87C', white: '#FFFFFF',
};

// ── SERVICES ───────────────────────────────────────────────────────────────
const SERVICES = [
  { id:1, cat:'Manicure', en:'Classic Manicure', pt:'Manicure Clássica', price:25, dur:'30 min', enDesc:'Shape, cuticle care & colour polish', ptDesc:'Forma, cuidado de cutículas & verniz', icon:'💅' },
  { id:2, cat:'Manicure', en:'Gel Manicure', pt:'Manicure em Gel', price:35, dur:'45 min', enDesc:'Long-lasting gel polish finish', ptDesc:'Acabamento em gel de longa duração', icon:'💅' },
  { id:3, cat:'Manicure', en:'Luxury Manicure', pt:'Manicure de Luxo', price:48, dur:'60 min', enDesc:'Full spa experience with hand massage', ptDesc:'Experiência spa completa com massagem', icon:'💅' },
  { id:4, cat:'Pedicure', en:'Classic Pedicure', pt:'Pedicure Clássica', price:30, dur:'45 min', enDesc:'Soak, scrub & polish', ptDesc:'Banho, esfoliação & verniz', icon:'🦶' },
  { id:5, cat:'Pedicure', en:'Gel Pedicure', pt:'Pedicure em Gel', price:42, dur:'60 min', enDesc:'Long-lasting gel on toes', ptDesc:'Gel de longa duração nos pés', icon:'🦶' },
  { id:6, cat:'Pedicure', en:'Luxury Pedicure', pt:'Pedicure de Luxo', price:55, dur:'80 min', enDesc:'Full spa pedicure with hot towel & scrub', ptDesc:'Pedicure spa com toalha quente & esfoliação', icon:'🦶' },
  { id:7,  cat:'Eyelashes', en:'Classic Lash Extensions',           pt:'Pestanas Clássicas (1:1)',       price:85,  dur:'90 min',  enDesc:'Individual lash-by-lash for a natural, polished look',         ptDesc:'Extensão individual — resultado natural e elegante',            icon:'✨' },
  { id:8,  cat:'Eyelashes', en:'Classic Lash Infill',               pt:'Repleno Clássico',               price:60,  dur:'60 min',  enDesc:'Top-up infill for existing classic lashes',                   ptDesc:'Manutenção das pestanas clássicas existentes',                  icon:'✨' },
  { id:9,  cat:'Eyelashes', en:'Light Volume (3D)',                  pt:'Volume Ligeiro (3D)',            price:110, dur:'100 min', enDesc:'Soft, feathery 3D volume fans for a wide-eye effect',          ptDesc:'Leques 3D suaves para um olhar mais amplo e expressivo',        icon:'✨' },
  { id:10, cat:'Eyelashes', en:'Light Volume Infill (3D)',           pt:'Repleno Volume Ligeiro (3D)',    price:68,  dur:'60 min',  enDesc:'Infill maintenance for your 3D light volume lashes',           ptDesc:'Manutenção de repleno para pestanas volume 3D',                 icon:'✨' },
  { id:11, cat:'Eyelashes', en:'Volume Lashes (5D)',                 pt:'Volume (5D)',                    price:128, dur:'120 min', enDesc:'Full, glamorous 5D fans — dramatic & bold',                    ptDesc:'Leques 5D completos — look dramático e intenso',               icon:'✨' },
  { id:12, cat:'Eyelashes', en:'Volume Infill (5D)',                 pt:'Repleno Volume (5D)',            price:85,  dur:'75 min',  enDesc:'Maintenance infill for 5D volume lashes',                     ptDesc:'Manutenção de repleno para pestanas volume 5D',                 icon:'✨' },
  { id:13, cat:'Eyelashes', en:'Extra Volume (8D–15D)',              pt:'Volume Extra (8D–15D)',          price:160, dur:'150 min', enDesc:'Ultra-dense mega volume fans — the ultimate glam look',        ptDesc:'Leques mega volume ultra-densos — o look mais glamoroso',       icon:'✨' },
  { id:14, cat:'Eyelashes', en:'Extra Volume Infill (8D–15D)',       pt:'Repleno Volume Extra (8D–15D)', price:100, dur:'90 min',  enDesc:'Infill maintenance for mega volume lashes',                   ptDesc:'Manutenção de repleno para pestanas mega volume',               icon:'✨' },
  { id:15, cat:'Eyelashes', en:'Lash Lifting',                       pt:'Lash Lifting',                  price:100, dur:'60 min',  enDesc:'Lift & curl your natural lashes — no extensions needed',       ptDesc:'Levanta e enrola as pestanas naturais — sem extensões',         icon:'✨' },
  { id:16, cat:'Eyelashes', en:'Lash Removal',                       pt:'Remoção de Pestanas',            price:18,  dur:'30 min',  enDesc:'Safe & gentle removal of lash extensions',                    ptDesc:'Remoção segura e suave das extensões de pestanas',             icon:'✨' },
  { id:17, cat:'Eyelashes', en:'Eyebrow Wax',                        pt:'Epilação de Sobrancelhas',       price:25,  dur:'20 min',  enDesc:'Precise eyebrow shaping with wax',                            ptDesc:'Definição de sobrancelhas com cera — resultado preciso',        icon:'✨' },
  { id:18, cat:'Combo', en:'Mani & Pedi Deal',                       pt:'Pacote Mani & Pedi',            price:52,  dur:'70 min',  enDesc:'Classic manicure + classic pedicure',                         ptDesc:'Manicure clássica + pedicure clássica',                        icon:'🌸' },
  { id:19, cat:'Combo', en:'Nails & Classic Lashes',                 pt:'Unhas & Pestanas Clássicas',    price:155, dur:'180 min', enDesc:'Gel manicure + classic lash extensions — full glam session',  ptDesc:'Manicure gel + pestanas clássicas — sessão de glamour completa',icon:'🌸' },
  { id:20, cat:'Combo', en:'Nails & Volume Lashes',                  pt:'Unhas & Pestanas Volume',       price:208, dur:'210 min', enDesc:'Gel manicure + 5D volume lash extensions',                    ptDesc:'Manicure gel + extensões volume 5D',                           icon:'🌸' },
];

// ── TRANSLATIONS ───────────────────────────────────────────────────────────
const T = {
  en: {
    badge: 'Nail Bar & Beauty Studio · Oldham, England',
    tagline: ['Where Elegance', 'Meets Precision'],
    sub: 'Nails · Pedicure · Eyelash Extensions',
    cta: 'Book Your Appointment', callUs: 'Call Us',
    nav: ['Services', 'About', 'Contact'],
    bookNow: 'Book Now', ownerLogin: 'Owner',
    svcTitle: 'Our Services', svcSub: 'Every detail, perfected',
    cats: ['Manicure', 'Pedicure', 'Eyelashes', 'Combos'],
    bookThis: 'Book This',
    aboutBadge: 'About Glossy Charm',
    aboutTitle: 'Crafted with care,\nfinished with love',
    aboutText: 'Welcome to Nails by Glossy Charm — a cosy, professional nail bar and beauty studio in the heart of Oldham. We believe every woman deserves to feel polished and pampered. Our specialist combines artistry with technique to deliver flawless results, every time.',
    stats: [['💅','Nail Expert'],['✨','Lash Artist'],['⭐','5-Star Rated'],['❤️','500+ Clients']],
    findUs: 'Find Us', hours: 'Opening Hours',
    hoursVal: 'Mon – Sat: 9:00 – 18:00\nSun: By appointment only',
    bookTitle: 'Book Your Appointment',
    steps: ['Choose Service','Choose Date & Time','Your Details','Payment'],
    selDate: 'Select a Date', selTime: 'Select a Time',
    yourName: 'Full Name', yourEmail: 'Email Address', yourPhone: 'Phone Number', notes: 'Special Requests (optional)',
    next: 'Continue', back: 'Back', payNow: 'Pay Deposit',
    cardName: 'Name on Card', cardNum: 'Card Number', expiry: 'Expiry', cvv: 'CVV',
    depositNote: 'A 20% deposit is required to secure your booking. The remaining balance is paid in studio.',
    secure: 'Your payment is securely processed & encrypted',
    confirmTitle: 'You\'re all booked! 🎉',
    confirmMsg: 'Thank you, your appointment is confirmed.',
    confirmSub: 'A confirmation has been sent to your email address.',
    backHome: 'Back to Home', bookAnother: 'Book Another',
    total: 'Total', deposit: 'Deposit (20%)',
    adminTitle: 'Owner Dashboard', adminSub: 'Manage your appointments',
    passLabel: 'Enter Password', login: 'Login', wrongPass: 'Incorrect password. Try: glossy2024',
    todayAppts: "Today's Appointments", allAppts: 'All Bookings',
    noAppts: 'No appointments yet', logout: 'Logout',
    col: ['Client','Service','Date','Time','Price','Status','Actions'],
    confirmed: 'Confirmed', pending: 'Pending', cancelled: 'Cancelled',
    backSite: '← View Site',
    statsLabel: ['Total Bookings','Today','Confirmed','Est. Revenue'],
    takenSlot: 'Taken',
  },
  pt: {
    badge: 'Nail Bar & Estúdio de Beleza · Oldham, Inglaterra',
    tagline: ['Onde a Elegância', 'Encontra a Precisão'],
    sub: 'Unhas · Pedicure · Extensões de Pestanas',
    cta: 'Marcar Consulta', callUs: 'Ligar',
    nav: ['Serviços', 'Sobre', 'Contacto'],
    bookNow: 'Reservar', ownerLogin: 'Proprietária',
    svcTitle: 'Os Nossos Serviços', svcSub: 'Cada detalhe, à perfeição',
    cats: ['Manicure', 'Pedicure', 'Pestanas', 'Pacotes'],
    bookThis: 'Reservar',
    aboutBadge: 'Sobre a Glossy Charm',
    aboutTitle: 'Feito com cuidado,\nterminado com amor',
    aboutText: 'Bem-vinda à Nails by Glossy Charm — um espaço acolhedor e profissional no coração de Oldham. Acreditamos que cada mulher merece sentir-se impecável e mimada. A nossa especialista combina arte com técnica para resultados perfeitos, sempre.',
    stats: [['💅','Especialista'],['✨','Artista'],['⭐','5 Estrelas'],['❤️','500+ Clientes']],
    findUs: 'Encontra-nos', hours: 'Horário',
    hoursVal: 'Seg – Sáb: 9:00 – 18:00\nDom: Mediante marcação',
    bookTitle: 'Marcar Consulta',
    steps: ['Escolha o Serviço','Data & Hora','Os Seus Dados','Pagamento'],
    selDate: 'Selecione uma Data', selTime: 'Selecione uma Hora',
    yourName: 'Nome Completo', yourEmail: 'Email', yourPhone: 'Telefone', notes: 'Pedidos Especiais (opcional)',
    next: 'Continuar', back: 'Voltar', payNow: 'Pagar Depósito',
    cardName: 'Nome no Cartão', cardNum: 'Número do Cartão', expiry: 'Validade', cvv: 'CVV',
    depositNote: 'É necessário um depósito de 20% para confirmar a reserva. O restante é pago no estúdio.',
    secure: 'O seu pagamento é processado de forma segura e encriptada',
    confirmTitle: 'Reserva Confirmada! 🎉',
    confirmMsg: 'Obrigada, a sua consulta está confirmada.',
    confirmSub: 'Uma confirmação foi enviada para o seu email.',
    backHome: 'Voltar ao Início', bookAnother: 'Nova Reserva',
    total: 'Total', deposit: 'Depósito (20%)',
    adminTitle: 'Painel da Proprietária', adminSub: 'Gere as tuas marcações',
    passLabel: 'Introduza a Senha', login: 'Entrar', wrongPass: 'Senha incorrecta. Tenta: glossy2024',
    todayAppts: 'Marcações de Hoje', allAppts: 'Todas as Marcações',
    noAppts: 'Sem marcações ainda', logout: 'Sair',
    col: ['Cliente','Serviço','Data','Hora','Preço','Estado','Ações'],
    confirmed: 'Confirmada', pending: 'Pendente', cancelled: 'Cancelada',
    backSite: '← Ver Site',
    statsLabel: ['Total Marcações','Hoje','Confirmadas','Receita Est.'],
    takenSlot: 'Ocupado',
  }
};

// ── HELPERS ────────────────────────────────────────────────────────────────
const getNext16Days = () => {
  const days = [];
  for (let i = 1; i <= 16; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
};
const SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];
const fmtDate = (d) => d ? d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' }) : '';
const fmtISO = (d) => d ? d.toISOString().split('T')[0] : '';

// ── LOGO ── NAILS by GLOSSY CHARM — serif + wave ───────────────────────────
const Logo = ({ light = false, scale = 1 }) => {
  const terra  = light ? '#F0C9B0' : '#C4714F';   // terracotta main
  const wave   = light ? '#D4A882' : '#A85D3A';   // slightly darker for the wave
  const sub    = light ? '#E8C4A8' : '#C4845F';   // "BY GLOSSY CHARM" — softer
  const W = 200 * scale, H = 72 * scale;
  return (
    <svg width={W} height={H} viewBox="0 0 200 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ── NAILS — serif display ── */}
      <text
        x="100" y="46"
        fontFamily="'Playfair Display','Didot','Times New Roman',serif"
        fontSize="52" fontWeight="600"
        fill={terra}
        letterSpacing="3"
        textAnchor="middle"
      >NAILS</text>

      {/* ── Elegant wave swoosh ── */}
      <path
        d="M10,38 C40,22 80,52 120,32 C148,18 175,30 192,26"
        stroke={wave} strokeWidth="2.2" fill="none"
        strokeLinecap="round" opacity="0.85"
      />

      {/* ── BY GLOSSY CHARM ── */}
      <text
        x="100" y="62"
        fontFamily="'Playfair Display','Georgia',serif"
        fontSize="10" fontWeight="400"
        fill={sub}
        letterSpacing="4.5"
        textAnchor="middle"
      >BY GLOSSY CHARM</text>
    </svg>
  );
};

// ── MAIN ───────────────────────────────────────────────────────────────────
export default function GlossyCharm() {
  const [lang, setLang]   = useState('en');
  const [view, setView]   = useState('home');
  const [step, setStep]   = useState(1);
  const [cat,  setCat]    = useState('Manicure');
  const [selSvc, setSelSvc]   = useState(null);
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState('');
  const [client, setClient]   = useState({ name:'', email:'', phone:'', notes:'' });
  const [card, setCard]       = useState({ name:'', number:'', expiry:'', cvv:'' });
  const [paying, setPaying]   = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [adminErr, setAdminErr]   = useState(false);
  const [adminTab, setAdminTab]   = useState('today');
  const [bookings, setBookings]   = useState([
    { id:1, name:'Sophie Mills',  service:'Gel Manicure',        date:'2026-04-05', time:'10:00', price:35, status:'confirmed' },
    { id:2, name:'Priya Patel',   service:'Classic Lash Extensions', date:'2026-04-05', time:'14:00', price:48, status:'pending'   },
    { id:3, name:'Emma Clarke',   service:'Luxury Pedicure',     date:'2026-04-06', time:'11:00', price:55, status:'confirmed' },
    { id:4, name:'Fatima Hassan', service:'Mani & Pedi Deal',    date:'2026-04-07', time:'13:30', price:52, status:'pending'   },
  ]);

  const t = T[lang];
  const days = getNext16Days();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap';
    link.rel = 'stylesheet'; document.head.appendChild(link);
    const s = document.createElement('style');
    s.textContent = `
      *{box-sizing:border-box;margin:0;padding:0}
      ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.b1}}::-webkit-scrollbar-thumb{background:${C.t2};border-radius:3px}
      .btn{transition:all .22s ease;cursor:pointer;border:none;font-family:'Inter',sans-serif}
      .btn:hover{transform:translateY(-2px);filter:brightness(1.06)}
      .btn:active{transform:translateY(0)}
      .card{transition:all .3s ease}
      .card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(196,113,79,.18)!important}
      .inp{border:1.5px solid ${C.b2};outline:none;transition:border-color .2s;font-family:'Inter',sans-serif;background:${C.cream};width:100%;border-radius:10px;padding:12px 16px;font-size:14px;color:${C.dark}}
      .inp:focus{border-color:${C.t1}}
      .inp::placeholder{color:${C.soft};opacity:.7}
      @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      .fadeup{animation:fadeUp .5s ease forwards}
      .pulse{animation:pulse 1.5s infinite}
      .spin{animation:spin 1s linear infinite}
    `;
    document.head.appendChild(s);
  }, []);

  const tSvc  = s => lang === 'en' ? s.en  : s.pt;
  const tDesc = s => lang === 'en' ? s.enDesc : s.ptDesc;
  const today = new Date().toISOString().split('T')[0];

  const goBook = (svc) => { setSelSvc(svc); setStep(1); setConfirmed(false); setSelDate(null); setSelTime(''); setView('booking'); window.scrollTo(0,0); };

  // Load EmailJS
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => window.emailjs.init('v_FP9BminRIEUaEt6');
    document.head.appendChild(script);
  }, []);

  const sendConfirmationEmail = (bookingData) => {
    if (!window.emailjs) return;
    // Email to client
    window.emailjs.send('service_glossycharm', 'template_hdckkjm', {
      to_name:    bookingData.name,
      to_email:   bookingData.email,
      service:    bookingData.service,
      date:       fmtDate(bookingData.date),
      time:       bookingData.time,
      price:      `£${bookingData.price}`,
      deposit:    `£${(bookingData.price * 0.2).toFixed(2)}`,
      balance:    `£${(bookingData.price * 0.8).toFixed(2)}`,
      address:    '2 Carnation Road, Oldham OL4 5QD',
    }).catch(console.error);
    // Notification to owner
    window.emailjs.send('service_glossycharm', 'template_hdckkjm', {
      client:     bookingData.name,
      service:    bookingData.service,
      date:       fmtDate(bookingData.date),
      time:       bookingData.time,
      price:      `£${bookingData.price}`,
      client_email: bookingData.email,
      client_phone: bookingData.phone,
    }).catch(console.error);
  };

  const submitBooking = () => {
    setPaying(true);
    setTimeout(() => {
      const newBooking = {
        id: bookings.length + 1, name: client.name, email: client.email,
        phone: client.phone, service: tSvc(selSvc),
        date: fmtISO(selDate), time: selTime, price: selSvc.price, status: 'pending'
      };
      setBookings(prev => [...prev, newBooking]);
      sendConfirmationEmail({ ...newBooking, date: selDate });
      setPaying(false); setConfirmed(true);
    }, 2200);
  };

  // ── STYLES ──────────────────────────────────────────────────────────────
  const btnP = { background:C.t1, color:'#fff', padding:'11px 28px', borderRadius:28, fontSize:13, fontWeight:500, letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer' };
  const btnO = { ...btnP, background:'transparent', color:C.t1, border:`1.5px solid ${C.t1}` };
  const btnG = { ...btnP, background:'transparent', color:C.mid, border:`1px solid ${C.b2}`, padding:'9px 20px', fontSize:12 };

  const scrollTo = (id) => {
    if (view !== 'home') { setView('home'); setTimeout(() => { const el = document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); }, 100); }
    else { const el = document.getElementById(id); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); }
  };

  // ── NAV ─────────────────────────────────────────────────────────────────
  const Nav = () => (
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,background:'rgba(253,248,244,.97)',backdropFilter:'blur(12px)',borderBottom:`1px solid ${C.b2}`,padding:'0 5%',height:68,display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
      <div style={{cursor:'pointer'}} onClick={()=>setView('home')}><Logo /></div>
      <div style={{display:'flex',gap:20,alignItems:'center',flexWrap:'wrap'}}>
        {view==='home' && [['services', t.nav[0]], ['about', t.nav[1]], ['contact', t.nav[2]]].map(([id,label])=>(
          <span key={id} onClick={()=>scrollTo(id)} style={{color:C.mid,fontSize:12,letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer',fontWeight:500}}>{label}</span>
        ))}
        <button className="btn" style={btnP} onClick={()=>goBook(null)}>{t.bookNow}</button>
        <button className="btn" style={btnG} onClick={()=>{setView('admin');setAdminAuth(false);setAdminPass('');}}>{t.ownerLogin}</button>
        <div style={{display:'flex',gap:3}}>
          {['en','pt'].map(l=>(
            <button key={l} className="btn" onClick={()=>setLang(l)} style={{padding:'5px 10px',borderRadius:14,fontSize:11,fontWeight:700,background:lang===l?C.t1:'transparent',color:lang===l?'#fff':C.soft,border:`1px solid ${lang===l?C.t1:C.b2}`,letterSpacing:'0.05em',cursor:'pointer'}}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </nav>
  );

  // ── HOME ─────────────────────────────────────────────────────────────────
  const Home = () => (
    <div style={{fontFamily:"'Inter',sans-serif"}}>

      {/* Hero */}
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:`linear-gradient(150deg,${C.cream} 0%,${C.b1} 45%,${C.t4} 100%)`,textAlign:'center',padding:'110px 5% 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:-100,right:-100,width:500,height:500,borderRadius:'50%',background:`radial-gradient(circle,${C.t3}70 0%,transparent 65%)`,pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:-80,left:-80,width:380,height:380,borderRadius:'50%',background:`radial-gradient(circle,${C.b2}80 0%,transparent 65%)`,pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'20%',left:'5%',width:1,height:'60%',background:`linear-gradient(to bottom,transparent,${C.t3},transparent)`,pointerEvents:'none'}}/>

        <div className="fadeup" style={{maxWidth:700,position:'relative',zIndex:1}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 18px',borderRadius:20,border:`1px solid ${C.t3}`,background:'rgba(255,255,255,.6)',marginBottom:32,backdropFilter:'blur(8px)'}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:C.t1,display:'inline-block'}}/>
            <span style={{fontSize:11,letterSpacing:'0.2em',color:C.t1,textTransform:'uppercase',fontWeight:500}}>{t.badge}</span>
          </div>
          <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(54px,9vw,96px)',fontWeight:300,color:C.dark,lineHeight:1.05,letterSpacing:'-0.02em',marginBottom:20}}>
            {t.tagline[0]}<br/>
            <span style={{fontStyle:'italic',color:C.t1}}>{t.tagline[1]}</span>
          </h1>
          <p style={{fontSize:12,letterSpacing:'0.22em',color:C.soft,textTransform:'uppercase',marginBottom:44,fontWeight:400}}>{t.sub}</p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:40}}>
            <button className="btn" style={{...btnP,padding:'15px 40px',fontSize:14}} onClick={()=>goBook(null)}>{t.cta}</button>
            <a href="tel:+447476952705" className="btn" style={{...btnO,padding:'15px 40px',fontSize:14,textDecoration:'none'}}>📞 {t.callUs}</a>
          </div>
          <div style={{fontSize:12,color:C.soft,letterSpacing:'0.1em'}}>📍 2 Carnation Road, Oldham OL4 5QD</div>
        </div>
      </div>

      {/* Services */}
      <div id="services" style={{background:C.b1,padding:'90px 5%'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <div style={{fontSize:11,letterSpacing:'0.22em',color:C.t1,textTransform:'uppercase',fontWeight:500,marginBottom:12}}>✦ {t.svcTitle} ✦</div>
            <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(36px,5vw,54px)',fontWeight:300,color:C.dark}}>{t.svcSub}</h2>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:40,flexWrap:'wrap'}}>
            {['Manicure','Pedicure','Eyelashes','Combo'].map((c,i)=>(
              <button key={c} className="btn" onClick={()=>setCat(c)} style={{padding:'10px 26px',borderRadius:28,fontSize:12,fontWeight:500,border:`1.5px solid ${cat===c?C.t1:C.b2}`,background:cat===c?C.t1:'white',color:cat===c?'white':C.mid,letterSpacing:'0.05em',textTransform:'uppercase',cursor:'pointer'}}>{t.cats[i]}</button>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:22}}>
            {SERVICES.filter(s=>s.cat===cat).map(svc=>(
              <div key={svc.id} className="card" style={{background:'white',borderRadius:20,padding:'28px 24px',border:`1px solid ${C.b2}`,boxShadow:`0 4px 20px rgba(196,113,79,.06)`}}>
                <div style={{width:48,height:48,borderRadius:16,background:`linear-gradient(135deg,${C.t3},${C.b2})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:16}}>{svc.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:600,color:C.dark,marginBottom:6}}>{tSvc(svc)}</h3>
                <p style={{fontSize:13,color:C.soft,lineHeight:1.6,marginBottom:20}}>{tDesc(svc)}</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:30,color:C.t1,fontWeight:600}}>£{svc.price}</span>
                    <span style={{fontSize:12,color:C.soft,marginLeft:8}}>{svc.dur}</span>
                  </div>
                  <button className="btn" style={btnP} onClick={()=>goBook(svc)}>{t.bookThis}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div id="about" style={{padding:'90px 5%'}}>
        <div style={{maxWidth:1000,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
          <div>
            <div style={{fontSize:11,letterSpacing:'0.22em',color:C.t1,textTransform:'uppercase',fontWeight:500,marginBottom:16}}>✦ {t.aboutBadge} ✦</div>
            <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(30px,4vw,46px)',fontWeight:300,color:C.dark,lineHeight:1.2,whiteSpace:'pre-line',marginBottom:24}}>{t.aboutTitle}</h2>
            <p style={{fontSize:15,color:C.soft,lineHeight:1.9,marginBottom:36}}>{t.aboutText}</p>
            <div style={{display:'flex',gap:28,flexWrap:'wrap'}}>
              {t.stats.map(([icon,label],i)=>(
                <div key={i} style={{textAlign:'center'}}>
                  <div style={{fontSize:26,marginBottom:4}}>{icon}</div>
                  <div style={{fontSize:11,color:C.soft,letterSpacing:'0.1em',fontWeight:500,textTransform:'uppercase'}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{position:'relative'}}>
            <div style={{borderRadius:28,background:`linear-gradient(145deg,${C.t3} 0%,${C.b1} 60%,${C.b2} 100%)`,height:420,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{textAlign:'center'}}>
                <Logo scale={1.4} />
                <div style={{marginTop:24,fontSize:13,color:C.soft,letterSpacing:'0.1em',lineHeight:1.8}}>
                  2 Carnation Road<br/>Oldham OL4 5QD<br/>+44 7476 952705
                </div>
              </div>
            </div>
            <div style={{position:'absolute',top:-16,right:-16,width:80,height:80,borderRadius:'50%',background:C.t1,opacity:.12}}/>
            <div style={{position:'absolute',bottom:-12,left:-12,width:50,height:50,borderRadius:'50%',background:C.gold,opacity:.18}}/>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="contact" style={{background:C.dark,color:'white',padding:'64px 5% 32px',fontFamily:"'Inter',sans-serif"}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:40,marginBottom:48}}>
            <div>
              <Logo light scale={0.9}/>
              <p style={{fontSize:13,color:`${C.t3}99`,marginTop:16,lineHeight:1.8,maxWidth:240}}>{t.sub}</p>
            </div>
            <div>
              <div style={{fontSize:11,letterSpacing:'0.2em',color:C.t2,textTransform:'uppercase',marginBottom:12,fontWeight:500}}>{t.findUs}</div>
              <div style={{fontSize:14,color:`${C.t3}cc`,lineHeight:2}}>📍 2 Carnation Road<br/>Oldham OL4 5QD, England<br/><a href="tel:+447476952705" style={{color:`${C.t3}cc`,textDecoration:'none'}}>📞 +44 7476 952705</a></div>
            </div>
            <div>
              <div style={{fontSize:11,letterSpacing:'0.2em',color:C.t2,textTransform:'uppercase',marginBottom:12,fontWeight:500}}>{t.hours}</div>
              <div style={{fontSize:14,color:`${C.t3}cc`,lineHeight:2,whiteSpace:'pre-line'}}>{t.hoursVal}</div>
            </div>
            <div>
              <div style={{fontSize:11,letterSpacing:'0.2em',color:C.t2,textTransform:'uppercase',marginBottom:12,fontWeight:500}}>Contact & Social</div>
              <div style={{fontSize:14,color:`${C.t3}cc`,lineHeight:2.2}}>
                <a href="mailto:nailsbygossycharm@gmail.com" style={{color:`${C.t3}cc`,textDecoration:'none'}}>📧 nailsbygossycharm@gmail.com</a><br/>
                <a href="https://instagram.com/glossy_charme_beauty" target="_blank" rel="noreferrer" style={{color:`${C.t3}cc`,textDecoration:'none'}}>📸 @glossy_charme_beauty</a><br/>
                <a href="https://facebook.com/nailsbygossycharm" target="_blank" rel="noreferrer" style={{color:`${C.t3}cc`,textDecoration:'none'}}>📘 Facebook</a>
              </div>
            </div>
          </div>
          <div style={{borderTop:`1px solid rgba(255,255,255,.08)`,paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <div style={{fontSize:12,color:'rgba(255,255,255,.25)'}}>© 2026 Nails by Glossy Charm · Oldham, England</div>
            <button className="btn" style={{...btnO,borderColor:`${C.t2}50`,color:C.t2,fontSize:11,padding:'7px 18px'}} onClick={()=>{setView('admin');setAdminAuth(false);setAdminPass('');}}>{t.ownerLogin} Login</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── BOOKING ──────────────────────────────────────────────────────────────
  const Booking = () => {
    if (confirmed) return (
      <div style={{maxWidth:560,margin:'100px auto 60px',padding:'0 5%'}}>
        <div className="fadeup" style={{background:'white',borderRadius:28,padding:'48px 40px',border:`1px solid ${C.b2}`,boxShadow:`0 24px 64px rgba(196,113,79,.12)`,textAlign:'center'}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:`linear-gradient(135deg,${C.t3},${C.b2})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,margin:'0 auto 24px'}}>🎉</div>
          <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:36,color:C.dark,marginBottom:10,fontWeight:400}}>{t.confirmTitle}</h2>
          <p style={{color:C.mid,marginBottom:6,fontSize:15}}>{t.confirmMsg}</p>
          <p style={{color:C.soft,fontSize:13,marginBottom:32}}>{t.confirmSub}</p>
          <div style={{background:C.b1,borderRadius:16,padding:20,marginBottom:28,textAlign:'left'}}>
            {[['Service / Serviço', tSvc(selSvc)],[lang==='en'?'Date':'Data', fmtDate(selDate)],[lang==='en'?'Time':'Hora', selTime],[lang==='en'?'Client':'Cliente', client.name],[t.deposit, `£${(selSvc.price*.2).toFixed(2)}`]].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',fontSize:13,padding:'5px 0',borderBottom:`1px solid ${C.b2}`}}>
                <span style={{color:C.soft}}>{k}</span>
                <span style={{fontWeight:600,color:C.dark}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:12,justifyContent:'center'}}>
            <button className="btn" style={btnP} onClick={()=>setView('home')}>{t.backHome}</button>
            <button className="btn" style={btnO} onClick={()=>{setStep(1);setSelSvc(null);setConfirmed(false);setSelDate(null);setSelTime('');setClient({name:'',email:'',phone:'',notes:''});setCard({name:'',number:'',expiry:'',cvv:''});}}>{t.bookAnother}</button>
          </div>
        </div>
      </div>
    );

    return (
      <div style={{maxWidth:600,margin:'100px auto 60px',padding:'0 5%',fontFamily:"'Inter',sans-serif"}}>
        <button onClick={()=>setView('home')} style={{background:'none',border:'none',cursor:'pointer',color:C.soft,fontSize:13,marginBottom:20,display:'flex',alignItems:'center',gap:6}}>← {lang==='en'?'Back to home':'Voltar ao início'}</button>
        <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:38,color:C.dark,fontWeight:300,marginBottom:32}}>{t.bookTitle}</h1>

        {/* Step bar */}
        <div style={{display:'flex',gap:6,marginBottom:36,alignItems:'center'}}>
          {t.steps.map((s,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',flex:1,gap:4}}>
              <div style={{flex:1,height:4,borderRadius:4,background:i<step?C.t1:C.b2,transition:'background .3s'}}/>
              {i < t.steps.length-1 && <div style={{width:4,height:4,borderRadius:'50%',background:i<step-1?C.t1:C.b2}}/>}
            </div>
          ))}
        </div>
        <div style={{fontSize:11,letterSpacing:'0.15em',color:C.t1,textTransform:'uppercase',fontWeight:600,marginBottom:20}}>
          {lang==='en'?'Step':'Passo'} {step}/4 — {t.steps[step-1]}
        </div>

        <div className="fadeup" key={step} style={{background:'white',borderRadius:24,padding:'36px',border:`1px solid ${C.b2}`,boxShadow:`0 16px 48px rgba(196,113,79,.09)`}}>

          {/* STEP 1 */}
          {step===1 && (
            <div>
              <div style={{display:'flex',gap:6,marginBottom:20,flexWrap:'wrap'}}>
                {['Manicure','Pedicure','Eyelashes','Combo'].map((c,i)=>(
                  <button key={c} className="btn" onClick={()=>setCat(c)} style={{padding:'8px 18px',borderRadius:20,fontSize:12,fontWeight:500,border:`1px solid ${cat===c?C.t1:C.b2}`,background:cat===c?C.t1:'white',color:cat===c?'white':C.mid,cursor:'pointer'}}>{t.cats[i]}</button>
                ))}
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {SERVICES.filter(s=>s.cat===cat).map(svc=>(
                  <div key={svc.id} onClick={()=>setSelSvc(svc)} style={{padding:'16px 20px',borderRadius:14,border:`2px solid ${selSvc?.id===svc.id?C.t1:C.b2}`,background:selSvc?.id===svc.id?`${C.t3}40`:'white',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',transition:'all .2s'}}>
                    <div>
                      <div style={{fontWeight:500,color:C.dark,fontSize:15}}>{tSvc(svc)}</div>
                      <div style={{fontSize:12,color:C.soft,marginTop:3}}>{svc.dur} · {tDesc(svc)}</div>
                    </div>
                    <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,color:C.t1,fontWeight:600,minWidth:60,textAlign:'right'}}>£{svc.price}</div>
                  </div>
                ))}
              </div>
              <button className="btn" style={{...btnP,width:'100%',padding:14,marginTop:24,opacity:selSvc?1:.5}} onClick={()=>selSvc&&setStep(2)}>{t.next} →</button>
            </div>
          )}

          {/* STEP 2 */}
          {step===2 && (
            <div>
              <div style={{fontSize:11,color:C.soft,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:12,fontWeight:500}}>{t.selDate}</div>
              <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:10,marginBottom:28}}>
                {days.map((d,i)=>{
                  const sel = selDate?.toDateString()===d.toDateString();
                  const isSun = d.getDay()===0;
                  return (
                    <div key={i} onClick={()=>!isSun&&setSelDate(d)} style={{minWidth:58,padding:'12px 6px',borderRadius:14,textAlign:'center',cursor:isSun?'not-allowed':'pointer',border:`1.5px solid ${sel?C.t1:C.b2}`,background:sel?C.t1:isSun?C.b1:'white',color:sel?'white':isSun?C.b2:C.dark,opacity:isSun?.5:1,transition:'all .2s',flexShrink:0}}>
                      <div style={{fontSize:9,fontWeight:600,letterSpacing:'0.05em',opacity:.8}}>{d.toLocaleDateString('en-GB',{weekday:'short'}).toUpperCase()}</div>
                      <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:600,margin:'2px 0'}}>{d.getDate()}</div>
                      <div style={{fontSize:9,opacity:.7}}>{d.toLocaleDateString('en-GB',{month:'short'})}</div>
                    </div>
                  );
                })}
              </div>
              {selDate && (
                <>
                  <div style={{fontSize:11,color:C.soft,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:12,fontWeight:500}}>{t.selTime}</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:24}}>
                    {SLOTS.map(slot=>{
                      const taken = bookings.some(b=>b.date===fmtISO(selDate)&&b.time===slot);
                      const sel = selTime===slot;
                      return (
                        <button key={slot} className={taken?'':'btn'} disabled={taken} onClick={()=>setSelTime(slot)} style={{padding:'11px 0',borderRadius:10,fontSize:13,fontFamily:"'Inter',sans-serif",border:`1.5px solid ${sel?C.t1:taken?C.b1:C.b2}`,background:sel?C.t1:taken?C.b1:'white',color:sel?'white':taken?C.b2:C.dark,cursor:taken?'not-allowed':'pointer',transition:'all .2s',fontWeight:sel?500:400}}>
                          {taken?<span style={{fontSize:10}}>✗</span>:slot}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              <div style={{display:'flex',gap:10}}>
                <button className="btn" style={btnO} onClick={()=>setStep(1)}>{t.back}</button>
                <button className="btn" style={{...btnP,flex:1,padding:14,opacity:selDate&&selTime?1:.5}} onClick={()=>selDate&&selTime&&setStep(3)}>{t.next} →</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step===3 && (
            <div>
              <div style={{display:'flex',flexDirection:'column',gap:16,marginBottom:24}}>
                {[{k:'name',l:t.yourName,p:'e.g. Sophie Mills',type:'text'},{k:'email',l:t.yourEmail,p:'your@email.com',type:'email'},{k:'phone',l:t.yourPhone,p:'+44 7700 000000',type:'tel'},{k:'notes',l:t.notes,p:lang==='en'?'Any allergies or requests?':'Alergias ou pedidos especiais?',type:'text'}].map(f=>(
                  <div key={f.k}>
                    <label style={{fontSize:11,color:C.soft,letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:500}}>{f.l}</label>
                    <input className="inp" type={f.type} placeholder={f.p} value={client[f.k]} onChange={e=>setClient({...client,[f.k]:e.target.value})} style={{marginTop:6}}/>
                  </div>
                ))}
              </div>
              <div style={{background:C.b1,borderRadius:14,padding:16,marginBottom:24}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:C.soft}}>{tSvc(selSvc)}</span><strong>£{selSvc.price}</strong></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,color:C.soft}}><span>{fmtDate(selDate)} · {selTime}</span><span>{selSvc.dur}</span></div>
              </div>
              <div style={{display:'flex',gap:10}}>
                <button className="btn" style={btnO} onClick={()=>setStep(2)}>{t.back}</button>
                <button className="btn" style={{...btnP,flex:1,padding:14,opacity:client.name&&client.email?1:.5}} onClick={()=>client.name&&client.email&&setStep(4)}>{t.next} →</button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step===4 && (
            <div>
              <div style={{background:`${C.t3}50`,borderRadius:14,padding:'14px 18px',marginBottom:24}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:C.soft}}>{t.total}</span><span>£{selSvc.price}</span></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:15,fontWeight:600,color:C.t1}}><span>{t.deposit}</span><span>£{(selSvc.price*.2).toFixed(2)}</span></div>
                <p style={{fontSize:11,color:C.soft,marginTop:8,lineHeight:1.6}}>{t.depositNote}</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:20}}>
                {[{k:'name',l:t.cardName,p:'Name on card',type:'text',full:true},{k:'number',l:t.cardNum,p:'1234 5678 9012 3456',type:'text',full:true}].map(f=>(
                  <div key={f.k}>
                    <label style={{fontSize:11,color:C.soft,letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:500}}>{f.l}</label>
                    <input className="inp" type={f.type} placeholder={f.p} value={card[f.k]}
                      onChange={e=>{
                        let v=e.target.value;
                        if(f.k==='number') v=v.replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,'$1 ').slice(0,19);
                        setCard({...card,[f.k]:v});
                      }} style={{marginTop:6,letterSpacing:f.k==='number'?'0.15em':'normal'}}/>
                  </div>
                ))}
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  {[{k:'expiry',l:t.expiry,p:'MM/YY',max:5},{k:'cvv',l:t.cvv,p:'•••',max:3}].map(f=>(
                    <div key={f.k}>
                      <label style={{fontSize:11,color:C.soft,letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:500}}>{f.l}</label>
                      <input className="inp" placeholder={f.p} maxLength={f.max} value={card[f.k]} onChange={e=>setCard({...card,[f.k]:e.target.value})} style={{marginTop:6}}/>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 14px',background:C.b1,borderRadius:10,marginBottom:20,fontSize:12,color:C.soft}}>
                🔒 {t.secure}
              </div>
              <div style={{display:'flex',gap:10}}>
                <button className="btn" style={btnO} onClick={()=>setStep(3)}>{t.back}</button>
                <button className="btn" onClick={submitBooking} disabled={paying||!card.name||card.number.length<10}
                  style={{...btnP,flex:1,padding:14,opacity:paying||!card.name||card.number.length<10?.6:1,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
                  {paying ? <><span className="spin" style={{display:'inline-block',width:16,height:16,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'white',borderRadius:'50%'}}/><span className="pulse">{lang==='en'?'Processing…':'A processar…'}</span></> : `${t.payNow} · £${(selSvc.price*.2).toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── ADMIN ────────────────────────────────────────────────────────────────
  const Admin = () => {
    if (!adminAuth) return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',padding:'0 5%',background:`linear-gradient(150deg,${C.cream},${C.b1})`}}>
        <div className="fadeup" style={{background:'white',borderRadius:28,padding:'48px 40px',maxWidth:380,width:'100%',textAlign:'center',border:`1px solid ${C.b2}`,boxShadow:`0 24px 64px rgba(196,113,79,.12)`}}>
          <Logo />
          <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:30,color:C.dark,margin:'24px 0 6px',fontWeight:300}}>{t.adminTitle}</h2>
          <p style={{fontSize:13,color:C.soft,marginBottom:28}}>{t.adminSub}</p>
          <input className="inp" type="password" placeholder={t.passLabel} value={adminPass}
            onChange={e=>{setAdminPass(e.target.value);setAdminErr(false);}}
            onKeyDown={e=>e.key==='Enter'&&(adminPass==='glossy2024'?setAdminAuth(true):setAdminErr(true))}
            style={{textAlign:'center',fontSize:16,letterSpacing:'0.2em',marginBottom:8}}/>
          {adminErr && <p style={{color:C.t1,fontSize:12,margin:'4px 0 8px'}}>{t.wrongPass}</p>}
          <button className="btn" style={{...btnP,width:'100%',padding:14,marginTop:8}} onClick={()=>adminPass==='glossy2024'?setAdminAuth(true):setAdminErr(true)}>{t.login}</button>
          <button style={{background:'none',border:'none',color:C.soft,fontSize:12,cursor:'pointer',marginTop:16}} onClick={()=>setView('home')}>← {lang==='en'?'Back to site':'Voltar ao site'}</button>
        </div>
      </div>
    );

    const todayB = bookings.filter(b=>b.date===today);
    const displayed = adminTab==='today' ? todayB : [...bookings].sort((a,b)=>a.date.localeCompare(b.date));
    const confirmed_n = bookings.filter(b=>b.status==='confirmed').length;
    const revenue = bookings.filter(b=>b.status==='confirmed').reduce((s,b)=>s+b.price,0);

    const toggle  = id => setBookings(prev=>prev.map(b=>b.id===id?{...b,status:b.status==='confirmed'?'pending':'confirmed'}:b));
    const remove  = id => setBookings(prev=>prev.filter(b=>b.id!==id));

    const statColor = s => s==='confirmed'?{bg:'#E8F5E9',col:'#2E7D32'}:s==='pending'?{bg:'#FFF3E0',col:'#E65100'}:{bg:'#FFEBEE',col:'#C62828'};

    return (
      <div style={{maxWidth:960,margin:'88px auto 60px',padding:'0 5%',fontFamily:"'Inter',sans-serif"}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:16,marginBottom:36}}>
          <div>
            <div style={{fontSize:11,letterSpacing:'0.2em',color:C.t1,textTransform:'uppercase',fontWeight:500,marginBottom:10}}>✦ {lang==='en'?'Owner Dashboard':'Painel de Controlo'} ✦</div>
            <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:40,color:C.dark,fontWeight:300}}>{t.adminTitle}</h1>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button className="btn" style={btnO} onClick={()=>setView('home')}>{t.backSite}</button>
            <button className="btn" style={btnG} onClick={()=>{setAdminAuth(false);setAdminPass('');setView('home');}}>{t.logout}</button>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:16,marginBottom:32}}>
          {[[bookings.length,'📅'],[todayB.length,'⏰'],[confirmed_n,'✅'],[`£${revenue}`,'💰']].map(([val,icon],i)=>(
            <div key={i} style={{background:'white',borderRadius:18,padding:'22px 18px',border:`1px solid ${C.b2}`,textAlign:'center',boxShadow:`0 4px 16px rgba(196,113,79,.06)`}}>
              <div style={{fontSize:26,marginBottom:8}}>{icon}</div>
              <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:30,color:C.t1,fontWeight:600}}>{val}</div>
              <div style={{fontSize:11,color:C.soft,letterSpacing:'0.05em',marginTop:4,textTransform:'uppercase'}}>{t.statsLabel[i]}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {['today','all'].map(tab=>(
            <button key={tab} className="btn" onClick={()=>setAdminTab(tab)} style={{padding:'10px 26px',borderRadius:28,fontSize:12,fontWeight:500,border:`1.5px solid ${adminTab===tab?C.t1:C.b2}`,background:adminTab===tab?C.t1:'white',color:adminTab===tab?'white':C.mid,cursor:'pointer',letterSpacing:'0.05em',textTransform:'uppercase'}}>
              {tab==='today'?t.todayAppts:t.allAppts}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{background:'white',borderRadius:20,border:`1px solid ${C.b2}`,overflow:'hidden',boxShadow:`0 8px 32px rgba(196,113,79,.07)`}}>
          {displayed.length===0 ? (
            <div style={{padding:56,textAlign:'center',color:C.soft}}>
              <div style={{fontSize:40,marginBottom:12}}>📭</div>
              <div>{t.noAppts}</div>
            </div>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
                <thead>
                  <tr style={{background:C.b1}}>
                    {t.col.map(h=><th key={h} style={{padding:'14px 16px',textAlign:'left',fontSize:11,letterSpacing:'0.1em',textTransform:'uppercase',color:C.soft,fontWeight:500,whiteSpace:'nowrap'}}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {displayed.map((b,i)=>{
                    const sc = statColor(b.status);
                    return (
                      <tr key={b.id} style={{borderTop:`1px solid ${C.b1}`,background:i%2===0?'white':C.cream}}>
                        <td style={{padding:'14px 16px',fontWeight:500,color:C.dark,whiteSpace:'nowrap'}}>{b.name}</td>
                        <td style={{padding:'14px 16px',color:C.soft}}>{b.service}</td>
                        <td style={{padding:'14px 16px',color:C.soft,whiteSpace:'nowrap'}}>{b.date}</td>
                        <td style={{padding:'14px 16px',fontWeight:500}}>{b.time}</td>
                        <td style={{padding:'14px 16px',fontFamily:"'Playfair Display',Georgia,serif",fontSize:18,color:C.t1,fontWeight:600}}>£{b.price}</td>
                        <td style={{padding:'14px 16px'}}>
                          <span style={{padding:'4px 12px',borderRadius:20,fontSize:11,fontWeight:500,background:sc.bg,color:sc.col}}>
                            {b.status==='confirmed'?t.confirmed:b.status==='pending'?t.pending:t.cancelled}
                          </span>
                        </td>
                        <td style={{padding:'14px 16px'}}>
                          <div style={{display:'flex',gap:6,whiteSpace:'nowrap'}}>
                            <button className="btn" onClick={()=>toggle(b.id)} style={{padding:'5px 12px',borderRadius:12,fontSize:11,border:`1px solid ${C.t2}`,background:'transparent',color:C.t1,cursor:'pointer',fontFamily:"'Inter',sans-serif"}}>
                              {b.status==='confirmed'?'↩':' ✓'}
                            </button>
                            <button className="btn" onClick={()=>remove(b.id)} style={{padding:'5px 12px',borderRadius:12,fontSize:11,border:'1px solid #FFCDD2',background:'transparent',color:'#C62828',cursor:'pointer',fontFamily:"'Inter',sans-serif"}}>✕</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <p style={{marginTop:14,fontSize:11,color:C.soft,textAlign:'center'}}>
          {lang==='en'?'Admin password: glossy2024 · Change this before going live':'Senha admin: glossy2024 · Alterar antes de lançar'}
        </p>
      </div>
    );
  };

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={{fontFamily:"'Inter',sans-serif",color:C.dark,minHeight:'100vh',background:C.cream}}>
      {Nav()}
      {view==='home'    && Home()}
      {view==='booking' && Booking()}
      {view==='admin'   && Admin()}
    </div>
  );
}
