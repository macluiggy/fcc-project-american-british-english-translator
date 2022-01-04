"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;
    if (!locale && !text)
      return res.json({ error: "Required field(s) missing" });
    if (text == "") return res.json({ error: "No text to translate" });

    let translation = "";
    if (locate == "american-to-british") {
      translation = translator.toBritishEnglish(text);
    } else if (locate == "american-to-british") {
      translation = translator.toAmericanEnglish(text);
    } else {
      return res.json({ error: "Invalid value for locale filed" });
    }
    if (translation == text || !translation) {
      return res.json({ text, translation: "Everything looks good to me|" });
    } else {
      return res.json({ text, translation: translation[1] });
    }
  });
};
