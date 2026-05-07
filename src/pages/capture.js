// ===== ETAPA 1: PÁGINA DE CAPTURA =====
import icons from '../icons.js';
import { navigate, setLeadData, renderStepIndicator } from '../router.js';

export function render(app) {
  app.innerHTML = `
    <!-- NAVBAR -->
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="#/" class="nav-logo">J<span>Liga</span></a>
        <div class="nav-links" id="navLinks">
          <a href="#beneficios-section">Benefícios</a>
          <a href="#como-funciona-section">Como Funciona</a>
          <a href="#depoimentos-section">Depoimentos</a>
          <a href="#inscricao-section" class="nav-cta">Inscreva-se</a>
        </div>
        <button class="nav-mobile-btn" id="navMobileBtn" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero" id="hero">
      <div class="hero-bg">
        <img src="/hero-bg.png" alt="Liga esportiva profissional" loading="eager" />
      </div>
      <div class="hero-glow"></div>
      <div class="container">
        <span class="section-badge">Mini-Curso Gratuito</span>
        <h1>
          <span class="line">Aprenda a captar</span>
          <span class="line"><span class="gradient-text">patrocínio e verba pública</span></span>
          <span class="line">para sua liga</span>
        </h1>
        <p class="subtitle">
          Aula gratuita de 25 minutos + kit de materiais prontos para você
          profissionalizar a gestão e o financiamento da sua liga esportiva.
        </p>
        <a href="#inscricao-section" class="btn-primary" id="heroCta">
          Quero assistir a aula grátis ${icons.arrow}
        </a>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="number" data-target="2300">0</div>
            <div class="label">Presidentes cadastrados</div>
          </div>
          <div class="hero-stat">
            <div class="number" data-target="850">0</div>
            <div class="label">Ligas atendidas</div>
          </div>
          <div class="hero-stat">
            <div class="number" data-target="27">0</div>
            <div class="label">Estados</div>
          </div>
          <div class="hero-stat">
            <div class="number" data-target="15">0</div>
            <div class="label">Milhões captados</div>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS -->
    <section class="benefits" id="beneficios-section">
      <div class="container">
        <div style="text-align:center">
          <span class="section-badge">O que você vai aprender</span>
        </div>
        <h2>Tudo que um presidente de liga precisa saber sobre <span class="gradient-text">captação de recursos</span></h2>
        <div class="benefits-grid">
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.dollarSign}</div>
            <h3>Captação de Patrocínio</h3>
            <p>Como montar propostas comerciais irresistíveis e fechar contratos com empresas locais e nacionais.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.shield}</div>
            <h3>Verba Pública</h3>
            <p>O passo a passo para acessar editais, leis de incentivo e programas governamentais de fomento ao esporte.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.settings}</div>
            <h3>Gestão Profissional</h3>
            <p>Ferramentas e processos para transformar sua liga amadora em uma operação profissional e escalável.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.ranking}</div>
            <h3>Ranking e Credibilidade</h3>
            <p>Como um sistema de ranking eleva a credibilidade da liga e atrai mais atletas e patrocinadores.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.globe}</div>
            <h3>Visibilidade Digital</h3>
            <p>Estratégias de transmissão ao vivo e redes sociais para multiplicar o alcance dos seus eventos.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.barChart}</div>
            <h3>Relatórios para Prestação de Contas</h3>
            <p>Gere relatórios profissionais automaticamente para patrocinadores e órgãos públicos.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how-it-works" id="como-funciona-section">
      <div class="container">
        <div style="text-align:center">
          <span class="section-badge">Como funciona</span>
        </div>
        <h2>Seu caminho para <span class="gradient-text">profissionalizar sua liga</span></h2>
        <div class="timeline">
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 1</div>
            <h3>Cadastre-se gratuitamente</h3>
            <p>Preencha o formulário abaixo com seus dados. Leva menos de 1 minuto.</p>
          </div>
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 2</div>
            <h3>Assista a aula exclusiva</h3>
            <p>25 minutos de conteúdo real sobre captação de patrocínio e verba pública para ligas.</p>
          </div>
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 3</div>
            <h3>Baixe o Kit Completo</h3>
            <p>3 materiais prontos: modelo de projeto, guia de verba pública e checklist de gestão.</p>
          </div>
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 4</div>
            <h3>Conheça a solução</h3>
            <p>Descubra como automatizar tudo isso com a plataforma JLiga.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <section class="social-proof" id="depoimentos-section">
      <div class="container">
        <div style="text-align:center">
          <span class="section-badge">Quem já participou</span>
        </div>
        <h2>O que dizem os <span class="gradient-text">presidentes de liga</span></h2>
        <div class="testimonials-grid">
          <div class="testimonial-card reveal">
            <div class="testimonial-stars">★★★★★</div>
            <blockquote>"Depois da aula, consegui captar R$ 45 mil em patrocínio para nossa liga regional. O material é muito prático e direto ao ponto."</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">MR</div>
              <div>
                <div class="testimonial-name">Marcos Ribeiro</div>
                <div class="testimonial-role">Presidente · Liga de Jiu-Jitsu do Paraná</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card reveal">
            <div class="testimonial-stars">★★★★★</div>
            <blockquote>"O guia de verba pública me abriu os olhos. Não sabia que existiam tantos editais disponíveis. Já submeti 3 projetos."</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">PS</div>
              <div>
                <div class="testimonial-name">Patricia Santos</div>
                <div class="testimonial-role">Presidente · Liga de Judô de Goiás</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card reveal">
            <div class="testimonial-stars">★★★★★</div>
            <blockquote>"Nossa liga tinha 200 atletas e zero patrocínio. Hoje temos 3 patrocinadores fixos e gestão 100% digital. Transformou nosso esporte."</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">CF</div>
              <div>
                <div class="testimonial-name">Carlos Ferreira</div>
                <div class="testimonial-role">Presidente · Liga MMA do Ceará</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CAPTURE FORM -->
    <section class="capture" id="inscricao-section">
      <div class="capture-glow"></div>
      <div class="container">
        <div class="capture-inner">
          <span class="section-badge">Acesso Gratuito</span>
          <h2>Comece agora o <span class="gradient-text">Mini-Curso Gratuito</span></h2>
          <p class="capture-sub">Preencha seus dados e acesse imediatamente a aula + kit de materiais.</p>
          
          <form class="capture-form" id="captureForm">
            <div class="form-row">
              <div class="form-group">
                <label for="nome">Seu nome</label>
                <input type="text" id="nome" name="nome" placeholder="Nome completo" required />
              </div>
              <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" placeholder="seu@email.com" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="telefone">WhatsApp</label>
                <input type="tel" id="telefone" name="telefone" placeholder="(11) 99999-9999" required />
              </div>
              <div class="form-group">
                <label for="liga">Nome da sua Liga</label>
                <input type="text" id="liga" name="liga" placeholder="Ex: Liga de Jiu-Jitsu do Paraná" required />
              </div>
            </div>
            <div class="form-group">
              <label for="estado">Estado</label>
              <select id="estado" name="estado" required>
                <option value="" disabled selected>Selecione seu estado</option>
                <option>Acre</option><option>Alagoas</option><option>Amapá</option>
                <option>Amazonas</option><option>Bahia</option><option>Ceará</option>
                <option>Distrito Federal</option><option>Espírito Santo</option><option>Goiás</option>
                <option>Maranhão</option><option>Mato Grosso</option><option>Mato Grosso do Sul</option>
                <option>Minas Gerais</option><option>Pará</option><option>Paraíba</option>
                <option>Paraná</option><option>Pernambuco</option><option>Piauí</option>
                <option>Rio de Janeiro</option><option>Rio Grande do Norte</option><option>Rio Grande do Sul</option>
                <option>Rondônia</option><option>Roraima</option><option>Santa Catarina</option>
                <option>São Paulo</option><option>Sergipe</option><option>Tocantins</option>
              </select>
            </div>
            <button type="submit" class="btn-primary" id="submitBtn">
              Acessar aula gratuita ${icons.arrow}
            </button>
            <p class="form-disclaimer">
              🔒 Seus dados estão seguros. Não enviamos spam.
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- URGENCY BAR -->
    <div class="urgency-bar">
      🔥 Mais de <span id="vagasCount">2.347</span> presidentes já assistiram — Acesse agora gratuitamente!
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <p>© 2026 <a href="#/">JLiga</a> — Todos os direitos reservados.</p>
      </div>
    </footer>
  `;
}

export function init() {
  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mobile menu
  const mobileBtn = document.getElementById('navMobileBtn');
  const navLinks = document.getElementById('navLinks');
  mobileBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('[data-target]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 2000;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const suffix = target >= 1000 ? '+' : target === 15 ? 'M+' : '';
        el.textContent = Math.floor(eased * target).toLocaleString('pt-BR') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  // Phone mask
  const phoneInput = document.getElementById('telefone');
  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    e.target.value = v;
  });

  // Form submit
  const form = document.getElementById('captureForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<span class="spinner"></span>';

    const data = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      liga: document.getElementById('liga').value,
      estado: document.getElementById('estado').value,
      registeredAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setLeadData(data);
      navigate('/aula');
    }, 1200);
  });
}
