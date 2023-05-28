require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const annonceRoutes = require('./routes/annonce');
const userURoutes = require('./routes/userU');
const userAssoRoutes = require('./routes/userAsso');
const competenceRoutes = require('./routes/competence');
const avisRoutes = require('./routes/avis');
const participerRoutes = require('./routes/participer');

mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());

// header permettant d'accéder à l'API depuis n'importe où
// ajoute les headers mentionnés aux requêtes envoyées vers l'API
// envoie requête avec les méthodes GET, POST ...
//sert à éviter les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());    // pour gérer requète POST, donne le body des requêtes "application/json" sur req
app.get('/', (req, res)=> {
  res.status(200).json({message : "coucou"})
});
app.use('/annonce', annonceRoutes);
app.use('/auth', userURoutes);
app.use('/userAsso', userAssoRoutes);
app.use('/competence', competenceRoutes);
app.use('/avis', avisRoutes);
app.use('/participer', participerRoutes);

module.exports = app;