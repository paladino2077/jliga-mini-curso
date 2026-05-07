// ===== ETAPA 4: APRESENTAÇÃO DA SOLUÇÃO =====
import icons from '../icons.js';
import { navigate, getLeadData, setProgress, renderStepIndicator } from '../router.js';

export function render(app) {
  const lead = getLeadData();
  const firstName = lead?.nome?.split(' ')[0] || 'Presidente';

  setProgress('solutionViewed');

  app.innerHTML = `
    <nav class="navbar scrolled">
      <div class="container">
        <a href="#/" class="nav-logo">J<span>Liga</span></a>
        <div class="nav-links">
          <a href="#/kit" style="color:#666">← Voltar ao Kit</a>
        </div>
      </div>
    </nav>

    <main class="solution-page">
      <div class="container">
        ${renderStepIndicator(4)}

        <div class="solution-hero reveal">
          <span class="section-badge">Etapa 4 de 5</span>
          <h1>Gestão esportiva completa em um <span class="gradient-text">único ambiente</span></h1>
          <p>Você para de administrar ferramentas e passa a administrar a competição. Tudo integrado, tudo rastreável, tudo com respaldo jurídico.</p>
        </div>

        <div class="solution-features reveal">
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.shield}</div>
            <h3>Validação Federal de Atletas</h3>
            <p>CPF confirmado em tempo real na Receita Federal. Fim do atleta irregular sem contestação.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.dollarSign}</div>
            <h3>Financeiro Integrado</h3>
            <p>Inscrições, mensalidades, repasses e relatórios financeiros auditáveis automaticamente.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.ranking}</div>
            <h3>Tabelas e Classificações</h3>
            <p>Resultados atualizados automaticamente. Súmula digital com registro auditável de cada partida.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.trophy}</div>
            <h3>Gestão de Competições</h3>
            <p>Crie campeonatos, gerencie chaves, escala de arbitragem e TJD integrados ao mesmo sistema.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.globe}</div>
            <h3>App Próprio Android e iOS</h3>
            <p>Personalizado com a identidade da sua organização. Publicado na Play Store e App Store.</p>
          </div>
          <div class="solution-feature">
            <div class="solution-feature-icon">${icons.barChart}</div>
            <h3>Relatórios para Patrocínio</h3>
            <p>Dados estruturados prontos para proposta comercial. Evidência, não promessa.</p>
          </div>
        </div>

        <div class="solution-comparison reveal">
          <h2>Antes <span style="color:#666">vs</span> <span class="gradient-text">Com o JLiga</span></h2>
          <div class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th class="col-before">Sem estrutura</th>
                  <th class="col-after">Com JLiga</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Validação de atletas</td>
                  <td class="col-before">${icons.x} Dados digitados manualmente</td>
                  <td class="col-after">${icons.checkCircle} CPF validado na Receita Federal</td>
                </tr>
                <tr>
                  <td>Controle financeiro</td>
                  <td class="col-before">${icons.x} Caderno / WhatsApp</td>
                  <td class="col-after">${icons.checkCircle} Dashboard auditável</td>
                </tr>
                <tr>
                  <td>Tabelas e resultados</td>
                  <td class="col-before">${icons.x} Atualização manual</td>
                  <td class="col-after">${icons.checkCircle} Atualização automática</td>
                </tr>
                <tr>
                  <td>Inscrição em eventos</td>
                  <td class="col-before">${icons.x} Formulário Google</td>
                  <td class="col-after">${icons.checkCircle} Portal do atleta integrado</td>
                </tr>
                <tr>
                  <td>Conformidade LGPD</td>
                  <td class="col-before">${icons.x} Boa intenção</td>
                  <td class="col-after">${icons.checkCircle} Documentada e auditável</td>
                </tr>
                <tr>
                  <td>Proposta de patrocínio</td>
                  <td class="col-before">${icons.x} Estimativas em Word</td>
                  <td class="col-after">${icons.checkCircle} Dados reais da competição</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="solution-numbers reveal">
          <div class="solution-number">
            <div class="solution-number-value">850+</div>
            <div class="solution-number-label">Ligas ativas</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">27</div>
            <div class="solution-number-label">Estados</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">R$15M+</div>
            <div class="solution-number-label">Captados pelas ligas</div>
          </div>
          <div class="solution-number">
            <div class="solution-number-value">98%</div>
            <div class="solution-number-label">Satisfação</div>
          </div>
        </div>

        <div class="solution-cta reveal">
          <div class="solution-cta-card">
            <h2>${firstName}, quer ver tudo isso <span class="gradient-text">funcionando na prática</span>?</h2>
            <p>Agende uma apresentação personalizada. Um especialista em gestão esportiva vai entender o momento da sua competição. Sem compromisso, sem script de venda.</p>
            <button class="btn-primary btn-xl" id="btnAgendar">
              Agendar apresentação personalizada ${icons.arrow}
            </button>
            <div class="solution-cta-trust">
              <span>${icons.checkCircle} 100% gratuito</span>
              <span>${icons.checkCircle} Sem compromisso</span>
              <span>${icons.checkCircle} Personalizado para sua operação</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© 2026 <a href="#/">JLiga</a> — Todos os direitos reservados.</p>
      </div>
    </footer>
  `;
}

export function init() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });

  document.getElementById('btnAgendar').addEventListener('click', () => {
    navigate('/agendar');
  });
}
