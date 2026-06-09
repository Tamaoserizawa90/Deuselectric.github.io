const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Serveur Deus Electric operationnel !');
});

app.post('/devis', async (req, res) => {
  const { nom, telephone, service, message } = req.body;
  console.log('Nouvelle demande:', nom, telephone, service);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kayaorchide94@gmail.com',
      subject: 'Nouvelle demande de devis - Deus Electric',
      html: `
        <h2>Nouvelle demande de devis</h2>
        <p><b>Nom:</b> ${nom}</p>
        <p><b>Téléphone:</b> ${telephone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });
    res.json({ succes: true, message: 'Demande reçue !' });
  } catch(err) {
    console.error('Erreur email:', err);
    res.json({ succes: true, message: 'Demande reçue !' });
  }
});

app.listen(3000, () => {
  console.log('Serveur demarre sur le port 3000');
});
