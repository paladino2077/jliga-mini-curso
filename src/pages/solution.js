// ===== ETAPA 4: APRESENTAÇÃO DA SOLUÇÃO =====
import icons from '../icons.js';
import { navigate, getLeadData, setProgress, renderStepIndicator } from '../router.js';

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Gestor';

  setProgress('solutionViewed');

  app.innerHTML = `
    <nav class="navbar scrolled">
      <div class="container">
        <a href="#/" class="nav-logo"><img src="/logo.png" alt="jliga.club"></a>
        <div class="nav-links">
          <a href="#/kit" style="color:#666">← Voltar ao Kit</a>
        </div>
      </div>
    </nav>

    <main class="solution-page">
      <div class="container">
        ${renderStepIndicator(4)}

        <div class="solution-hero reveal">
          <span class="section-badge">Para gestores que levam o esporte a sério</span>
          <h1>Conheça a solução <span class="gradient-text">completa para você</span></h1>
          <p>Você aprendeu como captar patrocinadores. Agora veja a ferramenta que os gestores mais sérios usam para tornar isso realidade.</p>
        </div>

        <div class="solution-video reveal">
          <div class="solution-video-inner">
            <iframe
              src="https://www.youtube.com/embed/bRE6sIxRFyQ?rel=0"
              title="Demonstração jliga.club"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:16px;">
            </iframe>
          </div>
        </div>

        <div class="solution-features reveal">
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.shield}</div>
            <h3>App Personalizado </h3>
            <p>Android e iOS com nome e cores do seu campeonato.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.dollarSign}</div>
            <h3>Multimodalidades</h3>
            <p>Futebol, Basquete, Handebol, Vôlei, Futevôlei e mais.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.ranking}</div>
            <h3>Ecossistema de Receita</h3>
            <p>Inscrição, pagamento integrado e rifa digital.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.trophy}</div>
            <h3>Onboarding em 5 dias </h3>
            <p>Site no ar em ate 5 dias. App em ate 30 dias.</p>
          </div>
        </div>

        <div class="solution-comparison reveal">
          <h2>Antes <span style="color:#666">vs</span> <span class="gradient-text">Com a jliga.club</span></h2>
          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th class="col-before">Sem estrutura</th>
                  <th class="col-after">Com jliga.club</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Validação de atletas</td>
                  <td class="col-before">${icons.x} Tabela feita na mão ou em planilha</td>
                  <td class="col-after">${icons.checkCircle} Tabela automática em tempo real</td>
                </tr>
                <tr>
                  <td>Controle financeiro</td>
                  <td class="col-before">${icons.x} Inscrição por formulário do Google</td>
                  <td class="col-after">${icons.checkCircle} Inscrição e pagamento online integrado</td>
                </tr>
                <tr>
                  <td>Tabelas e resultados</td>
                  <td class="col-before">${icons.x} Cobrança via Pix no WhatsApp</td>
                  <td class="col-after">${icons.checkCircle} Atualização automática</td>
                </tr>
                <tr>
                  <td>Inscrição em eventos</td>
                  <td class="col-before">${icons.x} Sem app, sem site, sem identidade</td>
                  <td class="col-after">${icons.checkCircle} Site oficial com tabela e ranking</td>
                </tr>
                <tr>
                  <td>Conformidade LGPD</td>
                  <td class="col-before">${icons.x} Patrocinador não vê estrutura</td>
                  <td class="col-after">${icons.checkCircle} Estrutura que o patrocinador respeita</td>
                </tr>
                <tr>
                  <td>Proposta de patrocínio</td>
                  <td class="col-before">${icons.x} Árbitro sem súmula digital</td>
                  <td class="col-after">${icons.checkCircle} Súmula digital por celular</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="solution-numbers reveal">
          <div class="solution-number">
            <div class="solution-number-value">250+</div>
            <div class="solution-number-label">Organizações ativas</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">5</div>
            <div class="solution-number-label">Dias para ir ao ar</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">24/7 </div>
            <div class="solution-number-label">Suporte ao cliente</div>
          </div>
        </div>

        <div class="solution-cta reveal">
          <div class="solution-cta-card">
            <h2>${firstName}, quer ver tudo isso <span class="gradient-text">funcionando na prática</span>?</h2>
            <button class="btn-primary btn-xl" id="btnAgendar">
              Quero ver o jliga funcionando no meu campeonato ${icons.arrow}
            </button>
            <div class="solution-cta-trust">
              <span>${icons.checkCircle} Sem compromisso. Assista à demo, é gratuita e dura 20 minutos.</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2026 <a href="#/">jliga.club</a> — Todos os direitos reservados.</p>
      </div>
    </footer>
  `;
}

export function init() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });

  document.getElementById('btnAgendar').addEventListener('click', () => {
    navigate('/reuniao');
  });
}
