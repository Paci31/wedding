// Script de test de l'API
// Usage: node test-api.js

const API_URL = 'http://localhost:3001';

// Test 1: Health check
async function testHealth() {
  console.log('🔍 Test 1: Health Check...');
  try {
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    console.log('✅ Health check OK:', data);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

// Test 2: Soumettre un RSVP
async function testSubmitRSVP() {
  console.log('\n🔍 Test 2: Soumettre un RSVP...');
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+33 6 12 34 56 78',
      attending: 'yes',
      adults: '2',
      children: '1',
      childrenAges: '5 ans',
      dietary: 'Test - Végétarien',
      message: 'Test message'
    };

    const response = await fetch(`${API_URL}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const data = await response.json();
    if (data.success) {
      console.log('✅ RSVP soumis avec succès:', data);
      return data.id;
    } else {
      console.error('❌ Échec de soumission:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return null;
  }
}

// Test 3: Login admin
async function testAdminLogin() {
  console.log('\n🔍 Test 3: Connexion Admin...');
  try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: 'wedding2026'
      })
    });

    const data = await response.json();
    if (data.success) {
      console.log('✅ Connexion admin réussie');
      return true;
    } else {
      console.error('❌ Connexion admin échouée:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return false;
  }
}

// Test 4: Récupérer les réponses (authentifié)
async function testGetResponses() {
  console.log('\n🔍 Test 4: Récupérer les réponses...');
  try {
    const response = await fetch(`${API_URL}/api/admin/responses`, {
      headers: {
        'username': 'admin',
        'password': 'wedding2026'
      }
    });

    const data = await response.json();
    if (data.success) {
      console.log(`✅ ${data.data.length} réponse(s) récupérée(s)`);
      return data.data;
    } else {
      console.error('❌ Échec:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return null;
  }
}

// Test 5: Récupérer les statistiques
async function testGetStats() {
  console.log('\n🔍 Test 5: Récupérer les statistiques...');
  try {
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      headers: {
        'username': 'admin',
        'password': 'wedding2026'
      }
    });

    const data = await response.json();
    if (data.success) {
      console.log('✅ Statistiques:', {
        total: data.data.total,
        présents: data.data.attending.yes,
        adultes: data.data.guests.totalAdults,
        enfants: data.data.guests.totalChildren
      });
      return true;
    } else {
      console.error('❌ Échec:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return false;
  }
}

// Test 6: Supprimer une réponse
async function testDeleteResponse(id) {
  if (!id) {
    console.log('\n⏭️  Test 6: Suppression ignorée (pas d\'ID de test)');
    return true;
  }

  console.log('\n🔍 Test 6: Supprimer la réponse de test...');
  try {
    const response = await fetch(`${API_URL}/api/admin/responses/${id}`, {
      method: 'DELETE',
      headers: {
        'username': 'admin',
        'password': 'wedding2026'
      }
    });

    const data = await response.json();
    if (data.success) {
      console.log('✅ Réponse de test supprimée');
      return true;
    } else {
      console.error('❌ Échec:', data);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    return false;
  }
}

// Exécuter tous les tests
async function runAllTests() {
  console.log('========================================');
  console.log('🎉 Tests API - Système RSVP Mariage');
  console.log('========================================\n');

  let testId = null;

  // Test 1
  const healthOk = await testHealth();
  if (!healthOk) {
    console.log('\n❌ Le serveur ne répond pas. Assurez-vous qu\'il est démarré.');
    console.log('   Commande: cd backend && npm start');
    return;
  }

  // Test 2
  testId = await testSubmitRSVP();

  // Test 3
  await testAdminLogin();

  // Test 4
  await testGetResponses();

  // Test 5
  await testGetStats();

  // Test 6
  await testDeleteResponse(testId);

  console.log('\n========================================');
  console.log('✅ Tous les tests terminés !');
  console.log('========================================\n');
}

// Lancer les tests
runAllTests().catch(console.error);

