const bcrypt = require('bcrypt');
const UserAsso = require('../models/userAsso');
const jwt = require('jsonwebtoken');
const express = require('express');
const cookieParser = require('cookie-parser');

const createToken = (payload) => {
    return jwt.sign({payload}, process.env.SECRET_TOKEN, {
      expiresIn: process.env.MAX_AGE
    })
  };

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

exports.login = async (req, res, next) => {
    try {
        const userAsso = await UserAsso.findOne({ emailA: req.body.emailA });
        if (!userAsso) {
            return res.status(401).json({ message: "Email incorrect" });
        }

        const valid = await bcrypt.compare(req.body.passwordA, userAsso.passwordA);
        if (!valid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        const payload = { email: req.body.emailA, IsAsso: true };
        const token = createToken(payload);
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.MAX_AGE });
        res.status(200).json({email : req.body.emailA, token: token, nom: userAsso.nomA });
        res.send('Connexion réussie !');
        res.setHeader('Authorization', `Bearer ${token}`);
        console.log('token:', token);
    } catch (error) {
        res.status(500).json({ error });
    }
};


exports.getProfileByMail = (req, res, next) => {
    const decodedEmail = decodeURIComponent(req.params.emailA);
    UserAsso.find({emailA: decodedEmail})
    .then((userAsso) => { res.status(200).json(userAsso)})
    .catch((error) => {res.status(404).json({error: error})});
};