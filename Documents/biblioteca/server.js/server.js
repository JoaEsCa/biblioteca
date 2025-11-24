require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("🔥 Conectado a MongoDB!"))
.catch(err => console.error("❌ Error conectando:", err));
const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Test", testSchema);
const express = require("express");
const Test = require("./models/Test");
const router = express.Router();
const MONGO_URL = "mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/{JoanisCantillo}";
router.get("/test", async (req, res) => {
  try {
    const doc = new Test({ name: "Funciona!" });
    await doc.save();
    res.json({ message: "Guardado en la base!", doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require("express");
const app = express();
app.use(express.json());
app.use(require("./routes")); // o el nombre que uses

app.listen(3000, () => console.log("Servidor en puerto 3000"));
