const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const db = require("../models");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("../routes/dalyvis.routes")(app);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveris veikia prievadu ${PORT}.`);
});


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Prisijungėme prie duomenų bazės!");
  })
  .catch(err => {
    console.log("Nepavyko susijungti su duomenų baze!", err);
    process.exit();
  });