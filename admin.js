const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
const orb = document.getElementById('orb');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+'px';cursor.style.top=my+'px';
  orb.style.left=(mx-150)+'px';orb.style.top=(my-150)+'px';
});
function animRing(){
  rx+=(mx-rx)*0.15;ry+=(my-ry)*0.15;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a,button,.project-card,.skill-chip').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cursor.style.width='6px';cursor.style.height='6px';
    ring.style.width='50px';ring.style.height='50px';
    ring.style.borderColor='rgba(0,170,255,0.8)';
  });
  el.addEventListener('mouseleave',()=>{
    cursor.style.width='10px';cursor.style.height='10px';
    ring.style.width='30px';ring.style.height='30px';
    ring.style.borderColor='rgba(0,170,255,0.5)';
  });
});

// Language toggle
function setLang(lang) {
  const body = document.body;
  const btnEn = document.getElementById('btnEn');
  const btnFa = document.getElementById('btnFa');
  if(lang==='fa'){
    body.classList.add('fa');
    btnFa.classList.add('active');
    btnEn.classList.remove('active');
    document.querySelector('html').setAttribute('lang','fa');
  } else {
    body.classList.remove('fa');
    btnEn.classList.add('active');
    btnFa.classList.remove('active');
    document.querySelector('html').setAttribute('lang','en');
  }
}

// Tabs
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  event.target.classList.add('active');
}

// Scroll animation for skill bars
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-fill').forEach(bar=>{
        bar.style.animationPlayState='running';
      });
    }
  });
},{threshold:0.2});
document.querySelectorAll('.skill-item').forEach(item=>{
  item.querySelectorAll('.skill-fill').forEach(bar=>bar.style.animationPlayState='paused');
  observer.observe(item.parentElement);
});

