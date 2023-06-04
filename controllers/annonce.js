const Annonce = require('../models/annonce');

// if userA.Admin == true
exports.createAnnonce = (req, res, next) => {
  const annonce = new Annonce({
    nom_association: req.body.nom_association,
    nom_mission: req.body.nom_mission,
    email: req.body.email,
    numero_mission: req.body.numero_mission,
    desc: req.body.desc,
    date: req.body.date,
    duree: req.body.duree,
    nbr_benevole: req.body.nbr_benevole, // nombre de personne requise
    competence: req.body.competence,
    pays: req.body.pays,
    ville: req.body.ville,
    code_postal: req.body.code_postal,
    rue: req.body.rue,
  
  });
  annonce.save()
  .then(() => {res.status(201).json({message: "Annonce created successfully!" })})
  .catch((error) => {res.status(400).json({ error: error})})
};

exports.getOneAnnonce = (req, res, next) => {
  Annonce.findOne({_id: req.params.id})
  .then((annonce) => {res.status(200).json(annonce);})
  .catch((error) => {res.status(404).json({error: error})});
};

exports.getOneAnnonceMission = (req, res, next) => {
  Annonce.findOne({numero_mission: req.params.id})
  .then((annonce) => {res.status(200).json(annonce);})
  .catch((error) => {res.status(404).json({error: error})});
};


// if userA.Admin == true
exports.modifyAnnonce = (req, res, next) => {
  const annonce = {
    nom_annonce: req.body.nom_annonce,
    nom_mission: req.body.nom_mission,
    numero_mission: req.body.numero_mission,
    email: req.body.email,
    desc: req.body.desc,
    date: req.body.date,
    duree: req.body.duree,
    nbr_benevole: req.body.nbr_benevole, // nombre de personne requise
    competence: req.body.competence,
    pays: req.body.pays,
    ville: req.body.ville,
    code_postal: req.body.code_postal,
    rue: req.body.rue,
  };

  Annonce.findOneAndUpdate({ numero_mission: req.params.id }, annonce, { new: true })
    .then(updatedAnnonce => {
      if (updatedAnnonce) {
        res.status(202).json({ message: "Annonce updated successfully!", annonce: updatedAnnonce });
      } else {
        res.status(404).json({ message: "Annonce not found" });
      }
    })
    .catch(error => {
      res.status(400).json({ error: error });
    });
};


exports.deleteAnnonce = (req, res, next) => {
  Annonce.deleteOne({numero_mission: req.params.numero_mission})
  .then(() => {res.status(200).json({message: "Deleted!"});})
  .catch((error) => {res.status(400).json({message:"error",error: error})});
};

exports.getAllAnnonce = (req, res, next) => {
  Annonce.find()
  .then((annonce) => {res.status(200).json(annonce);})
  .catch((error) => {res.status(400).json({error: error})});
};