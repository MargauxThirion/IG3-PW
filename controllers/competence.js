const Competence = require('../models/competence');

// if user.Admin == true
exports.createCompetence = (req, res, next) => {
  const competence = new Competence({
    id_competence: req.body.id_competence,
  });
  competence.save().then(
    () => {
      res.status(201).json({
        message: "Compétence créée!"
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

exports.getOneCompetence = (req, res, next) => {
  Competence.findOne({
    _id: req.params.id
  }).then(
    (competence) => {
      res.status(200).json(competence);
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
exports.modifyCompetence = (req, res, next) => {
  const competence = new Competence({
    id_competence: req.body.id_competence,
  });
  Competence.updateOne({_id: req.params.id}, competence).then(
    () => {
      res.status(201).json({
        message: "Competence mise à jour!"
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

exports.deleteCompetence = (req, res, next) => {

  Competence.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: "Competence supprimée!"
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

exports.getAllCompetence = (req, res, next) => {
  Competence.find().then(
    (competence) => {
      res.status(200).json(competence);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};