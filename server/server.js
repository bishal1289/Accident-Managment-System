const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/accidents").then(() => { 
    console.log("Connected to the database");
}).catch((err) => console.log(err))

const accidentSchema = new mongoose.Schema({
  latitude: String,
    longitude: String,
  reported: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const Accident = mongoose.model("Accident", accidentSchema);

app.post("/submit", async (req, res) => {
  const { latitude, longitude } = req.body;
  const newAccident = new Accident({ latitude, longitude });
  try {
    const savedAccident = await newAccident.save();
    res.status(201).json(savedAccident); 
  } catch (error) {
    res.status(400).send("Error saving accident data");
  }
});



app.get('/accidents', async (req, res) => {
  try {
    const accidents = await Accident.find();
    res.json(accidents);
  } catch (error) {
    res.status(500).send('Error fetching accident data');
  }
});

app.delete("/accidents/:id", async (req, res) => {
  try {
    const deletedAccident = await Accident.findByIdAndDelete(req.params.id);
    if (!deletedAccident) {
      return res.status(404).send("Accident not found");
    }
    res.status(200).json(deletedAccident);
  } catch (error) {
    res.status(500).send("Error deleting accident");
  }
});

app.post("/:id/report", async (req, res) => {
    console.log(req.body)
  try {
    const accident = await Accident.findById(req.params.id);
    if (!accident) {
      return res.status(404).json({ message: "Accident not found" });
    }

    accident.reported = true; 
    await accident.save();

    res.json(accident);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
