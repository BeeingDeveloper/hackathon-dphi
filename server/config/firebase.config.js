<<<<<<< HEAD
=======

>>>>>>> 0891b498803585fff210c7eec2c5813713912bb6
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

<<<<<<< HEAD
=======


>>>>>>> 0891b498803585fff210c7eec2c5813713912bb6
module.exports = admin;