// Halit Portfolio - Interactive Logic & Security Effects

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. PARTICLES & NETWORK NODES CANVAS
  initCanvas();

  // 2. TEXT SCRAMBLE / DECODE EFFECT
  initScrambleEffect();

  // 3. PROJECT FILTERING
  initProjectFilters();

  // 4. INTERACTIVE CLI TERMINAL
  initTerminal();

  // 5. COPY CONTACT & TOAST
  initCopyContact();

  // 6. KEYBOARD SHORTCUTS
  initShortcuts();
});

/* =========================================================
   1. CANVAS NETWORK NODES (Cyber Defense Mesh)
   ========================================================= */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.floor(Math.min(width, 1400) / 28);
  const nodes = [];
  const mouse = { x: -1000, y: -1000, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.6 + 1,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Mouse gentle repulsion / interaction
      const dxMouse = mouse.x - node.x;
      const dyMouse = mouse.y - node.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < mouse.radius) {
        const angle = Math.atan2(dyMouse, dxMouse);
        const force = (mouse.radius - distMouse) / mouse.radius;
        node.x -= Math.cos(angle) * force * 1.5;
        node.y -= Math.sin(angle) * force * 1.5;
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.fill();

      // Connect nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          const alpha = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* =========================================================
   2. HACKER SCRAMBLE / DECODE EFFECT
   ========================================================= */
function initScrambleEffect() {
  const chars = '!<>-_\\/[]{}—=+*^?#________0101';
  const elements = document.querySelectorAll('.decode-scramble');

  elements.forEach((el) => {
    const originalText = el.getAttribute('data-original') || el.innerText;
    
    function scramble() {
      let iteration = 0;
      clearInterval(el.scrambleInterval);

      el.scrambleInterval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(el.scrambleInterval);
        }

        iteration += 1 / 2.5;
      }, 30);
    }

    el.addEventListener('mouseenter', scramble);
    // Initial reveal
    setTimeout(scramble, 300);
  });
}

/* =========================================================
   3. PROJECT FILTERING
   ========================================================= */
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      buttons.forEach((b) => {
        b.classList.remove('active', 'bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/30');
        b.classList.add('text-slate-400');
      });

      btn.classList.add('active', 'bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/30');
      btn.classList.remove('text-slate-400');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =========================================================
   4. INTERACTIVE CLI TERMINAL MODAL
   ========================================================= */
