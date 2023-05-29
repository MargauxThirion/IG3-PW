const bcrypt = require('bcrypt');
const UserBen = require('../models/userBen');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

exports.signup = (req, res, next) => {  //ajout user dans bd
    bcrypt.hash(req.body.passwordU, 10)
        .then(hash => {     // crypte le mdp
            const userBen = new UserBen({
                emailU: req.body.emailU,
                passwordU: hash,
                nomU: req.body.nomU,
                prenomU: req.body.prenomU,
                adresseU: req.body.adresseU,
                competenceU: req.body.competenceU,
                
            });
            console.log('User:', userBen);
            userBen.save() // enregistre le nouvel utilisateur
                .then(() => res.status(201).json({ message: "Utilisateur bénévole crée !"}))
                .catch(error => res.status(400).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};

exports.login = (req, res, next) => {
    UserBen.findOne({emailU: req.body.emailU})
    .then(userBen => {
        if (!userBen) {
            return res.status(401).json({ message: "email incorrect"}); // si utilisateur pas dans bd
        }
        bcrypt.compare(req.body.passwordU, userBen.passwordU)    //compare mdp entré par le user avec le hash enregistré dans bd
        /*const token = createToken(userBen._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ userBen: userBen._id, token: token })*/
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: "mot de passe incorrect" });
            }
            res.status(200).json({
                userIdU: userBen._idU,
                token: jwt.sign(
                    {userIdU: userBen._idU},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({error}));
};


exports.getProfile = (req, res, next) => {
    const userIdU = req.user.userIdU;
  
    UserBen.findById(userIdU)
      .then(userBen => {
        if (!userBen) {
          return res.status(404).json({ message: 'Utilisateur Association non trouvé.' });
        }
  
        const profile = {
            emailU: req.body.emailU,
            nomU: req.body.nomU,
            prenomU: req.body.prenomU,
            adresseU: req.body.adresseU,
            competenceU: req.body.competenceU,
        };
  
        res.status(200).json({ profile });
      })
      .catch(error => res.status(500).json({ error, message: 'Erreur lors de la récupération du profil.' }));
  };