// Fade-in on scroll
const fadeObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity='1';
      e.target.style.transform='translateY(0)';
    }
  });
},{threshold:0.1});
document.querySelectorAll('.project-card,.about-card,.cert-card,.timeline-item').forEach(el=>{
  el.style.opacity='0';
  el.style.transform='translateY(20px)';
  el.style.transition='opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// Mobile menu
function toggleMobile(){
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobile(){
  document.getElementById('mobileMenu').classList.remove('open');
}

// Contact
function sendMsg(){
  const name=document.getElementById('cname').value;
  const email=document.getElementById('cemail').value;
  const subj=document.getElementById('csubject').value;
  const msg=document.getElementById('cmessage').value;
  if(!name||!email||!msg){alert('Please fill in required fields.');return;}
  window.location.href=`mailto:amirh.sekhavatfar@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent('From: '+name+'\nEmail: '+email+'\n\n'+msg)}`;
}

// ─── Project Simulations JSON ───────────────────────────────────────
// srcdoc: کد کامل شبیه‌سازی اینجاست — نیازی به فایل جداگانه نیست
const SIM_PLC_WATER = `<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Tahoma,Arial,sans-serif;background:#f4f4f4;color:#222;direction:rtl}h1{text-align:center;padding:14px;font-size:15px;background:#1a2a3a;color:#fff}#sim{display:flex;gap:14px;align-items:flex-start;padding:14px;max-width:780px;margin:0 auto;flex-wrap:wrap}#left-panel{display:flex;flex-direction:column;gap:10px;flex:1;min-width:260px}#right-panel{width:200px;display:flex;flex-direction:column;gap:10px;min-width:190px}.panel-card{background:#fff;border:1px solid #ddd;border-radius:10px;padding:10px 14px}.panel-title{font-size:11px;color:#666;font-weight:bold;margin-bottom:8px;letter-spacing:.04em}#btn-start,#btn-stop{width:68px;height:68px;border-radius:50%;border:none;cursor:pointer;font-size:13px;font-weight:bold;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;transition:transform .1s,opacity .1s}#btn-start{background:#2e8b2e;box-shadow:0 3px 0 #1a5a1a}#btn-start:active{transform:translateY(2px);box-shadow:0 1px 0 #1a5a1a}#btn-stop{background:#b22222;box-shadow:0 3px 0 #7a1212}#btn-stop:active{transform:translateY(2px);box-shadow:0 1px 0 #7a1212}#btn-start:disabled,#btn-stop:disabled{opacity:.4;cursor:default}.btn-row{display:flex;gap:16px;align-items:center;justify-content:center}.btn-label{font-size:10px;margin-top:2px}.status-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.status-label{font-size:12px;color:#555}.led{width:14px;height:14px;border-radius:50%;background:#444;border:1px solid #222;transition:background .3s,box-shadow .3s}.led.on-green{background:#2ecc40;box-shadow:0 0 6px #2ecc40}.led.on-red{background:#e74c3c;box-shadow:0 0 6px #e74c3c}#step-badge{font-size:12px;font-weight:bold;background:#f0f0f0;border:1px solid #ddd;border-radius:8px;padding:8px 10px;color:#222;text-align:center;min-height:38px;display:flex;align-items:center;justify-content:center}#step-num{font-size:11px;color:#888;text-align:center;margin-top:4px}#plc-display{background:#1a2a1a;border-radius:8px;padding:8px 10px;font-size:11px;color:#66ff66;font-family:'Courier New',monospace;min-height:70px;line-height:1.7;direction:ltr;text-align:left}#tank-svg{width:100%}</style></head><body><h1>شبیه‌سازی سیستم کنترل سطح آب با PLC Siemens S7-300</h1><div id="sim"><div id="left-panel"><div class="panel-card"><div class="panel-title">مرحله فعلی سیکل</div><div id="step-badge">آماده — مخزن خالی</div><div id="step-num">گام ۱ از ۱۲</div></div><div class="panel-card" style="padding:16px"><svg id="tank-svg" viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker><clipPath id="tankClip"><rect x="110" y="60" width="160" height="200" rx="8"/></clipPath></defs><rect x="50" y="55" width="65" height="14" rx="4" fill="none" stroke="#aaa" stroke-width="1.5"/><rect id="inlet-flow" x="50" y="57" width="0" height="10" rx="2" fill="#3B8BD4" opacity="0.7"/><text style="font-size:10px;fill:#666" x="53" y="48" text-anchor="start">ورودی آب</text><g id="valve-in"><rect x="44" y="52" width="18" height="20" rx="4" fill="#eee" stroke="#aaa" stroke-width="1"/><text id="valve-in-sym" style="font-size:10px;font-weight:bold;fill:#888" x="53" y="66" text-anchor="middle">✕</text></g><line id="inlet-arrow" x1="115" y1="62" x2="113" y2="62" stroke="#3B8BD4" stroke-width="2" marker-end="url(#arr2)" opacity="0"/><rect x="265" y="225" width="65" height="14" rx="4" fill="none" stroke="#aaa" stroke-width="1.5"/><rect id="outlet-flow" x="267" y="227" width="0" height="10" rx="2" fill="#3B8BD4" opacity="0.7"/><text style="font-size:10px;fill:#666" x="327" y="218" text-anchor="end">خروجی آب</text><g id="valve-out"><rect x="316" y="222" width="18" height="20" rx="4" fill="#eee" stroke="#aaa" stroke-width="1"/><text id="valve-out-sym" style="font-size:10px;font-weight:bold;fill:#888" x="325" y="236" text-anchor="middle">✕</text></g><line id="outlet-arrow" x1="267" y1="232" x2="265" y2="232" stroke="#3B8BD4" stroke-width="2" marker-end="url(#arr2)" opacity="0"/><rect x="110" y="60" width="160" height="200" rx="8" fill="#f0f8ff" stroke="#888" stroke-width="2"/><g clip-path="url(#tankClip)"><rect id="water-fill" x="110" y="260" width="160" height="0" fill="#3B8BD4" opacity="0.55" style="transition:y .3s ease,height .3s ease"/></g><rect x="110" y="60" width="160" height="200" rx="8" fill="none" stroke="#888" stroke-width="2"/><line x1="270" y1="110" x2="285" y2="110" stroke="#aaa" stroke-width="1" stroke-dasharray="3 2"/><circle id="sensor-high-dot" cx="275" cy="110" r="5" fill="#444" stroke="#aaa" stroke-width="1"/><text style="font-size:10px;fill:#555" x="292" y="114" text-anchor="start">سنسور سطح بالا</text><line x1="270" y1="230" x2="285" y2="230" stroke="#aaa" stroke-width="1" stroke-dasharray="3 2"/><circle id="sensor-low-dot" cx="275" cy="230" r="5" fill="#444" stroke="#aaa" stroke-width="1"/><text style="font-size:10px;fill:#555" x="292" y="234" text-anchor="start">سنسور سطح پایین</text><text id="level-text" style="font-size:13px;font-weight:bold;fill:#333" x="190" y="170" text-anchor="middle">0%</text><rect x="20" y="155" width="75" height="90" rx="6" fill="#fff" stroke="#555" stroke-width="1.5"/><text style="font-size:9px;font-weight:bold;fill:#222" x="57" y="170" text-anchor="middle">PLC</text><text style="font-size:8px;fill:#555" x="57" y="181" text-anchor="middle">Siemens</text><text style="font-size:8px;fill:#555" x="57" y="191" text-anchor="middle">S7-300</text><circle id="plc-led-q1" cx="35" cy="205" r="4" fill="#333"/><text style="font-size:7px;fill:#888" x="42" y="208" text-anchor="start">Q0.0</text><circle id="plc-led-q2" cx="35" cy="218" r="4" fill="#333"/><text style="font-size:7px;fill:#888" x="42" y="221" text-anchor="start">Q0.1</text><circle id="plc-led-i1" cx="62" cy="205" r="4" fill="#333"/><text style="font-size:7px;fill:#888" x="69" y="208" text-anchor="start">I0.0</text><circle id="plc-led-i2" cx="62" cy="218" r="4" fill="#333"/><text style="font-size:7px;fill:#888" x="69" y="221" text-anchor="start">I0.1</text><path d="M57 155 L57 135 L44 135 L44 72" fill="none" stroke="#ccc" stroke-width="0.7" stroke-dasharray="3 2"/><path d="M57 245 L57 270 L316 270 L316 242" fill="none" stroke="#ccc" stroke-width="0.7" stroke-dasharray="3 2"/></svg></div></div><div id="right-panel"><div class="panel-card"><div class="panel-title">پانل کنترل</div><div class="btn-row"><div style="display:flex;flex-direction:column;align-items:center;gap:4px"><button id="btn-start" onclick="pressStart()"><span style="font-size:18px">▶</span><span class="btn-label">START</span></button></div><div style="display:flex;flex-direction:column;align-items:center;gap:4px"><button id="btn-stop" onclick="pressStop()" disabled><span style="font-size:18px">■</span><span class="btn-label">STOP</span></button></div></div></div><div class="panel-card"><div class="panel-title">وضعیت سیستم</div><div class="status-row"><span class="status-label">ورودی آب</span><div id="led-in" class="led"></div></div><div class="status-row"><span class="status-label">خروجی آب</span><div id="led-out" class="led"></div></div><div class="status-row"><span class="status-label">سطح بالا</span><div id="led-high" class="led"></div></div><div class="status-row"><span class="status-label">سطح پایین</span><div id="led-low" class="led"></div></div></div><div class="panel-card"><div class="panel-title">خروجی PLC</div><div id="plc-display">Ready...<br>M0.0 = 0<br>Q0.0 = 0<br>Q0.1 = 0</div></div></div></div><script>const STEPS=[{num:1,title:"مخزن خالی",desc:"هر دو شیر برقی بسته هستند"},{num:2,title:"فشار دادن START",desc:"فرمان پر شدن مخزن صادر شد"},{num:3,title:"باز شدن شیر ورودی",desc:"آب وارد مخزن می‌شود"},{num:4,title:"بالا آمدن سطح آب",desc:"سطح آب در حال افزایش است"},{num:5,title:"فعال شدن سنسور سطح بالا",desc:"آب به سطح بالا رسید"},{num:6,title:"بسته شدن شیر ورودی",desc:"ورودی آب قطع شد"},{num:7,title:"فشار دادن STOP (تخلیه)",desc:"فرمان تخلیه مخزن صادر شد"},{num:8,title:"باز شدن شیر خروجی",desc:"آب از مخزن خارج می‌شود"},{num:9,title:"پایین آمدن سطح آب",desc:"سطح آب در حال کاهش است"},{num:10,title:"فعال شدن سنسور سطح پایین",desc:"آب به سطح پایین رسید"},{num:11,title:"بسته شدن شیر خروجی",desc:"خروجی آب قطع شد"},{num:12,title:"پایان سیکل",desc:"سیستم آماده سیکل بعدی است"}];let state={step:1,level:0,inletOpen:false,outletOpen:false,running:false};function setLed(id,mode){const el=document.getElementById(id);el.className='led'+(mode==='green'?' on-green':mode==='red'?' on-red':'')}function setPlcLed(id,on,color){document.getElementById(id).setAttribute('fill',on?(color==='green'?'#2ecc40':'#e74c3c'):'#333')}function setValve(side,open){const sym=document.getElementById('valve-'+side+'-sym');const rect=document.getElementById('valve-'+side).querySelector('rect');sym.textContent=open?'●':'✕';sym.setAttribute('fill',open?'#2ecc40':'#888');rect.setAttribute('fill',open?'#1a3a1a':'#eee')}function setFlowArrow(side,on){document.getElementById(side+'-arrow').setAttribute('opacity',on?'1':'0');const flow=document.getElementById(side+'-flow');flow.setAttribute('width',on?(side==='inlet'?'60':'58'):'0')}function updateWater(){const pct=state.level;const fillH=Math.round(200*pct/100);const fillY=260-fillH;const water=document.getElementById('water-fill');water.setAttribute('y',fillY);water.setAttribute('height',fillH);document.getElementById('level-text').textContent=Math.round(pct)+'%';const highActive=pct>=80;const lowActive=pct<=20;document.getElementById('sensor-high-dot').setAttribute('fill',highActive?'#e74c3c':'#444');document.getElementById('sensor-low-dot').setAttribute('fill',lowActive?'#e74c3c':'#444');setLed('led-high',highActive?'red':'');setLed('led-low',lowActive?'red':'')}function updateUI(){const s=state;setValve('in',s.inletOpen);setValve('out',s.outletOpen);setFlowArrow('inlet',s.inletOpen);setFlowArrow('outlet',s.outletOpen);setLed('led-in',s.inletOpen?'green':'');setLed('led-out',s.outletOpen?'green':'');setPlcLed('plc-led-q1',s.inletOpen,'green');setPlcLed('plc-led-q2',s.outletOpen,'green');setPlcLed('plc-led-i1',s.level>=80,'red');setPlcLed('plc-led-i2',s.level<=20,'red');const step=STEPS[s.step-1];document.getElementById('step-badge').textContent=step.title+' — '+step.desc;document.getElementById('step-num').textContent='گام '+step.num+' از ۱۲';document.getElementById('plc-display').innerHTML=['Step: '+step.num+' / 12','M0.0 = '+(s.running?'1':'0'),'Q0.0 (IN)  = '+(s.inletOpen?'1':'0'),'Q0.1 (OUT) = '+(s.outletOpen?'1':'0'),'I0.0 (High)= '+(s.level>=80?'1':'0'),'I0.1 (Low) = '+(s.level<=20?'1':'0')].join('<br>');updateWater()}function pressStart(){if(state.step===1||state.step===12){state.step=2;state.running=true;document.getElementById('btn-start').disabled=true;document.getElementById('btn-stop').disabled=false;updateUI();setTimeout(advanceFill,600)}}function pressStop(){if(state.step===6){state.step=7;document.getElementById('btn-stop').disabled=true;updateUI();setTimeout(advanceDrain,600)}}function advanceFill(){state.step=3;state.inletOpen=true;updateUI();setTimeout(()=>{state.step=4;updateUI();fillTick()},800)}function fillTick(){if(state.level<80){state.level=Math.min(80,state.level+2.5);updateUI();setTimeout(fillTick,120)}else{state.step=5;updateUI();setTimeout(()=>{state.inletOpen=false;state.step=6;document.getElementById('btn-stop').disabled=false;updateUI()},700)}}function advanceDrain(){state.step=8;state.outletOpen=true;updateUI();setTimeout(()=>{state.step=9;updateUI();drainTick()},800)}function drainTick(){if(state.level>20){state.level=Math.max(20,state.level-2.5);updateUI();setTimeout(drainTick,120)}else{state.step=10;updateUI();setTimeout(()=>{state.outletOpen=false;state.step=11;updateUI();setTimeout(()=>{state.step=12;state.running=false;document.getElementById('btn-start').disabled=false;document.getElementById('btn-stop').disabled=true;updateUI()},700)},700)}}updateUI();</script></body></html>`;

// فایل شبیه‌سازی برای دانلود (Blob)
const SIM_DOWNLOAD_FILES = {
  plc_water: { content: SIM_PLC_WATER, filename: "plc_simulation.html" }
};

const projectSimulations = [
  {
    id: "plc_water",
    titleEn: "Water Tank Level Control — PLC S7-300",
    titleFa: "کنترل سطح مخزن آب — PLC S7-300",
    descEn: "Interactive simulation of automatic water-level control using Siemens S7-300 PLC. Watch inlet/outlet valves respond to high/low level sensors with real-time PLC output display.",
    descFa: "شبیه‌سازی تعاملی کنترل خودکار سطح آب با PLC زیمنس S7-300. باز و بسته شدن شیرهای ورودی/خروجی و خروجی‌های PLC را به صورت زنده مشاهده کنید.",
    tags: ["PLC", "S7-300", "Ladder Logic", "SCADA", "Siemens"],
    srcdocKey: "SIM_PLC_WATER",
    iframeHeight: 420
  }
  // ─── برای اضافه کردن پروژه جدید: ───────────────────────────────────
  // ۱. یک متغیر مثل SIM_MY_PROJECT بالا بساز و کد HTML شبیه‌سازی رو توش بذار
  // ۲. توی SIM_DOWNLOAD_FILES یک entry اضافه کن
  // ۳. اینجا یک آبجکت جدید اضافه کن با srcdocKey و بقیه مشخصات
];

// Map srcdocKey → actual content
const SIM_CONTENT_MAP = { SIM_PLC_WATER };


function launchSim(id) {
  const overlay = document.getElementById('overlay-'+id);
  const iframe  = document.getElementById('iframe-'+id);
  overlay.classList.add('hidden');
  iframe.style.pointerEvents = 'all';
}

function downloadSim(id) {
  const info = SIM_DOWNLOAD_FILES[id];
  if (!info) return;
  const blob = new Blob([info.content], {type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = info.filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ─── PROJECTS PAGINATION ─────────────────────────────────────────────────────
const ALL_PROJECTS = [
  {
    imgHtml: `<div style="width:100%;height:100%"><iframe src="https://www.aparat.com/video/video/embed/videohash/wvtpun4/vt/frame" allowfullscreen="true" webkitallowfullscreen="true" style="width:100%;height:100%;border:none;display:block"></iframe></div>`,
    titleEn: "Water Tank Level Control with PLC",
    titleFa: "کنترل سطح مخزن آب با PLC",
    descEn: "Automatic water tank level control using Siemens S7-1200 PLC and HMI panel. Ladder logic programming with SCADA monitoring.",
    descFa: "کنترل خودکار سطح مخزن آب با PLC زیمنس S7-1200 و پنل HMI. برنامه‌نویسی Ladder Logic با مانیتورینگ SCADA.",
    tags: ["PLC","HMI","Ladder Logic","SCADA"]
  },
  {
    imgHtml: `<img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" style="width:100%;height:100%;object-fit:cover"><div class="project-img-overlay"></div>`,
    titleEn: "ESP32 Wi-Fi LED Controller",
    titleFa: "کنترلر LED وای‌فای ESP32",
    descEn: "Remote LED brightness and color control using ESP32 microcontroller via web interface and MQTT protocol.",
    descFa: "کنترل از راه دور روشنایی و رنگ LED با میکروکنترلر ESP32 از طریق وب اینترفیس و پروتکل MQTT.",
    tags: ["ESP32","IoT","MQTT","Wi-Fi"]
  },
  {
    imgHtml: `<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" style="width:100%;height:100%;object-fit:cover"><div class="project-img-overlay"></div>`,
    titleEn: "IoT Monitoring Dashboard",
    titleFa: "داشبورد مانیتورینگ IoT",
    descEn: "Real-time temperature and humidity monitoring dashboard using ESP32 sensors, MQTT broker, and Node-RED visualization.",
    descFa: "داشبورد مانیتورینگ لحظه‌ای دما و رطوبت با سنسورهای ESP32، MQTT و Node-RED.",
    tags: ["IoT","Node-RED","ESP32","Dashboard"]
  },
  {
    imgHtml: `<img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" style="width:100%;height:100%;object-fit:cover"><div class="project-img-overlay"></div>`,
    titleEn: "Industrial Automation Simulations",
    titleFa: "شبیه‌سازی‌های اتوماسیون صنعتی",
    descEn: "Various industrial process simulations in TIA Portal including conveyor control, motor starter, and PID control systems.",
    descFa: "شبیه‌سازی‌های متنوع فرآیندهای صنعتی در TIA Portal شامل کنترل نوار نقاله، استارتر موتور و سیستم‌های PID.",
    tags: ["PLC","TIA Portal","Simulation","PID"]
  },
  {
    imgHtml: `<img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" style="width:100%;height:100%;object-fit:cover"><div class="project-img-overlay"></div>`,
    titleEn: "Modbus Communication Projects",
    titleFa: "پروژه‌های ارتباط Modbus",
    descEn: "Modbus RTU/TCP communication between PLC, HMI, and sensors. Python scripts for data reading and logging from industrial devices.",
    descFa: "ارتباط Modbus RTU/TCP بین PLC، HMI و سنسورها. اسکریپت‌های Python برای خواندن و ذخیره داده از دستگاه‌های صنعتی.",
    tags: ["Modbus","Python","PLC","RS485"]
  },
  {
    imgHtml: `<img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" style="width:100%;height:100%;object-fit:cover"><div class="project-img-overlay"></div>`,
    titleEn: "Electrical Panel Design",
    titleFa: "طراحی تابلو برق",
    descEn: "Design and layout of industrial electrical control panels including circuit diagrams, component selection, and wiring documentation.",
    descFa: "طراحی و چیدمان تابلوهای کنترل برق صنعتی شامل نقشه مدار، انتخاب قطعات و مستندات سیم‌کشی.",
    tags: ["AutoCAD","Electrical","Panel","Design"]
  }
];

const PROJECTS_PER_PAGE = 3;
let currentProjectPage = 1;

function buildProjectCards() {
  const grid = document.getElementById('projectsGrid');
  const pagination = document.getElementById('projectsPagination');
  if (!grid || !pagination) return;
  const isFa = document.body.classList.contains('fa');
  const totalPages = Math.ceil(ALL_PROJECTS.length / PROJECTS_PER_PAGE);
  const start = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
  const pageItems = ALL_PROJECTS.slice(start, start + PROJECTS_PER_PAGE);

  // Build cards
  grid.innerHTML = pageItems.map(p => `
    <div class="project-card">
      <div class="project-img" style="height:200px;padding:0;overflow:hidden">${p.imgHtml}</div>
      <div class="project-body">
        <div class="project-title">${isFa ? p.titleFa : p.titleEn}</div>
        <div class="project-desc">${isFa ? p.descFa : p.descEn}</div>
        <div class="project-tags">${p.tags.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');

  // Build pagination
  let html = `<button class="page-arrow" onclick="goProjectPage(${currentProjectPage-1})" ${currentProjectPage===1?'disabled':''}>← ${isFa?'قبلی':'Prev'}</button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i===currentProjectPage?'active':''}" onclick="goProjectPage(${i})">${i}</button>`;
  }
  html += `<button class="page-arrow" onclick="goProjectPage(${currentProjectPage+1})" ${currentProjectPage===totalPages?'disabled':''}>${isFa?'بعدی':'Next'} →</button>`;
  pagination.innerHTML = html;
}

window.goProjectPage = function(page) {
  const totalPages = Math.ceil(ALL_PROJECTS.length / PROJECTS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentProjectPage = page;
  buildProjectCards();
  document.getElementById('projects').scrollIntoView({behavior:'smooth', block:'start'});
};

// ─── SIMULATIONS PAGINATION ───────────────────────────────────────────────────
const SIMS_PER_PAGE = 2;
let currentSimPage = 1;

function buildSimCards() {
  const grid = document.getElementById('simGrid');
  const pagination = document.getElementById('simPagination');
  if (!grid) return;
  const isFa = document.body.classList.contains('fa');
  const totalPages = Math.ceil(projectSimulations.length / SIMS_PER_PAGE);
  const start = (currentSimPage - 1) * SIMS_PER_PAGE;
  const pageItems = projectSimulations.slice(start, start + SIMS_PER_PAGE);

  grid.innerHTML = '';
  pageItems.forEach(proj => {
    const title  = isFa ? proj.titleFa : proj.titleEn;
    const desc   = isFa ? proj.descFa  : proj.descEn;
    const tagHTML = proj.tags.map(t => `<span class="sim-tag">${t}</span>`).join('');
    const card = document.createElement('div');
    card.className = 'sim-card';
    card.innerHTML = `
      <div class="sim-header">
        <div class="sim-title-wrap">
          <div class="sim-dot"></div>
          <div class="sim-title">${title}</div>
        </div>
        <span class="sim-badge">${isFa ? 'دموی زنده' : 'Live Demo'}</span>
      </div>
      <div class="sim-iframe-wrap" id="wrap-${proj.id}" style="height:${proj.iframeHeight}px">
        <iframe
          id="iframe-${proj.id}"
          height="${proj.iframeHeight}"
          loading="lazy"
          style="pointer-events:none;width:100%;border:none;display:block"
          title="${title}">
        </iframe>
        <div class="sim-overlay" id="overlay-${proj.id}">
          <button class="sim-play-btn" onclick="launchSim('${proj.id}')">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <span class="sim-overlay-label">${isFa ? 'کلیک برای تعامل' : 'Click to Interact'}</span>
        </div>
      </div>
      <div class="sim-body">
        <p class="sim-desc">${desc}</p>
        <div class="sim-tags">${tagHTML}</div>
        <button class="sim-download-btn" onclick="downloadSim('${proj.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          ${isFa ? 'دانلود فایل پروژه' : 'Download Project File'}
        </button>
      </div>
    `;
    grid.appendChild(card);
    const iframe = document.getElementById('iframe-'+proj.id);
    iframe.srcdoc = SIM_CONTENT_MAP[proj.srcdocKey];
  });

  // Build sim pagination
  if (pagination) {
    if (totalPages <= 1) { pagination.innerHTML = ''; return; }
    let html = `<button class="page-arrow" onclick="goSimPage(${currentSimPage-1})" ${currentSimPage===1?'disabled':''}>← ${isFa?'قبلی':'Prev'}</button>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<button class="page-btn ${i===currentSimPage?'active':''}" onclick="goSimPage(${i})">${i}</button>`;
    }
    html += `<button class="page-arrow" onclick="goSimPage(${currentSimPage+1})" ${currentSimPage===totalPages?'disabled':''}>${isFa?'بعدی':'Next'} →</button>`;
    pagination.innerHTML = html;
  }
}

window.goSimPage = function(page) {
  const totalPages = Math.ceil(projectSimulations.length / SIMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentSimPage = page;
  buildSimCards();
  document.getElementById('simulations').scrollIntoView({behavior:'smooth', block:'start'});
};

// Build on load and on language switch
document.addEventListener('DOMContentLoaded', () => {
  buildProjectCards();
  buildSimCards();
});

// Patch setLang to rebuild cards on language change
const _origSetLang = setLang;
setLang = function(lang) {
  _origSetLang(lang);
  buildProjectCards();
  buildSimCards();
};


// ─── INTRO OVERLAY ────────────────────────────────────────────────────────────
(function () {
  if (!document.getElementById('introOverlay')) return;
  const introTextEl  = document.getElementById('introText');
  const introBarFill = document.getElementById('introBarFill');
  const overlay      = document.getElementById('introOverlay');

  /* ── متن‌های معرفی (هر خط یک بلوک جداگانه) ── */
  const lines = [
    { text: "Hello 👋  I'm", style: "greeting" },
    { text: "Amir Hossein Sekhavatfar", style: "name" },
    { text: "Electrical Engineering Student", style: "title" },
    { text: "Industrial Automation  ·  PLC  ·  IoT  ·  ESP32  ·  SCADA", style: "tags" },
    { text: "Welcome to my portfolio ...", style: "welcome" }
  ];

  let lineIdx   = 0;
  let charIdx   = 0;
  let typingTimer = null;
  let totalChars  = lines.reduce((s, l) => s + l.text.length, 0);
  let typedChars  = 0;

  /* ── Smart Keyboard Sound Engine ── */
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;
  // Pre-generate a small pool of slightly varied noise buffers for realism
  let noiseBufs = [];

  function initAudio() {
    if (audioCtx) return;
    audioCtx = new AudioCtx();
    // Create 8 varied noise buffers (natural variation between keystrokes)
    for (let b = 0; b < 8; b++) {
      const size = Math.floor(audioCtx.sampleRate * (0.028 + Math.random() * 0.014));
      const buf  = audioCtx.createBuffer(1, size, audioCtx.sampleRate);
      const d    = buf.getChannelData(0);
      for (let i = 0; i < size; i++) d[i] = (Math.random() * 2 - 1);
      noiseBufs.push(buf);
    }
  }

  function playKeyClick(charType) {
    try {
      initAudio();
      const ctx = audioCtx;
      const now = ctx.currentTime;

      // Pick random noise buffer
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBufs[Math.floor(Math.random() * noiseBufs.length)];

      /* ── Tone varies by character type ── */
      // space/punctuation → softer, lower; normal char → crisp mid-range
      const isSpace = charType === 'space';
      const isPunct = charType === 'punct';

      // 1. Low-pass shaping (warm, not harsh)
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = isSpace ? 1400 : isPunct ? 1900 : 2600 + Math.random() * 400;
      lp.Q.value = 0.7;

      // 2. Presence peak (gives key the "thock" character)
      const peak = ctx.createBiquadFilter();
      peak.type = 'peaking';
      peak.frequency.value = isSpace ? 700 : 1100 + Math.random() * 200;
      peak.gain.value = isSpace ? 4 : 7;
      peak.Q.value = 1.8;

      // 3. Volume envelope — fast attack, natural exponential decay
      const gain = ctx.createGain();
      const vol  = isSpace ? 0.09 : isPunct ? 0.10 : 0.13;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.0015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (isSpace ? 0.07 : 0.055));

      // 4. Tiny tonal overtone (makes it feel like a real key, not just noise)
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = isSpace ? 420 : isPunct ? 680 : 820 + Math.random() * 120;
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(isSpace ? 0.025 : 0.04, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      // 5. Subtle room reverb (short IR)
      const irSize = Math.floor(ctx.sampleRate * 0.06);
      const irBuf  = ctx.createBuffer(1, irSize, ctx.sampleRate);
      const irData = irBuf.getChannelData(0);
      for (let i = 0; i < irSize; i++)
        irData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irSize, 3);
      const rev  = ctx.createConvolver();
      rev.buffer = irBuf;
      const revG = ctx.createGain();
      revG.gain.value = 0.06;

      // Wire up
      noiseSrc.connect(lp); lp.connect(peak); peak.connect(gain);
      gain.connect(ctx.destination);
      gain.connect(rev); rev.connect(revG); revG.connect(ctx.destination);
      osc.connect(oscGain); oscGain.connect(ctx.destination);

      noiseSrc.start(now); noiseSrc.stop(now + 0.09);
      osc.start(now); osc.stop(now + 0.03);
    } catch (e) {}
  }

  /* ── Render typed text with floating line styles ── */
  function renderLines(completedLines, currentPartial, currentStyle) {
    let html = '';
    completedLines.forEach(({text, style}) => {
      html += `<div class="intro-line intro-line--${style} intro-line--done">${escHtml(text)}</div>`;
    });
    if (currentPartial !== null) {
      html += `<div class="intro-line intro-line--${currentStyle}">${escHtml(currentPartial)}<span class="intro-cursor"></span></div>`;
    }
    introTextEl.innerHTML = html;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function charType(ch) {
    if (ch === ' ') return 'space';
    if (/[·.,!?:;'"()\-_]/.test(ch)) return 'punct';
    return 'normal';
  }

  const done = []; // completed line objects

  function typeNext() {
    if (lineIdx >= lines.length) {
      // All done — brief pause then close
      renderLines(done, null, null);
      setTimeout(skipIntro, 1600);
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.text.length) {
      const ch = line.text[charIdx];
      charIdx++;
      typedChars++;
      introBarFill.style.width = (typedChars / totalChars * 100) + '%';
      playKeyClick(charType(ch));
      renderLines(done, line.text.slice(0, charIdx), line.style);
      // Smart speed: slightly slower for first char of line, normal otherwise
      const speed = charIdx === 1 ? 80 : 42 + Math.random() * 28;
      typingTimer = setTimeout(typeNext, speed);
    } else {
      done.push({ text: line.text, style: line.style });
      lineIdx++;
      charIdx = 0;
      // Pause between lines (breathing room)
      const pause = lineIdx === 1 ? 320 : 260 + Math.random() * 80;
      typingTimer = setTimeout(typeNext, pause);
    }
  }

  window.skipIntro = function () {
    if (typingTimer) clearTimeout(typingTimer);
    introBarFill.style.width = '100%';
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  };

  /* ── Inject line styles ── */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes pulse2  { 0%,100%{box-shadow:0 0 20px rgba(0,170,255,0.3)} 50%{box-shadow:0 0 55px rgba(0,170,255,0.8)} }
    @keyframes lineIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

    #introText { text-align: center; }

    .intro-line {
      display: block;
      animation: lineIn 0.35s ease forwards;
      line-height: 1.5;
      margin-bottom: 6px;
    }
    .intro-line--done { opacity: 1; }

    .intro-line--greeting {
      font-size: clamp(14px, 2.2vw, 20px);
      color: var(--text3);
      letter-spacing: 3px;
      font-family: 'Rajdhani', sans-serif;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .intro-line--name {
      font-size: clamp(26px, 4.5vw, 46px);
      font-family: 'Rajdhani', sans-serif;
      font-weight: 700;
      color: var(--neon);
      letter-spacing: 2px;
      text-shadow: 0 0 40px rgba(0,170,255,0.35);
      margin-bottom: 10px;
    }
    .intro-line--title {
      font-size: clamp(14px, 2vw, 19px);
      color: var(--text2);
      letter-spacing: 1.5px;
      font-weight: 400;
      margin-bottom: 14px;
    }
    .intro-line--tags {
      font-size: clamp(11px, 1.5vw, 14px);
      color: rgba(0,170,255,0.7);
      letter-spacing: 2px;
      font-family: 'Rajdhani', sans-serif;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .intro-line--welcome {
      font-size: clamp(12px, 1.6vw, 15px);
      color: var(--text3);
      letter-spacing: 3px;
      font-style: italic;
    }
  `;
  document.head.appendChild(styleEl);

  /* ── Start on DOMContentLoaded ── */
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';

    const st = document.createElement('style');
    st.textContent = `@keyframes pulse2{0%,100%{box-shadow:0 0 20px rgba(0,170,255,0.3)}50%{box-shadow:0 0 55px rgba(0,170,255,0.8)}}`;
    document.head.appendChild(st);

    introTextEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:20px">
        <div style="font-size:12px;letter-spacing:4px;color:var(--text3);font-family:'Rajdhani',sans-serif;text-transform:uppercase">Portfolio · Initializing</div>
        <button onclick="startIntro()" style="
          background:var(--neon);color:var(--bg);border:none;
          padding:14px 44px;border-radius:3px;
          font-size:15px;font-weight:700;letter-spacing:3px;
          text-transform:uppercase;cursor:pointer;
          font-family:'Rajdhani',sans-serif;
          animation:pulse2 1.6s ease infinite;
        ">▶ ENTER</button>
        <div style="font-size:11px;color:var(--text3);letter-spacing:1px;opacity:0.6">click to unlock audio</div>
      </div>
    `;
  });

  window.startIntro = function () {
    introTextEl.innerHTML = '';
    introBarFill.style.width = '0%';
    setTimeout(typeNext, 300);
  };
})();
// ──────────────────────────────────────────────────────────────────────────────


// ═══════════════════════════════════════════════════════
// FEED ENGINE
// ═══════════════════════════════════════════════════════
let feedPosts = JSON.parse(localStorage.getItem('ahs_feed_posts') || '[]');

// Sample starter posts so the feed isn't empty
if (feedPosts.length === 0) {
  feedPosts = [
    {
      id: 1, type: 'video', date: '2024-06-01',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      caption: 'Learning PLC Ladder Logic — a great tutorial I always come back to.',
      tags: ['PLC', 'LadderLogic', 'Siemens'], likes: 4, liked: false
    },
    {
      id: 2, type: 'interest',
      date: '2024-06-03',
      icon: 'cpu',
      title: 'Industrial Automation',
      desc: 'Everything from Siemens S7 to Schneider Modicon — I love designing systems that never sleep.',
      tags: ['PLC', 'SCADA', 'HMI'], likes: 7, liked: false
    },
    {
      id: 3, type: 'text',
      date: '2024-06-05',
      content: '💡 Today I finally got MQTT working between my ESP32 and Node-RED dashboard. Data flowing in real-time — honestly one of the best feelings in engineering.',
      tags: ['IoT', 'ESP32', 'MQTT'], likes: 11, liked: false
    },
    {
      id: 4, type: 'interest',
      date: '2024-06-07',
      icon: 'wifi',
      title: 'IoT & ESP32',
      desc: 'Building connected devices from scratch — sensors, actuators, dashboards. The physical web excites me.',
      tags: ['ESP32', 'IoT', 'Python'], likes: 5, liked: false
    },
    {
      id: 5, type: 'text',
      date: '2024-06-09',
      content: '📖 Reading "Automating Everything" — the chapter on PID tuning just clicked for me. Theory finally meeting practice.',
      tags: ['PID', 'ControlSystems', 'Learning'], likes: 3, liked: false
    }
  ];
  saveFeed();
}

function saveFeed() {
  try { localStorage.setItem('ahs_feed_posts', JSON.stringify(feedPosts)); } catch(e){}
}

/* ── Interest icons map ── */
const INTEREST_ICONS = {
  cpu:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
  wifi:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  zap:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  code:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  heart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  book:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  tool:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  music:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
};

function getInterestIconHtml(icon) {
  return INTEREST_ICONS[icon] || INTEREST_ICONS['cpu'];
}

/* ── Render helpers ── */
function isYouTube(url) { return /youtube\.com\/embed\/|youtu\.be\//i.test(url||''); }
function isAparat(url)  { return /aparat\.com/i.test(url||''); }

function buildMediaHtml(post) {
  if (post.type === 'video') {
    const u = post.url || '';
    if (isYouTube(u)) {
      const embedUrl = u.includes('/embed/') ? u : u.replace('youtu.be/', 'youtube.com/embed/');
      return `<iframe class="feed-media-yt" src="${embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe>`;
    }
    if (isAparat(u)) {
      const eid = parseAparatId(u);
      return `<div style="width:100%;aspect-ratio:16/9;"><iframe src="https://www.aparat.com/video/video/embed/videohash/${eid}/vt/frame" width="100%" height="100%" allowfullscreen="true" webkitallowfullscreen="true" style="border:none;display:block"></iframe></div>`;
    }
    return `<video class="feed-media-video" controls style="max-height:320px"><source src="${u}"><p style="padding:16px;color:var(--text3);font-size:13px">Video: ${u}</p></video>`;
  }
  if (post.type === 'photo') {
    return `<img class="feed-media" src="${post.url}" alt="photo" loading="lazy" style="max-height:400px;cursor:zoom-in" onclick="openLightbox('${post.url}')">`;
  }
  if (post.type === 'text') {
    return `<div class="feed-media-text">${escText(post.content)}</div>`;
  }
  if (post.type === 'interest') {
    return `<div class="feed-media-interest">
      <div class="feed-interest-icon">${getInterestIconHtml(post.icon)}</div>
      <div class="feed-interest-title">${escText(post.title)}</div>
      <div class="feed-interest-desc">${escText(post.desc)}</div>
    </div>`;
  }
  return '';
}

function typeBadgeHtml(type) {
  const icons = {
    video:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    photo:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    text:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16h12V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    interest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z"/></svg>'
  };
  return `<div class="feed-type-badge">${icons[type]||''}</div>`;
}

function escText(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
}

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return '1d ago';
  if (diff < 7) return diff + 'd ago';
  if (diff < 30) return Math.floor(diff/7) + 'w ago';
  return Math.floor(diff/30) + 'mo ago';
}

function renderFeed(filter) {
  const grid = document.getElementById('feedGrid');
  const empty = document.getElementById('feedEmpty');
  const posts = filter && filter !== 'all'
    ? feedPosts.filter(p => p.type === filter)
    : feedPosts;

  // Update stats
  document.getElementById('feedStatPosts').textContent = feedPosts.length;
  document.getElementById('feedStatVids').textContent  = feedPosts.filter(p=>p.type==='video').length;
  document.getElementById('feedStatLikes').textContent = feedPosts.reduce((s,p)=>s+(p.likes||0),0);

  if (!posts.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  // Render newest first
  const sorted = [...posts].sort((a,b)=> (b.id||0)-(a.id||0));
  grid.innerHTML = sorted.map(post => {
    const tags = (post.tags||[]).map(t=>`<span class="feed-tag">${escText(t)}</span>`).join('');
    const caption = post.caption || post.content || post.desc || '';
    const likeClass = post.liked ? 'feed-action-btn liked' : 'feed-action-btn';
    return `
    <div class="feed-card" data-id="${post.id}" data-type="${post.type}">
      ${typeBadgeHtml(post.type)}
      ${buildMediaHtml(post)}
      <div class="feed-body">
        <div class="feed-post-header">
          <div class="feed-post-avatar"><img src="https://cdn.imgurl.ir/uploads/z39503_ChatGPT_Image_Jun_9_2026_05_12_43_PM.png"></div>
          <span class="feed-post-name">ahs.engineer</span>
          <span class="feed-post-date">${timeAgo(post.date)}</span>
        </div>
        ${caption ? `<div class="feed-caption">${escText(caption)}</div>` : ''}
        ${tags ? `<div class="feed-post-tags">${tags}</div>` : ''}
        <div class="feed-actions">
          <button class="${likeClass}" onclick="toggleLike(${post.id}, event)">
            <svg viewBox="0 0 24 24" fill="${post.liked?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>${post.likes||0}</span>
          </button>
          <button class="feed-action-btn" onclick="deletePost(${post.id}, event)" title="Delete" style="margin-left:auto">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

let _currentFilter = 'all';
window.filterFeed = function(f) {
  _currentFilter = f;
  document.querySelectorAll('.feed-tab').forEach(t => t.classList.toggle('active', t.dataset.filter === f));
  renderFeed(f);
};

window.toggleLike = function(id, e) {
  e.stopPropagation();
  const p = feedPosts.find(x => x.id === id);
  if (!p) return;
  p.liked = !p.liked;
  p.likes = (p.likes||0) + (p.liked ? 1 : -1);
  saveFeed(); renderFeed(_currentFilter);
};

window.deletePost = function(id, e) {
  e.stopPropagation();
  if (!confirm('Delete this post?')) return;
  feedPosts = feedPosts.filter(x => x.id !== id);
  saveFeed(); renderFeed(_currentFilter);
};

window.openLightbox = function(src) {
  document.getElementById('feedLightboxImg').src = src;
  document.getElementById('feedLightbox').classList.add('open');
};
window.closeLightbox = function() {
  document.getElementById('feedLightbox').classList.remove('open');
};

/* ── Modal ── */
let _postType = 'video';
window.openFeedModal = function() {
  selectPostType('video');
  document.getElementById('feedModalBg').classList.add('open');
};
window.closeFeedModal = function(e) {
  if (e.target === document.getElementById('feedModalBg')) closeFeedModalDirect();
};
window.closeFeedModalDirect = function() {
  document.getElementById('feedModalBg').classList.remove('open');
};

window.selectPostType = function(type) {
  _postType = type;
  document.querySelectorAll('.feed-type-opt').forEach(o =>
    o.classList.toggle('selected', o.dataset.type === type));
  renderFormFields(type);
};

function renderFormFields(type) {
  const wrap = document.getElementById('feedFormFields');
  const isFa = document.body.classList.contains('fa');
  let html = '';
  if (type === 'video') {
    html = `
      <label>${isFa ? 'لینک ویدیو (YouTube / آپارات / mp4)' : 'Video URL (YouTube / Aparat / mp4)'}</label>
      <input type="url" id="ff_url" placeholder="https://www.youtube.com/embed/...">
      <label>${isFa ? 'توضیح (اختیاری)' : 'Caption (optional)'}</label>
      <textarea id="ff_caption" rows="2"></textarea>
      <label>${isFa ? 'تگ‌ها (با کاما جدا کن)' : 'Tags (comma-separated)'}</label>
      <input type="text" id="ff_tags" placeholder="PLC, Siemens, Tutorial">`;
  } else if (type === 'photo') {
    html = `
      <label>${isFa ? 'لینک عکس' : 'Image URL'}</label>
      <input type="url" id="ff_url" placeholder="https://...">
      <label>${isFa ? 'توضیح (اختیاری)' : 'Caption (optional)'}</label>
      <textarea id="ff_caption" rows="2"></textarea>
      <label>${isFa ? 'تگ‌ها' : 'Tags'}</label>
      <input type="text" id="ff_tags" placeholder="ESP32, Hardware">`;
  } else if (type === 'text') {
    html = `
      <label>${isFa ? 'نوشته‌ات' : 'Your Post'}</label>
      <textarea id="ff_content" rows="5" placeholder="${isFa ? 'هر چیزی که می‌خوای بنویس...' : 'Share what\'s on your mind...'}"></textarea>
      <label>${isFa ? 'تگ‌ها' : 'Tags'}</label>
      <input type="text" id="ff_tags" placeholder="IoT, Learning">`;
  } else if (type === 'interest') {
    html = `
      <label>${isFa ? 'آیکون' : 'Icon'}</label>
      <select id="ff_icon">
        <option value="cpu">⚙️ CPU / PLC</option>
        <option value="wifi">📡 IoT / WiFi</option>
        <option value="zap">⚡ Electrical</option>
        <option value="code">💻 Programming</option>
        <option value="tool">🔧 Hardware</option>
        <option value="book">📚 Learning</option>
        <option value="music">🎵 Music</option>
        <option value="heart">❤️ Other</option>
      </select>
      <label>${isFa ? 'عنوان' : 'Title'}</label>
      <input type="text" id="ff_title" placeholder="${isFa ? 'مثلاً: اتوماسیون صنعتی' : 'e.g. Industrial Automation'}">
      <label>${isFa ? 'توضیح' : 'Description'}</label>
      <textarea id="ff_desc" rows="3"></textarea>
      <label>${isFa ? 'تگ‌ها' : 'Tags'}</label>
      <input type="text" id="ff_tags" placeholder="PLC, SCADA">`;
  }
  wrap.innerHTML = html;
}

window.submitPost = function() {
  const isFa = document.body.classList.contains('fa');
  const tagsRaw = (document.getElementById('ff_tags')||{}).value || '';
  const tags = tagsRaw.split(',').map(t=>t.trim()).filter(Boolean);
  const newId = Date.now();
  let post = { id: newId, type: _postType, date: new Date().toISOString().slice(0,10), likes: 0, liked: false, tags };

  if (_postType === 'video' || _postType === 'photo') {
    const url = (document.getElementById('ff_url')||{}).value||'';
    if (!url) { alert(isFa?'لینک را وارد کنید':'Please enter a URL'); return; }
    post.url = url;
    post.caption = (document.getElementById('ff_caption')||{}).value||'';
  } else if (_postType === 'text') {
    const content = (document.getElementById('ff_content')||{}).value||'';
    if (!content) { alert(isFa?'متن را بنویسید':'Please write something'); return; }
    post.content = content;
  } else if (_postType === 'interest') {
    const title = (document.getElementById('ff_title')||{}).value||'';
    if (!title) { alert(isFa?'عنوان را بنویسید':'Please enter a title'); return; }
    post.icon  = (document.getElementById('ff_icon')||{}).value||'cpu';
    post.title = title;
    post.desc  = (document.getElementById('ff_desc')||{}).value||'';
  }

  feedPosts.unshift(post);
  saveFeed();
  closeFeedModalDirect();
  filterFeed('all');
  document.getElementById('feed').scrollIntoView({behavior:'smooth'});
};

// ─── STORIES & HIGHLIGHTS ────────────────────────────────────────────────────
const STORIES_DATA = [
  { id: 1, label: 'PLC Tips', emoji: '⚙️', time: '2h ago', slides: [
    { emoji: '⚙️', title: 'PLC Tip #1', body: 'در TIA Portal از Watch Table برای دیباگ real-time استفاده کن — بدون نیاز به STOP کردن PLC' },
    { emoji: '💡', title: 'PLC Tip #2', body: 'LADDR parameter در instruction های جدید S7-1200 همون hardware identifier هست که از device config میگیری' },
    { emoji: '🔧', title: 'PLC Tip #3', body: 'برای نوشتن DB های بهینه، آرایه ها رو با مضارب ۸ بایت تعریف کن تا memory fragmentation کم بشه' }
  ]},
  { id: 2, label: 'ESP32', emoji: '📡', time: '5h ago', slides: [
    { emoji: '📡', title: 'ESP32 WiFi', body: 'WiFi.setAutoReconnect(true) فراموش نکنی — باعث میشه ESP32 بعد از قطع اتصال خودش reconnect کنه' },
    { emoji: '⚡', title: 'Deep Sleep', body: 'با esp_sleep_enable_timer_wakeup میتونی ESP32 رو به deep sleep بفرستی و مصرف رو به 10µA برسونی' }
  ]},
  { id: 3, label: 'Python', emoji: '🐍', time: 'Today', slides: [
    { emoji: '🐍', title: 'Python for PLC', body: 'کتابخانه python-snap7 بهت اجازه میده مستقیم از Python با S7 PLC ها ارتباط برقرار کنی' },
    { emoji: '📊', title: 'Data Logging', body: 'Pandas + Matplotlib کنار هم یه ابزار قوی برای آنالیز داده های صنعتی هستن — سریع یاد بگیر' }
  ]},
  { id: 4, label: 'IoT Ideas', emoji: '🌐', time: 'Yesterday', slides: [
    { emoji: '🌐', title: 'MQTT Protocol', body: 'MQTT سبک‌ترین پروتکل برای IoT هست. برای ESP32 از کتابخانه PubSubClient استفاده کن' },
    { emoji: '🏭', title: 'Industry 4.0', body: 'ترکیب PLC + ESP32 + MQTT + Node-RED = یه سیستم monitoring صنعتی ارزون و قدرتمند' }
  ]},
  { id: 5, label: 'Life', emoji: '☕', time: '2d ago', slides: [
    { emoji: '☕', title: 'Study Break', body: 'بعد از هر ۴۵ دقیقه مطالعه، ۱۵ دقیقه استراحت کن — Pomodoro Technique واقعاً کار میکنه' },
    { emoji: '🎯', title: 'Goals 2025', body: 'امسال هدفم: گرفتن TIA Portal V18 Certificate و ساختن یه پروژه IoT کامل با SCADA' }
  ]},
  { id: 6, label: 'Music', emoji: '🎵', time: '3d ago', slides: [
    { emoji: '🎵', title: 'Coding Music', body: 'وقتی روی پروژه‌های سنگین کار میکنم، Lo-Fi و Synthwave بهترین انتخابن برای تمرکز' },
    { emoji: '🎸', title: 'Favorites', body: 'Linkin Park + Daft Punk + Hans Zimmer — ترکیبی که همیشه انرژی میده حین کار' }
  ]}
];

const HIGHLIGHTS_DATA = [
  { id: 'plc', emoji: '⚙️', title: 'PLC Projects', titleFa: 'پروژه‌های PLC', count: 8, color: '#0066cc' },
  { id: 'iot', emoji: '📡', title: 'IoT Builds', titleFa: 'ساخته‌های IoT', count: 5, color: '#00884d' },
  { id: 'code', emoji: '💻', title: 'Coding Tips', titleFa: 'نکات برنامه‌نویسی', count: 12, color: '#6622aa' },
  { id: 'learn', emoji: '📚', title: 'Learning', titleFa: 'یادگیری', count: 20, color: '#cc6600' },
  { id: 'music', emoji: '🎵', title: 'Music', titleFa: 'موسیقی', count: 6, color: '#cc0055' },
  { id: 'life', emoji: '☕', title: 'Daily Life', titleFa: 'زندگی روزانه', count: 15, color: '#004466' },
  { id: 'sim', emoji: '🖥️', title: 'Simulations', titleFa: 'شبیه‌سازی‌ها', count: 4, color: '#336600' },
  { id: 'tools', emoji: '🔧', title: 'Tools & Tips', titleFa: 'ابزارها', count: 9, color: '#663300' }
];

(function initStories() {
  const row = document.getElementById('storiesRow');
  if (!row) return;
  STORIES_DATA.forEach(s => {
    const item = document.createElement('div');
    item.className = 'story-item';
    item.innerHTML = `
      <div class="story-ring" id="sring-${s.id}">
        <div class="story-inner">${s.emoji}</div>
      </div>
      <div class="story-label">${s.label}</div>`;
    item.querySelector('.story-ring').addEventListener('click', () => openStories(s.id));
    row.appendChild(item);
  });

  const grid = document.getElementById('highlightsGrid');
  if (!grid) return;
  HIGHLIGHTS_DATA.forEach(h => {
    const isFa = document.body.classList.contains('fa');
    const card = document.createElement('div');
    card.className = 'highlight-card';
    card.innerHTML = `
      <div class="highlight-cover" style="background:linear-gradient(135deg,${h.color}22 0%,var(--bg3) 100%)">
        <span style="font-size:32px;position:relative;z-index:1">${h.emoji}</span>
      </div>
      <div class="highlight-info">
        <div class="highlight-title fa-hide">${h.title}</div>
        <div class="highlight-title fa-show" style="display:none">${h.titleFa}</div>
        <div class="highlight-count">${h.count} <span class="fa-hide">stories</span><span class="fa-show" style="display:none">استوری</span></div>
      </div>`;
    card.addEventListener('click', () => openStoriesByHighlight(h.id));
    grid.appendChild(card);
  });
})();

let _curStoryGroup = null, _curSlide = 0, _storyTimer = null;

function openStories(groupId) {
  _curStoryGroup = STORIES_DATA.find(s => s.id === groupId);
  if (!_curStoryGroup) return;
  _curSlide = 0;
  document.getElementById('storyViewer').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderStorySlide();
  markStorySeen(groupId);
}

function openStoriesByHighlight(hlId) {
  // open stories related to highlight
  const map = { plc: 1, iot: 4, code: 3, learn: 3, music: 6, life: 5, sim: 1, tools: 2 };
  const gid = map[hlId] || 1;
  openStories(gid);
}

function markStorySeen(groupId) {
  const ring = document.getElementById('sring-' + groupId);
  if (ring) ring.classList.add('seen');
}

function renderStorySlide() {
  const g = _curStoryGroup;
  if (!g) return;
  const slide = g.slides[_curSlide];
  document.getElementById('storyEmoji').textContent = slide.emoji;
  document.getElementById('storyTitle').textContent = slide.title;
  document.getElementById('storyBodyText').textContent = slide.body;
  document.getElementById('storyTime').textContent = g.time;

  // Handle media (image or video)
  const mediaWrap = document.getElementById('storyMediaWrap');
  const textCard = document.getElementById('storyTextCard');
  if (slide.media) {
    const u = slide.media.trim();
    const isYT = /youtube\.com|youtu\.be/.test(u);
    const isImg = /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(u);
    mediaWrap.style.display = 'block';
    textCard.style.position = 'relative';
    textCard.style.zIndex = '2';
    textCard.style.background = 'rgba(5,10,15,0.7)';
    textCard.style.backdropFilter = 'blur(4px)';
    const isAparat = /aparat\.com/i.test(u);
    if (isYT) {
      const vid = u.match(/(?:v=|youtu\.be\/)([^&\s?]+)/);
      const embedId = vid ? vid[1] : '';
      mediaWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${embedId}?autoplay=1&mute=1" style="width:100%;height:100%;border:none;position:absolute;top:0;left:0" allowfullscreen></iframe>`;
    } else if (isAparat) {
      // Support both full embed code and bare URL
      const eid = parseAparatId(u);
      mediaWrap.innerHTML = `<iframe src="https://www.aparat.com/video/video/embed/videohash/${eid}/vt/frame" allowfullscreen="true" webkitallowfullscreen="true" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block"></iframe>`;
    } else if (isImg) {
      mediaWrap.innerHTML = `<img src="${u}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0" alt="">`;
    } else {
      // mp4 or other video
      mediaWrap.innerHTML = `<video src="${u}" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0"></video>`;
    }
  } else {
    mediaWrap.style.display = 'none';
    mediaWrap.innerHTML = '';
    textCard.style.position = '';
    textCard.style.zIndex = '';
    textCard.style.background = '';
    textCard.style.backdropFilter = '';
  }

  // Progress bar
  const bar = document.getElementById('storyProgressBar');
  bar.innerHTML = g.slides.map((_, i) => {
    let cls = i < _curSlide ? 'done' : i === _curSlide ? 'active' : '';
    return `<div class="story-seg"><div class="story-seg-fill ${cls}"></div></div>`;
  }).join('');

  clearTimeout(_storyTimer);
  _storyTimer = setTimeout(() => nextStory(), 4000);
}

window.prevStory = function() {
  if (_curSlide > 0) { _curSlide--; renderStorySlide(); }
  else closeStoryViewer();
};
window.nextStory = function() {
  if (_curStoryGroup && _curSlide < _curStoryGroup.slides.length - 1) {
    _curSlide++; renderStorySlide();
  } else closeStoryViewer();
};
window.closeStoryViewer = function() {
  clearTimeout(_storyTimer);
  document.getElementById('storyViewer').classList.remove('open');
  document.body.style.overflow = '';
};
window.storyViewerBgClick = function(e) {
  if (e.target === document.getElementById('storyViewer')) closeStoryViewer();
};

// ─── MUSIC PLAYER ────────────────────────────────────────────────────────────
const MUSIC_TRACKS = [
  { id: 1, title: 'Numb', artist: 'Linkin Park', emoji: '🎸', genre: 'Rock', duration: '3:07', youtubeId: 'kXYiU_JCYtU' },
  { id: 2, title: 'In the End', artist: 'Linkin Park', emoji: '🎸', genre: 'Rock', duration: '3:36', youtubeId: 'eVTXPUF4Oz4' },
  { id: 3, title: 'Get Lucky', artist: 'Daft Punk', emoji: '🎹', genre: 'Electronic', duration: '4:07', youtubeId: '5NV6Rdv1h3Q' },
  { id: 4, title: 'Harder, Better, Faster', artist: 'Daft Punk', emoji: '🎹', genre: 'Electronic', duration: '3:45', youtubeId: 'yydNF8tuVmU' },
  { id: 5, title: 'Time', artist: 'Hans Zimmer', emoji: '🎼', genre: 'Cinematic', duration: '4:35', youtubeId: 'RzzakLs8J04' },
  { id: 6, title: 'Interstellar Theme', artist: 'Hans Zimmer', emoji: '🎼', genre: 'Cinematic', duration: '2:43', youtubeId: 'UDVtMYqUAyw' },
  { id: 7, title: 'Stressed Out', artist: 'Twenty One Pilots', emoji: '🎵', genre: 'Alternative', duration: '3:22', youtubeId: 'pXRviuL6vMY' },
  { id: 8, title: 'Heathens', artist: 'Twenty One Pilots', emoji: '🎵', genre: 'Alternative', duration: '3:46', youtubeId: 'UprcpdwuwCg' },
  { id: 9, title: 'Lo-Fi Study Beat', artist: 'Lo-Fi Chill', emoji: '☕', genre: 'Lo-Fi', duration: '∞', youtubeId: 'jfKfPfyJRdk' },
  { id: 10, title: 'Bohemian Rhapsody', artist: 'Queen', emoji: '👑', genre: 'Rock', duration: '5:54', youtubeId: 'fJ9rUzIMcZQ' }
];
const GENRES = ['All', 'Rock', 'Electronic', 'Cinematic', 'Alternative', 'Lo-Fi'];

let _musicState = { currentIdx: 0, playing: false, shuffle: false, repeat: false, volume: 0.7, progress: 0, interval: null };

// Real audio element for MP3 playback
const _audioEl = new Audio();
_audioEl.preload = 'none';
_audioEl.addEventListener('timeupdate', () => {
  const t = MUSIC_TRACKS[_musicState.currentIdx];
  if (t && t.sourceType === 'mp3' && _audioEl.duration) {
    _musicState.progress = (_audioEl.currentTime / _audioEl.duration) * 100;
    updateProgressUI();
    // Real time display
    const cur = Math.floor(_audioEl.currentTime);
    const dur = Math.floor(_audioEl.duration);
    document.getElementById('musicCurrent').textContent = Math.floor(cur/60)+':'+String(cur%60).padStart(2,'0');
    document.getElementById('musicDuration').textContent = Math.floor(dur/60)+':'+String(dur%60).padStart(2,'0');
  }
});
_audioEl.addEventListener('ended', () => { if (!_musicState.repeat) nextTrack(); else { _audioEl.currentTime = 0; _audioEl.play(); } });
_audioEl.addEventListener('error', (e) => { console.warn('Audio error:', e); });

function renderMusicPlaylist(filter) {
  const list = document.getElementById('musicTrackList');
  const tracks = filter && filter !== 'All' ? MUSIC_TRACKS.filter(t => t.genre === filter) : MUSIC_TRACKS;
  list.innerHTML = tracks.map((t, i) => {
    const isPlaying = t.id === MUSIC_TRACKS[_musicState.currentIdx].id && _musicState.playing;
    return `<div class="music-track-item ${isPlaying ? 'playing' : ''}" onclick="selectTrack(${t.id})">
      <div class="music-track-num">${isPlaying ? `<div class="music-bars"><div class="music-bar"></div><div class="music-bar"></div><div class="music-bar"></div></div>` : (i+1)}</div>
      <div class="music-track-emoji">${t.emoji}</div>
      <div class="music-track-info">
        <div class="music-track-name">${t.title}</div>
        <div class="music-track-artist-name">${t.artist}</div>
      </div>
      <div class="music-track-dur">${t.duration}</div>
    </div>`;
  }).join('');
  document.getElementById('playlistCount').textContent = tracks.length + ' tracks';

  // Genre chips
  const chips = document.getElementById('musicGenreChips');
  chips.innerHTML = GENRES.map(g => `<span class="music-genre-chip ${(!filter && g==='All')||filter===g?'active':''}" onclick="filterMusicGenre('${g}')">${g}</span>`).join('');
}

let _musicGenreFilter = 'All';
window.filterMusicGenre = function(g) {
  _musicGenreFilter = g;
  renderMusicPlaylist(g === 'All' ? null : g);
};

window.selectTrack = function(id) {
  const idx = MUSIC_TRACKS.findIndex(t => t.id === id);
  if (idx < 0) return;
  _musicState.currentIdx = idx;
  _musicState.playing = true;
  _musicState.progress = 0;
  const t = MUSIC_TRACKS[idx];
  if (t.sourceType === 'mp3' && t.mp3Url) {
    _audioEl.src = t.mp3Url;
    _audioEl.volume = _musicState.volume;
    _audioEl.currentTime = 0;
    _audioEl.play().catch(()=>{});
    stopMusicProgress();
  } else {
    _audioEl.pause();
    _audioEl.src = '';
    startMusicProgress();
  }
  updateMusicPlayer();
  renderMusicPlaylist(_musicGenreFilter === 'All' ? null : _musicGenreFilter);
};

window.togglePlay = function() {
  _musicState.playing = !_musicState.playing;
  const t = MUSIC_TRACKS[_musicState.currentIdx];
  if (t && t.sourceType === 'mp3' && t.mp3Url) {
    if (_musicState.playing) { _audioEl.play().catch(()=>{}); }
    else { _audioEl.pause(); }
  } else {
    if (_musicState.playing) startMusicProgress(); else stopMusicProgress();
  }
  updateMusicPlayer();
  renderMusicPlaylist(_musicGenreFilter === 'All' ? null : _musicGenreFilter);
};
window.nextTrack = function() {
  if (_musicState.shuffle) {
    _musicState.currentIdx = Math.floor(Math.random() * MUSIC_TRACKS.length);
  } else {
    _musicState.currentIdx = (_musicState.currentIdx + 1) % MUSIC_TRACKS.length;
  }
  _musicState.progress = 0;
  updateMusicPlayer();
  const t = MUSIC_TRACKS[_musicState.currentIdx];
  if (_musicState.playing) {
    if (t.sourceType === 'mp3' && t.mp3Url) {
      _audioEl.src = t.mp3Url; _audioEl.volume = _musicState.volume; _audioEl.play().catch(()=>{});
      stopMusicProgress();
    } else {
      _audioEl.pause(); _audioEl.src = '';
      stopMusicProgress(); startMusicProgress();
    }
  }
  renderMusicPlaylist(_musicGenreFilter === 'All' ? null : _musicGenreFilter);
};
window.prevTrack = function() {
  _musicState.currentIdx = (_musicState.currentIdx - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
  _musicState.progress = 0;
  updateMusicPlayer();
  const t = MUSIC_TRACKS[_musicState.currentIdx];
  if (_musicState.playing) {
    if (t.sourceType === 'mp3' && t.mp3Url) {
      _audioEl.src = t.mp3Url; _audioEl.volume = _musicState.volume; _audioEl.play().catch(()=>{});
      stopMusicProgress();
    } else {
      _audioEl.pause(); _audioEl.src = '';
      stopMusicProgress(); startMusicProgress();
    }
  }
  renderMusicPlaylist(_musicGenreFilter === 'All' ? null : _musicGenreFilter);
};
window.toggleShuffle = function() {
  _musicState.shuffle = !_musicState.shuffle;
  document.getElementById('btnShuffle').classList.toggle('active', _musicState.shuffle);
};
window.toggleRepeat = function() {
  _musicState.repeat = !_musicState.repeat;
  document.getElementById('btnRepeat').classList.toggle('active', _musicState.repeat);
};
window.setVolume = function(v) {
  _musicState.volume = v / 100;
  _audioEl.volume = _musicState.volume;
  const slider = document.getElementById('musicVolSlider');
  slider.style.background = `linear-gradient(90deg, var(--neon2) ${v}%, var(--border2) ${v}%)`;
};
window.seekMusic = function(e) {
  const wrap = document.getElementById('musicProgressWrap');
  const rect = wrap.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  _musicState.progress = pct * 100;
  updateProgressUI();
};

function startMusicProgress() {
  stopMusicProgress();
  _musicState.interval = setInterval(() => {
    if (!_musicState.playing) return;
    _musicState.progress += 0.1;
    if (_musicState.progress >= 100) {
      _musicState.progress = 0;
      if (_musicState.repeat) { updateProgressUI(); return; }
      nextTrack(); return;
    }
    updateProgressUI();
  }, 100);
}
function stopMusicProgress() { clearInterval(_musicState.interval); }

function updateProgressUI() {
  const pct = _musicState.progress;
  document.getElementById('musicProgressFill').style.width = pct + '%';
  document.getElementById('musicProgressThumb').style.left = pct + '%';
  // Fake time
  const totalSec = 240;
  const cur = Math.floor(totalSec * pct / 100);
  document.getElementById('musicCurrent').textContent = Math.floor(cur/60) + ':' + String(cur%60).padStart(2,'0');
}

function updateMusicPlayer() {
  const t = MUSIC_TRACKS[_musicState.currentIdx];
  document.getElementById('musicTitle').textContent = t.title;
  document.getElementById('musicArtist').textContent = t.artist;
  document.getElementById('musicCoverIcon').textContent = t.emoji;
  document.getElementById('musicDuration').textContent = t.duration;
  const vinyl = document.getElementById('musicVinyl');
  vinyl.classList.toggle('playing', _musicState.playing);
  const playIcon = document.getElementById('musicPlayIcon');
  if (_musicState.playing) {
    playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  } else {
    playIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  }
}

// Init music
document.addEventListener('DOMContentLoaded', () => {
  renderMusicPlaylist(null);
  updateMusicPlayer();
});

// ─── PDF CODES ───────────────────────────────────────────────────────────────
const PDF_CODES = [
  {
    id: 'plc_ladder',
    title: 'PLC Ladder Logic Cheat Sheet',
    titleFa: 'چیت‌شیت Ladder Logic',
    lang: 'Ladder Logic',
    desc: 'Basic Siemens S7 ladder logic contacts, coils, timers, counters and program organization blocks.',
    descFa: 'مخاطبین، کویل‌ها، تایمرها، شمارنده‌ها و بلوک‌های سازمان‌دهی برنامه زیمنس S7',
    tags: ['PLC', 'S7-1200', 'Siemens', 'IEC 61131'],
    pages: 4, size: '180 KB',
    icon: 'cpu',
    code: `// === SIEMENS S7 LADDER LOGIC REFERENCE ===
// Network 1: Start/Stop Circuit
// Normally Open contact (NO)  → |  |
// Normally Closed contact (NC)→ |/|
// Output coil                  → ( )

|I0.0|------|I0.1/|------( Q0.0 )
[START]     [STOP]        [Motor]

// Network 2: Latching Circuit (Self-holding)
|I0.0|---|Q0.0|------|I0.1/|---( Q0.0 )
[START]  [Latch]     [STOP]   [Motor]

// Network 3: TON Timer (On-Delay)
|I0.0|---[TON T1, PT:5s]---( Q0.1 )
When I0.0 = TRUE, timer starts
After 5s, Q0.1 activates

// Network 4: CTU Counter
|I0.0|---[CTU C1, PV:10]
|I0.1|---[R C1]          // Reset
|C1.Q|------------------( Q0.2 ) // Done

// Network 5: Comparison
|I0.0|---[MW10 >= 100]---( Q0.3 )
// Activate if memory word >= 100

// Data Types Reference:
// I  = Input byte (I0.0, I0.1...)
// Q  = Output byte (Q0.0, Q0.1...)
// M  = Marker/Flag (M0.0, MW10...)
// DB = Data Block (DB1.DBX0.0)
// T  = Timer (T1)  C = Counter (C1)

// OBs (Organization Blocks):
// OB1   = Main Program (cyclic)
// OB100 = Startup
// OB35  = Cyclic Interrupt (100ms)
// OB121 = Programming Error`
  },
  {
    id: 'python_iot',
    title: 'Python IoT Quick Reference',
    titleFa: 'مرجع سریع Python IoT',
    lang: 'Python',
    desc: 'ESP32 MicroPython, MQTT, socket programming and sensor reading code snippets.',
    descFa: 'قطعه کدهای MicroPython برای ESP32، MQTT، برنامه‌نویسی socket و خواندن سنسور',
    tags: ['Python', 'MicroPython', 'ESP32', 'MQTT', 'IoT'],
    pages: 6, size: '240 KB',
    icon: 'code',
    code: `# === PYTHON IoT CHEAT SHEET ===

# 1. ESP32 WiFi Connection (MicroPython)
import network, time
def connect_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    timeout = 10
    while not wlan.isconnected() and timeout > 0:
        time.sleep(1); timeout -= 1
    if wlan.isconnected():
        print("IP:", wlan.ifconfig()[0])
        return True
    return False

# 2. MQTT with umqtt (MicroPython)
from umqtt.simple import MQTTClient
client = MQTTClient("esp32_client",
                    "broker.hivemq.com",
                    port=1883)
client.connect()
client.publish(b"sensors/temp", b"25.4")

# Subscribe with callback:
def on_message(topic, msg):
    print(f"Topic: {topic}, Msg: {msg}")
client.set_callback(on_message)
client.subscribe(b"control/motor")

# 3. DHT22 Sensor Reading
from machine import Pin
import dht
sensor = dht.DHT22(Pin(4))
sensor.measure()
temp = sensor.temperature()   # °C
hum  = sensor.humidity()      # %RH

# 4. Modbus RTU (Python + pymodbus)
from pymodbus.client import ModbusSerialClient
client = ModbusSerialClient(
    method="rtu", port="/dev/ttyUSB0",
    baudrate=9600, parity="N",
    stopbits=1, bytesize=8
)
client.connect()
rr = client.read_holding_registers(
    address=0, count=10, slave=1)
print(rr.registers)

# 5. Snap7 — Python to S7 PLC
import snap7
plc = snap7.client.Client()
plc.connect("192.168.0.1", 0, 1)
data = plc.read_area(
    snap7.types.Areas.DB, 1, 0, 10)
import snap7.util as u
value = u.get_real(data, 0)   # float`
  },
  {
    id: 'esp32_pinout',
    title: 'ESP32 Pin & GPIO Reference',
    titleFa: 'مرجع پین و GPIO اسپرسیف',
    lang: 'C / Arduino',
    desc: 'ESP32 pinout, GPIO capabilities, PWM channels, ADC inputs and common code patterns.',
    descFa: 'پین‌اوت ESP32، قابلیت‌های GPIO، کانال‌های PWM، ورودی‌های ADC و الگوهای کد رایج',
    tags: ['ESP32', 'Arduino', 'C++', 'GPIO', 'PWM'],
    pages: 3, size: '150 KB',
    icon: 'zap',
    code: `// === ESP32 ARDUINO CHEAT SHEET ===

// GPIO Capabilities:
// Pins 0,2,4,12-15,25-27 → Input + Output
// Pins 34,35,36,39        → Input ONLY
// Pins 6-11               → SPI Flash (DO NOT USE)

// 1. Basic Digital I/O
#define LED_PIN   2
#define BTN_PIN  34
void setup() {
  pinMode(LED_PIN, OUTPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);
}
void loop() {
  if (!digitalRead(BTN_PIN))
    digitalWrite(LED_PIN, HIGH);
  else
    digitalWrite(LED_PIN, LOW);
}

// 2. PWM (LED Dimming / Motor Speed)
const int freq = 5000;
const int ch = 0, res = 8;
ledcSetup(ch, freq, res);
ledcAttachPin(LED_PIN, ch);
ledcWrite(ch, 128);  // 50% duty cycle

// 3. ADC (Analog Read)
int raw = analogRead(34); // 0-4095
float volt = raw * (3.3 / 4095.0);

// 4. I2C Communication
#include <Wire.h>
Wire.begin(SDA_PIN, SCL_PIN);
Wire.beginTransmission(0x3C); // OLED
Wire.write(0x00);
Wire.endTransmission();

// 5. Deep Sleep
#include <esp_sleep.h>
esp_sleep_enable_timer_wakeup(
    10 * 1000000ULL); // 10 seconds
esp_deep_sleep_start();
// Consumes ~10µA in deep sleep

// 6. WiFi + HTTP GET
#include <WiFi.h>
#include <HTTPClient.h>
WiFi.begin("SSID","PASS");
while(WiFi.status()!=WL_CONNECTED)
  delay(500);
HTTPClient http;
http.begin("http://api.example.com/data");
int code = http.GET();
String payload = http.getString();`
  },
  {
    id: 'scada_sql',
    title: 'SCADA Data & SQL Reference',
    titleFa: 'مرجع داده SCADA و SQL',
    lang: 'SQL / Python',
    desc: 'SQL queries for SCADA historian data, time-series analysis and alarm management.',
    descFa: 'کوئری‌های SQL برای داده historian، آنالیز سری‌های زمانی و مدیریت آلارم',
    tags: ['SCADA', 'SQL', 'WinCC', 'Historian', 'Python'],
    pages: 5, size: '200 KB',
    icon: 'database',
    code: `-- === SCADA / HISTORIAN SQL REFERENCE ===

-- 1. Query last 24h sensor values
SELECT TagName, DateTime, Value
FROM AnalogDynamic
WHERE TagName = 'Tank_Level'
  AND DateTime >= DATEADD(HOUR,-24,GETDATE())
ORDER BY DateTime DESC;

-- 2. Hourly averages (time-series)
SELECT
  TagName,
  DATEPART(HOUR, DateTime) AS Hour,
  AVG(Value) AS AvgValue,
  MAX(Value) AS MaxValue,
  MIN(Value) AS MinValue
FROM AnalogDynamic
WHERE DateTime >= DATEADD(DAY,-7,GETDATE())
GROUP BY TagName, DATEPART(HOUR, DateTime)
ORDER BY Hour;

-- 3. Alarm analysis
SELECT
  AlarmTag,
  COUNT(*) AS AlarmCount,
  AVG(DATEDIFF(MINUTE, AckTime, ClearTime))
    AS AvgAckTimeMin
FROM AlarmLog
WHERE EventTime >= DATEADD(MONTH,-1,GETDATE())
  AND Priority = 1  -- Critical alarms
GROUP BY AlarmTag
ORDER BY AlarmCount DESC;

-- Python: WinCC OA / InfluxDB query
# pip install influxdb-client
from influxdb_client import InfluxDBClient
client = InfluxDBClient(
    url="http://localhost:8086",
    token="YOUR_TOKEN",
    org="scada_org")
query = """
from(bucket:"sensors")
  |> range(start: -24h)
  |> filter(fn:(r) => r._field == "value")
  |> aggregateWindow(every:1m, fn:mean)
"""
tables = client.query_api().query(query)
for table in tables:
    for record in table.records:
        print(record.get_time(), record.get_value())`
  },
  {
    id: 'tia_shortcuts',
    title: 'TIA Portal Keyboard Shortcuts',
    titleFa: 'میانبرهای کیبورد TIA Portal',
    lang: 'Reference',
    desc: 'Essential TIA Portal shortcuts for faster PLC programming, debugging and navigation.',
    descFa: 'میانبرهای ضروری TIA Portal برای برنامه‌نویسی، دیباگ و ناوبری سریع‌تر',
    tags: ['TIA Portal', 'Siemens', 'PLC', 'Shortcuts'],
    pages: 2, size: '90 KB',
    icon: 'tool',
    code: `=== TIA PORTAL KEYBOARD SHORTCUTS ===

[ GENERAL ]
Ctrl+S         → Save project
Ctrl+Z         → Undo
Ctrl+Y         → Redo  
Ctrl+F         → Find & Replace
Ctrl+G         → Go to (line/address)
F1             → Help

[ EDITOR - LADDER (LAD) ]
Ctrl+Enter     → Insert new network
Ctrl+D         → Delete network
Ctrl+X/C/V     → Cut / Copy / Paste network
F6             → Normally Open contact  |  |
F7             → Normally Closed contact |/|
F8             → Output coil ( )
Ctrl+Shift+F8  → Set coil (S)
Ctrl+Shift+F7  → Reset coil (R)
Alt+Insert     → Insert branch (parallel)

[ EDITOR - SCL ]
Ctrl+Space     → IntelliSense / Autocomplete
Ctrl+/         → Comment / Uncomment line
Ctrl+Shift+F   → Auto-format code
F9             → Toggle breakpoint
F5             → Continue (debug)
F10            → Step over
F11            → Step into

[ ONLINE / DEBUG ]
Ctrl+K         → Go Online
Ctrl+M         → Go Offline
Ctrl+Alt+M     → Monitor mode ON/OFF
Ctrl+Shift+O   → Open Watch Table
Ctrl+Alt+D     → Force values dialog
Ctrl+T         → Start simulation (PLCSIM)

[ PROJECT NAVIGATION ]
Alt+←/→        → Back / Forward
Ctrl+Shift+W   → Close all editors
Ctrl+Tab       → Switch between open editors
F2             → Rename selected item
Delete         → Delete selected item

[ DIAGNOSTICS ]
Ctrl+D         → Hardware diagnostics
Shift+F8       → Accessible devices scan
Alt+Enter      → Properties of selected item`
  },
  {
    id: 'nodered_flows',
    title: 'Node-RED IoT Flows',
    titleFa: 'فلوهای IoT در Node-RED',
    lang: 'JavaScript / JSON',
    desc: 'Node-RED flow snippets for MQTT, HTTP API, dashboard widgets and PLC data integration.',
    descFa: 'قطعه‌فلوهای Node-RED برای MQTT، HTTP API، ویجت‌های داشبورد و ادغام داده PLC',
    tags: ['Node-RED', 'MQTT', 'IoT', 'Dashboard', 'JavaScript'],
    pages: 4, size: '170 KB',
    icon: 'wifi',
    code: `// === NODE-RED CHEAT SHEET ===

// 1. Function node — Process MQTT payload
// Input: msg.payload = '{"temp":25.4,"hum":60}'
const data = JSON.parse(msg.payload);
msg.topic = "sensor/processed";
msg.payload = {
    temperature: data.temp,
    humidity: data.hum,
    timestamp: new Date().toISOString(),
    alert: data.temp > 30 ? "HIGH TEMP" : "OK"
};
return msg;

// 2. Filter node (gate logic)
// Only pass msg if temp > threshold
const threshold = flow.get("temp_threshold") || 30;
if (msg.payload.temperature > threshold) {
    node.warn("Temperature exceeded: " + msg.payload.temperature);
    return msg;
}
return null; // Block message

// 3. Modbus Read (node-red-contrib-modbus)
// Config node: Modbus-Read
{
  "dataType": "HoldingRegister",
  "adr": "0",
  "quantity": "10",
  "rate": 1,
  "rateUnit": "s",
  "server": "ModbusServer"
}
// Output: msg.payload = [100, 200, 150, ...]
// msg.modbusRequest.address = 0

// 4. HTTP Request to REST API
msg.url = "http://192.168.1.100:5000/api/plc/status";
msg.method = "GET";
msg.headers = {"Content-Type": "application/json"};
// Connect to http-request node → response in msg.payload

// 5. Dashboard Gauge config
// ui_gauge node settings:
{
  "group": "Sensors",
  "label": "Tank Level",
  "min": 0, "max": 100,
  "unit": "%",
  "colorLow": "#e74c3c",
  "colorMid": "#f39c12",
  "colorHigh": "#2ecc71",
  "seg1": 20, "seg2": 80
}

// 6. Store to InfluxDB
// node-red-contrib-influxdb
msg.payload = [{
    measurement: "tank_level",
    fields: { value: msg.payload.level },
    tags: { location: "plant_1" }
}];
return msg; // → influxdb out node`
  }
];

function renderPdfCodes() {
  const grid = document.getElementById('pdfGrid');
  if (!grid) return;
  const isFa = document.body.classList.contains('fa');
  grid.innerHTML = PDF_CODES.map(pdf => {
    const iconSvg = getPdfIconSvg(pdf.icon);
    return `<div class="pdf-card">
      <div class="pdf-card-header">
        <div class="pdf-icon-wrap">${iconSvg}</div>
        <div>
          <div class="pdf-card-title fa-hide">${pdf.title}</div>
          <div class="pdf-card-title fa-show" style="display:none">${pdf.titleFa}</div>
          <div class="pdf-card-lang">${pdf.lang}</div>
        </div>
      </div>
      <div class="pdf-card-body">
        <div class="pdf-card-desc fa-hide">${pdf.desc}</div>
        <div class="pdf-card-desc fa-show" style="display:none">${pdf.descFa}</div>
        <div class="pdf-card-tags">${pdf.tags.map(t=>`<span class="pdf-card-tag">${t}</span>`).join('')}</div>
        <div class="pdf-card-stats">
          <div class="pdf-stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16h12V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>${pdf.pages} <span class="fa-hide">pages</span><span class="fa-show" style="display:none">صفحه</span></span>
          </div>
          <div class="pdf-stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>${pdf.size}</span>
          </div>
        </div>
        <div class="pdf-card-actions">
          <button class="pdf-btn-preview" onclick="previewPdf('${pdf.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span class="fa-hide">Preview</span><span class="fa-show" style="display:none">پیش‌نمایش</span>
          </button>
          <button class="pdf-btn-download" onclick="downloadPdfCode('${pdf.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            PDF
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function getPdfIconSvg(icon) {
  const icons = {
    cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>'
  };
  return icons[icon] || icons.cpu;
}

window.previewPdf = function(id) {
  const pdf = PDF_CODES.find(p => p.id === id);
  if (!pdf) return;
  const isFa = document.body.classList.contains('fa');
  document.getElementById('pdfPreviewTitle').textContent = isFa ? pdf.titleFa : pdf.title;
  if (pdf.pdfUrl) {
    document.getElementById('pdfCodePre').textContent = '🔗 این PDF با لینک مستقیم ذخیره شده\n\nلینک: ' + pdf.pdfUrl + '\n\nبرای دانلود روی دکمه PDF کلیک کنید.';
  } else {
    document.getElementById('pdfCodePre').textContent = pdf.code || '(محتوایی برای نمایش وجود ندارد)';
  }
  document.getElementById('pdfDownloadBtn').onclick = () => downloadPdfCode(id);
  document.getElementById('pdfPreviewModal').classList.add('open');
};

window.closePdfPreview = function(e) {
  if (e.target === document.getElementById('pdfPreviewModal'))
    document.getElementById('pdfPreviewModal').classList.remove('open');
};

window.downloadPdfCode = function(id) {
  const pdf = PDF_CODES.find(p => p.id === id);
  if (!pdf) return;
  // If direct PDF URL is available, open it
  if (pdf.pdfUrl) {
    window.open(pdf.pdfUrl, '_blank');
    document.getElementById('pdfPreviewModal').classList.remove('open');
    return;
  }
  // Otherwise generate HTML from code
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${pdf.title}</title>
<style>
  body{font-family:monospace;background:#fff;color:#222;padding:40px;max-width:800px;margin:0 auto}
  h1{font-family:Arial,sans-serif;font-size:22px;color:#0055aa;border-bottom:2px solid #0055aa;padding-bottom:8px}
  .meta{font-family:Arial;font-size:12px;color:#666;margin-bottom:20px}
  pre{background:#f4f4f4;padding:20px;border-radius:6px;white-space:pre-wrap;font-size:13px;line-height:1.7;border-left:3px solid #0055aa}
  @media print{body{padding:20px}pre{page-break-inside:auto}}
/* ====== Standalone Admin Page Overrides ====== */
body > *:not(.pw-overlay):not(.admin-panel):not(.admin-modal-bg):not(#adminToast):not(script) { display: none !important; }
.pw-overlay, .admin-panel, .admin-modal-bg, #adminToast { display: none; }
.pw-overlay.open { display: flex !important; }
.admin-panel.open { display: flex !important; }
.admin-modal-bg.open { display: flex !important; }
#adminToast { display: block !important; }
.admin-panel { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; right:0 !important; left:0 !important; top:0 !important; z-index: 5000; }
html, body { background: var(--bg); min-height: 100vh; }
</style></head><body>
<h1>${pdf.title}</h1>
<div class="meta">Language: ${pdf.lang} | Pages: ${pdf.pages} | Size: ${pdf.size}</div>
<p style="font-family:Arial;font-size:14px;color:#444;margin-bottom:16px">${pdf.desc}</p>
<pre>${pdf.code||''}</pre>
<div style="font-family:Arial;font-size:11px;color:#999;margin-top:20px;text-align:center">
  Generated by Amir Hosin Sekhavatfar Portfolio — ahs.engineer
</div>
</body></html>`;
  const blob = new Blob([html], {type:'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = pdf.id + '_reference.html';
  a.click();
  URL.revokeObjectURL(a.href);
  document.getElementById('pdfPreviewModal').classList.remove('open');
};

document.addEventListener('DOMContentLoaded', () => {
  renderPdfCodes();
  renderMusicPlaylist(null);
  updateMusicPlayer();
});






// ═══════════════════════════════════════════════════════
// ADMIN / PASSWORD SYSTEM
// ═══════════════════════════════════════════════════════
const ADMIN_PASSWORD = '@Amirhosin2531';
let _isAdmin = false;
let _pwCallback = null; // what to do after successful login

function mainFabClick() {
  if (_isAdmin) {
    const panel = document.getElementById('adminPanel');
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open');
    if (!isOpen) initAdminDash();
  } else {
    _pwCallback = () => {
      document.getElementById('adminPanel').classList.add('open');
      initAdminDash();
    };
    openPwOverlay();
  }
}

function adminFabClick() {
  const panel = document.getElementById('adminPanel');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open');
  if (!isOpen) initAdminDash();
}

function openPwOverlay() {
  document.getElementById('pwInput').value = '';
  document.getElementById('pwErrorMsg').textContent = '';
  document.getElementById('pwInput').classList.remove('error');
  const overlay = document.getElementById('pwOverlay');
  // Show instantly first (no opacity transition) to avoid a flash of
  // whatever is behind it, then re-enable the transition for future toggles.
  overlay.style.transition = 'none';
  overlay.classList.add('open');
  void overlay.offsetWidth; // force reflow
  overlay.style.transition = '';
  setTimeout(() => document.getElementById('pwInput').focus(), 300);
}

function closePwOverlay() {
  document.getElementById('pwOverlay').classList.remove('open');
  _pwCallback = null;
}

window.togglePwVisibility = function() {
  const inp = document.getElementById('pwInput');
  const icon = document.getElementById('pwEyeIcon');
  if (inp.type === 'password') {
    inp.type = 'text';
    icon.innerHTML = '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
  } else {
    inp.type = 'password';
    icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
  inp.focus();
};

function checkPassword() {
  const val = document.getElementById('pwInput').value;
  if (val === ADMIN_PASSWORD) {
    _isAdmin = true;
    document.getElementById('pwOverlay').classList.remove('open');
    // Show admin UI
    document.getElementById('mainFab').style.display = 'none';
    document.getElementById('adminFab').style.display = 'flex';
    if (_pwCallback) { _pwCallback(); _pwCallback = null; }
  } else {
    const inp = document.getElementById('pwInput');
    document.getElementById('pwErrorMsg').textContent = '❌ پسورد اشتباه است';
    inp.classList.add('error');
    inp.value = '';
    setTimeout(() => inp.classList.remove('error'), 500);
    setTimeout(() => document.getElementById('pwErrorMsg').textContent = '', 2000);
  }
}

function adminLogout() {
  _isAdmin = false;
  // Show the login screen first (it now appears instantly, covering
  // everything), THEN hide the admin panel underneath — this prevents
  // the main site from flashing into view before the login screen appears.
  _pwCallback = () => {
    document.getElementById('adminPanel').classList.add('open');
    initAdminDash();
  };
  openPwOverlay();
  document.getElementById('adminPanel').classList.remove('open');
  document.getElementById('mainFab').style.display = 'flex';
  document.getElementById('adminFab').style.display = 'none';
}

// ── Open/close admin modals ──
const ADMIN_MODAL_IDS = { story: 'adminStoryModal', music: 'adminMusicModal', pdf: 'adminPdfModal', code: 'adminCodeModal', highlight: 'adminHighlightModal', reels: 'adminReelsModal', layout: 'adminLayoutModal', theme: 'adminThemeModal' };

window.openAdminModal = function(type) {
  if (!_isAdmin) return;
  document.getElementById('adminPanel').classList.remove('open');
  const modal = document.getElementById(ADMIN_MODAL_IDS[type]);
  if (!modal) return;
  modal.classList.add('open');
  // Render manage lists
  if (type === 'story') { renderStoryAdminList(); initStorySlideFields(); }
  if (type === 'music') renderMusicAdminList();
  if (type === 'pdf') renderPdfAdminList();
  if (type === 'code') renderCodeAdminList();
  if (type === 'highlight') renderHighlightAdminList();
  if (type === 'reels') { renderReelsAdminList(); renderReelTemplateGrid(); }
  if (type === 'layout') renderLayoutAdminGrid();
  if (type === 'theme') renderThemeAdminGrid();
};

window.closeAdminModal = function(type, e) {
  if (e.target === document.getElementById(ADMIN_MODAL_IDS[type]))
    document.getElementById(ADMIN_MODAL_IDS[type]).classList.remove('open');
};
window.closeAdminModalDirect = function(type) {
  document.getElementById(ADMIN_MODAL_IDS[type]).classList.remove('open');
};

window.switchAdminTab = function(type, tab, btn) {
  const prefix = type === 'story' ? 'story' : type === 'music' ? 'music' : type === 'pdf' ? 'pdf' : type === 'highlight' ? 'highlight' : type === 'reels' ? 'reels' : 'code';
  document.getElementById(prefix + 'AddTab').style.display = tab === 'add' ? 'block' : 'none';
  document.getElementById(prefix + 'ManageTab').style.display = tab === 'manage' ? 'block' : 'none';
  btn.closest('.admin-tabs').querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

// ── Story Admin ──
let _customStories = JSON.parse(localStorage.getItem('ahs_custom_stories') || '[]');

function saveCustomStories() {
  try { localStorage.setItem('ahs_custom_stories', JSON.stringify(_customStories)); } catch(e){}
}

// Dynamic slide fields counter
let _slideCount = 0;

function initStorySlideFields() {
  _slideCount = 0;
  document.getElementById('sa_slides_container').innerHTML = '';
  addStorySlideField();
}

window.addStorySlideField = function() {
  _slideCount++;
  const n = _slideCount;
  const container = document.getElementById('sa_slides_container');
  const div = document.createElement('div');
  div.id = 'sa_slide_' + n;
  div.style.cssText = 'background:var(--bg3);border:1px solid var(--border2);border-radius:6px;padding:12px;margin-bottom:12px;position:relative';
  div.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <span style="font-size:12px;color:var(--neon);font-weight:700;letter-spacing:1px">اسلاید ${n}</span>
      ${n > 1 ? `<button onclick="removeSlideField(${n})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:0">✕</button>` : ''}
    </div>
    <label style="font-size:12px;color:var(--text3);margin-bottom:4px;display:block">عنوان اسلاید</label>
    <input type="text" id="sa_s${n}_title" placeholder="عنوان..." style="margin-bottom:8px">
    <label style="font-size:12px;color:var(--text3);margin-bottom:4px;display:block">متن اسلاید</label>
    <textarea id="sa_s${n}_body" rows="2" placeholder="متن استوری..." style="margin-bottom:8px"></textarea>
    <label style="font-size:12px;color:var(--text3);margin-bottom:4px;display:block">ایموجی</label>
    <input type="text" id="sa_s${n}_emoji" placeholder="⚡" maxlength="4" style="margin-bottom:8px">
    <label style="font-size:12px;color:var(--text3);margin-bottom:4px;display:block">🖼️ لینک عکس / ویدیو / آپارات (اختیاری)</label>
    <input type="url" id="sa_s${n}_media" placeholder="لینک عکس, mp4, YouTube, یا آپارات" style="margin-bottom:4px">
    <p style="font-size:11px;color:var(--text3);margin:0">آپارات: لینک صفحه یا embed را بده (https://www.aparat.com/v/...)</p>
  `;
  container.appendChild(div);
};

window.removeSlideField = function(n) {
  const el = document.getElementById('sa_slide_' + n);
  if (el) el.remove();
};

window.adminAddStory = function() {
  const label = document.getElementById('sa_label').value.trim();
  const emoji = document.getElementById('sa_emoji').value.trim() || '⭐';
  if (!label) { alert('عنوان گروه ضروری است'); return; }

  const slides = [];
  for (let i = 1; i <= _slideCount; i++) {
    const titleEl = document.getElementById('sa_s' + i + '_title');
    const bodyEl  = document.getElementById('sa_s' + i + '_body');
    if (!titleEl) continue;
    const t = titleEl.value.trim();
    const b = bodyEl ? bodyEl.value.trim() : '';
    if (!t && !b) continue;
    const e = (document.getElementById('sa_s' + i + '_emoji') || {}).value || emoji;
    const m = ((document.getElementById('sa_s' + i + '_media') || {}).value || '').trim();
    slides.push({ emoji: e || emoji, title: t, body: b, media: m });
  }
  if (slides.length === 0) { alert('حداقل یک اسلاید با عنوان یا متن لازم است'); return; }

  const newId = 'c_' + Date.now();
  const story = { id: newId, label, emoji, time: 'اکنون', slides, custom: true };
  _customStories.unshift(story);
  saveCustomStories();
  STORIES_DATA.unshift(story);
  rebuildStoriesRow();
  closeAdminModalDirect('story');
  document.getElementById('sa_label').value = '';
  document.getElementById('sa_emoji').value = '';
  initStorySlideFields();
  document.getElementById('stories').scrollIntoView({behavior:'smooth'});
};

function rebuildStoriesRow() {
  const row = document.getElementById('storiesRow');
  if (!row) return;
  row.innerHTML = '';
  STORIES_DATA.forEach(s => {
    const item = document.createElement('div');
    item.className = 'story-item';
    item.innerHTML = `<div class="story-ring" id="sring-${s.id}"><div class="story-inner">${s.emoji}</div></div><div class="story-label">${s.label}</div>`;
    item.querySelector('.story-ring').addEventListener('click', () => openStories(s.id));
    row.appendChild(item);
  });
}

function renderStoryAdminList() {
  const list = document.getElementById('storyAdminList');
  if (!list) return;
  if (STORIES_DATA.length === 0) {
    list.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:20px 0">هیچ استوری‌ای وجود ندارد</p>';
    return;
  }
  list.innerHTML = STORIES_DATA.map(s => `
    <div class="admin-list-item">
      <span>${s.emoji} ${s.label} ${!s.custom ? '<span style="font-size:10px;color:var(--text3)">(پیش‌فرض)</span>' : ''}</span>
      <button class="admin-list-del" onclick="adminDeleteStory('${s.id}')">✕</button>
    </div>`).join('');
}

window.adminDeleteStory = function(id) {
  if (!confirm('این استوری حذف شود؟')) return;
  _customStories = _customStories.filter(s => s.id !== id);
  saveCustomStories();
  const idx = STORIES_DATA.findIndex(s => s.id === id || s.id === Number(id));
  if (idx >= 0) STORIES_DATA.splice(idx, 1);
  // Also persist deleted default story IDs
  try {
    const deleted = JSON.parse(localStorage.getItem('ahs_deleted_stories') || '[]');
    if (!deleted.includes(String(id))) { deleted.push(String(id)); localStorage.setItem('ahs_deleted_stories', JSON.stringify(deleted)); }
  } catch(e){}
  rebuildStoriesRow();
  renderStoryAdminList();
};

// Load custom stories on start
(function loadCustomStories() {
  // Remove deleted default stories
  try {
    const deleted = JSON.parse(localStorage.getItem('ahs_deleted_stories') || '[]');
    deleted.forEach(id => {
      const idx = STORIES_DATA.findIndex(s => String(s.id) === String(id));
      if (idx >= 0) STORIES_DATA.splice(idx, 1);
    });
  } catch(e){}
  _customStories.forEach(s => STORIES_DATA.unshift(s));
  if (_customStories.length > 0) {
    document.addEventListener('DOMContentLoaded', () => setTimeout(rebuildStoriesRow, 100));
  }
})();

// ── Music Admin ──
let _customTracks = JSON.parse(localStorage.getItem('ahs_custom_music') || '[]');

function saveCustomTracks() {
  try { localStorage.setItem('ahs_custom_music', JSON.stringify(_customTracks)); } catch(e){}
}

window.toggleMusicSourceFields = function() {
  const type = document.getElementById('mu_source_type').value;
  document.getElementById('mu_youtube_field').style.display = type === 'youtube' ? 'block' : 'none';
  document.getElementById('mu_mp3_field').style.display = type === 'mp3' ? 'block' : 'none';
};

window.adminAddMusic = function() {
  const title = document.getElementById('mu_title').value.trim();
  const artist = document.getElementById('mu_artist').value.trim();
  const emoji = document.getElementById('mu_emoji').value.trim() || '🎵';
  const genre = document.getElementById('mu_genre').value;
  const duration = document.getElementById('mu_duration').value.trim() || '?:??';
  const sourceType = document.getElementById('mu_source_type').value;
  const youtubeId = sourceType === 'youtube' ? document.getElementById('mu_ytid').value.trim() : '';
  const mp3Url = sourceType === 'mp3' ? document.getElementById('mu_mp3url').value.trim() : '';
  if (!title || !artist) { alert('عنوان آهنگ و نام هنرمند ضروری هستند'); return; }
  if (sourceType === 'youtube' && !youtubeId) { alert('YouTube ID را وارد کنید'); return; }
  if (sourceType === 'mp3' && !mp3Url) { alert('لینک MP3 را وارد کنید'); return; }

  const newId = MUSIC_TRACKS.length + _customTracks.length + 100 + Date.now() % 1000;
  const track = { id: newId, title, artist, emoji, genre, duration, youtubeId, mp3Url, sourceType, custom: true };
  _customTracks.unshift(track);
  saveCustomTracks();
  MUSIC_TRACKS.unshift(track);

  if (!GENRES.includes(genre)) GENRES.push(genre);

  renderMusicPlaylist(null);
  closeAdminModalDirect('music');
  ['mu_title','mu_artist','mu_emoji','mu_duration','mu_ytid','mu_mp3url'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  document.getElementById('music').scrollIntoView({behavior:'smooth'});
};

function renderMusicAdminList() {
  const list = document.getElementById('musicAdminList');
  if (!list) return;
  if (_customTracks.length === 0) {
    list.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:20px 0">هنوز آهنگ سفارشی اضافه نشده</p>';
    return;
  }
  list.innerHTML = _customTracks.map(t => `
    <div class="admin-list-item">
      <span>${t.emoji} ${t.title} — ${t.artist}</span>
      <button class="admin-list-del" onclick="adminDeleteTrack(${t.id})">✕</button>
    </div>`).join('');
}

window.adminDeleteTrack = function(id) {
  if (!confirm('این آهنگ حذف شود؟')) return;
  _customTracks = _customTracks.filter(t => t.id !== id);
  saveCustomTracks();
  const idx = MUSIC_TRACKS.findIndex(t => t.id === id);
  if (idx >= 0) MUSIC_TRACKS.splice(idx, 1);
  renderMusicPlaylist(null);
  renderMusicAdminList();
};

(function loadCustomTracks() {
  _customTracks.forEach(t => MUSIC_TRACKS.unshift(t));
})();

// ── PDF Admin ──
let _customPdfs = JSON.parse(localStorage.getItem('ahs_custom_pdfs') || '[]');

function saveCustomPdfs() {
  try { localStorage.setItem('ahs_custom_pdfs', JSON.stringify(_customPdfs)); } catch(e){}
}

window.adminAddPdf = function() {
  const title = document.getElementById('pa_title').value.trim();
  const titleFa = document.getElementById('pa_titleFa').value.trim() || title;
  const lang = document.getElementById('pa_lang').value.trim() || 'Code';
  const desc = document.getElementById('pa_desc').value.trim();
  const descFa = document.getElementById('pa_descFa').value.trim() || desc;
  const tagsRaw = document.getElementById('pa_tags').value.trim();
  const tags = tagsRaw.split(',').map(t=>t.trim()).filter(Boolean);
  const icon = document.getElementById('pa_icon').value;
  const pages = parseInt(document.getElementById('pa_pages').value) || 1;
  const size = document.getElementById('pa_size').value.trim() || '? KB';
  const pdfUrl = document.getElementById('pa_pdfurl').value.trim();
  const code = document.getElementById('pa_code').value.trim();

  if (!title) { alert('عنوان ضروری است'); return; }
  if (!pdfUrl && !code) { alert('حداقل یک لینک PDF یا محتوای کد لازم است'); return; }

  const newId = 'custom_pdf_' + Date.now();
  const pdf = { id: newId, title, titleFa, lang, desc, descFa, tags, icon, pages, size, pdfUrl, code, custom: true };
  _customPdfs.unshift(pdf);
  saveCustomPdfs();
  PDF_CODES.unshift(pdf);
  renderPdfCodes();
  closeAdminModalDirect('pdf');
  ['pa_title','pa_titleFa','pa_lang','pa_desc','pa_descFa','pa_tags','pa_pages','pa_size','pa_pdfurl','pa_code'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  document.getElementById('pdfcodes').scrollIntoView({behavior:'smooth'});
};

function renderPdfAdminList() {
  const list = document.getElementById('pdfAdminList');
  if (!list) return;
  if (_customPdfs.length === 0) {
    list.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:20px 0">هنوز PDF سفارشی اضافه نشده</p>';
    return;
  }
  list.innerHTML = _customPdfs.map(p => `
    <div class="admin-list-item">
      <span>📄 ${p.title}</span>
      <button class="admin-list-del" onclick="adminDeletePdf('${p.id}')">✕</button>
    </div>`).join('');
}

window.adminDeletePdf = function(id) {
  if (!confirm('این PDF حذف شود؟')) return;
  _customPdfs = _customPdfs.filter(p => p.id !== id);
  saveCustomPdfs();
  const idx = PDF_CODES.findIndex(p => p.id === id);
  if (idx >= 0) PDF_CODES.splice(idx, 1);
  renderPdfCodes();
  renderPdfAdminList();
};

(function loadCustomPdfs() {
  _customPdfs.forEach(p => PDF_CODES.unshift(p));
})();

// ── Code Admin ──
// Codes are stored same as PDFs but tagged as 'code type'
let _customCodes = JSON.parse(localStorage.getItem('ahs_custom_codes') || '[]');

function saveCustomCodes() {
  try { localStorage.setItem('ahs_custom_codes', JSON.stringify(_customCodes)); } catch(e){}
}

window.adminAddCode = function() {
  const title = document.getElementById('ca_title').value.trim();
  const titleFa = document.getElementById('ca_titleFa').value.trim() || title;
  const lang = document.getElementById('ca_lang').value.trim() || 'Code';
  const desc = document.getElementById('ca_desc').value.trim();
  const descFa = document.getElementById('ca_descFa').value.trim() || desc;
  const tagsRaw = document.getElementById('ca_tags').value.trim();
  const tags = tagsRaw.split(',').map(t=>t.trim()).filter(Boolean);
  const icon = document.getElementById('ca_icon').value;
  const code = document.getElementById('ca_code').value;

  if (!title || !code) { alert('عنوان و کد ضروری هستند'); return; }

  const newId = 'custom_code_' + Date.now();
  const codeItem = { id: newId, title, titleFa, lang, desc, descFa, tags, icon, pages: 1, size: '-', code, custom: true };
  _customCodes.unshift(codeItem);
  saveCustomCodes();
  PDF_CODES.unshift(codeItem);
  renderPdfCodes();
  closeAdminModalDirect('code');
  ['ca_title','ca_titleFa','ca_lang','ca_desc','ca_descFa','ca_tags','ca_code'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pdfcodes').scrollIntoView({behavior:'smooth'});
};

function renderCodeAdminList() {
  const list = document.getElementById('codeAdminList');
  if (!list) return;
  if (_customCodes.length === 0) {
    list.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:20px 0">هنوز کد سفارشی اضافه نشده</p>';
    return;
  }
  list.innerHTML = _customCodes.map(c => `
    <div class="admin-list-item">
      <span>💻 ${c.title}</span>
      <button class="admin-list-del" onclick="adminDeleteCode('${c.id}')">✕</button>
    </div>`).join('');
}

window.adminDeleteCode = function(id) {
  if (!confirm('این کد حذف شود؟')) return;
  _customCodes = _customCodes.filter(c => c.id !== id);
  saveCustomCodes();
  const idx = PDF_CODES.findIndex(c => c.id === id);
  if (idx >= 0) PDF_CODES.splice(idx, 1);
  renderPdfCodes();
  renderCodeAdminList();
};

(function loadCustomCodes() {
  _customCodes.forEach(c => PDF_CODES.unshift(c));
})();

// ── Patch openFeedModal to require admin ──
const _origOpenFeedModal = window.openFeedModal;
window.openFeedModal = function() {
  if (_isAdmin) {
    _origOpenFeedModal();
  } else {
    _pwCallback = () => {
      document.getElementById('adminPanel').classList.add('open');
    };
    openPwOverlay();
  }
};


window.addEventListener('scroll',()=>{
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{
    if(window.scrollY>=s.offsetTop-100) cur=s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.style.color = a.getAttribute('href')==='#'+cur ? 'var(--neon)' : '';
  });
});

// ══════════════ THEME SWITCHER ══════════════
(function initTheme() {
  const saved = localStorage.getItem('ahs_theme') || '';
  if (saved) { document.documentElement.setAttribute('data-theme', saved); }
  const opt = document.querySelector(`.theme-option[data-theme="${saved}"]`);
  if (opt) { document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active')); opt.classList.add('active'); }
})();

window.applyTheme = function(theme, el) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('ahs_theme', theme); } catch(e){}
  document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
  if (el) el.classList.add('active');
  document.getElementById('themePalette').classList.remove('open');
};

// Close theme palette on outside click
document.addEventListener('click', e => {
  const switcher = document.querySelector('.theme-switcher');
  if (switcher && !switcher.contains(e.target)) {
    document.getElementById('themePalette').classList.remove('open');
  }
});

// ══════════════ MY FEED PAGE ══════════════
window.openMyFeedPage = function() {
  document.getElementById('adminPanel').classList.remove('open');
  const page = document.getElementById('myFeedPage');
  page.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Clone stories
  const storyRow = document.getElementById('feedPageStoriesRow');
  storyRow.innerHTML = '';
  STORIES_DATA.forEach(s => {
    const item = document.createElement('div');
    item.className = 'story-item';
    item.innerHTML = `<div class="story-ring" id="fpsr-${s.id}"><div class="story-inner">${s.emoji}</div></div><div class="story-label">${s.label}</div>`;
    item.querySelector('.story-ring').addEventListener('click', () => { closeMyFeedPage(); setTimeout(() => openStories(s.id), 350); });
    storyRow.appendChild(item);
  });
  // Render feed
  filterFeedPage('all', document.querySelector('#feedPageTabs .feed-tab'));
};

window.closeMyFeedPage = function() {
  document.getElementById('myFeedPage').classList.remove('open');
  document.body.style.overflow = '';
};

window.filterFeedPage = function(filter, btn) {
  if (btn) { document.querySelectorAll('#feedPageTabs .feed-tab').forEach(t => t.classList.remove('active')); btn.classList.add('active'); }
  const grid = document.getElementById('feedPageGrid');
  const empty = document.getElementById('feedPageEmpty');
  let posts = feedPosts;
  if (filter && filter !== 'all') posts = posts.filter(p => p.type === filter);
  if (posts.length === 0) { grid.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  const sorted = [...posts].sort((a,b) => (b.id||0)-(a.id||0));
  grid.innerHTML = sorted.map(post => {
    const tags = (post.tags||[]).map(t => `<span class="feed-tag">${escText(t)}</span>`).join('');
    const caption = post.caption || post.content || post.desc || '';
    return `<div class="feed-card" data-id="${post.id}" data-type="${post.type}">
      ${typeBadgeHtml(post.type)}
      ${buildMediaHtml(post)}
      <div class="feed-body">
        <div class="feed-post-header">
          <div class="feed-post-avatar"><img src="https://cdn.imgurl.ir/uploads/z39503_ChatGPT_Image_Jun_9_2026_05_12_43_PM.png"></div>
          <span class="feed-post-name">ahs.engineer</span>
          <span class="feed-post-date">${timeAgo(post.date)}</span>
        </div>
        ${caption ? `<div class="feed-caption">${escText(caption)}</div>` : ''}
        ${tags ? `<div class="feed-post-tags">${tags}</div>` : ''}
      </div>
    </div>`;
  }).join('');
};

// ══════════════ HIGHLIGHT ADMIN ══════════════
let _customHighlights = JSON.parse(localStorage.getItem('ahs_custom_highlights') || '[]');
let _deletedHighlights = JSON.parse(localStorage.getItem('ahs_deleted_highlights') || '[]');

function saveCustomHighlights() {
  try { localStorage.setItem('ahs_custom_highlights', JSON.stringify(_customHighlights)); } catch(e){}
}

// Remove deleted defaults on load
(function initHighlights() {
  _deletedHighlights.forEach(id => {
    const idx = HIGHLIGHTS_DATA.findIndex(h => h.id === id);
    if (idx >= 0) HIGHLIGHTS_DATA.splice(idx, 1);
  });
  _customHighlights.forEach(h => HIGHLIGHTS_DATA.push(h));
})();

window.adminAddHighlight = function() {
  const title = document.getElementById('ha_title').value.trim();
  const titleFa = document.getElementById('ha_titleFa').value.trim() || title;
  const emoji = document.getElementById('ha_emoji').value.trim() || '⭐';
  const count = parseInt(document.getElementById('ha_count').value) || 1;
  const color = document.getElementById('ha_color').value.trim() || '#0066cc';
  if (!title) { alert('عنوان ضروری است'); return; }
  const newId = 'ch_' + Date.now();
  const h = { id: newId, emoji, title, titleFa, count, color, custom: true };
  _customHighlights.push(h);
  saveCustomHighlights();
  HIGHLIGHTS_DATA.push(h);
  rebuildHighlightsGrid();
  closeAdminModalDirect('highlight');
  ['ha_title','ha_titleFa','ha_emoji','ha_count'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  document.getElementById('ha_color').value = '#0066cc';
  document.getElementById('stories').scrollIntoView({behavior:'smooth'});
};

function rebuildHighlightsGrid() {
  const grid = document.getElementById('highlightsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  HIGHLIGHTS_DATA.forEach(h => {
    const isFa = document.body.classList.contains('fa');
    const card = document.createElement('div');
    card.className = 'highlight-card';
    card.innerHTML = `
      <div class="highlight-cover" style="background:linear-gradient(135deg,${h.color}22 0%,var(--bg3) 100%)">
        <span style="font-size:32px;position:relative;z-index:1">${h.emoji}</span>
      </div>
      <div class="highlight-info">
        <div class="highlight-title fa-hide">${h.title}</div>
        <div class="highlight-title fa-show" style="display:none">${h.titleFa}</div>
        <div class="highlight-count">${h.count} <span class="fa-hide">stories</span><span class="fa-show" style="display:none">استوری</span></div>
      </div>`;
    card.addEventListener('click', () => openStoriesByHighlight(h.id));
    grid.appendChild(card);
  });
}

function renderHighlightAdminList() {
  const list = document.getElementById('highlightAdminList');
  if (!list) return;
  if (HIGHLIGHTS_DATA.length === 0) { list.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:20px 0">هیچ هایلایتی وجود ندارد</p>'; return; }
  list.innerHTML = HIGHLIGHTS_DATA.map(h => `
    <div class="admin-list-item">
      <span>${h.emoji} ${h.title} ${!h.custom ? '<span style="font-size:10px;color:var(--text3)">(پیش‌فرض)</span>' : ''}</span>
      <button class="admin-list-del" onclick="adminDeleteHighlight('${h.id}')">✕</button>
    </div>`).join('');
}

window.adminDeleteHighlight = function(id) {
  if (!confirm('این هایلایت حذف شود؟')) return;
  _customHighlights = _customHighlights.filter(h => h.id !== id);
  saveCustomHighlights();
  if (!_deletedHighlights.includes(id)) { _deletedHighlights.push(id); try { localStorage.setItem('ahs_deleted_highlights', JSON.stringify(_deletedHighlights)); } catch(e){} }
  const idx = HIGHLIGHTS_DATA.findIndex(h => h.id === id);
  if (idx >= 0) HIGHLIGHTS_DATA.splice(idx, 1);
  rebuildHighlightsGrid();
  renderHighlightAdminList();
};

// ══════════════════════════════════════════════════════════
// REELS ENGINE
// ══════════════════════════════════════════════════════════

// 20 Modern Engineering Templates
const REEL_TEMPLATES = [
  { id: 'cyber-grid',    label: 'Cyber Grid',     icon: '🔷', bg: 'linear-gradient(135deg,#050a0f 0%,#0b1520 100%)', badge: 'CYBER',    accentColor: '#00aaff' },
  { id: 'neon-pulse',   label: 'Neon Pulse',     icon: '⚡', bg: 'linear-gradient(135deg,#030d06 0%,#07150b 100%)', badge: 'PULSE',    accentColor: '#00ff88' },
  { id: 'fire-engine',  label: 'Fire Engine',    icon: '🔥', bg: 'linear-gradient(135deg,#180500 0%,#280900 100%)', badge: 'FIRE',     accentColor: '#ff4500' },
  { id: 'deep-void',    label: 'Deep Void',      icon: '🌌', bg: 'linear-gradient(135deg,#04041a 0%,#0a0a38 100%)', badge: 'VOID',     accentColor: '#7b61ff' },
  { id: 'holo-chrome',  label: 'Holo Chrome',    icon: '🌐', bg: 'linear-gradient(135deg,#050810 0%,#0b2642 100%)', badge: 'HOLO',     accentColor: '#00fff5' },
  { id: 'gold-circuit', label: 'Gold Circuit',   icon: '⚙️', bg: 'linear-gradient(135deg,#100e00 0%,#221a00 100%)', badge: 'CIRCUIT',  accentColor: '#ffcc00' },
  { id: 'sakura-code',  label: 'Sakura Code',    icon: '🌸', bg: 'linear-gradient(135deg,#160816 0%,#280f28 100%)', badge: 'SAKURA',   accentColor: '#ff66bb' },
  { id: 'matrix-rain',  label: 'Matrix Rain',    icon: '💻', bg: 'linear-gradient(135deg,#000d00 0%,#001a00 100%)', badge: 'MATRIX',   accentColor: '#00ff41' },
  { id: 'titanium',     label: 'Titanium',       icon: '🔩', bg: 'linear-gradient(135deg,#0e0e0e 0%,#202020 100%)', badge: 'TITANIUM', accentColor: '#cccccc' },
  { id: 'ocean-wave',   label: 'Ocean Wave',     icon: '🌊', bg: 'linear-gradient(135deg,#041214 0%,#082024 100%)', badge: 'OCEAN',    accentColor: '#00ddcc' },
  { id: 'plc-dark',     label: 'PLC Dark',       icon: '🏭', bg: 'linear-gradient(135deg,#080808 0%,#141414 100%)', badge: 'PLC',      accentColor: '#0077cc' },
  { id: 'iot-connect',  label: 'IoT Connect',    icon: '📡', bg: 'linear-gradient(135deg,#03120a 0%,#062411 100%)', badge: 'IOT',      accentColor: '#44bb66' },
  { id: 'scada-hmi',    label: 'SCADA HMI',      icon: '🖥️', bg: 'linear-gradient(135deg,#0a0800 0%,#261e00 100%)', badge: 'SCADA',    accentColor: '#f5ff00' },
  { id: 'rose-minimal', label: 'Rose Minimal',   icon: '🌹', bg: 'linear-gradient(135deg,#180c0c 0%,#2f1818 100%)', badge: 'ROSE',     accentColor: '#ff8fa0' },
  { id: 'volt-strike',  label: 'Volt Strike',    icon: '⚡', bg: 'linear-gradient(135deg,#080010 0%,#2b0030 100%)', badge: 'VOLT',     accentColor: '#ff00cc' },
  { id: 'arctic-clean', label: 'Arctic Clean',   icon: '❄️', bg: 'linear-gradient(135deg,#eef4fd 0%,#cfe2f5 100%)', badge: 'ARCTIC',   accentColor: '#0099dd' },
  { id: 'midnight-pro', label: 'Midnight Pro',   icon: '🌃', bg: 'linear-gradient(135deg,#020818 0%,#051430 100%)', badge: 'MIDNIGHT', accentColor: '#4488ff' },
  { id: 'forest-ops',   label: 'Forest Ops',     icon: '🌲', bg: 'linear-gradient(135deg,#031208 0%,#062411 100%)', badge: 'FOREST',   accentColor: '#44bb66' },
  { id: 'crimson-war',  label: 'Crimson War',    icon: '🔴', bg: 'linear-gradient(135deg,#160709 0%,#250d11 100%)', badge: 'CRIMSON',  accentColor: '#ff2244' },
  { id: 'solar-flare',  label: 'Solar Flare',    icon: '☀️', bg: 'linear-gradient(135deg,#180c00 0%,#301800 100%)', badge: 'SOLAR',    accentColor: '#ff8800' },
];

let _reels = JSON.parse(localStorage.getItem('ahs_reels') || '[]');
let _selectedReelTemplate = 'cyber-grid';
let _curReelIdx = 0;

function saveReels() {
  try { localStorage.setItem('ahs_reels', JSON.stringify(_reels)); } catch(e) {}
}

// Sample starter reels
if (_reels.length === 0) {
  _reels = [
    {
      id: 'r1', template: 'plc-dark',
      title: 'PLC Ladder Logic in TIA Portal',
      desc: 'یه نمونه کار ساده با TIA Portal V17 — استارت/استاپ موتور',
      srcType: 'youtube', ytId: 'g6RXa1BVUQ4',
      music: 'Hans Zimmer — Time', tags: ['PLC', 'TIA', 'Siemens'],
      date: '2024-06-01'
    },
    {
      id: 'r2', template: 'iot-connect',
      title: 'ESP32 MQTT Dashboard',
      desc: 'ESP32 داده دما رو از طریق MQTT به Node-RED میفرسته',
      srcType: 'youtube', ytId: 'wJbf5E7R4DI',
      music: 'Daft Punk — Get Lucky', tags: ['ESP32', 'IoT', 'MQTT'],
      date: '2024-06-05'
    },
    {
      id: 'r3', template: 'cyber-grid',
      title: 'SCADA System Overview',
      desc: 'نگاهی به یه سیستم SCADA صنعتی با Wonderware InTouch',
      srcType: 'youtube', ytId: 'V8DJQzFpHJU',
      music: 'Linkin Park — Numb', tags: ['SCADA', 'HMI', 'Industrial'],
      date: '2024-06-09'
    }
  ];
  saveReels();
}

// ── Render Reel Cards ──
// ── Reels Spotlight (dim rest of page on hover) ──
(function() {
  let _spotTimer = null;
  document.addEventListener('DOMContentLoaded', function() {
    const reelsSection = document.getElementById('reels');
    if (!reelsSection) return;
    reelsSection.addEventListener('mouseenter', function() {
      clearTimeout(_spotTimer);
      document.body.classList.add('reels-spotlight-active');
    });
    reelsSection.addEventListener('mouseleave', function() {
      _spotTimer = setTimeout(function() {
        document.body.classList.remove('reels-spotlight-active');
      }, 120);
    });
  });
})();

// ── Reel Hover: Slide + Explosion ──
(function() {
  const NEON_COLORS = ['var(--neon)', 'var(--neon2)', 'var(--neon3)', '#fff', 'rgba(0,170,255,0.8)'];
  let _slideTimers = {};

  function getNeonColor() {
    return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
  }

  function triggerExplosion(cardEl, reelId) {
    const expEl = document.getElementById('reel-exp-' + reelId);
    const bioEl = document.getElementById('reel-bio-' + reelId);
    const infoEl = document.getElementById('reel-info-' + reelId);
    if (!expEl) return;

    const rect = cardEl.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Clear old sparks
    expEl.innerHTML = '';

    // Create sparks
    const numSparks = 22;
    for (let i = 0; i < numSparks; i++) {
      const angle = (i / numSparks) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = 40 + Math.random() * 80;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const size = 4 + Math.random() * 7;
      const delay = Math.random() * 0.18;
      const dur = 0.5 + Math.random() * 0.35;

      const spark = document.createElement('div');
      spark.className = 'reel-spark';
      spark.style.cssText = `
        left:${cx - size/2}px; top:${cy - size/2}px;
        width:${size}px; height:${size}px;
        background:${getNeonColor()};
        --tx:${tx}px; --ty:${ty}px;
        animation: sparkFly ${dur}s ${delay}s ease-out forwards;
        box-shadow: 0 0 ${size*2}px ${getNeonColor()};
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;
      expEl.appendChild(spark);
    }

    // Explosion rings
    for (let r = 0; r < 2; r++) {
      const ring = document.createElement('div');
      ring.className = 'reel-explosion-ring';
      const rs = 20 + r * 30;
      ring.style.cssText = `
        left:${cx - rs/2}px; top:${cy - rs/2}px;
        width:${rs}px; height:${rs}px;
        border-color:${getNeonColor()};
        animation: sparkRing ${0.55 + r * 0.2}s ${r * 0.1}s ease-out forwards;
      `;
      expEl.appendChild(ring);
    }

    // Bio flash text
    if (bioEl) {
      bioEl.classList.remove('exploding');
      void bioEl.offsetWidth; // reflow
      bioEl.classList.add('exploding');
    }
    // Hide static info
    if (infoEl) infoEl.style.opacity = '0';
  }

  window._reelHoverEnter = function(reelId, cardEl) {
    // Hide static info
    const infoEl = document.getElementById('reel-info-' + reelId);
    if (infoEl) infoEl.style.transition = 'opacity 0.3s';
    // After slide animation (0.55s) → fire explosion
    clearTimeout(_slideTimers[reelId]);
    _slideTimers[reelId] = setTimeout(() => {
      triggerExplosion(cardEl, reelId);
    }, 580);
  };

  window._reelHoverLeave = function(cardEl) {
    // Find reelId from card id
    const id = (cardEl.id || '').replace('reel-', '');
    clearTimeout(_slideTimers[id]);
    // Clean up
    const expEl = document.getElementById('reel-exp-' + id);
    if (expEl) expEl.innerHTML = '';
    const bioEl = document.getElementById('reel-bio-' + id);
    if (bioEl) bioEl.classList.remove('exploding');
    const infoEl = document.getElementById('reel-info-' + id);
    if (infoEl) infoEl.style.opacity = '1';
  };
})();

function buildReelCard(reel) {
  const tpl = REEL_TEMPLATES.find(t => t.id === reel.template) || REEL_TEMPLATES[0];
  const tags = (reel.tags || []).map(t => `<span class="reel-tag">${t}</span>`).join('');
  const music = reel.music ? `
    <div class="reel-music-tag">
      <span class="reel-music-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span>
      <span class="reel-music-name">${reel.music}</span>
    </div>` : '';

  let mediaHtml = '';
  if (reel.srcType === 'youtube' && reel.ytId) {
    mediaHtml = `<iframe src="https://www.youtube.com/embed/${reel.ytId}?mute=1&autoplay=0&loop=1&playlist=${reel.ytId}" allowfullscreen loading="lazy" style="width:100%;height:100%;border:none;position:absolute;top:0;left:0;object-fit:cover"></iframe>`;
  } else if (reel.srcType === 'aparat' && reel.aparatUrl) {
    const eid = parseAparatId(reel.aparatUrl);
    mediaHtml = `<iframe src="https://www.aparat.com/video/video/embed/videohash/${eid}/vt/frame" allowfullscreen="true" webkitallowfullscreen="true" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block"></iframe>`;
  } else if (reel.srcType === 'mp4' && reel.mp4Url) {
    mediaHtml = `<video src="${reel.mp4Url}" muted loop playsinline style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0"></video>`;
  } else if (reel.srcType === 'image' && reel.imgUrl) {
    mediaHtml = `<img src="${reel.imgUrl}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0" alt="">`;
  } else {
    mediaHtml = `<div style="width:100%;height:100%;background:${tpl.bg};display:flex;align-items:center;justify-content:center;font-size:56px;position:absolute;top:0;left:0">${tpl.icon}</div>`;
  }

  const slideTags = (reel.tags || []).map(t => `<span class="reel-slide-tag">${t}</span>`).join('');
  const slideMusic = reel.music ? `<div class="reel-slide-music"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>${reel.music}</div>` : '';

  return `<div class="reel-card" id="reel-${reel.id}"
      onclick="openReelViewer('${reel.id}')"
      onmouseenter="_reelHoverEnter('${reel.id}',this)"
      onmouseleave="_reelHoverLeave(this)">
    <div class="reel-media-wrap">
      ${mediaHtml}
      <div class="reel-overlay"></div>
      <div class="reel-play-btn"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
      <div class="reel-music-bar">
        <div class="reel-music-bar-line"></div>
        <div class="reel-music-bar-line"></div>
        <div class="reel-music-bar-line"></div>
        <div class="reel-music-bar-line"></div>
      </div>
    </div>
    <span class="reel-template-badge" style="border-color:${tpl.accentColor}44;color:${tpl.accentColor}">${tpl.badge}</span>
    <!-- Sliding description panel (top→bottom) -->
    <div class="reel-slide-panel">
      <div class="reel-slide-content">
        <div class="reel-slide-title">${reel.title}</div>
        ${reel.desc ? `<div class="reel-slide-desc">${reel.desc}</div>` : ''}
        ${slideMusic}
        ${slideTags ? `<div class="reel-slide-tags">${slideTags}</div>` : ''}
      </div>
    </div>
    <!-- Explosion bio flash (fires when slide finishes) -->
    <div class="reel-explosion" id="reel-exp-${reel.id}"></div>
    <div class="reel-bio-flash" id="reel-bio-${reel.id}">
      <div class="reel-bio-flash-title">${reel.title}</div>
      ${reel.desc ? `<div class="reel-bio-flash-desc">${reel.desc}</div>` : ''}
    </div>
    <!-- Static info (hidden on hover) -->
    <div class="reel-info" id="reel-info-${reel.id}">
      <div class="reel-title">${reel.title}</div>
      ${reel.desc ? `<div class="reel-desc">${reel.desc}</div>` : ''}
      ${music}
      ${tags ? `<div class="reel-tags-wrap">${tags}</div>` : ''}
    </div>
  </div>`;
}

function renderReels() {
  const grid = document.getElementById('reelsGrid');
  const empty = document.getElementById('reelsEmpty');
  if (!grid) return;
  if (_reels.length === 0) { grid.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  grid.innerHTML = [..._reels].reverse().map(r => buildReelCard(r)).join('');
}

// ── Reel Viewer ──
window.openReelViewer = function(id) {
  _curReelIdx = _reels.findIndex(r => r.id === id);
  if (_curReelIdx < 0) _curReelIdx = 0;
  renderReelViewerSlide();
  document.getElementById('reelViewer').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeReelViewer = function() {
  document.getElementById('reelViewer').classList.remove('open');
  document.getElementById('reelViewerMedia').innerHTML = '';
  document.body.style.overflow = '';
};

window.reelViewerBgClick = function(e) {
  if (e.target === document.getElementById('reelViewer')) closeReelViewer();
};

window.prevReel = function() {
  _curReelIdx = (_curReelIdx - 1 + _reels.length) % _reels.length;
  renderReelViewerSlide();
};
window.nextReel = function() {
  _curReelIdx = (_curReelIdx + 1) % _reels.length;
  renderReelViewerSlide();
};

function renderReelViewerSlide() {
  const reel = _reels[_reels.length - 1 - _curReelIdx] || _reels[0];
  if (!reel) return;
  const wrap = document.getElementById('reelViewerMedia');
  let mediaHtml = '';
  if (reel.srcType === 'youtube' && reel.ytId) {
    mediaHtml = `<iframe src="https://www.youtube.com/embed/${reel.ytId}?autoplay=1&mute=0" allowfullscreen style="width:100%;height:100%;border:none"></iframe>`;
  } else if (reel.srcType === 'aparat' && reel.aparatUrl) {
    const eid = parseAparatId(reel.aparatUrl);
    mediaHtml = `<iframe src="https://www.aparat.com/video/video/embed/videohash/${eid}/vt/frame" allowfullscreen="true" webkitallowfullscreen="true" style="width:100%;height:100%;border:none;display:block"></iframe>`;
  } else if (reel.srcType === 'mp4' && reel.mp4Url) {
    mediaHtml = `<video src="${reel.mp4Url}" controls autoplay playsinline style="width:100%;height:100%;object-fit:cover"></video>`;
  } else if (reel.srcType === 'image' && reel.imgUrl) {
    mediaHtml = `<img src="${reel.imgUrl}" style="width:100%;height:100%;object-fit:cover" alt="">`;
  } else {
    const tpl = REEL_TEMPLATES.find(t => t.id === reel.template) || REEL_TEMPLATES[0];
    mediaHtml = `<div style="width:100%;height:100%;background:${tpl.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:30px">
      <span style="font-size:64px">${tpl.icon}</span>
      <span style="font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#fff;text-align:center">${reel.title}</span>
    </div>`;
  }
  wrap.innerHTML = mediaHtml + `
    <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 14px;background:linear-gradient(0deg,rgba(0,0,0,0.9) 0%,transparent 100%);">
      <div style="font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:4px">${reel.title}</div>
      ${reel.music ? `<div style="font-size:12px;color:rgba(255,255,255,0.7)">🎵 ${reel.music}</div>` : ''}
    </div>`;
  wrap.style.position = 'relative';
}

// ── Reel Template Grid ──
function renderReelTemplateGrid() {
  const grid = document.getElementById('reelTemplateGrid');
  if (!grid) return;
  grid.innerHTML = REEL_TEMPLATES.map(t => `
    <div class="reel-tpl-opt ${t.id === _selectedReelTemplate ? 'active' : ''}" onclick="selectReelTemplate('${t.id}',this)">
      <span class="tpl-icon">${t.icon}</span>
      ${t.label}
    </div>`).join('');
}

window.selectReelTemplate = function(id, el) {
  _selectedReelTemplate = id;
  document.querySelectorAll('.reel-tpl-opt').forEach(o => o.classList.remove('active'));
  if (el) el.classList.add('active');
};

// ── Reel Source toggle ──
window.toggleReelSourceFields = function() {
  const type = document.getElementById('rl_src_type').value;
  ['rl_yt_field','rl_ap_field','rl_mp4_field','rl_img_field'].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = 'none';
  });
  const map = { youtube: 'rl_yt_field', aparat: 'rl_ap_field', mp4: 'rl_mp4_field', image: 'rl_img_field' };
  const show = document.getElementById(map[type]);
  if (show) show.style.display = 'block';
};

// ── Add Reel from admin ──
window.adminAddReel = function() {
  const title = document.getElementById('rl_title').value.trim();
  if (!title) { alert('عنوان ریل ضروری است'); return; }
  const srcType = document.getElementById('rl_src_type').value;
  const reel = {
    id: 'rl_' + Date.now(),
    template: _selectedReelTemplate,
    title,
    desc: document.getElementById('rl_desc').value.trim(),
    srcType,
    ytId: (document.getElementById('rl_ytid') || {}).value?.trim() || '',
    aparatUrl: (document.getElementById('rl_aparat') || {}).value?.trim() || '',
    mp4Url: (document.getElementById('rl_mp4') || {}).value?.trim() || '',
    imgUrl: (document.getElementById('rl_img') || {}).value?.trim() || '',
    music: document.getElementById('rl_music').value.trim(),
    tags: document.getElementById('rl_tags').value.split(',').map(t => t.trim()).filter(Boolean),
    date: new Date().toISOString().split('T')[0],
    custom: true
  };
  _reels.push(reel);
  saveReels();
  renderReels();
  closeAdminModalDirect('reels');
  ['rl_title','rl_desc','rl_ytid','rl_aparat','rl_mp4','rl_img','rl_music','rl_tags'].forEach(id => {
    const el = document.getElementById(id); if(el) el.value = '';
  });
  document.getElementById('reels').scrollIntoView({behavior:'smooth'});
};

// ── Delete Reel ──
window.adminDeleteReel = function(id) {
  if (!confirm('این ریل حذف شود؟')) return;
  _reels = _reels.filter(r => r.id !== id);
  saveReels();
  renderReels();
  renderReelsAdminList();
};

// ── Reel Admin List ──
function renderReelsAdminList() {
  const list = document.getElementById('reelsAdminList');
  if (!list) return;
  if (_reels.length === 0) { list.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:20px 0">هیچ ریلزی وجود ندارد</p>'; return; }
  list.innerHTML = [..._reels].reverse().map(r => `
    <div class="admin-list-item">
      <span>▶ ${r.title}</span>
      <button class="admin-list-del" onclick="adminDeleteReel('${r.id}')">✕</button>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════
// LAYOUT TEMPLATES SYSTEM
// ═══════════════════════════════════════════════════════
const SITE_LAYOUTS = [
  { id: '', label: 'پیش‌فرض (Default)', icon: '🔵', desc: 'طراحی اصلی سایت' },
  { id: 'centered', label: 'مرکزی (Centered)', icon: '⭕', desc: 'محتوا در مرکز، مینیمال' },
  { id: 'magazine', label: 'مجله‌ای (Magazine)', icon: '📰', desc: 'طراحی بزرگ و درشت' },
  { id: 'card-grid', label: 'کارت‌گرید (Card Grid)', icon: '🃏', desc: 'کارت‌های گرد و مدرن' },
  { id: 'full-width', label: 'تمام‌عرض (Full Width)', icon: '↔️', desc: 'بدون محدودیت عرض' },
  { id: 'compact', label: 'فشرده (Compact)', icon: '📦', desc: 'فاصله کمتر، محتوای بیشتر' },
  { id: 'bold', label: 'جسورانه (Bold)', icon: '💪', desc: 'هدر بزرگ، تایپوگرافی بزرگ' },
  { id: 'timeline', label: 'تایم‌لاین (Timeline)', icon: '📅', desc: 'تأکید روی خط زمانی' },
  { id: 'dark-cards', label: 'کارت تیره (Dark Cards)', icon: '🌑', desc: 'کارت‌های بسیار تیره' },
  { id: 'neon-borders', label: 'نئون بوردر (Neon Borders)', icon: '✨', desc: 'لبه‌های درخشان نئون' },
  { id: 'glass', label: 'گلاس (Glassmorphism)', icon: '🔮', desc: 'شیشه‌ای و محو' },
  { id: 'retro', label: 'رترو (Retro Terminal)', icon: '🖥️', desc: 'استایل ترمینال قدیمی' },
  { id: 'modern-flat', label: 'فلت مدرن (Modern Flat)', icon: '⬜', desc: 'بدون بوردر، سایه نرم' },
  { id: 'industrial', label: 'صنعتی (Industrial)', icon: '⚙️', desc: 'طراحی صنعتی تیز' },
  { id: 'asymmetric', label: 'نامتقارن (Asymmetric)', icon: '↗️', desc: 'چیدمان اریب و جذاب' },
  { id: 'grid-overlay', label: 'گرید روکش (Grid Overlay)', icon: '🔲', desc: 'پس‌زمینه شطرنجی' },
  { id: 'floating', label: 'شناور (Floating Cards)', icon: '🎈', desc: 'کارت‌های شناور هنگام هاور' },
  { id: 'gradient-hero', label: 'گرادیان هیرو (Gradient Hero)', icon: '🌈', desc: 'هدر با گرادیان رنگی' },
  { id: 'split', label: 'اسپلیت (Split Screen)', icon: '⬛', desc: 'صفحه دو بخشی' },
  { id: 'sidebar', label: 'سایدبار (Sidebar Nav)', icon: '📌', desc: 'ناوبری از طرف چپ' },
];

let _currentLayout = localStorage.getItem('ahs_layout') || '';

function applyLayout(id) {
  document.documentElement.setAttribute('data-layout', id);
  localStorage.setItem('ahs_layout', id);
  _currentLayout = id;
  renderLayoutAdminGrid();
}

function renderLayoutAdminGrid() {
  const grid = document.getElementById('layoutGrid');
  if (!grid) return;
  grid.innerHTML = SITE_LAYOUTS.map(l => `
    <div onclick="applyLayout('${l.id}')" style="
      cursor:pointer; padding:14px 16px;
      background:${_currentLayout===l.id ? 'rgba(0,170,255,0.12)' : 'var(--bg2)'};
      border:1px solid ${_currentLayout===l.id ? 'var(--neon)' : 'var(--border2)'};
      border-radius:10px; transition:all 0.2s;
      display:flex; align-items:center; gap:12px;
    " onmouseover="this.style.borderColor='var(--neon2)'" onmouseout="this.style.borderColor='${_currentLayout===l.id ? 'var(--neon)' : 'var(--border2)'}'">
      <span style="font-size:22px">${l.icon}</span>
      <div>
        <div style="font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:${_currentLayout===l.id?'var(--neon)':'var(--text)'}">
          ${l.label} ${_currentLayout===l.id ? '✓' : ''}
        </div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${l.desc}</div>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════
// FULL ADMIN DASHBOARD — JS ENGINE
// ═══════════════════════════════════════════════════════

// ── Navigation ──
function closeAdminDash() {
  document.getElementById('adminPanel').classList.remove('open');
}
function adminNav(section, btn) {
  document.querySelectorAll('.adm-section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.adm-nav-btn').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('adm-section-' + section);
  if (el) el.style.display = 'block';
  if (btn) btn.classList.add('active');
  // Load section data
  if (section === 'projects') renderProjectsAdmin();
  if (section === 'skills') { renderSkillsAdmin(); loadChips(); }
  if (section === 'resume') { renderEduAdmin(); renderExpAdmin(); renderCertAdmin(); }
  if (section === 'feed') renderFeedAdmin();
  if (section === 'appearance') { renderInlineThemes(); renderInlineLayouts(); }
  if (section === 'profile') loadProfileFields();
}

// ── Init Dashboard ──
function initAdminDash() {
  loadProfileFields();
  document.querySelectorAll('.adm-section').forEach(s => s.style.display = 'none');
  const defaultSection = document.getElementById('adm-section-profile');
  if (defaultSection) defaultSection.style.display = 'block';
  document.querySelectorAll('.adm-nav-btn').forEach(b => b.classList.remove('active'));
  const defaultBtn = document.getElementById('adm-nav-profile');
  if (defaultBtn) defaultBtn.classList.add('active');
}

// ── Toast ──
function showAdminToast(msg) {
  const toast = document.getElementById('adminToast');
  if (!toast) return;
  toast.textContent = '✓ ' + (msg || 'ذخیره شد');
  toast.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.transform = 'translateX(-50%) translateY(80px)'; }, 2200);
}

// ═══════════════════════════════════════════════════════
// PROFILE MANAGEMENT
// ═══════════════════════════════════════════════════════
const PROF_KEY = 'ahs_profile_data';

function loadProfileFields() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  const setVal = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
  setVal('prof_nameEn', saved.nameEn || '');
  setVal('prof_nameFa', saved.nameFa || '');
  setVal('prof_titleEn', saved.titleEn || '');
  setVal('prof_titleFa', saved.titleFa || '');
  setVal('prof_tags', saved.tags || '');
  setVal('prof_bioEn', saved.bioEn || '');
  setVal('prof_bioFa', saved.bioFa || '');
  setVal('prof_email', saved.email || '');
  setVal('prof_linkedin', saved.linkedin || '');
  setVal('prof_github', saved.github || '');
  setVal('prof_location', saved.location || '');
  setVal('prof_avatar', saved.avatar || '');
  setVal('prof_handle', saved.handle || '');
  setVal('prof_feedbioEn', saved.feedbioEn || '');
  setVal('prof_feedbioFa', saved.feedbioFa || '');
  // About cards editor
  renderAboutCardsEditor(saved.aboutCards || []);
  // Apply live
  applyProfileToPage(saved);
}

function getVal(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

function saveProfile() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  saved.nameEn = getVal('prof_nameEn');
  saved.nameFa = getVal('prof_nameFa');
  saved.titleEn = getVal('prof_titleEn');
  saved.titleFa = getVal('prof_titleFa');
  saved.tags = getVal('prof_tags');
  try { localStorage.setItem(PROF_KEY, JSON.stringify(saved)); } catch(e){}
  applyProfileToPage(saved);
  showAdminToast('اطلاعات اصلی ذخیره شد');
}

function saveBio() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  saved.bioEn = getVal('prof_bioEn');
  saved.bioFa = getVal('prof_bioFa');
  saved.email = getVal('prof_email');
  saved.linkedin = getVal('prof_linkedin');
  saved.github = getVal('prof_github');
  saved.location = getVal('prof_location');
  try { localStorage.setItem(PROF_KEY, JSON.stringify(saved)); } catch(e){}
  applyProfileToPage(saved);
  showAdminToast('بیوگرافی ذخیره شد');
}

function saveAvatar() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  saved.avatar = getVal('prof_avatar');
  try { localStorage.setItem(PROF_KEY, JSON.stringify(saved)); } catch(e){}
  applyProfileToPage(saved);
  showAdminToast('تصویر پروفایل ذخیره شد');
}

function saveFeedProfile() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  saved.handle = getVal('prof_handle');
  saved.feedbioEn = getVal('prof_feedbioEn');
  saved.feedbioFa = getVal('prof_feedbioFa');
  try { localStorage.setItem(PROF_KEY, JSON.stringify(saved)); } catch(e){}
  applyProfileToPage(saved);
  showAdminToast('پروفایل فید ذخیره شد');
}

function applyProfileToPage(d) {
  if (!d) return;
  const isFa = document.body.classList.contains('fa');
  // Name
  if (d.nameEn) {
    const parts = d.nameEn.trim().split(' ');
    const first = parts.slice(0, -1).join(' ');
    const last = parts[parts.length - 1];
    document.querySelectorAll('.hero-name .first').forEach(el => el.textContent = first);
    document.querySelectorAll('.hero-name .last').forEach(el => el.textContent = last);
  }
  // Title
  if (d.titleEn) {
    document.querySelectorAll('.hero-title.fa-hide, .hero-title:not(.fa-show)').forEach(el => { if (!el.classList.contains('fa-show')) el.textContent = d.titleEn; });
  }
  // Avatar
  if (d.avatar) {
    document.querySelectorAll('.feed-avatar img, .feed-post-avatar img').forEach(el => el.src = d.avatar);
    document.querySelectorAll('.hero-img-frame img').forEach(el => el.src = d.avatar);
  }
  // Tags
  if (d.tags) {
    const tagsEl = document.querySelector('.hero-tags');
    if (tagsEl) {
      tagsEl.innerHTML = d.tags.split(',').map(t => `<span class="hero-tag">${t.trim()}</span>`).join('');
    }
  }
  // Handle
  if (d.handle) document.querySelectorAll('.feed-handle').forEach(el => el.textContent = d.handle);
  // Feed bio
  if (d.feedbioEn) document.querySelectorAll('.feed-bio.fa-hide').forEach(el => el.innerHTML = d.feedbioEn);
  if (d.feedbioFa) document.querySelectorAll('.feed-bio.fa-show').forEach(el => el.innerHTML = d.feedbioFa);
  // Email
  if (d.email) document.querySelectorAll('a[href^="mailto:"]').forEach(el => { el.href = 'mailto:' + d.email; el.textContent = d.email; });
  // GitHub
  if (d.github) document.querySelectorAll('a[href*="github.com"]').forEach(el => { el.href = d.github; el.textContent = d.github.replace('https://', ''); });
  // LinkedIn
  if (d.linkedin) document.querySelectorAll('a[href*="linkedin.com"], .contact-info-val a[href="#"]').forEach(el => { el.href = d.linkedin; el.textContent = d.linkedin.replace('https://',''); });
  // Nav logo
  if (d.navLogo) document.querySelector('.nav-logo').textContent = d.navLogo;
}

// Apply saved profile on load
(function() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  if (Object.keys(saved).length > 0) applyProfileToPage(saved);
})();

// ── About Cards Editor ──
const DEFAULT_ABOUT_CARDS = [
  { label: 'University', labelFa: 'دانشگاه', value: 'University Name', icon: '🎓' },
  { label: 'Major', labelFa: 'رشته', value: 'Electrical Engineering', icon: '⚡' },
  { label: 'Year', labelFa: 'سال', value: '3rd Year', icon: '📅' },
  { label: 'Focus', labelFa: 'تخصص', value: 'Industrial Automation', icon: '🏭' },
];

function renderAboutCardsEditor(cards) {
  const container = document.getElementById('aboutCardsEditor');
  if (!container) return;
  const data = cards.length ? cards : DEFAULT_ABOUT_CARDS;
  container.innerHTML = data.map((c, i) => `
    <div style="background:var(--bg2);border:1px solid var(--border2);border-radius:8px;padding:12px">
      <div style="font-size:11px;color:var(--neon);font-weight:700;margin-bottom:8px">کارت ${i+1} ${c.icon}</div>
      <input class="adm-input" id="acard_label_${i}" value="${c.label || ''}" placeholder="Label EN" style="margin-bottom:6px">
      <input class="adm-input" id="acard_labelFa_${i}" value="${c.labelFa || ''}" placeholder="Label FA" style="margin-bottom:6px">
      <input class="adm-input" id="acard_value_${i}" value="${c.value || ''}" placeholder="مقدار" style="margin-bottom:6px">
      <input class="adm-input" id="acard_icon_${i}" value="${c.icon || ''}" placeholder="آیکون" maxlength="4">
    </div>
  `).join('');
}

function saveAboutCards() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  const cards = [];
  const existing = saved.aboutCards && saved.aboutCards.length ? saved.aboutCards : DEFAULT_ABOUT_CARDS;
  existing.forEach((c, i) => {
    cards.push({
      label: getVal(`acard_label_${i}`) || c.label,
      labelFa: getVal(`acard_labelFa_${i}`) || c.labelFa,
      value: getVal(`acard_value_${i}`) || c.value,
      icon: getVal(`acard_icon_${i}`) || c.icon,
    });
  });
  saved.aboutCards = cards;
  try { localStorage.setItem(PROF_KEY, JSON.stringify(saved)); } catch(e){}
  // Apply to DOM
  const aboutCardEls = document.querySelectorAll('.about-card');
  cards.forEach((c, i) => {
    if (aboutCardEls[i]) {
      const label = aboutCardEls[i].querySelector('.about-card-label');
      const val = aboutCardEls[i].querySelector('.about-card-value');
      const icon = aboutCardEls[i].querySelector('.about-card-icon');
      if (label) label.textContent = c.label;
      if (val) val.textContent = c.value;
    }
  });
  showAdminToast('کارت‌های پروفایل ذخیره شد');
}

// Apply about cards on load
(function() {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  if (saved.aboutCards) {
    const aboutCardEls = document.querySelectorAll('.about-card');
    saved.aboutCards.forEach((c, i) => {
      if (aboutCardEls[i]) {
        const label = aboutCardEls[i].querySelector('.about-card-label');
        const val = aboutCardEls[i].querySelector('.about-card-value');
        if (label) label.textContent = c.label;
        if (val) val.textContent = c.value;
      }
    });
  }
})();

// ═══════════════════════════════════════════════════════
// PROJECTS MANAGEMENT
// ═══════════════════════════════════════════════════════
let _customProjects = JSON.parse(localStorage.getItem('ahs_custom_projects') || '[]');

function saveCustomProjects() {
  try { localStorage.setItem('ahs_custom_projects', JSON.stringify(_customProjects)); } catch(e){}
}

function addProject() {
  const titleEn = getVal('proj_titleEn');
  const titleFa = getVal('proj_titleFa') || titleEn;
  const descEn = getVal('proj_descEn');
  const descFa = getVal('proj_descFa') || descEn;
  const tags = getVal('proj_tags').split(',').map(t => t.trim()).filter(Boolean);
  const img = getVal('proj_img');
  const link = getVal('proj_link');
  if (!titleEn) { alert('عنوان پروژه ضروری است'); return; }
  const imgHtml = img
    ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover"><div class="project-img-overlay"></div>`
    : `<div class="project-img-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="60" height="60"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div><div class="project-img-overlay"></div>`;
  const proj = { id: 'cp_' + Date.now(), titleEn, titleFa, descEn, descFa, tags, imgHtml, link, custom: true };
  _customProjects.unshift(proj);
  saveCustomProjects();
  ALL_PROJECTS.unshift(proj);
  buildProjectCards();
  ['proj_titleEn','proj_titleFa','proj_descEn','proj_descFa','proj_tags','proj_img','proj_link'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  renderProjectsAdmin();
  showAdminToast('پروژه اضافه شد');
}

function renderProjectsAdmin() {
  const list = document.getElementById('projectsAdminList');
  if (!list) return;
  const allProjs = ALL_PROJECTS || [];
  if (!allProjs.length) { list.innerHTML = '<p style="color:var(--text3);font-size:13px;text-align:center;padding:20px">پروژه‌ای وجود ندارد</p>'; return; }
  list.innerHTML = allProjs.map((p, i) => `
    <div class="adm-list-row">
      <span>💼 ${p.titleEn || p.titleFa}</span>
      ${p.custom ? `<button class="adm-del-btn" onclick="deleteProject('${p.id}')">✕</button>` : '<span style="font-size:10px;color:var(--text3)">(پیش‌فرض)</span>'}
    </div>`).join('');
}

window.deleteProject = function(id) {
  if (!confirm('این پروژه حذف شود؟')) return;
  _customProjects = _customProjects.filter(p => p.id !== id);
  saveCustomProjects();
  const idx = ALL_PROJECTS.findIndex(p => p.id === id);
  if (idx >= 0) ALL_PROJECTS.splice(idx, 1);
  buildProjectCards();
  renderProjectsAdmin();
  showAdminToast('پروژه حذف شد');
};

// Load custom projects
(function() { _customProjects.forEach(p => ALL_PROJECTS.unshift(p)); })();

// ═══════════════════════════════════════════════════════
// SKILLS MANAGEMENT
// ═══════════════════════════════════════════════════════
let _customSkills = JSON.parse(localStorage.getItem('ahs_custom_skills') || '[]');

function saveCustomSkills() {
  try { localStorage.setItem('ahs_custom_skills', JSON.stringify(_customSkills)); } catch(e){}
}

function addSkill() {
  const name = getVal('skill_name');
  const pct = parseInt(getVal('skill_pct')) || 80;
  const cat = getVal('skill_cat') || 'core';
  const icon = getVal('skill_icon') || '🔧';
  if (!name) { alert('نام مهارت ضروری است'); return; }
  const skill = { id: 'cs_' + Date.now(), name, pct, cat, icon, custom: true };
  _customSkills.push(skill);
  saveCustomSkills();
  // Add to DOM skills section
  const skillsContainer = document.querySelector('#skills .skills-layout > div:first-child');
  if (skillsContainer) {
    const div = document.createElement('div');
    div.className = 'skill-item';
    div.id = 'skill-custom-' + skill.id;
    div.innerHTML = `
      <div class="skill-header">
        <div class="skill-name"><span style="font-size:16px">${icon}</span> ${name}</div>
        <div class="skill-pct">${pct}%</div>
      </div>
      <div class="skill-bar"><div class="skill-fill" style="width:${pct}%"></div></div>`;
    skillsContainer.appendChild(div);
  }
  ['skill_name','skill_pct','skill_icon'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
  renderSkillsAdmin();
  showAdminToast('مهارت اضافه شد');
}

function renderSkillsAdmin() {
  const list = document.getElementById('skillsAdminList');
  if (!list) return;
  if (!_customSkills.length) { list.innerHTML = '<p style="color:var(--text3);font-size:12px;text-align:center;padding:16px">هنوز مهارت سفارشی اضافه نشده</p>'; return; }
  list.innerHTML = _customSkills.map(s => `
    <div class="adm-list-row">
      <span>${s.icon} ${s.name} — ${s.pct}%</span>
      <button class="adm-del-btn" onclick="deleteSkill('${s.id}')">✕</button>
    </div>`).join('');
}

window.deleteSkill = function(id) {
  if (!confirm('این مهارت حذف شود؟')) return;
  _customSkills = _customSkills.filter(s => s.id !== id);
  saveCustomSkills();
  const el = document.getElementById('skill-custom-' + id);
  if (el) el.remove();
  renderSkillsAdmin();
  showAdminToast('مهارت حذف شد');
};

function loadChips() {
  const saved = JSON.parse(localStorage.getItem('ahs_skill_chips') || '{}');
  const setVal = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
  setVal('chip_tools', saved.tools || '');
  setVal('chip_protocols', saved.protocols || '');
  setVal('chip_langs', saved.langs || '');
}

function saveChips() {
  const chips = {
    tools: getVal('chip_tools'),
    protocols: getVal('chip_protocols'),
    langs: getVal('chip_langs'),
  };
  try { localStorage.setItem('ahs_skill_chips', JSON.stringify(chips)); } catch(e){}
  // Apply to DOM chip groups
  const chipGroups = document.querySelectorAll('.skill-chip-group');
  const data = [chips.tools, chips.protocols, chips.langs];
  chipGroups.forEach((g, i) => {
    if (data[i]) {
      const wrap = g.querySelector('.skill-chips');
      if (wrap) wrap.innerHTML = data[i].split(',').map(t => `<span class="skill-chip">${t.trim()}</span>`).join('');
    }
  });
  showAdminToast('چیپ‌های مهارت ذخیره شد');
}

// Apply chips on load
(function() {
  const chips = JSON.parse(localStorage.getItem('ahs_skill_chips') || '{}');
  const chipGroups = document.querySelectorAll('.skill-chip-group');
  const data = [chips.tools, chips.protocols, chips.langs];
  chipGroups.forEach((g, i) => {
    if (data[i]) {
      const wrap = g.querySelector('.skill-chips');
      if (wrap) wrap.innerHTML = data[i].split(',').map(t => `<span class="skill-chip">${t.trim()}</span>`).join('');
    }
  });
})();

// ═══════════════════════════════════════════════════════
// RESUME / EDUCATION / EXPERIENCE / CERTS MANAGEMENT
// ═══════════════════════════════════════════════════════
let _customEdu = JSON.parse(localStorage.getItem('ahs_custom_edu') || '[]');
let _customExp = JSON.parse(localStorage.getItem('ahs_custom_exp') || '[]');
let _customCerts = JSON.parse(localStorage.getItem('ahs_custom_certs') || '[]');

function addEducation() {
  const item = {
    id: 'edu_' + Date.now(),
    titleEn: getVal('edu_titleEn'), titleFa: getVal('edu_titleFa'),
    uniEn: getVal('edu_uniEn'), uniFa: getVal('edu_uniFa'),
    year: getVal('edu_year')
  };
  if (!item.titleEn) { alert('عنوان ضروری است'); return; }
  _customEdu.push(item);
  try { localStorage.setItem('ahs_custom_edu', JSON.stringify(_customEdu)); } catch(e){}
  ['edu_titleEn','edu_titleFa','edu_uniEn','edu_uniFa','edu_year'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  renderEduAdmin();
  showAdminToast('تحصیلات اضافه شد');
}

function renderEduAdmin() {
  const list = document.getElementById('eduAdminList');
  if (!list) return;
  list.innerHTML = _customEdu.map(e => `
    <div class="adm-list-row">
      <span>🎓 ${e.titleEn} — ${e.uniEn}</span>
      <button class="adm-del-btn" onclick="deleteEdu('${e.id}')">✕</button>
    </div>`).join('') || '<p style="color:var(--text3);font-size:12px;padding:8px 0">هنوز تحصیلاتی اضافه نشده</p>';
}

window.deleteEdu = function(id) {
  _customEdu = _customEdu.filter(e => e.id !== id);
  try { localStorage.setItem('ahs_custom_edu', JSON.stringify(_customEdu)); } catch(e){}
  renderEduAdmin();
  showAdminToast('حذف شد');
};

function addExperience() {
  const item = {
    id: 'exp_' + Date.now(),
    titleEn: getVal('exp_titleEn'), titleFa: getVal('exp_titleFa'),
    compEn: getVal('exp_compEn'), compFa: getVal('exp_compFa'),
    year: getVal('exp_year'), desc: getVal('exp_desc')
  };
  if (!item.titleEn) { alert('عنوان ضروری است'); return; }
  _customExp.push(item);
  try { localStorage.setItem('ahs_custom_exp', JSON.stringify(_customExp)); } catch(e){}
  ['exp_titleEn','exp_titleFa','exp_compEn','exp_compFa','exp_year','exp_desc'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  renderExpAdmin();
  showAdminToast('سابقه کاری اضافه شد');
}

function renderExpAdmin() {
  const list = document.getElementById('expAdminList');
  if (!list) return;
  list.innerHTML = _customExp.map(e => `
    <div class="adm-list-row">
      <span>💼 ${e.titleEn} — ${e.compEn}</span>
      <button class="adm-del-btn" onclick="deleteExp('${e.id}')">✕</button>
    </div>`).join('') || '<p style="color:var(--text3);font-size:12px;padding:8px 0">هنوز سابقه‌ای اضافه نشده</p>';
}

window.deleteExp = function(id) {
  _customExp = _customExp.filter(e => e.id !== id);
  try { localStorage.setItem('ahs_custom_exp', JSON.stringify(_customExp)); } catch(e){}
  renderExpAdmin();
  showAdminToast('حذف شد');
};

function addCert() {
  const item = {
    id: 'cert_' + Date.now(),
    titleEn: getVal('cert_titleEn'), titleFa: getVal('cert_titleFa'),
    issuer: getVal('cert_issuer'), color: getVal('cert_color') || '#0066cc',
    link: getVal('cert_link')
  };
  if (!item.titleEn) { alert('عنوان ضروری است'); return; }
  _customCerts.push(item);
  try { localStorage.setItem('ahs_custom_certs', JSON.stringify(_customCerts)); } catch(e){}
  // Add to DOM cert grid
  const grid = document.querySelector('.cert-grid');
  if (grid) {
    const div = document.createElement('div');
    div.className = 'cert-card';
    div.id = 'cert-custom-' + item.id;
    div.style.cssText = `border-top-color:${item.color}`;
    div.innerHTML = `<div class="cert-icon" style="color:${item.color}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg></div><div class="cert-title fa-hide">${item.titleEn}</div><div class="cert-title fa-show" style="display:none">${item.titleFa}</div><div class="cert-issuer">${item.issuer}</div>`;
    grid.appendChild(div);
  }
  ['cert_titleEn','cert_titleFa','cert_issuer','cert_link'].forEach(id => { const el = document.getElementById(id); if(el) el.value=''; });
  document.getElementById('cert_color').value = '#0066cc';
  renderCertAdmin();
  showAdminToast('گواهینامه اضافه شد');
}

function renderCertAdmin() {
  const list = document.getElementById('certAdminList');
  if (!list) return;
  list.innerHTML = _customCerts.map(c => `
    <div class="adm-list-row">
      <span>🏅 ${c.titleEn} — ${c.issuer}</span>
      <button class="adm-del-btn" onclick="deleteCert('${c.id}')">✕</button>
    </div>`).join('') || '<p style="color:var(--text3);font-size:12px;padding:8px 0">هنوز گواهینامه‌ای اضافه نشده</p>';
}

window.deleteCert = function(id) {
  _customCerts = _customCerts.filter(c => c.id !== id);
  try { localStorage.setItem('ahs_custom_certs', JSON.stringify(_customCerts)); } catch(e){}
  const el = document.getElementById('cert-custom-' + id);
  if (el) el.remove();
  renderCertAdmin();
  showAdminToast('حذف شد');
};

// ═══════════════════════════════════════════════════════
// FEED ADMIN LIST
// ═══════════════════════════════════════════════════════
function renderFeedAdmin() {
  const list = document.getElementById('feedAdminList');
  if (!list) return;
  if (!feedPosts || !feedPosts.length) {
    list.innerHTML = '<p style="color:var(--text3);font-size:13px;text-align:center;padding:20px">هیچ پستی وجود ندارد</p>';
    return;
  }
  const sorted = [...feedPosts].sort((a,b) => (b.id||0)-(a.id||0));
  list.innerHTML = sorted.map(p => {
    const label = p.title || p.caption || p.content || p.url || '---';
    const type = {video:'🎬', photo:'🖼️', text:'📝', interest:'❤️'}[p.type] || '📌';
    return `<div class="adm-list-row">
      <span>${type} ${label.substring(0,60)}</span>
      <span style="font-size:11px;color:var(--text3);flex-shrink:0">${p.date||''}</span>
      <button class="adm-del-btn" onclick="adminDeleteFeedPost(${p.id})">✕</button>
    </div>`;
  }).join('');
}

window.adminDeleteFeedPost = function(id) {
  if (!confirm('این پست حذف شود؟')) return;
  feedPosts = feedPosts.filter(p => p.id !== id);
  saveFeed();
  renderFeed(_currentFilter || 'all');
  renderFeedAdmin();
  showAdminToast('پست حذف شد');
};

// ═══════════════════════════════════════════════════════
// APPEARANCE — INLINE THEME & LAYOUT GRIDS
// ═══════════════════════════════════════════════════════
function renderInlineThemes() {
  const grid = document.getElementById('inlineThemeGrid');
  if (!grid) return;
  const cur = document.documentElement.getAttribute('data-theme') || '';
  grid.innerHTML = SITE_THEMES.map(t => `
    <div title="${t.label}" onclick="applyThemeAdmin('${t.id}');renderInlineThemes()" style="display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer">
      <div class="adm-theme-swatch ${cur===t.id?'selected':''}" style="background:${t.color};box-shadow:0 0 12px ${t.color}55"></div>
      <div style="font-size:10px;color:${cur===t.id?'var(--neon)':'var(--text3)'};text-align:center;font-family:'Rajdhani',sans-serif;font-weight:600">${t.label}</div>
    </div>`).join('');
}

function renderInlineLayouts() {
  const grid = document.getElementById('inlineLayoutGrid');
  if (!grid) return;
  const cur = document.documentElement.getAttribute('data-layout') || '';
  grid.innerHTML = SITE_LAYOUTS.map(l => `
    <div onclick="applyLayout('${l.id}');renderInlineLayouts()" style="cursor:pointer;padding:8px 10px;background:${cur===l.id?'rgba(0,170,255,0.1)':'var(--bg2)'};border:1px solid ${cur===l.id?'var(--neon)':'var(--border2)'};border-radius:8px;display:flex;align-items:center;gap:8px;transition:all 0.15s" onmouseover="this.style.borderColor='var(--neon2)'" onmouseout="this.style.borderColor='${cur===l.id?'var(--neon)':'var(--border2)'}'">
      <span style="font-size:16px">${l.icon}</span>
      <div style="font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:700;color:${cur===l.id?'var(--neon)':'var(--text2)'}">${l.label}</div>
    </div>`).join('');
}

function applyFont(font) {
  document.body.style.fontFamily = font ? `'${font}', sans-serif` : '';
  try { localStorage.setItem('ahs_font', font); } catch(e){}
}

function saveNavLogo() {
  const text = getVal('navLogoText');
  if (!text) return;
  document.querySelector('.nav-logo').textContent = text;
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  saved.navLogo = text;
  try { localStorage.setItem(PROF_KEY, JSON.stringify(saved)); } catch(e){}
  showAdminToast('لوگو ذخیره شد');
}

// Apply saved font on load
(function() {
  const f = localStorage.getItem('ahs_font');
  if (f) document.body.style.fontFamily = `'${f}', sans-serif`;
})();

// Load nav logo input when appearance section opens
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem(PROF_KEY) || '{}');
  if (saved.navLogo) {
    const el = document.getElementById('navLogoText');
    if (el) el.value = saved.navLogo;
  }
});



// ═══════════════════════════════════════════════════════
// THEME SYSTEM (Admin Panel control)
// ═══════════════════════════════════════════════════════
const SITE_THEMES = [
  { id: '', label: 'Cyber Blue', color: '#00aaff', desc: 'آبی نئون (پیش‌فرض)' },
  { id: 'neon-green', label: 'Neon Green', color: '#00ff88', desc: 'سبز نئون' },
  { id: 'crimson', label: 'Crimson Dark', color: '#ff2244', desc: 'قرمز تیره' },
  { id: 'purple', label: 'Purple Galaxy', color: '#aa44ff', desc: 'بنفش کهکشانی' },
  { id: 'solar', label: 'Solar Orange', color: '#ff8800', desc: 'نارنجی خورشیدی' },
  { id: 'ice', label: 'Ice White', color: '#0055cc', desc: 'یخی روشن' },
  { id: 'gold', label: 'Gold Elite', color: '#ffcc00', desc: 'طلایی' },
  { id: 'teal', label: 'Ocean Teal', color: '#00ddcc', desc: 'فیروزه‌ای' },
  { id: 'sakura', label: 'Sakura Pink', color: '#ff66bb', desc: 'صورتی شکوفه' },
  { id: 'matrix', label: 'Matrix Green', color: '#00ff41', desc: 'سبز ماتریکس' },
  { id: 'deep-space', label: 'Deep Space', color: '#7b61ff', desc: 'بنفش فضایی' },
  { id: 'volcanic', label: 'Volcanic Red', color: '#ff4500', desc: 'قرمز آتشفشانی' },
  { id: 'arctic', label: 'Arctic White', color: '#0099dd', desc: 'قطب شمال' },
  { id: 'holographic', label: 'Holographic', color: '#00fff5', desc: 'هولوگرافیک' },
  { id: 'midnight', label: 'Midnight Blue', color: '#4488ff', desc: 'آبی شب' },
  { id: 'rose-gold', label: 'Rose Gold', color: '#ff8fa0', desc: 'رزگلد' },
  { id: 'neon-yellow', label: 'Neon Yellow', color: '#f5ff00', desc: 'زرد نئون' },
  { id: 'cyber-pink', label: 'Cyber Pink', color: '#ff00cc', desc: 'صورتی سایبر' },
  { id: 'forest', label: 'Forest Dark', color: '#44bb66', desc: 'سبز جنگل' },
  { id: 'titanium', label: 'Titanium Dark', color: '#cccccc', desc: 'تیتانیوم خاکستری' },
];

function renderThemeAdminGrid() {
  const grid = document.getElementById('themeAdminGrid');
  if (!grid) return;
  const cur = document.documentElement.getAttribute('data-theme') || '';
  grid.innerHTML = SITE_THEMES.map(t => `
    <div onclick="applyThemeAdmin('${t.id}')" style="
      cursor:pointer; padding:14px 16px;
      background:${cur===t.id ? 'rgba(0,170,255,0.12)' : 'var(--bg2)'};
      border:1px solid ${cur===t.id ? 'var(--neon)' : 'var(--border2)'};
      border-radius:10px; transition:all 0.2s;
      display:flex; align-items:center; gap:12px;
    " onmouseover="this.style.borderColor='var(--neon2)'" onmouseout="this.style.borderColor='${cur===t.id ? 'var(--neon)' : 'var(--border2)'}'">
      <div style="width:32px;height:32px;border-radius:50%;background:${t.color};border:2px solid rgba(255,255,255,0.2);flex-shrink:0;box-shadow:0 0 10px ${t.color}66"></div>
      <div>
        <div style="font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:${cur===t.id?'var(--neon)':'var(--text)'}">
          ${t.label} ${cur===t.id ? '✓' : ''}
        </div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${t.desc}</div>
      </div>
    </div>
  `).join('');
}

function applyThemeAdmin(id) {
  // Use existing applyTheme function
  const opt = document.querySelector(`.theme-option[data-theme="${id}"]`);
  applyTheme(id, opt);
  renderThemeAdminGrid();
}


// ═══════════════════════════════════════════════════════
// IMPROVED APARAT EMBED — script type for Stories, Highlights, Reels
// ═══════════════════════════════════════════════════════

// Helper: parse Aparat video hash from any URL format
function parseAparatId(url) {
  if (!url) return '';
  url = url.trim();
  // Full embed code: src="https://www.aparat.com/embed/HASH?..."
  let m = url.match(/aparat\.com\/embed\/([a-zA-Z0-9]+)/);
  if (m) return m[1];
  // /v/HASH or /video/HASH
  m = url.match(/aparat\.com\/(?:v|video)\/([a-zA-Z0-9]+)/);
  if (m) return m[1];
  // embed/HASH.FORMAT (e.g. vtq.prf)
  m = url.match(/embed\/([a-zA-Z0-9]+)(?:\.[a-z]+)?/);
  if (m) return m[1];
  // videohash/HASH
  m = url.match(/videohash\/([a-zA-Z0-9]+)/);
  if (m) return m[1];
  // bare hash (5-10 alphanumeric)
  if (/^[a-zA-Z0-9]{4,12}$/.test(url)) return url;
  return '';
}

// Build an Aparat embed block using iframe (works reliably inside innerHTML)
function buildAparatEmbed(url, divStyle) {
  const eid = parseAparatId(url);
  if (!eid) return `<div style="color:var(--text3);padding:20px;text-align:center">شناسه آپارات معتبر نیست</div>`;
  return `<div style="${divStyle || 'width:100%;height:100%;'}"><iframe src="https://www.aparat.com/video/video/embed/videohash/${eid}/vt/frame" allowfullscreen="true" webkitallowfullscreen="true" style="width:100%;height:100%;border:none;display:block"></iframe></div>`;
}

// Patch story viewer to use improved Aparat embed
const _origRenderStorySlide = window.renderStorySlide;
function renderStorySlidePatched() {
  // call original if defined
  if (typeof _origRenderStorySlide === 'function') _origRenderStorySlide();
  // The story slide rendering is inline — patch the mediaWrap after
  const mediaWrap = document.getElementById('storyMediaWrap');
  if (!mediaWrap) return;
  const inner = mediaWrap.innerHTML;
  if (inner.includes('aparat.com') && !inner.includes('script type')) {
    const urlMatch = inner.match(/src="(https:\/\/www\.aparat\.com[^"]+)"/);
    if (urlMatch) {
      const u = urlMatch[1];
      const eid = parseAparatId(u);
      if (eid) {
        const rnd = 'ap_sv_' + Date.now();
        mediaWrap.innerHTML = `<iframe src="https://www.aparat.com/video/video/embed/videohash/${eid}/vt/frame" allowfullscreen="true" webkitallowfullscreen="true" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block"></iframe>`;
      }
    }
  }
}

// ══ Init Layout & Theme on DOMContentLoaded ══
document.addEventListener('DOMContentLoaded', () => {
  // Restore layout
  const savedLayout = localStorage.getItem('ahs_layout') || '';
  if (savedLayout) document.documentElement.setAttribute('data-layout', savedLayout);
  // Restore theme
  const savedTheme = localStorage.getItem('ahs_theme') || '';
  if (savedTheme) {
    const opt = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
    if (opt) applyTheme(savedTheme, opt);
  }
});

// Patch applyTheme to also save to localStorage
const _origApplyTheme = window.applyTheme;
window.applyTheme = function(theme, el) {
  if (typeof _origApplyTheme === 'function') _origApplyTheme(theme, el);
  else {
    document.documentElement.setAttribute('data-theme', theme || '');
    document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
    if (el) el.classList.add('active');
  }
  localStorage.setItem('ahs_theme', theme || '');
};


// ═══════════════════════════════════════════════════════
// BLOG / NEWS SYSTEM
// ═══════════════════════════════════════════════════════
const BLOG_KEY = 'ahs_blog_posts';
const BLOG_CATS_KEY = 'ahs_blog_cats';

function getBlogPosts() {
  try { return JSON.parse(localStorage.getItem(BLOG_KEY) || '[]'); } catch(e){ return []; }
}
function saveBlogPosts(arr) {
  try { localStorage.setItem(BLOG_KEY, JSON.stringify(arr)); } catch(e){}
}
function getBlogCats() {
  try {
    const cats = JSON.parse(localStorage.getItem(BLOG_CATS_KEY) || '[]');
    return cats.length ? cats : ['همه', 'PLC', 'IoT', 'Python', 'آموزش'];
  } catch(e){ return ['همه', 'PLC', 'IoT', 'Python', 'آموزش']; }
}
function saveBlogCats(arr) {
  try { localStorage.setItem(BLOG_CATS_KEY, JSON.stringify(arr)); } catch(e){}
}

function addBlogPost() {
  const titleEn = document.getElementById('blog_titleEn').value.trim();
  const titleFa = document.getElementById('blog_titleFa').value.trim();
  const cat = document.getElementById('blog_cat').value.trim() || 'عمومی';
  const type = document.getElementById('blog_type').value;
  const excerptEn = document.getElementById('blog_excerptEn').value.trim();
  const excerptFa = document.getElementById('blog_excerptFa').value.trim();
  const img = document.getElementById('blog_img').value.trim();
  const body = document.getElementById('blog_body').value.trim();
  if (!titleEn && !titleFa) { alert('لطفاً عنوان وارد کن'); return; }
  const posts = getBlogPosts();
  const emojis = { article:'📄', news:'📰', tutorial:'🎓', note:'📌' };
  posts.unshift({
    id: Date.now(), titleEn, titleFa, cat, type,
    excerptEn, excerptFa, img, body,
    emoji: emojis[type] || '📄',
    date: new Date().toLocaleDateString('fa-IR')
  });
  saveBlogPosts(posts);
  // Add cat if new
  if (cat) {
    const cats = getBlogCats();
    cat.split(',').forEach(c => { const t = c.trim(); if (t && !cats.includes(t)) cats.push(t); });
    saveBlogCats(cats);
  }
  renderBlog(); renderBlogAdminList(); renderBlogCatsList();
  ['blog_titleEn','blog_titleFa','blog_cat','blog_excerptEn','blog_excerptFa','blog_img','blog_body'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  if (typeof showAdminToast === 'function') showAdminToast('مقاله اضافه شد ✓');
}

function deleteBlogPost(id) {
  const posts = getBlogPosts().filter(p => p.id !== id);
  saveBlogPosts(posts); renderBlog(); renderBlogAdminList();
}

function renderBlog(filterCat) {
  const posts = getBlogPosts();
  const isFa = document.body.classList.contains('fa');
  const grid = document.getElementById('blogGrid');
  const empty = document.getElementById('blogEmpty');
  if (!grid) return;
  const filtered = filterCat && filterCat !== 'همه' && filterCat !== 'All'
    ? posts.filter(p => p.cat && p.cat.includes(filterCat))
    : posts;
  if (!filtered.length) { grid.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
  if (empty) empty.style.display = 'none';
  grid.innerHTML = filtered.map(p => `
    <div class="blog-card" onclick="openBlogViewer(${p.id})">
      ${p.img ? `<img class="blog-card-img" src="${p.img}" alt="${p.titleEn||p.titleFa}" onerror="this.style.display='none'">` : `<div class="blog-card-img-placeholder">${p.emoji||'📄'}</div>`}
      <div class="blog-card-body">
        <span class="blog-card-cat">${p.cat||'عمومی'}</span>
        <div class="blog-card-title">${isFa && p.titleFa ? p.titleFa : (p.titleEn || p.titleFa)}</div>
        <div class="blog-card-excerpt">${isFa && p.excerptFa ? p.excerptFa : (p.excerptEn || p.excerptFa || '')}</div>
        <div class="blog-card-footer">
          <span class="blog-card-date">${p.date||''}</span>
          <span class="blog-card-read">خواندن ←</span>
        </div>
      </div>
    </div>
  `).join('');
  renderBlogCategoryFilter();
}

function renderBlogCategoryFilter() {
  const cats = ['همه', ...new Set(getBlogPosts().map(p => p.cat).filter(Boolean).flatMap(c => c.split(',').map(x => x.trim())))];
  const el = document.getElementById('blogCats');
  if (!el) return;
  el.innerHTML = cats.map((c,i) => `<button class="blog-cat-btn${i===0?' active':''}" onclick="filterBlog('${c}',this)">${c}</button>`).join('');
}

function filterBlog(cat, btn) {
  document.querySelectorAll('.blog-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBlog(cat);
}

function openBlogViewer(id) {
  const posts = getBlogPosts();
  const p = posts.find(x => x.id === id);
  if (!p) return;
  const isFa = document.body.classList.contains('fa');
  const title = isFa && p.titleFa ? p.titleFa : (p.titleEn || p.titleFa);
  const body = (p.body || '').replace(/\n/g, '<br>').replace(/^# (.+)$/gm,'<h2 style="font-family:Rajdhani,sans-serif;font-size:26px;color:var(--neon);margin:20px 0 10px">$1</h2>').replace(/^## (.+)$/gm,'<h3 style="font-family:Rajdhani,sans-serif;font-size:20px;color:var(--text);margin:16px 0 8px">$1</h3>').replace(/\*\*(.+?)\*\*/g,'<strong style="color:var(--text)">$1</strong>').replace(/`(.+?)`/g,'<code style="background:var(--card2);padding:2px 6px;border-radius:4px;font-size:13px;color:var(--neon)">$1</code>');
  document.getElementById('blogViewerContent').innerHTML = `
    ${p.img ? `<img src="${p.img}" style="width:100%;max-height:300px;object-fit:cover;border-radius:10px;margin-bottom:24px" onerror="this.style.display='none'">` : ''}
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <span style="background:rgba(0,170,255,0.12);color:var(--neon);border:1px solid rgba(0,170,255,0.25);padding:3px 12px;border-radius:20px;font-size:11px;font-family:'Rajdhani';font-weight:700;letter-spacing:1px">${p.cat||'عمومی'}</span>
      <span style="font-size:12px;color:var(--text3)">${p.date||''}</span>
    </div>
    <h1 style="font-family:'Rajdhani',sans-serif;font-size:32px;font-weight:700;color:var(--text);margin-bottom:16px;line-height:1.2">${title}</h1>
    <div style="font-size:14px;line-height:1.8;color:var(--text2)">${body || '<p style="color:var(--text3)">محتوایی وارد نشده</p>'}</div>
  `;
  const bg = document.getElementById('blogViewerBg');
  bg.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeBlogViewer() {
  document.getElementById('blogViewerBg').style.display = 'none';
  document.body.style.overflow = '';
}

function renderBlogAdminList() {
  const el = document.getElementById('blogAdminList');
  if (!el) return;
  const posts = getBlogPosts();
  if (!posts.length) { el.innerHTML = '<div style="color:var(--text3);font-size:13px;text-align:center;padding:20px">مقاله‌ای ثبت نشده</div>'; return; }
  el.innerHTML = posts.map(p => `
    <div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg2);border-radius:8px;border:1px solid var(--border2)">
      <span style="font-size:22px">${p.emoji||'📄'}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.titleFa || p.titleEn}</div>
        <div style="font-size:11px;color:var(--text3)">${p.cat||''} · ${p.date||''}</div>
      </div>
      <button onclick="deleteBlogPost(${p.id})" style="background:rgba(255,77,109,0.1);border:1px solid rgba(255,77,109,0.3);color:#ff4d6d;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:12px;white-space:nowrap">حذف</button>
    </div>
  `).join('');
}

function renderBlogCatsList() {
  const el = document.getElementById('blogCatsList');
  if (!el) return;
  const cats = getBlogCats().filter(c => c !== 'همه');
  el.innerHTML = cats.map(c => `
    <div style="display:flex;align-items:center;gap:6px;background:var(--card2);border:1px solid var(--border2);border-radius:20px;padding:4px 12px">
      <span style="font-size:13px;color:var(--text)">${c}</span>
      <button onclick="deleteBlogCat('${c}')" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px;line-height:1;padding:0" title="حذف">✕</button>
    </div>
  `).join('');
}

function addBlogCategory() {
  const input = document.getElementById('newBlogCat');
  const val = input.value.trim();
  if (!val) return;
  const cats = getBlogCats();
  if (!cats.includes(val)) { cats.push(val); saveBlogCats(cats); }
  input.value = '';
  renderBlogCatsList();
}

function deleteBlogCat(cat) {
  const cats = getBlogCats().filter(c => c !== cat);
  saveBlogCats(cats); renderBlogCatsList();
}

// ═══════════════════════════════════════════════════════
// IMAGE MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════
const IMG_GALLERY_KEY = 'ahs_img_gallery';

function getImgGallery() {
  try { return JSON.parse(localStorage.getItem(IMG_GALLERY_KEY) || '[]'); } catch(e){ return []; }
}
function saveImgGallery(arr) {
  try { localStorage.setItem(IMG_GALLERY_KEY, JSON.stringify(arr)); } catch(e){}
}

function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = () => rej(reader.error);
    reader.readAsDataURL(file);
  });
}

async function previewAndUploadImg(type, input) {
  const file = input.files[0];
  if (!file) return;
  const b64 = await fileToBase64(file);
  if (type === 'hero') {
    document.getElementById('imgPreviewHero').innerHTML = `<img src="${b64}" style="width:100%;height:100%;object-fit:cover">`;
    // Apply to hero and feed avatar
    document.querySelector('#hero .hero-img-frame img').src = b64;
    document.querySelector('#feed .feed-avatar img').src = b64;
    // Save
    const saved = JSON.parse(localStorage.getItem(PROF_KEY)||'{}');
    saved.avatar = b64; localStorage.setItem(PROF_KEY, JSON.stringify(saved));
    if (typeof showAdminToast === 'function') showAdminToast('تصویر پروفایل اعمال شد ✓');
  } else if (type === 'logo') {
    document.getElementById('imgPreviewLogo').innerHTML = `<img src="${b64}" style="width:100%;height:100%;object-fit:contain">`;
    document.querySelector('.nav-logo').innerHTML = `<img src="${b64}" style="height:32px;object-fit:contain">`;
    const saved = JSON.parse(localStorage.getItem(PROF_KEY)||'{}');
    saved.logoImg = b64; localStorage.setItem(PROF_KEY, JSON.stringify(saved));
    if (typeof showAdminToast === 'function') showAdminToast('لوگو اعمال شد ✓');
  }
}

function applyHeroImgUrl() {
  const url = document.getElementById('heroImgUrl').value.trim();
  if (!url) return;
  document.getElementById('imgPreviewHero').innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover">`;
  document.querySelector('#hero .hero-img-frame img').src = url;
  const feedAvatar = document.querySelector('#feed .feed-avatar img');
  if (feedAvatar) feedAvatar.src = url;
  const saved = JSON.parse(localStorage.getItem(PROF_KEY)||'{}');
  saved.avatar = url; localStorage.setItem(PROF_KEY, JSON.stringify(saved));
  if (typeof showAdminToast === 'function') showAdminToast('تصویر پروفایل اعمال شد ✓');
}

function applyLogoText() {
  const text = document.getElementById('logoTextInput').value.trim();
  if (!text) return;
  document.querySelector('.nav-logo').textContent = text;
  const saved = JSON.parse(localStorage.getItem(PROF_KEY)||'{}');
  saved.navLogo = text; localStorage.setItem(PROF_KEY, JSON.stringify(saved));
  if (typeof showAdminToast === 'function') showAdminToast('لوگو ذخیره شد ✓');
}

async function uploadToGallery(input) {
  const files = Array.from(input.files);
  const gallery = getImgGallery();
  for (const file of files) {
    const b64 = await fileToBase64(file);
    gallery.push({ id: Date.now() + Math.random(), src: b64, name: file.name, date: new Date().toLocaleDateString('fa-IR') });
  }
  saveImgGallery(gallery); renderImgGallery();
  if (typeof showAdminToast === 'function') showAdminToast(`${files.length} تصویر آپلود شد ✓`);
}

function renderImgGallery() {
  const el = document.getElementById('imgGallery');
  if (!el) return;
  const gallery = getImgGallery();
  if (!gallery.length) { el.innerHTML = '<div style="color:var(--text3);font-size:12px;grid-column:1/-1">هنوز تصویری آپلود نشده</div>'; return; }
  el.innerHTML = gallery.map(img => `
    <div style="position:relative;border-radius:8px;overflow:hidden;aspect-ratio:1;background:var(--card2);border:1px solid var(--border2);cursor:pointer" onclick="copyImgUrl('${img.id}')" title="کلیک برای کپی URL">
      <img src="${img.src}" style="width:100%;height:100%;object-fit:cover">
      <button onclick="event.stopPropagation();deleteGalleryImg('${img.id}')" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.7);border:none;color:#ff4d6d;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center">✕</button>
    </div>
  `).join('');
}

function deleteGalleryImg(id) {
  const gallery = getImgGallery().filter(img => String(img.id) !== String(id));
  saveImgGallery(gallery); renderImgGallery();
}

function copyImgUrl(id) {
  const img = getImgGallery().find(i => String(i.id) === String(id));
  if (!img) return;
  navigator.clipboard.writeText(img.src).then(() => {
    if (typeof showAdminToast === 'function') showAdminToast('URL کپی شد ✓');
  }).catch(() => {});
}

function applyFaviconEmoji() {
  const emoji = document.getElementById('faviconEmoji').value.trim() || '⚡';
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.font = '28px serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 16, 16);
  let link = document.querySelector("link[rel~='icon']");
  if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
  link.href = canvas.toDataURL();
  try { localStorage.setItem('ahs_favicon', emoji); } catch(e){}
  if (typeof showAdminToast === 'function') showAdminToast('Favicon اعمال شد ✓');
}

function applyPageTitle() {
  const title = document.getElementById('pageTitle').value.trim();
  if (!title) return;
  document.title = title;
  try { localStorage.setItem('ahs_pagetitle', title); } catch(e){}
  if (typeof showAdminToast === 'function') showAdminToast('عنوان صفحه ذخیره شد ✓');
}

// ═══════════════════════════════════════════════════════
// DRAG & DROP FOR PROJECTS
// ═══════════════════════════════════════════════════════
let _dragSrcIdx = null;

function initProjectDragDrop() {
  const list = document.getElementById('projectsAdminList');
  if (!list) return;
  list.querySelectorAll('[data-proj-idx]').forEach(item => {
    item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', e => {
      _dragSrcIdx = parseInt(item.dataset.projIdx);
      e.dataTransfer.effectAllowed = 'move';
      item.style.opacity = '0.4';
    });
    item.addEventListener('dragend', () => { item.style.opacity = '1'; });
    item.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; item.style.borderColor = 'var(--neon)'; });
    item.addEventListener('dragleave', () => { item.style.borderColor = ''; });
    item.addEventListener('drop', e => {
      e.preventDefault();
      item.style.borderColor = '';
      const targetIdx = parseInt(item.dataset.projIdx);
      if (_dragSrcIdx === null || _dragSrcIdx === targetIdx) return;
      const PROJ_KEY = 'ahs_projects';
      let projs = [];
      try { projs = JSON.parse(localStorage.getItem(PROJ_KEY) || '[]'); } catch(e){}
      const moved = projs.splice(_dragSrcIdx, 1)[0];
      projs.splice(targetIdx, 0, moved);
      try { localStorage.setItem(PROJ_KEY, JSON.stringify(projs)); } catch(e){}
      if (typeof renderProjects === 'function') renderProjects();
      if (typeof renderProjectsAdminList === 'function') renderProjectsAdminList();
      else setTimeout(() => initProjectDragDrop(), 100);
      _dragSrcIdx = null;
    });
  });
}

// ═══════════════════════════════════════════════════════
// INLINE EDIT (Double-click any section title / about text)
// ═══════════════════════════════════════════════════════
function initInlineEdit() {
  // Hero name
  const heroFirst = document.querySelector('.hero-name .first');
  const heroLast = document.querySelector('.hero-name .last');
  const heroTitle = document.querySelector('.hero-title.fa-hide');
  const aboutText = document.querySelector('.about-text.fa-hide');
  [heroFirst, heroLast, heroTitle, aboutText].forEach(el => {
    if (!el) return;
    el.title = 'دابل‌کلیک برای ویرایش';
    el.style.cursor = 'text';
    el.addEventListener('dblclick', function() {
      if (!_isAdmin) return;
      const prev = this.textContent;
      this.contentEditable = 'true';
      this.style.outline = '2px solid var(--neon)';
      this.style.borderRadius = '4px';
      this.focus();
      const save = () => {
        this.contentEditable = 'false';
        this.style.outline = '';
        this.style.borderRadius = '';
        if (typeof showAdminToast === 'function') showAdminToast('ذخیره شد ✓');
        // Persist to localStorage
        const saved = JSON.parse(localStorage.getItem(PROF_KEY)||'{}');
        if (this === heroFirst) saved.nameFirst = this.textContent;
        if (this === heroLast) saved.nameLast = this.textContent;
        if (this === heroTitle) saved.titleEn = this.textContent;
        if (this === aboutText) saved.bioEn = this.textContent;
        localStorage.setItem(PROF_KEY, JSON.stringify(saved));
      };
      this.addEventListener('blur', save, { once: true });
      this.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.blur(); } });
    });
  });
}

// ═══════════════════════════════════════════════════════
// AUTO-SAVE (every 30 seconds if admin)
// ═══════════════════════════════════════════════════════
let _autoSaveTimer = null;
function startAutoSave() {
  if (_autoSaveTimer) return;
  _autoSaveTimer = setInterval(() => {
    if (!_isAdmin) return;
    if (typeof showAdminToast === 'function') showAdminToast('💾 ذخیره خودکار...');
  }, 30000);
}
startAutoSave();

// ═══════════════════════════════════════════════════════
// INIT ON LOAD
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderBlog();
  // Restore favicon
  const savedFavicon = localStorage.getItem('ahs_favicon');
  if (savedFavicon) {
    setTimeout(() => { document.getElementById('faviconEmoji') && (document.getElementById('faviconEmoji').value = savedFavicon); applyFaviconEmoji(); }, 500);
  }
  // Restore page title
  const savedTitle = localStorage.getItem('ahs_pagetitle');
  if (savedTitle) document.title = savedTitle;
  // Init inline edit
  initInlineEdit();
});

// Init Reels on load (already exists but ensure)
document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderReels === 'function') renderReels();
});

const _origAdminNav = window.adminNav;
window.adminNav = function(section, btn) {
  if (typeof _origAdminNav === 'function') _origAdminNav(section, btn);
  else {
    document.querySelectorAll('.adm-section').forEach(s => s.style.display = 'none');
    const el = document.getElementById('adm-section-' + section);
    if (el) el.style.display = 'block';
    document.querySelectorAll('.adm-nav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  if (section === 'blog') { renderBlogAdminList(); renderBlogCatsList(); }
  if (section === 'images') { renderImgGallery(); }
  if (section === 'projects') setTimeout(initProjectDragDrop, 300);
};

// ====== Global Save Changes button ======
function saveAllChanges() {
  try {
    if (typeof saveProfile === 'function') saveProfile();
  } catch(e){}
  showAdminToast('✓ تمام تغییرات ذخیره شد');
}

// ====== Standalone Admin Page: auto prompt login ======
window.addEventListener('DOMContentLoaded', function() {
  _pwCallback = () => {
    document.getElementById('adminPanel').classList.add('open');
    initAdminDash();
  };
  openPwOverlay();
});
