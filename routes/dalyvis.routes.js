module.exports = app => {
    const dalyviai = require("../controllers/dalyvis.controller.js");
  
    var router = require("express").Router();

    router.post("/", dalyviai.create);
    router.get("/", dalyviai.findAll);
    router.get("/:id", dalyviai.findOne);
    router.put("/:id", dalyviai.update);
    router.delete("/:id", dalyviai.delete);
  
    app.use('/api/dalyviai', router);
  };