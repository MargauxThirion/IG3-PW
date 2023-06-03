const bcrypt = require('bcrypt');
const UserBen = require('../models/userBen');
const jwt = require('jsonwebtoken');

//const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 jours en ms

const createToken = (payload) => {
  return jwt.sign({payload}, process.env.SECRET_TOKEN, {
    expiresIn: process.env.MAX_AGE
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
                num_telU: req.body.num_telU,
                competenceU: req.body.competenceU,
                
            });
            console.log('User:', userBen);
            userBen.save() // enregistre le nouvel utilisateur
                .then(() => res.status(201).json({ message: "Utilisateur bénévole crée !"}))
                .catch(error => res.status(400).json({ error}));
        })
        .catch(error => res.status(500).json({ error}));
};


exports.login = async (req, res, next) => {
    try {
        const userBen = await UserBen.findOne({ emailU: req.body.emailU });
        if (!userBen) {
            return res.status(401).json({ message: "Email incorrect" });
        }

        const valid = await bcrypt.compare(req.body.passwordU, userBen.passwordU);
        if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const payload = { email: req.body.emailU, IsAsso: false };
        const token = createToken(payload);
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.MAX_AGE });
        res.status(200).json({email : req.body.emailU, token: token });
        res.send('Connexion réussie !');
        res.setHeader('Authorization', `Bearer ${token}`);
        console.log('token:', token);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getProfileByMail = (req, res, next) => {
    const decodedEmail = decodeURIComponent(req.params.emailU);
    UserBen.find({emailU: decodedEmail})
    .then((userBen) => { res.status(200).json(userBen)})
    .catch((error) => {res.status(404).json({error: error})});
};