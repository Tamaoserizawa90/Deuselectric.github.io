const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.get('/', (req, res) => {
  res.send('Serveur Deus Electric operationnel !');
});

app.post('/devis', async (req, res) => {
  const { nom, telephone, service, message } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'kayaorchide94@gmail.com',
      subject: 'Nouvelle demande de devis - Deus Electric',
      html: `<h2>Nouvelle demande</h2>
             <p><b>Nom:</b> ${nom}</p>
             <p><b>Tel:</b> ${telephone}</p>
             <p><b>Service:</b> ${service}</p>
             <p><b>Message:</b> ${message}</p>`
    });
    res.json({ succes: true, message: 'Demande reçue !' });
  } catch(err) {
    console.error(err);
    res.json({ succes: true, message: 'Demande reçue !' });
  }
});

app.listen(3000, () => {
  console.log('Serveur demarre sur le port 3000');
});
