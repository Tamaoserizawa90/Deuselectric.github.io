const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur Deus Electric operationnel !');
});

app.post('/devis', (req, res) => {
  const { nom, telephone, service, message } = req.body;
  console.log('Nouvelle demande de devis :');
  console.log('Nom:', nom);
  console.log('Tel:', telephone);
  console.log('Service:', service);
  console.log('Message:', message);
  res.json({ succes: true, message: 'Demande reçue !' });
});

app.listen(3000, () => {
  console.log('Serveur demarre sur le port 3000');
});
