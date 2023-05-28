const Avis = require('../models/avis');

// if user.Admin == true
exports.createAvis = (req, res, next) => {
  const avis = new Avis({
    missionId: req.body.missionId,
    id_user: req.body.id_user,
    commentaire: req.body.commentaire,

  });
  avis.save().then(
    () => {
      res.status(201).json({
        message: "Avis créée!"
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneAvis = (req, res, next) => {
  Avis.findOne({
    _id: req.params.id
  }).then(
    (avis) => {
      res.status(200).json(avis);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.getOneAvisMission = (req, res, next) => {
  Avis.find({
    missionId: req.params.missionId
  }).then(
    (avis) => {
      res.status(200).json(avis);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// if user.Admin == true
exports.modifyAvis = (req, res, next) => {
  const avis = new Avis({
    id_avis: req.body.id_avis,
  });
  Avis.updateOne({_id: req.params.id}, avis).then(
    () => {
      res.status(201).json({
        message: "Avis mise à jour!"
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteAvis = (req, res, next) => {

  Avis.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: "Avis supprimée!"
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllAvis = (req, res, next) => {
  Avis.find().then(
    (avis) => {
      res.status(200).json(avis);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};