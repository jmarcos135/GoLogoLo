var mongoose = require('mongoose');

TextBoxSchema = new mongoose.Schema({
  id: String,
  layerIndex: Number,
  text: String,
  fontSize: Number,
  color: String,
  x: Number,
  y: Number
});

ImageBoxSchema = new mongoose.Schema({
  id: String,
  layerIndex: Number,
  url: String,
  width: Number,
  height: Number,
  x: Number,
  y: Number
});

var LogoSchema = new mongoose.Schema({
  id: String,
  name: String,
  width: Number,
  height: Number,
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 0, max: 144 },
  borderWidth: { type: Number, min: 0, max: 144 },
  textBoxes: [TextBoxSchema],
  imageBoxes: [ImageBoxSchema],
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = {
  LogoSchema: LogoSchema,
  Logo: mongoose.model('Logo', LogoSchema)
}