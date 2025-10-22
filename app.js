// App constants
const ACCESS_PASSWORD = '430';
const CORRECT_PIN = '123456'; // set to the Insta hidden code when known

// Screen helpers
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('screen--active'));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('screen--active');
}

// Login logic
function initLogin() {
  const form = document.getElementById('login-form');
  const pwd = document.getElementById('password');
  const msg = document.getElementById('login-message');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = (pwd.value || '').trim();
    if (value === ACCESS_PASSWORD) {
      msg.textContent = '';
      msg.className = 'message';
      showScreen('dashboard-screen');
    } else {
      msg.textContent = 'ACCESS DENIED';
      msg.className = 'message message--error';
    }
  });
}

// Dashboard logic
function initDashboard() {
  const solveBtn = document.getElementById('solve-btn');
  if (!solveBtn) return;
  solveBtn.addEventListener('click', () => {
    showScreen('puzzle-screen');
  });
}

// Puzzle logic
function initPuzzle() {
  const grid = document.querySelector('.pin-grid');
  const display = document.getElementById('pin-display');
  const message = document.getElementById('pin-message');
  if (!grid) return;

  let buffer = '';

  function renderDisplay() {
    if (display) display.value = `PIN: ${buffer}`;
  }

  function showSuccess() {
    // Navigate to success screen instead of showing inline message
    showScreen('success-screen');
  }

  function showError() {
    message.innerHTML = 'ACCESS DENIED ❌<br>Wrong code, Agent. Try again.';
    message.className = 'message message--error';
  }

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.pin');
    if (!btn) return;
    const digit = btn.getAttribute('data-digit');
    if (!digit) return;

    // Light up click
    btn.classList.add('pin--lit');
    setTimeout(() => btn.classList.remove('pin--lit'), 120);

    // Append digit
    if (buffer.length < 6) buffer += digit;
    renderDisplay();

    // Evaluate when 6 digits entered
    if (buffer.length === 6) {
      if (buffer === CORRECT_PIN) {
        showSuccess();
      } else {
        showError();
      }
      // Reset buffer after a short delay so they can try again
      setTimeout(() => {
        buffer = '';
        renderDisplay();
      }, 900);
    }
  });

  // Initialize display
  renderDisplay();
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initDashboard();
  initPuzzle();
});