function initTerminal() {
  const modal = document.getElementById('terminal-modal');
  const openBtn = document.getElementById('open-terminal-btn');
  const heroBtn = document.getElementById('hero-terminal-btn');
  const closeBtn = document.getElementById('close-terminal-btn');
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');

  function openTerminal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    input.focus();
  }

  function closeTerminal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (openBtn) openBtn.addEventListener('click', openTerminal);
  if (heroBtn) heroBtn.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Terminal commands handling
  const commands = {
    help: () => `
<div class="text-emerald-400 font-bold mb-1">Comandos disponibles:</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300">
  <div><span class="text-cyan-400">whoami</span> - Conoce a Halit y su perfil académico</div>
  <div><span class="text-cyan-400">carrera</span> - Información de la universidad y metas</div>
  <div><span class="text-cyan-400">skills</span> - Lenguajes y arsenal de seguridad</div>
  <div><span class="text-cyan-400">projects</span> - Proyectos y sistemas creados</div>
  <div><span class="text-cyan-400">audit</span> - Simulación de auditoría de seguridad</div>
  <div><span class="text-cyan-400">matrix</span> - Efecto visual tipo lluvia de código</div>
  <div><span class="text-cyan-400">cat flag.txt</span> - Bandera oculta de CTF</div>
  <div><span class="text-cyan-400">contact</span> - Canales directos de contacto</div>
  <div><span class="text-cyan-400">clear</span> - Limpiar la pantalla</div>
  <div><span class="text-cyan-400">exit</span> - Cerrar la terminal</div>
</div>`,

    whoami: () => `
<div class="text-slate-200 space-y-1">
  <div><span class="text-emerald-400 font-bold">Halit</span> — Estudiante de Ingeniería en Sistemas (1er Semestre).</div>
  <div>Enfoque: Ciberseguridad ofensiva/defensiva, análisis de redes y programación segura.</div>
  <div>Tecnologías principales: Python, TypeScript, JavaScript y Bash en entornos Linux.</div>
  <div>GitHub: <a href="https://github.com/Jalinho04" target="_blank" class="text-cyan-400 underline">https://github.com/Jalinho04</a></div>
</div>`,

    carrera: () => `
<div class="text-slate-200 space-y-1">
  <div class="text-cyan-400 font-bold">[+] Información Académica:</div>
  <div>• Programa: Ingeniería en Sistemas</div>
  <div>• Nivel: Cursando 1er Semestre</div>
  <div>• Pasión: Ciberseguridad, análisis de vulnerabilidades y arquitectura de software.</div>
</div>`,

    skills: () => `
<div class="text-slate-200 space-y-1">
  <div><span class="text-emerald-400 font-bold">Lenguajes:</span> Python (FastAPI, Scapy, AsyncIO), JavaScript (ESNext), TypeScript, Bash.</div>
  <div><span class="text-cyan-400 font-bold">Ciberseguridad:</span> OWASP Top 10, Análisis de Tráfico de Red, Criptografía (AES, Argon2), Hacking Ético.</div>
  <div><span class="text-purple-400 font-bold">Herramientas:</span> Linux (Debian/Kali), Wireshark, Docker, Nmap, Git, VS Code.</div>
</div>`,

    projects: () => `
<div class="text-slate-200 space-y-1">
  <div>1. <span class="text-emerald-400 font-bold">Cerberus Threat Sentinel</span> (Python, Telemetría de Red y Detección de Anomalías)</div>
  <div>2. <span class="text-cyan-400 font-bold">AegisGate WAF</span> (TypeScript, Firewall de Aplicaciones Web & Rate Limiter)</div>
  <div>3. <span class="text-purple-400 font-bold">VoidPulse Recon CLI</span> (Python AsyncIO, Reconocimiento y Auditoría DNS)</div>
  <div>4. <span class="text-emerald-400 font-bold">CipherVault</span> (TypeScript, Almacén Criptográfico de Conocimiento Cero)</div>
</div>`,

    audit: () => `
<div class="text-slate-200 space-y-1">
  <div class="text-cyan-400 font-bold">[+] Iniciando auditoría de seguridad del sistema...</div>
  <div class="text-emerald-400">✔ Protocolos de cifrado: Configuración segura verificada</div>
  <div class="text-emerald-400">✔ Cabeceras de protección: Content-Security-Policy activado</div>
  <div class="text-emerald-400">✔ Mitigación de inyecciones y XSS: Reglas aplicadas</div>
  <div class="text-emerald-400">✔ Puertos y servicios: 0 accesos no autorizados expuestos</div>
  <div class="text-emerald-300 font-bold mt-1">Calificación de Seguridad: 100/100 (Blindado)</div>
</div>`,

    'cat flag.txt': () => `
<div class="text-amber-400 font-mono">
  FLAG{h4l1t_estudiante_ing_sistemas_ciberseguridad_2026}
  <div class="text-slate-400 text-[10px]">¡Excelente! Has capturado la bandera oculta del sistema.</div>
</div>`,

    'cat secret': () => `
<div class="text-rose-400 font-mono">
  [ACCESO RESTRINGIDO]: "La curiosidad y la disciplina en los primeros semestres forjan a los grandes ingenieros."
</div>`,

    matrix: () => {
      setTimeout(runMatrixRain, 100);
      return `<div class="text-emerald-400">Iniciando protocolo Matrix... presiona cualquier tecla para continuar.</div>`;
    },

    contact: () => `
<div class="text-slate-200 space-y-1">
  <div>Perfil en GitHub: <a href="https://github.com/Jalinho04" target="_blank" class="text-cyan-400 underline">https://github.com/Jalinho04</a></div>
  <div class="text-emerald-400">¡Abierto a colaborar en proyectos universitarios, laboratorios y desarrollo seguro!</div>
</div>`,

    clear: () => {
      history.innerHTML = '';
      return '';
    },

    exit: () => {
      closeTerminal();
      return '';
    },
    close: () => {
      closeTerminal();
      return '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawVal = input.value.trim();
      const val = rawVal.toLowerCase();

      // Echo command
      const cmdEcho = document.createElement('div');
      cmdEcho.className = 'flex items-center gap-2 text-slate-400';
      cmdEcho.innerHTML = `<span class="text-emerald-400 font-bold">halit@sec:~$</span> <span>${escapeHtml(rawVal)}</span>`;
      history.appendChild(cmdEcho);

      input.value = '';

      if (val) {
        const responseDiv = document.createElement('div');
        responseDiv.className = 'mt-1 mb-2';

        if (commands[val]) {
          const res = commands[val]();
          if (res) responseDiv.innerHTML = res;
        } else {
          responseDiv.innerHTML = `<span class="text-rose-400">Comando no reconocido: '${escapeHtml(val)}'. Escribe <strong class="text-emerald-300">help</strong> para ver la lista.</span>`;
        }

        if (val !== 'clear') {
          history.appendChild(responseDiv);
        }
      }

      history.scrollTop = history.scrollHeight;
    }
  });

  function runMatrixRain() {
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*';
    let count = 0;
    const interval = setInterval(() => {
      const line = document.createElement('div');
      line.className = 'text-emerald-500 font-mono text-[11px]';
      let str = '';
      for (let i = 0; i < 40; i++) {
        str += chars[Math.floor(Math.random() * chars.length)] + ' ';
      }
      line.innerText = str;
      history.appendChild(line);
      history.scrollTop = history.scrollHeight;
      count++;
      if (count > 18) {
        clearInterval(interval);
        const endLine = document.createElement('div');
        endLine.className = 'text-cyan-400 mt-2 font-bold';
        endLine.innerText = '[✓] Conexión Matrix finalizada.';
        history.appendChild(endLine);
        history.scrollTop = history.scrollHeight;
      }
    }, 60);
  }
}

/* =========================================================
   5. COPY CONTACT & TOAST NOTIFICATION
   ========================================================= */
function initCopyContact() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const contactData = 'https://github.com/Jalinho04';
    navigator.clipboard.writeText(contactData).then(() => {
      showToast('Enlace de GitHub copiado al portapapeles');
      if (copyText) {
        const original = copyText.innerText;
        copyText.innerText = '¡Copiado!';
        setTimeout(() => {
          copyText.innerText = original;
        }, 2000);
      }
    }).catch(() => {
      showToast('github.com/Jalinho04');
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toastMsg.innerText = msg;
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    }, 3000);
  }
}

/* =========================================================
   6. KEYBOARD SHORTCUTS
   ========================================================= */
function initShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Open terminal with `Ctrl + ~` or backtick `
    if ((e.ctrlKey && e.key === '`') || e.key === '~') {
      const modal = document.getElementById('terminal-modal');
      const input = document.getElementById('terminal-input');
      if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        input.focus();
      } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }
  });
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
