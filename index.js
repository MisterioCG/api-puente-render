const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

app.post('/recibirDatos', async (req, res) => {
  try {
    const datosSensor = req.body;
    console.log('📥 Datos recibidos del sensor:', datosSensor);

    const firebaseURL = 'https://us-central1-suelo-agricola-2025.cloudfunctions.net/recibirDatos';
    const respuesta = await axios.post(firebaseURL, datosSensor);

    console.log('✅ Datos enviados a Firebase:', respuesta.status);
    
    // ✅ RESPUESTA SIMPLE PARA EVITAR CICLOS EN EL SENSOR
    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error al reenviar a Firebase:', error.message);
    res.status(500).send('ERROR');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API puente corriendo en el puerto ${PORT}`);
});
