const Participer = require('../models/participer');

// if user.Admin == true
exports.createParticiper = (req, res, next) => {
  const participer = new Participer({
    missionId: req.body.missionId,
    id_user: req.body.id_user,

  });
  participer.save().then(
    () => {
      res.status(201).json({
        message: "participation créée!"
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

exports.getOneParticiper = (req, res, next) => {
    Participer.findOne({
    _id: req.params.id
  }).then(
    (participer) => {
      res.status(200).json(participer);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.getOneParticiperMission = (req, res, next) => {
  Participer.find({
  missionId: req.params.id
}).then(
  (participer) => {
    res.status(200).json(participer);
  }
).catch(
  (error) => {
    res.status(404).json({
      error: error
    });
  }
);
};

exports.getParticiperUser = (req, res, next) => {
  Participer.find({
    id_user: req.params.id_user
  }).then(
    (participer) => {
      const missionIds = participer.map((participation) => participation.missionId);
      res.status(200).json(missionIds);
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
exports.modifyParticiper = (req, res, next) => {
  const participer = new Participer({
    id_avis: req.body.id_avis,
  });
  Participer.updateOne({_id: req.params.id}, participer).then(
    () => {
      res.status(201).json({
        message: "participer mise à jour!"
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

exports.deleteParticiper = (req, res, next) => {

    Participer.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: "Participer supprimée!"
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

exports.getAllParticiper = (req, res, next) => {
    Participer.find().then(
    (participer) => {
      res.status(200).json(participer);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};