var mongoose = require('mongoose');

TextBoxSchema = new mongoose.Schema({
  id: String,
  text: String,
  fontSize: Number,
  color: String,
  width: Number,
  height: Number
});

ImageBoxSchema = new mongoose.Schema({
  id: String,
  url: String,
  width: Number,
  height: Number
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