// Apple AI 2025 Scorecard - Main JavaScript
let scorecardData = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initializeScorecard();
  initializeEventListeners();
  createMainGauge();
});

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch('data.json');
    scorecardData = await response.json();
    calculateAllScores();
  } catch (error) {
    console.error('Error loading data:', error);
    scorecardData = getInlineData();
    calculateAllScores();
  }
}

// Calculate all scores
function calculateAllScores() {
  scorecardData.pillars.forEach(pillar => {
    pillar.score = calculatePillarScore(pillar);
  });
  
  scorecardData.overallScore = calculateOverallScore(scorecardData.pillars);
  scorecardData.letterGrade = getLetterGrade(scorecardData.overallScore);
  
  scorecardData.miniChips.forEach(chip => {
    if (chip.linkedPillar) {
      const pillar = scorecardData.pillars.find(p => p.id === chip.linkedPillar);
      chip.score = pillar ? pillar.score : 0;
    } else if (chip.derivedFrom) {
      const [pillarId, metricPath] = chip.derivedFrom.split('.metrics[');
      const metricIndex = parseInt(metricPath.replace(']', ''));
      const pillar = scorecardData.pillars.find(p => p.id === pillarId);
      chip.score = pillar ? pillar.metrics[metricIndex].value : 0;
    }
  });
}

// Calculate pillar score (average of metrics)
function calculatePillarScore(pillar) {
  const metricSum = pillar.metrics.reduce((sum, m) => sum + m.value, 0);
  return Math.round(metricSum / pillar.metrics.length);
}

// Calculate overall weighted score
function calculateOverallScore(pillars) {
  let weightedSum = 0;
  pillars.forEach(pillar => {
    weightedSum += pillar.score * pillar.weight;
  });
  return Math.round(weightedSum);
}

// Assign letter grade
function getLetterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// Get color for score
function getScoreColor(score) {
  if (score >= 85) return "#10B981";
  if (score >= 75) return "#F59E0B";
  if (score >= 60) return "#F97316";
  return "#EF4444";
}

// Initialize scorecard display
function initializeScorecard() {
  document.getElementById('score-number').textContent = scorecardData.overallScore;
  document.getElementById('letter-grade').textContent = scorecardData.letterGrade;
  document.getElementById('letter-grade').style.backgroundColor = getScoreColor(scorecardData.overallScore) + '20';
  document.getElementById('letter-grade').style.color = getScoreColor(scorecardData.overallScore);
  document.getElementById('update-date').textContent = formatDate(scorecardData.lastUpdated);
  
  createMiniChips();
  createPillarCards();
}

