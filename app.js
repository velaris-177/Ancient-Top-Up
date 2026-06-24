// App.js for TopUpKu Website

const games = [
  { name: "Mobile Legends", icon: "🗡️", color: "from-orange-500 to-red-500", priceList: [125000, 250000, 500000, 1000000] },
  { name: "Free Fire", icon: "🔥", color: "from-blue-500 to-cyan-500", priceList: [75000, 150000, 300000, 600000] },
  { name: "Genshin Impact", icon: "🌟", color: "from-purple-500 to-violet-500", priceList: [200000, 400000, 800000] },
  { name: "PUBG Mobile", icon: "🎮", color: "from-green-500 to-emerald-500", priceList: [90000, 180000, 450000] },
  { name: "Valorant", icon: "🔫", color: "from-red-500 to-rose-500", priceList: [150000, 300000, 700000] },
  { name: "Roblox", icon: "🟥", color: "from-yellow-400 to-orange-500", priceList: [50000, 100000, 200000] }
];

let selectedGame = null;

document.addEventListener('DOMContentLoaded', () => {
  renderGames();
});

function renderGames() {
  const container = document.getElementById('game-list');
  if (!container) return;

  container.innerHTML = games.map(game => `
    <div onclick="selectGame('${game.name}')" class="game-card cursor-pointer bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
      <div class="h-40 bg-gradient-to-br ${game.color} flex items-center justify-center text-7xl">
        ${game.icon}
      </div>
      <div class="p-6">
        <h4 class="font-bold text-xl">${game.name}</h4>
        <p class="text-green-400 text-sm mt-1">Mulai dari Rp${game.priceList[0].toLocaleString('id-ID')}</p>
      </div>
    </div>
  `).join('');
}

window.selectGame = function(name) {
  selectedGame = games.find(g => g.name === name);
  if (!selectedGame) return;

  document.getElementById('modal-title').textContent = `Top Up ${name}`;
  
  const optionsDiv = document.getElementById('nominal-options');
  optionsDiv.innerHTML = selectedGame.priceList.map((price, i) => `
    <button onclick="chooseNominal(${price}, this)" class="nominal-btn border border-gray-700 hover:border-purple-500 rounded-2xl p-4 text-left transition-all">
      <div class="font-medium">Nominal ${i+1}</div>
      <div class="text-2xl font-bold text-green-400">Rp ${price.toLocaleString('id-ID')}</div>
    </button>
  `).join('');
  
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal').classList.add('flex');
};

window.chooseNominal = function(price, el) {
  document.querySelectorAll('.nominal-btn').forEach(btn => {
    btn.classList.remove('border-purple-500', 'bg-purple-900/30');
  });
  el.classList.add('border-purple-500', 'bg-purple-900/30');
  
  const totalEl = document.getElementById('total-price');
  if (totalEl) totalEl.textContent = `Rp ${price.toLocaleString('id-ID')}`;
};

window.closeModal = function() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.prosesTopUp = function() {
  const userId = document.getElementById('user-id').value.trim();
  if (!userId) {
    alert("Masukkan User ID kamu dulu ya!");
    return;
  }
  if (!selectedGame) {
    alert("Pilih game terlebih dahulu!");
    return;
  }

  alert(`✅ Top Up ${selectedGame.name} berhasil!\nUser ID: ${userId}\n\nSaldo akan masuk dalam beberapa detik. Terima kasih! 🎉`);
  closeModal();
  document.getElementById('user-id').value = ''; // Clear input
};

window.showLogin = function() {
  alert("Fitur login belum diimplementasikan (demo). Kamu bisa langsung top up tanpa login di website ini.");
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (modal && e.target === modal) {
    closeModal();
  }
});