
let map = L.map('map', { zoomControl: true }).setView([32.5, 53.5], 6);
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let freelancers = JSON.parse(localStorage.getItem('freelancers')) || [];
let iranCities = {};
let markersLayer = L.layerGroup().addTo(map);
let circlesLayer = L.layerGroup().addTo(map);

// بارگذاری فایل شهرها
fetch('iran_cities.json').then(res => res.json()).then(data => {
  iranCities = data;
  initProvinceCitySelectors();
  updateMap();
});

function initProvinceCitySelectors() {
  const provinces = Object.keys(iranCities);
  const provinceFilter = document.getElementById('province-filter');
  const newProvince = document.getElementById('new-province');

  provinces.forEach(province => {
    provinceFilter.innerHTML += `<option value="${province}">${province}</option>`;
    newProvince.innerHTML += `<option value="${province}">${province}</option>`;
  });

  provinceFilter.addEventListener('change', () => {
    updateCityFilter(provinceFilter.value, 'city-filter');
    updateMap();
  });

  document.getElementById('city-filter').addEventListener('change', updateMap);

  newProvince.addEventListener('change', () => {
    updateCityFilter(newProvince.value, 'new-city');
  });

  document.getElementById('add-btn').addEventListener('click', addFreelancer);
}

function updateCityFilter(province, targetId) {
  const citySelect = document.getElementById(targetId);
  citySelect.innerHTML = '<option value="all">همه شهرها</option>';
  if (iranCities[province]) {
    Object.keys(iranCities[province]).forEach(city => {
      citySelect.innerHTML += `<option value="${city}">${city}</option>`;
    });
  }
}

function updateMap() {
  markersLayer.clearLayers();
  circlesLayer.clearLayers();

  const province = document.getElementById('province-filter').value;
  const city = document.getElementById('city-filter').value;

  let filtered = freelancers;
  if (province !== 'all') filtered = filtered.filter(f => f.province === province);
  if (city !== 'all') filtered = filtered.filter(f => f.city === city);

  const grouped = {};
  filtered.forEach(f => {
    const key = f.city;
    if (!grouped[key]) {
      grouped[key] = { count: 0, lat: f.lat, lng: f.lng, province: f.province, freelancers: [] };
    }
    grouped[key].count++;
    grouped[key].freelancers.push(f.name);
  });

  for (const city in grouped) {
    const g = grouped[city];
    const radius = Math.min(30000, g.count * 2000 + 5000);
    L.circle([g.lat, g.lng], {
      color: '#3388ff',
      fillColor: '#3388ff',
      fillOpacity: 0.3,
      radius: radius
    }).addTo(circlesLayer);
    const marker = L.marker([g.lat, g.lng]).addTo(markersLayer);
    marker.bindPopup(`<b>${city}</b><br>تعداد: ${g.count}<br>${g.freelancers.join("<br>")}`);
  }
}

function addFreelancer() {
  const name = document.getElementById('freelancer-name').value.trim();
  const province = document.getElementById('new-province').value;
  const city = document.getElementById('new-city').value;
  if (!name || !province || !city || !iranCities[province][city]) return alert("لطفاً اطلاعات کامل وارد کنید.");

  const { lat, lng } = iranCities[province][city];
  const newFreelancer = { name, province, city, lat, lng };
  freelancers.push(newFreelancer);
  localStorage.setItem('freelancers', JSON.stringify(freelancers));

  document.getElementById('freelancer-name').value = '';
  updateMap();
  map.setView([lat, lng], 10);
}
