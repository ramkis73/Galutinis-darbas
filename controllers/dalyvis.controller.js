const db = require("../models");
const Dalyvis = db.dalyviai;

exports.create = (req, res) => {
  if (!req.body.fullName || !req.body.email || !req.body.birthDate) {
    res.status(400).send({ message: "Prašome užpildyti laukelius." });
    return;
  }

  const dalyvis = new Dalyvis({
    fullName: req.body.fullName,
    email: req.body.email,
    birthDate: req.body.birthDate
  });

  dalyvis
    .save(dalyvis)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Įvyko klaida registruojant naują dalyvį."
      });
    });
};

exports.findAll = (req, res) => {
    const fullName = req.query.fullName;
    var condition = fullName ? { fullName: { $regex: new RegExp(fullName), $options: "i" } } : {};
  
    Dalyvis.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Įvyko klaida gaunant visus dalyvius."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Dalyvis.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Nerastas dalyvis su id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Įvyko klaida gauti dalyvį su id=" + id });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Atnaujinimo duomenys negali būti tušti!"
        });
    }
    if (!req.body.fullName || !req.body.email || !req.body.birthDate) {
        return res.status(400).send({ message: "Prašome užpildyti laukelius." });
    }
    
      const id = req.params.id;
    
      Dalyvis.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Negalime atnaujinti dalyvį su id=${id}. Gal dalyvis nerastas.`
            });
          } else res.send({ message: "Dalyvis atnaujintas sėkmingai." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Negalime atnaujinti dalyvį su id=" + id
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Dalyvis.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Negalime ištrinti dalyvį su id=${id}. Gal dalyvis nerastas.`
          });
        } else {
          res.send({
            message: "Dalyvis ištrintas sėkmingai!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Negalime ištrinti dalyvį su id=" + id
        });
      });
};