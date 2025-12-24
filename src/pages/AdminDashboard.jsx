import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [responses, setResponses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("stats"); // 'stats' ou 'responses'

  // URL de l'API : en production utilise le même domaine que le site
  const getApiUrl = () => {
    // En production, utiliser le même domaine
    return window.location.origin;
  };

  const API_URL = getApiUrl();

  // Vérifier si déjà authentifié
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const decoded = atob(token);
      const [username, password] = decoded.split(":");
      loadData(username, password);
    }
  }, []);

  // Charger les données
  async function loadData(username, password) {
    setLoading(true);
    setError("");

    try {
      // Charger les réponses
      const responsesRes = await fetch(`${API_URL}/api/admin/responses`, {
        headers: { username, password },
      });

      // Charger les stats
      const statsRes = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { username, password },
      });

      if (responsesRes.ok && statsRes.ok) {
        const responsesData = await responsesRes.json();
        const statsData = await statsRes.json();

        setResponses(responsesData.data || []);
        setStats(statsData.data || null);
        setIsAuthenticated(true);
      } else {
        throw new Error("Authentification échouée");
      }
    } catch (err) {
      setError("Erreur de chargement des données: " + err.message);
      setIsAuthenticated(false);
      localStorage.removeItem("adminToken");
    } finally {
      setLoading(false);
    }
  }

  // Connexion
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        await loadData(loginForm.username, loginForm.password);
      } else {
        setError("Identifiants incorrects");
      }
    } catch (err) {
      setError("Erreur de connexion: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Déconnexion
  function handleLogout() {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setResponses([]);
    setStats(null);
    setLoginForm({ username: "", password: "" });
  }

  // Supprimer une réponse
  async function deleteResponse(id) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) return;

    const token = localStorage.getItem("adminToken");
    const decoded = atob(token);
    const [username, password] = decoded.split(":");

    try {
      const response = await fetch(`${API_URL}/api/admin/responses/${id}`, {
        method: "DELETE",
        headers: { username, password },
      });

      if (response.ok) {
        await loadData(username, password);
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      alert("Erreur: " + err.message);
    }
  }

  // Exporter en CSV
  function exportToCSV() {
    const headers = [
      "Date",
      "Nom",
      "Email",
      "Téléphone",
      "Présence",
      "Adultes",
      "Enfants",
      "Âge Enfants",
      "Régime",
      "Hôtel",
      "Type Chambre",
      "Arrivée",
      "Départ",
      "Nuits",
      "Repas Veille",
      "Message",
    ];
    const rows = responses.map((r) => {
      const nights =
        r.hotelCheckIn && r.hotelCheckOut
          ? Math.ceil(
              (new Date(r.hotelCheckOut) - new Date(r.hotelCheckIn)) /
                (1000 * 60 * 60 * 24)
            )
          : 0;

      return [
        new Date(r.timestamp).toLocaleString("de-CH"),
        r.name,
        r.email,
        r.phone,
        r.attending === "yes" ? "Oui" : "Non",
        r.adults || "0",
        r.children || "0",
        r.childrenAges || "",
        r.dietary || "",
        r.hotelRoomType && r.hotelRoomType !== "none" ? "Oui" : "Non",
        r.hotelRoomType === "single"
          ? "Simple"
          : r.hotelRoomType === "double"
          ? "Double"
          : r.hotelRoomType === "triple"
          ? "Triple"
          : r.hotelRoomType === "quadruple"
          ? "Quadruple"
          : r.hotelRoomType === "larger"
          ? "Plus grande"
          : "",
        r.hotelCheckIn
          ? new Date(r.hotelCheckIn).toLocaleDateString("de-CH")
          : "",
        r.hotelCheckOut
          ? new Date(r.hotelCheckOut).toLocaleDateString("de-CH")
          : "",
        nights > 0 ? nights.toString() : "",
        r.dinnerAttending === "yes"
          ? "Oui"
          : r.dinnerAttending === "no"
          ? "Non"
          : "",
        r.message || "",
      ];
    });

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `reponses-mariage-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  }

  // Page de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blush flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair font-bold text-gray-800 mb-2">
              🎉 Dashboard Admin
            </h1>
            <p className="text-gray-600">Mariage Flavio & Letizia</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-gold to-gold text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 font-semibold">
            ← Retour au site
          </button>
        </div>
      </div>
    );
  }

  // Dashboard principal
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-playfair font-bold text-gray-800">
                Dashboard Admin - Mariage 💕
              </h1>
              <p className="text-sm text-gray-600">
                {responses.length} réponse{responses.length > 1 ? "s" : ""}{" "}
                reçue{responses.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                📥 Exporter CSV
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "stats"
                ? "border-b-2 border-rose-gold text-rose-gold"
                : "text-gray-600 hover:text-gray-800"
            }`}>
            📊 Statistiques
          </button>
          <button
            onClick={() => setActiveTab("responses")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "responses"
                ? "border-b-2 border-rose-gold text-rose-gold"
                : "text-gray-600 hover:text-gray-800"
            }`}>
            📝 Réponses ({responses.length})
          </button>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-rose-gold border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        ) : activeTab === "stats" ? (
          <StatsView stats={stats} />
        ) : (
          <ResponsesView responses={responses} onDelete={deleteResponse} />
        )}
      </div>
    </div>
  );
}

// Composant Vue Statistiques
function StatsView({ stats }) {
  if (!stats) return <div>Aucune statistique disponible</div>;

  return (
    <div className="space-y-6">
      {/* Cartes de stats principales */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Réponses"
          value={stats.total}
          icon="📨"
          color="bg-blue-500"
        />
        <StatCard
          title="Présents"
          value={stats.attending.yes}
          icon="✅"
          color="bg-green-500"
        />
        <StatCard
          title="Absents"
          value={stats.attending.no}
          icon="❌"
          color="bg-red-500"
        />
      </div>

      {/* Invités */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Invités"
          value={stats.guests.total}
          icon="👥"
          color="bg-purple-500"
        />
        <StatCard
          title="Adultes"
          value={stats.guests.totalAdults}
          icon="👨‍👩‍"
          color="bg-indigo-500"
        />
        <StatCard
          title="Enfants"
          value={stats.guests.totalChildren}
          icon="👶"
          color="bg-pink-500"
        />
      </div>

      {/* Graphique de présence */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Répartition des Réponses
        </h3>
        <div className="flex items-end gap-4 h-64">
          <BarChart
            label="Présents"
            value={stats.attending.yes}
            max={stats.total}
            color="bg-green-500"
          />
          <BarChart
            label="Absents"
            value={stats.attending.no}
            max={stats.total}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Régimes alimentaires */}
      {stats.dietary.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Régimes Alimentaires Spéciaux ({stats.dietary.length})
          </h3>
          <div className="space-y-3">
            {stats.dietary.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <span className="font-semibold text-gray-700">
                  {item.name}:
                </span>
                <span className="text-gray-600">{item.dietary}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Répartition des enfants par âge */}
      {stats.childrenByAge && Object.keys(stats.childrenByAge).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Répartition des Enfants par Âge
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(stats.childrenByAge)
              .sort(([ageA], [ageB]) => {
                // Trier par âge numérique si possible
                const numA = parseInt(ageA);
                const numB = parseInt(ageB);
                if (!isNaN(numA) && !isNaN(numB)) {
                  return numA - numB;
                }
                return ageA.localeCompare(ageB);
              })
              .map(([age, count]) => (
                <div
                  key={age}
                  className="flex items-center justify-between p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <span className="font-semibold text-gray-700">👶 {age}</span>
                  <span className="px-3 py-1 bg-pink-500 text-white rounded-full text-sm font-bold">
                    {count} {count > 1 ? "enfants" : "enfant"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Statistiques Hôtel */}
      {stats.hotel && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            🏨 Réservations d'Hôtel
          </h3>

          {/* Graphique besoin hôtel */}
          <div className="mb-6">
            <div className="flex items-end gap-4 h-48">
              <BarChart
                label="Besoin hôtel"
                value={stats.hotel.needed}
                max={stats.total}
                color="bg-blue-500"
              />
              <BarChart
                label="Pas d'hôtel"
                value={stats.hotel.notNeeded}
                max={stats.total}
                color="bg-gray-400"
              />
            </div>
          </div>

          {/* Types de chambres */}
          {stats.hotel.roomTypes &&
            Object.keys(stats.hotel.roomTypes).length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Types de Chambres Demandées
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(stats.hotel.roomTypes)
                    .sort(([, countA], [, countB]) => countB - countA)
                    .map(([roomType, count]) => (
                      <div
                        key={roomType}
                        className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <span className="font-semibold text-gray-700">
                          🛏️ {roomType}
                        </span>
                        <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-bold">
                          {count}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

          {/* Total nuitées */}
          {stats.hotel.totalNights > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">
                  🌙 Total de nuitées réservées
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {stats.hotel.totalNights}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistiques Repas de la Veille */}
      {stats.dinner && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            🍽️ Repas de la Veille à Stresa
          </h3>

          <div className="flex items-end gap-4 h-48">
            <BarChart
              label="Participeront"
              value={stats.dinner.attending}
              max={stats.total}
              color="bg-emerald-500"
            />
            <BarChart
              label="Ne participeront pas"
              value={stats.dinner.notAttending}
              max={stats.total}
              color="bg-gray-400"
            />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">
                  ✅ Participants
                </span>
                <span className="text-3xl font-bold text-emerald-600">
                  {stats.dinner.attending}
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">❌ Absents</span>
                <span className="text-3xl font-bold text-gray-600">
                  {stats.dinner.notAttending}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques Brunch */}
      {stats.brunch && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            🥐 Brunch du Lendemain
          </h3>

          <div className="flex items-end gap-4 h-48">
            <BarChart
              label="Participeront"
              value={stats.brunch.attending}
              max={stats.total}
              color="bg-amber-500"
            />
            <BarChart
              label="Ne participeront pas"
              value={stats.brunch.notAttending}
              max={stats.total}
              color="bg-gray-400"
            />
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">
                  ✅ Participants
                </span>
                <span className="text-3xl font-bold text-amber-600">
                  {stats.brunch.attending}
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">❌ Absents</span>
                <span className="text-3xl font-bold text-gray-600">
                  {stats.brunch.notAttending}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistiques Transport */}
      {stats.transport && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            🚌 Transport Retour
          </h3>

          <div className="flex items-end gap-4 h-48">
            <BarChart
              label="Bus 1 (00h30)"
              value={stats.transport.bus1}
              max={stats.total}
              color="bg-rose-gold"
            />
            <BarChart
              label="Bus 2 (3h)"
              value={stats.transport.bus2}
              max={stats.total}
              color="bg-gold"
            />
            <BarChart
              label="Propre moyen"
              value={stats.transport.own}
              max={stats.total}
              color="bg-gray-500"
            />
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-gold">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">
                  🚌 Bus 1
                </span>
                <span className="text-3xl font-bold text-rose-gold">
                  {stats.transport.bus1}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Après le gâteau</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-gold">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">
                  🚌 Bus 2
                </span>
                <span className="text-3xl font-bold text-gold">
                  {stats.transport.bus2}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Fin de soirée</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-semibold">
                  🚗 Propre moyen
                </span>
                <span className="text-3xl font-bold text-gray-600">
                  {stats.transport.own}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Transport personnel</p>
            </div>
          </div>
        </div>
      )}

      {/* Réponses par date */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Réponses par Date
        </h3>
        <div className="space-y-2">
          {Object.entries(stats.byDate).map(([date, count]) => (
            <div
              key={date}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-semibold text-gray-700">{date}</span>
              <span className="px-3 py-1 bg-rose-gold text-white rounded-full text-sm font-bold">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant Vue Réponses
function ResponsesView({ responses, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttending, setFilterAttending] = useState("all");

  const filteredResponses = responses.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterAttending === "all" || r.attending === filterAttending;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rechercher
            </label>
            <input
              type="text"
              placeholder="Nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filtrer par présence
            </label>
            <select
              value={filterAttending}
              onChange={(e) => setFilterAttending(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/20 outline-none bg-white">
              <option value="all">Tous</option>
              <option value="yes">Présents</option>
              <option value="no">Absents</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des réponses */}
      <div className="space-y-4">
        {filteredResponses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">Aucune réponse trouvée</p>
          </div>
        ) : (
          filteredResponses.map((response) => (
            <ResponseCard
              key={response.id}
              response={response}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Composant Carte de Statistique
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-4xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div
          className={`${color} text-white text-4xl w-16 h-16 rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Composant Bar Chart
function BarChart({ label, value, max, color }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="flex-1 flex flex-col items-center">
      <div
        className="w-full bg-gray-200 rounded-t-lg relative"
        style={{ height: "200px" }}>
        <div
          className={`${color} absolute bottom-0 w-full rounded-t-lg transition-all duration-500 flex items-end justify-center pb-2`}
          style={{ height: `${percentage}%` }}>
          <span className="text-white font-bold text-lg">{value}</span>
        </div>
      </div>
      <p className="mt-3 font-semibold text-gray-700 text-center">{label}</p>
    </div>
  );
}