// Create mini chips
function createMiniChips() {
  const container = document.getElementById('mini-chips');
  container.innerHTML = '';
  
  scorecardData.miniChips.forEach(chip => {
    const chipEl = document.createElement('div');
    chipEl.className = 'mini-chip';
    chipEl.style.borderColor = getScoreColor(chip.score);
    chipEl.innerHTML = `
      <span class="chip-name">${chip.name}</span>
      <span class="chip-score" style="color: ${getScoreColor(chip.score)}">${chip.score}</span>
    `;
    
    if (chip.linkedPillar) {
      chipEl.style.cursor = 'pointer';
      chipEl.addEventListener('click', () => {
        const pillarEl = document.getElementById(`pillar-${chip.linkedPillar}`);
        if (pillarEl) {
          pillarEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
    
    container.appendChild(chipEl);
  });
}

// Create pillar cards
function createPillarCards() {
  const container = document.getElementById('pillars');
  container.innerHTML = '';
  
  scorecardData.pillars.forEach((pillar, index) => {
    const card = document.createElement('div');
    card.className = 'pillar-card';
    card.id = `pillar-${pillar.id}`;
    
    card.innerHTML = `
      <div class="pillar-header">
        <div>
          <h3 class="pillar-title">
            Pillar ${index + 1} — ${pillar.name}
            <span class="pillar-weight">(${Math.round(pillar.weight * 100)}%)</span>
          </h3>
        </div>
        <div class="pillar-score" style="background-color: ${getScoreColor(pillar.score)}20; color: ${getScoreColor(pillar.score)}">
          ${pillar.score}
        </div>
      </div>
      
      <div class="pillar-content">
        <div class="promise-box">
          <blockquote>"${pillar.promise.quote}"</blockquote>
          <div class="promise-attribution">
            — ${pillar.promise.speaker}, ${formatDate(pillar.promise.date)}
          </div>
        </div>
        
        <div class="status-box">
          <div>
            <p class="status-summary">${pillar.status.summary}</p>
            <p class="status-date">Last checked: ${formatDate(pillar.status.lastChecked)}</p>
          </div>
          
          <ul class="metrics-list">
            ${pillar.metrics.map(metric => `
              <li class="metric-item">
                <div class="metric-label">
                  <span>${metric.name}</span>
                  <span class="metric-value" style="color: ${getScoreColor(metric.value)}">${metric.value}${metric.unit === '%' ? '%' : ''}</span>
                </div>
                <div class="metric-bar">
                  <div class="metric-fill" style="width: ${metric.value}%; background-color: ${getScoreColor(metric.value)}">
                  </div>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <button class="evidence-toggle" data-pillar="${pillar.id}">
          🔍
        </button>
      </div>
      
      <div class="evidence-drawer" id="evidence-${pillar.id}">
        <h4>Evidence & Citations</h4>
        <ul class="citations-list">
          ${pillar.citations.map((citation, i) => `
            <li class="citation-item" data-number="[${i + 1}]">
              <a href="${citation.url}" target="_blank" rel="noopener">${citation.title}</a>
              <div class="citation-meta">${citation.source} — ${formatDate(citation.date)}</div>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    container.appendChild(card);
  });
  
  document.querySelectorAll('.evidence-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const pillarId = btn.dataset.pillar;
      const drawer = document.getElementById(`evidence-${pillarId}`);
      drawer.classList.toggle('visible');
    });
  });
}

// Initialize event listeners
function initializeEventListeners() {
  document.getElementById('rubric-toggle').addEventListener('click', () => {
    const content = document.getElementById('rubric-content');
    const toggle = document.getElementById('rubric-toggle');
    content.classList.toggle('hidden');
    content.classList.toggle('visible');
    toggle.classList.toggle('active');
  });
  
  document.getElementById('refresh-btn').addEventListener('click', async () => {
    const btn = document.getElementById('refresh-btn');
    btn.classList.add('loading');
    btn.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    scorecardData.lastUpdated = new Date().toISOString().split('T')[0];
    calculateAllScores();
    initializeScorecard();
    createMainGauge();
    
    btn.classList.remove('loading');
    btn.disabled = false;
  });
  
  document.getElementById('share-btn').addEventListener('click', () => {
    const text = `Apple AI Scorecard 2025: ${scorecardData.overallScore}/100 (${scorecardData.letterGrade}). On-device features, Siri recovery, and privacy—how does Apple stack up?`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title: 'Apple AI 2025 Scorecard', text, url })
        .catch(err => console.log('Share cancelled', err));
    } else {
      navigator.clipboard.writeText(`${text} ${url}`)
        .then(() => alert('Link copied to clipboard!'));
    }
  });
  
  window.addEventListener('scroll', () => {
    const topBar = document.getElementById('top-bar');
    if (window.scrollY > 50) {
      topBar.classList.add('scrolled');
    } else {
      topBar.classList.remove('scrolled');
    }
  });
}

// Create main gauge with Chart.js
function createMainGauge() {
  const canvas = document.getElementById('scoreGauge');
  const ctx = canvas.getContext('2d');
  
  const existingChart = Chart.getChart(canvas);
  if (existingChart) {
    existingChart.destroy();
  }
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [scorecardData.overallScore, 100 - scorecardData.overallScore],
        backgroundColor: [
          getScoreColor(scorecardData.overallScore),
          '#E5E7EB'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '75%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}

// Format date helper
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Inline fallback data
function getInlineData() {
  return {
    lastUpdated: "2025-10-12",
    overallScore: 0,
    letterGrade: "",
    pillars: [],
    miniChips: []
  };
}
