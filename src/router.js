// ===== HASH-BASED SPA ROUTER =====

const STORAGE_KEY = 'jliga_funnel';

// Route definitions with guards
const ROUTES = {
  '/': { step: 1, guard: null },
  '/aula': { step: 2, guard: () => !!getLeadData() },
  '/kit': { step: 3, guard: () => getProgress().lessonCompleted },
  '/solucao': { step: 4, guard: () => getProgress().kitVisited },
  '/agendar': { step: 5, guard: () => getProgress().solutionViewed },
};

// ===== STATE MANAGEMENT =====
function getState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function setState(updates) {
  const state = { ...getState(), ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

export function getLeadData() {
  const state = getState();
  return state.lead || null;
}

export function setLeadData(data) {
  setState({ lead: data });
}

export function getProgress() {
  const state = getState();
  return {
    registered: !!state.lead,
    lessonCompleted: !!state.lessonCompleted,
    kitVisited: !!state.kitVisited,
    solutionViewed: !!state.solutionViewed,
    scheduled: !!state.scheduled,
  };
}

export function setProgress(key, value = true) {
  setState({ [key]: value });
}

// ===== ROUTING =====
let currentRoute = null;
let pageModules = {};
let onRouteChange = null;

export function registerPages(modules) {
  pageModules = modules;
}

export function setRouteChangeCallback(cb) {
  onRouteChange = cb;
}

export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || '/';
  return hash;
}

export function navigate(route) {
  window.location.hash = route;
}

export function getCurrentStep() {
  const route = getCurrentRoute();
  return ROUTES[route]?.step || 1;
}

function resolveRoute() {
  const route = getCurrentRoute();
  const config = ROUTES[route];

  // Unknown route → go home
  if (!config) {
    navigate('/');
    return;
  }

  // Check guard
  if (config.guard && !config.guard()) {
    // Find the highest accessible step
    const entries = Object.entries(ROUTES);
    let fallback = '/';
    for (const [path, cfg] of entries) {
      if (!cfg.guard || cfg.guard()) {
        fallback = path;
      } else {
        break;
      }
    }
    navigate(fallback);
    return;
  }

  // Render page
  if (currentRoute !== route) {
    currentRoute = route;
    const page = pageModules[route];
    if (page) {
      const app = document.querySelector('#app');
      app.innerHTML = '';
      page.render(app);
      if (page.init) page.init();
      window.scrollTo(0, 0);
      if (onRouteChange) onRouteChange(config.step);
    }
  }
}

export function initRouter() {
  window.addEventListener('hashchange', resolveRoute);
  // Set initial route
  if (!window.location.hash) {
    window.location.hash = '/';
  }
  resolveRoute();
}

// ===== FUNNEL STEP INDICATOR (rendered on pages 2-5) =====
export function renderStepIndicator(currentStep) {
  const steps = [
    { n: 1, label: 'Cadastro' },
    { n: 2, label: 'Aula' },
    { n: 3, label: 'Kit' },
    { n: 4, label: 'Solução' },
    { n: 5, label: 'Agendar' },
  ];

  return `
    <div class="step-indicator">
      ${steps.map(s => `
        <div class="step-item ${s.n < currentStep ? 'completed' : ''} ${s.n === currentStep ? 'active' : ''} ${s.n > currentStep ? 'upcoming' : ''}">
          <div class="step-dot">${s.n < currentStep ? '✓' : s.n}</div>
          <span class="step-label">${s.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ===== TOAST NOTIFICATION =====
export function showToast(message, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