// Composant Carte de Réponse
function ResponseCard({ response, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const attendingColor = {
    yes: "bg-green-100 text-green-800 border-green-300",
    no: "bg-red-100 text-red-800 border-red-300",
    maybe: "bg-yellow-100 text-yellow-800 border-yellow-300",
  }[response.attending];

  const attendingText = {
    yes: "✓ Présent",
    no: "✗ Absent",
    maybe: "? À confirmer",
  }[response.attending];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-rose-gold">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-800">
                {response.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${attendingColor}`}>
                {attendingText}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">📧 Email:</span>{" "}
                {response.email}
              </div>
              {response.phone && (
                <div>
                  <span className="font-semibold">📱 Téléphone:</span>{" "}
                  {response.phone}
                </div>
              )}
              <div>
                <span className="font-semibold">👨‍👩‍ Adultes:</span>{" "}
                {response.adults || 0}
              </div>
              <div>
                <span className="font-semibold">👶 Enfants:</span>{" "}
                {response.children || 0}
              </div>
              {response.childrenAges && (
                <div className="md:col-span-2">
                  <span className="font-semibold">🎂 Âge des enfants:</span>{" "}
                  {response.childrenAges}
                </div>
              )}
            </div>

            {/* Informations Hôtel */}
            {response.hotelNeeded === "yes" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>🏨</span> Hébergement
                </h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                  {response.hotelRoomType && (
                    <div>
                      <span className="font-semibold">Chambre:</span>{" "}
                      {response.hotelRoomType === "single" &&
                        "Simple (1 pers.) - €120"}
                      {response.hotelRoomType === "double" &&
                        "Double (2 pers.) - €140"}
                      {response.hotelRoomType === "triple" &&
                        "Triple (3 pers.) - €160"}
                      {response.hotelRoomType === "quadruple" &&
                        "Quadruple (4 pers.) - €180"}
                    </div>
                  )}
                  {response.hotelCheckIn && (
                    <div>
                      <span className="font-semibold">Arrivée:</span>{" "}
                      {new Date(response.hotelCheckIn).toLocaleDateString(
                        "de-CH"
                      )}
                    </div>
                  )}
                  {response.hotelCheckOut && (
                    <div>
                      <span className="font-semibold">Départ:</span>{" "}
                      {new Date(response.hotelCheckOut).toLocaleDateString(
                        "de-CH"
                      )}
                    </div>
                  )}
                  {response.hotelCheckIn && response.hotelCheckOut && (
                    <div>
                      <span className="font-semibold">Nuits:</span>{" "}
                      {Math.ceil(
                        (new Date(response.hotelCheckOut) -
                          new Date(response.hotelCheckIn)) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Repas de la veille */}
            {response.dinnerAttending === "yes" && (
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>🍝</span> Présent au repas de la veille à Stresa
                </p>
              </div>
            )}

            {/* Brunch du lendemain */}
            {response.brunchAttending === "yes" && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>🥐</span> Présent au brunch du lendemain
                </p>
              </div>
            )}

            {/* Transport retour */}
            {response.transportChoice && (
              <div className="mt-4 p-4 bg-rose-50 rounded-lg border border-rose-gold border-opacity-30">
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  <span>🚌</span> Transport :{" "}
                  {response.transportChoice === "bus1" && "Bus 1 (00h30)"}
                  {response.transportChoice === "bus2" && "Bus 2 (3h)"}
                  {response.transportChoice === "own" && "🚗 Propre moyen"}
                </p>
              </div>
            )}

            {(response.dietary || response.message) && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-rose-gold hover:text-gold font-semibold text-sm">
                {expanded ? "▼ Masquer les détails" : "▶ Voir plus de détails"}
              </button>
            )}

            {expanded && (
              <div className="mt-4 space-y-3 pt-4 border-t border-gray-200">
                {response.dietary && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">
                      🍽️ Régime alimentaire:
                    </p>
                    <p className="text-gray-600 bg-amber-50 p-3 rounded-lg">
                      {response.dietary}
                    </p>
                  </div>
                )}
                {response.message && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">
                      💌 Message:
                    </p>
                    <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">
                      {response.message}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => onDelete(response.id)}
            className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Supprimer">
            🗑️
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-400">
          📅 Reçu le {new Date(response.timestamp).toLocaleString("de-CH")}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
