const bcrypt = require('bcrypt');
const UserAsso = require('../models/userAsso');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {  //ajout user dans bd
    bcrypt.hash(req.body.passwordA, 10)
        .then(hash => {     // crypte le mdp
            const userAsso = new UserAsso({
                nomA: req.body.nomA,
                emailA: req.body.emailA,
                passwordA: hash,
                adresseA: req.body.adresseA,
                num_telA: req.body.num_telA,
                descA: req.body.descA,
                
            });
            console.log('User:', userAsso);
            userAsso.save() // enregistre le nouvel utilisateur
            .then(() => {res.status(201).json({ message: "Utilisateur Association crée !"})})
            .catch(error => {res.status(400).json({ error, message: "email déjà utilisé"})})
        }) 
        .catch(error => {
            console.log(req.body);
            console.log('Hashing Error:', error);
            res.status(500).json({ error, message: "erreur cryptage mdp"})
            });
};

exports.login = (req, res, next) => {
    UserAsso.findOne({emailA: req.body.emailA})
    .then(userAsso => {
        if (!userAsso) {
            return res.status(401).json({ message: "email inconnu"}); // si utilisateur pas dans bd
        }
        bcrypt.compare(req.body.passwordA, userAsso.passwordA)    //compare mdp entré par le user avec le hash enregistré dans bd
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: "mot de passe incorrect" });
                }
                res.status(200).json({
                    userIdA: userAsso._idA,
                    token: jwt.sign(
                        {userIdA: userAsso._idA},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error, message: "erreur de cryptage mdp" }));
    })
    .catch(error => res.status(500).json({error, message: "erreur de recherche dans la bd"}));
};

exports.getProfile = (req, res, next) => {
    const userIdA = req.user.userIdA;
  
    UserAsso.findById(userIdA)
      .then(userAsso => {
        if (!userAsso) {
          return res.status(404).json({ message: 'Utilisateur Association non trouvé.' });
        }
  
        const profile = {
          nomA: userAsso.nomA,
          emailA: userAsso.emailA,
          adresseA: userAsso.adresseA,
          num_telA: userAsso.num_telA,
          descA: userAsso.descA
        };
  
        res.status(200).json({ profile });
      })
      .catch(error => res.status(500).json({ error, message: 'Erreur lors de la récupération du profil.' }));
  };