// Live Date & Time
function updateDateTime() {
  const now = new Date();
  const dateTimeStr = now.toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  document.getElementById('dateTime').textContent = dateTimeStr;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Chart.js - LSTM Prediction Line Chart
const ctx = document.getElementById('moistureChart').getContext('2d');

const moistureChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Today', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [{
      label: 'Soil Moisture Forecast',
      data: [28, 24, 22, 18, 17, 19, 22],
      fill: false,
      borderColor: '#4fc3f7',
      tension: 0.4
    }]
  },
  options: {
    plugins: { legend: { display: false }},
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
        ticks: { color: '#aaa' },
        grid: { color: '#333' }
      },
      x: {
        ticks: { color: '#aaa' },
        grid: { color: '#333' }
      }
    }
  }
});

// Simulate live sensor updates
function simulateLiveData() {
  const moisture = (30 + Math.random() * 5).toFixed(1);
  const ph = (6 + Math.random()).toFixed(1);
  const n = Math.floor(Math.random() * 20);
  const p = Math.floor(Math.random() * 15);
  const k = Math.floor(Math.random() * 12);
  const temp = (26 + Math.random() * 4).toFixed(1);

  // Update Live Values
  document.getElementById('moisture').textContent = `${moisture}%`;
  document.getElementById('phLevel').textContent = ph;
  document.getElementById('rt-moisture').textContent = `${moisture}%`;
  document.getElementById('rt-ph').textContent = ph;
  document.getElementById('rt-n').textContent = n;
  document.getElementById('rt-p').textContent = p;
  document.getElementById('rt-k').textContent = k;
  document.getElementById('rt-temp').textContent = `${temp}°C`;

  // Update Chart
  const newForecast = [
    parseFloat(moisture),
    parseFloat(moisture) - 3,
    parseFloat(moisture) - 6,
    parseFloat(moisture) - 9,
    parseFloat(moisture) - 10,
    parseFloat(moisture) - 8,
    parseFloat(moisture) - 5
  ];
  moistureChart.data.datasets[0].data = newForecast;
  moistureChart.update();
}

setInterval(simulateLiveData, 5000); // update every 5 sec
simulateLiveData();
