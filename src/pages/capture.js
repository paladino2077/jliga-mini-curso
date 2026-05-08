// ===== ETAPA 1: PÁGINA DE CAPTURA =====
import icons from '../icons.js';
import { navigate, setLeadData, renderStepIndicator } from '../router.js';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

let captcha = generateCaptcha();

export function render(app) {
  captcha = generateCaptcha();

  app.innerHTML = `
    <!-- NAVBAR -->
    <nav class="navbar" id="navbar">
      <div class="container">
        <a href="#/" class="nav-logo"><img src="/logo.png" alt="jliga.club"></a>
        <div class="nav-links" id="navLinks">
          <a href="#beneficios-section">Benefícios</a>
          <a href="#como-funciona-section">Como Funciona</a>
          <a href="#depoimentos-section">Depoimentos</a>
          <a href="#inscricao-section" class="nav-cta">Falar com especialista</a>
        </div>
        <button class="nav-mobile-btn" id="navMobileBtn" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero" id="hero">
      <div class="hero-bg">
        <img src="/hero-bg.png" alt="Gestão esportiva profissional" loading="eager" />
      </div>
      <div class="hero-glow"></div>
      <div class="container">
        <span class="section-badge">Plataforma de gestão esportiva</span>
        <h1>
          <span class="line">Uma plataforma.</span>
          <span class="line"><span class="gradient-text">Controle total</span></span>
          <span class="line">da sua competição.</span>
        </h1>
        <p class="subtitle">
          Inscrições, tabelas, súmula digital, arbitragem e relatórios em um único ambiente.
          Para ligas, federações e clubes que operam — ou desejam operar — com padrão profissional, em qualquer modalidade.
        </p>
        <a href="#inscricao-section" class="btn-primary" id="heroCta">
          Falar com um especialista ${icons.arrow}
        </a>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="number" data-target="2300">0</div>
            <div class="label">Gestores cadastrados</div>
          </div>
          <div class="hero-stat">
            <div class="number" data-target="850">0</div>
            <div class="label">Organizações atendidas</div>
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
          <span class="section-badge">O que a plataforma entrega</span>
        </div>
        <h2>Construída para quem opera ou deseja operar com <span class="gradient-text">padrão profissional</span></h2>
        <div class="benefits-grid">
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.shield}</div>
            <h3>Validação Oficial de Atletas</h3>
            <p>Cada atleta confirmado em tempo real diretamente na Receita Federal. Rastreabilidade total, do cadastro ao campo.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.settings}</div>
            <h3>Gestão completa em um único ambiente</h3>
            <p>Inscrições, tabelas, classificações, súmula digital e arbitragem — tudo integrado, tudo rastreável.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.dollarSign}</div>
            <h3>Dados que viram patrocínio</h3>
            <p>Relatórios estruturados, base de filiados e métricas de competição prontos para apresentar a qualquer parceiro.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.ranking}</div>
            <h3>Conformidade LGPD</h3>
            <p>Dados tratados dentro dos critérios da Lei Geral de Proteção de Dados. Sua organização opera com respaldo jurídico real.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.globe}</div>
            <h3>App personalizado Android e iOS</h3>
            <p>Com a identidade visual da sua organização. Atletas, clubes e parceiros acessam tudo pelo celular.</p>
          </div>
          <div class="benefit-card reveal">
            <div class="benefit-icon">${icons.barChart}</div>
            <h3>Múltiplas modalidades</h3>
            <p>Futebol, futsal, futebol 7, basquete, vôlei, beach tennis, futevôlei, handebol e mais — cada modalidade com sua lógica de tabela e pontuação.</p>
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
        <h2>Seu caminho para <span class="gradient-text">profissionalizar a operação</span></h2>
        <div class="timeline">
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 1</div>
            <h3>Preencha o formulário</h3>
            <p>Conte um pouco sobre sua organização, volume de competição e principais desafios. Leva menos de 2 minutos.</p>
          </div>
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 2</div>
            <h3>Fale com um especialista</h3>
            <p>Um especialista em gestão esportiva analisa o seu caso e entende o momento da sua operação — sem script de venda.</p>
          </div>
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 3</div>
            <h3>Receba uma demonstração</h3>
            <p>Veja a plataforma em uso com dados próximos à sua realidade. Você decide se faz sentido seguir.</p>
          </div>
          <div class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-step">Passo 4</div>
            <h3>Estruture sua competição</h3>
            <p>Operação profissionalizada com governança real, dados auditáveis e respaldo jurídico — em qualquer modalidade.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF -->
    <section class="social-proof" id="depoimentos-section">
      <div class="container">
        <div style="text-align:center">
          <span class="section-badge">Quem já opera com a jliga.club</span>
        </div>
        <h2>O que dizem <span class="gradient-text">gestores esportivos</span></h2>
        <div class="testimonials-grid">
          <div class="testimonial-card reveal">
            <div class="testimonial-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
            <blockquote>"Depois que estruturamos os dados, conseguimos montar a proposta de patrocínio com argumento real. Fechamos R$ 45 mil em 3 meses. Mudou o patamar da nossa federação."</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">MR</div>
              <div>
                <div class="testimonial-name">Marcos Ribeiro</div>
                <div class="testimonial-role">Presidente · Federação Paranaense de Futsal</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card reveal">
            <div class="testimonial-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
            <blockquote>"O acesso a editais de incentivo deixou de ser um problema. Hoje submetemos projetos com relatórios auditáveis e prestação de contas estruturada."</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">PS</div>
              <div>
                <div class="testimonial-name">Patricia Santos</div>
                <div class="testimonial-role">Diretora · Liga Goiana de Vôlei</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card reveal">
            <div class="testimonial-stars">${icons.star}${icons.star}${icons.star}${icons.star}${icons.star}</div>
            <blockquote>"Operávamos com planilhas e WhatsApp. Hoje temos rastreabilidade total, 3 patrocinadores fixos e gestão 100% digital — em todas as modalidades do clube."</blockquote>
            <div class="testimonial-author">
              <div class="testimonial-avatar">CF</div>
              <div>
                <div class="testimonial-name">Carlos Ferreira</div>
                <div class="testimonial-role">Gestor · Clube Esportivo do Ceará</div>
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
          <span class="section-badge">Atendimento personalizado</span>
          <h2>Preencha e fale com um <span class="gradient-text">especialista</span></h2>
          <p class="capture-sub">Conte um pouco sobre sua operação. Um especialista em gestão esportiva vai entender o seu momento e mostrar como a jliga.club pode estruturar suas competições.</p>

          <form class="capture-form" id="captureForm" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="nome">Nome <span class="req">*</span></label>
                <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required />
              </div>
              <div class="form-group">
                <label for="organizacao">Organização <span class="req">*</span></label>
                <input type="text" id="organizacao" name="organizacao" placeholder="Liga, federação, clube" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">E-mail <span class="req">*</span></label>
                <input type="email" id="email" name="email" placeholder="seu@email.com" required />
              </div>
              <div class="form-group">
                <label for="telefone">WhatsApp <span class="req">*</span></label>
                <input type="tel" id="telefone" name="telefone" placeholder="(55) 11 99999-9999" required />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="cargo">Cargo <span class="req">*</span></label>
                <select id="cargo" name="cargo" required>
                  <option value="" disabled selected>Selecione seu cargo</option>
                  <option>Presidente</option>
                  <option>Diretor(a)</option>
                  <option>Gestor(a) de competições</option>
                  <option>Coordenador(a)</option>
                  <option>Árbitro / Mesário</option>
                  <option>Outro</option>
                </select>
              </div>
              <div class="form-group">
                <label for="volume">Volume de competição <span class="req">*</span></label>
                <select id="volume" name="volume" required>
                  <option value="" disabled selected>Competições por ano</option>
                  <option>Até 3 por ano</option>
                  <option>4 a 10 por ano</option>
                  <option>11 a 20 por ano</option>
                  <option>Mais de 20 por ano</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="base">Base de atletas <span class="req">*</span></label>
              <select id="base" name="base" required>
                <option value="" disabled selected>Quantidade de atletas ativos</option>
                <option>Até 100 atletas</option>
                <option>100 a 500 atletas</option>
                <option>500 a 2.000 atletas</option>
                <option>Mais de 2.000 atletas</option>
              </select>
            </div>

            <div class="form-group">
              <label for="problemas">Principais problemas hoje <span class="req">*</span></label>
              <textarea id="problemas" name="problemas" rows="4" placeholder="Descreva os desafios ou riscos que você enfrenta na gestão da sua competição..." required></textarea>
            </div>

            <div class="form-group">
              <label for="captcha">Verificação de segurança <span class="req">*</span></label>
              <div class="captcha-row">
                <span class="captcha-question" id="captchaQuestion">${captcha.a} + ${captcha.b} =</span>
                <input type="text" id="captcha" name="captcha" inputmode="numeric" autocomplete="off" placeholder="?" required />
              </div>
            </div>

            <button type="submit" class="btn-primary" id="submitBtn">
              Enviar e falar com especialista ${icons.arrow}
            </button>
            <p class="form-disclaimer">
              ${icons.lock} Seus dados estão seguros. Plataforma adequada à LGPD.
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- URGENCY BAR -->
    <div class="urgency-bar">
      Mais de <span id="vagasCount">2.347</span> gestores já estruturam suas competições com a jliga.club
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <p>© 2026 <a href="#/">jliga.club</a> — Todos os direitos reservados. Plataforma adequada à LGPD.</p>
      </div>
    </footer>
  `;
}

