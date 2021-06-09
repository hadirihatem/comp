var Groupe = require("../models/Groupe");

//----------------create groupe ------------

exports.insert = (req, res) => {
  Groupe.createGroupe(req.body).then((groupe) => {
    groupe != undefined
      ? res.statut(201).send({ msg: "groupe created successfuly" })
      : res.statut(400).send({ msg: "invalid groupe" });
  });
};

//---------------getbyid-------

exports.getById = (req, res) => {
  Groupe.findById(req.params.groupeId)
    .then(() => res.send(groupe))
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    });
};
//-------update--------------

exports.update = (req, res) => {
 Groupe.putgroupe(req.body,req.params.groupeId)
 .then(()=>{
    res.status(200).send([
        {
          msg: "groupe updated",
        },
      ]);
    })
    .catch(() =>
      res.status(404).send("groupe not found, retry with a valid groupeId.")
    );
};

//----------remove---------

exports.removeById = (req, res) => {
  Groupe.removeById(req.params.groupeId)

    .then(() => {
      res.status(200).send([
        {
          msg: "groupe deleted",
        },
      ]);
    })
    .catch(() =>
      res.status(404).send("groupe not found, retry with a valid groupeId.")
    );
};
 


//------------------------------





exports.list = (req, res) => {
  // let limit =
  //   req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }

  if (req.query.name) {
    Groupe.findByName(req.query.name)
      .then((result) => {
        console.log(result);
        res.status(200).send({
          code: 200,
          status: "success",
          message: "groupe fetched",
          data: result,
          //req: req.query,
        });
      })
      .catch((e) =>
        res
          .status(404)
          .send("groupe not found, retry with a valid GroupeId.")
      );
  }

  if (req.query.groupeAdmin) {
    Groupe.findByGroupeAdmin(req.query.groupeAdmin)
      .then((result) => {
        res.status(200).send({
          code: 200,
          status: "success",
          message: "groupe fetched",
          data: result,
          //req: req.query,
        });
      })
      .catch((e) =>
        res
          .status(404)
          .send("groupe not found, retry with a valid GroupeId.")
      );
  }

  if (req.query.UsesrId) {
    Groupe.findByUserId(req.query.UsesrId)
      .then((result) => {
        res.status(200).send({
          code: 200,
          status: "success",
          message: "groupe fetched",
          data: result,
          //req: req.query,
        });
      })
      .catch((e) =>
        res
          .status(404)
          .send("groupe not found, retry with a valid GroupeId.")
      );
  }
  ProjectModel.list(page).then((result) => {
    res.status(200).send({
      code: 200,
      status: "success",
      message: "groupe fetched",
      data: result,
    });
  });
};