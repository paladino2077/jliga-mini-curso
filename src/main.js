// ===== jliga.club FUNNEL — ENTRY POINT =====
import './style.css';
import { initRouter, registerPages } from './router.js';

// Import all pages
import * as capturePage from './pages/capture.js';
import * as lessonPage from './pages/lesson.js';
import * as kitPage from './pages/kit.js';
import * as solutionPage from './pages/solution.js';
import * as schedulePage from './pages/schedule.js';

// Register pages with router
registerPages({
  '/': capturePage,
  '/aula': lessonPage,
  '/kit': kitPage,
  '/solucao': solutionPage,
  '/reuniao': schedulePage,
});

// Add global spin keyframe
const spinStyle = document.createElement('style');
spinStyle.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner {
    display: inline-block; width: 20px; height: 20px;
    border: 3px solid rgba(255,255,255,.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin .6s linear infinite;
  }
`;
document.head.appendChild(spinStyle);

// Theme Toggle Logic
import icons from './icons.js';
const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('theme') || 'dark';

function updateTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.innerHTML = currentTheme === 'light' ? icons.moon : icons.sun;
  localStorage.setItem('theme', currentTheme);
}

// Initialize theme
updateTheme();
themeToggle.style.display = 'flex';

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  updateTheme();
});

// Initialize router
initRouter();