export function init() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  const mobileBtn = document.getElementById('navMobileBtn');
  const navLinks = document.getElementById('navLinks');
  mobileBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

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

  const phoneInput = document.getElementById('telefone');
  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    e.target.value = v;
  });

  const form = document.getElementById('captureForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const captchaInput = document.getElementById('captcha');
    const userAnswer = parseInt(captchaInput.value, 10);
    if (userAnswer !== captcha.answer) {
      captchaInput.focus();
      captchaInput.setCustomValidity('Resposta incorreta. Tente novamente.');
      captchaInput.reportValidity();
      captcha = generateCaptcha();
      document.getElementById('captchaQuestion').textContent = `${captcha.a} + ${captcha.b} =`;
      captchaInput.value = '';
      setTimeout(() => captchaInput.setCustomValidity(''), 100);
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<span class="spinner"></span>';

    const data = {
      nome: document.getElementById('nome').value.trim(),
      organizacao: document.getElementById('organizacao').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      cargo: document.getElementById('cargo').value,
      volume: document.getElementById('volume').value,
      base: document.getElementById('base').value,
      problemas: document.getElementById('problemas').value.trim(),
      registeredAt: new Date().toISOString(),
    };

    // RD Station CRM Integration
    const users = ['6989fcbfefae53001e87c939', '698a007290293f001684cb0b']; // Kátia and Joicy
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const rdPayload = {
      deal: {
        name: `Lead: ${data.nome} - ${data.organizacao} (${data.cargo} · ${data.volume})`,
        user_id: randomUser,
        contacts: [{
          name: data.nome,
          emails: [{ email: data.email }],
          phones: [{ phone: data.telefone }]
        }]
      }
    };

    // Fire and forget so we don't block the user navigation
    fetch('https://crm.rdstation.com/api/v1/deals?token=6863e5587bc2d9001d3e53cf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rdPayload)
    }).catch(err => console.error('RD Station Error:', err));

    setTimeout(() => {
      setLeadData(data);
      navigate('/aula');
    }, 1200);
  });

  document.getElementById('captcha').addEventListener('input', (e) => {
    e.target.setCustomValidity('');
  });
}
