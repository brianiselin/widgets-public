// Chart.js Configuration for Footer Mini-Charts

window.addEventListener('load', () => {
  setTimeout(() => {
    createFooterCharts();
  }, 500);
});

function createFooterCharts() {
  createDeviceChart();
  createSiriTrendChart();
  createAppAdoptionChart();
}

// 1. Device Eligibility Pie Chart
function createDeviceChart() {
  const canvas = document.getElementById('deviceChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['A17 Pro / M-series', 'Other devices'],
      datasets: [{
        data: [38, 62],
        backgroundColor: ['#3B82F6', '#E5E7EB'],
        borderWidth: 0,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'Device Eligibility (% of iPhone Base)',
          font: {
            size: 16,
            weight: 600
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 13
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

// 2. Siri Success Trend Line Chart
function createSiriTrendChart() {
  const canvas = document.getElementById('siriTrendChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  const months = ['Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25', 
                  'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25'];
  const successRates = [45, 48, 52, 55, 58, 62, 65, 68, 70, 72, 75, 77, 78];
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Success Rate (%)',
        data: successRates,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'Siri Task Success Rate (100-Intent Test)',
          font: {
            size: 16,
            weight: 600
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Success Rate: ' + context.parsed.y + '%';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 40,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// 3. App Adoption Bar Chart
function createAppAdoptionChart() {
  const canvas = document.getElementById('appAdoptionChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  const quarters = ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025'];
  const appCounts = [8, 22, 45, 68];
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: quarters,
      datasets: [{
        label: '# of Apps',
        data: appCounts,
        backgroundColor: [
          '#EF4444',
          '#F97316',
          '#F59E0B',
          '#10B981'
        ],
        borderRadius: 8,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: 'Top-200 Apps with Apple Intelligence Features',
          font: {
            size: 16,
            weight: 600
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Apps: ' + context.parsed.y + ' of 200 (' + 
                     Math.round(context.parsed.y / 200 * 100) + '%)';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 200,
          ticks: {
            stepSize: 40
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}
