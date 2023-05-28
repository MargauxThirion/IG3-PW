const bcrypt = require('bcrypt');
const UserU = require('../models/userU');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {  //ajout user dans bd
    bcrypt.hash(req.body.password, 10)
        .then(hash => {     // crypte le mdp
            const userU = new UserU({
                num_userU: req.body.num_userU,
                emailU: req.body.emailU,
                passwordU: hash,
                nomU: req.body.nomU,
                prenomU: req.body.prenomU,
                adresseU: req.body.adresseU,
                competenceU: req.body.competenceU,
                
            });
            userU.save() // enregistre le nouvel utilisateur
                .then(() => res.status(201).json({ message: "Utilisateur bénévole crée !"}))
                .catch(error => res.status(400).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};

exports.login = (req, res, next) => {
    UserU.findOne({emailU: req.body.emailU})
    .then(userU => {
        if (!userU) {
            return res.status(401).json({ message: "login/mot de passe incorrecte"}); // si utilisateur pas dans bd
        }
        bcrypt.compare(req.body.passwordU, userU.passwordU)    //compare mdp entré par le user avec le hash enregistré dans bd
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: "login/mot de passe incorrecte" });
                }
                res.status(200).json({
                    userId: userU._id,
                    token: jwt.sign(
                        {userId: userU._id},
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({error}));
};