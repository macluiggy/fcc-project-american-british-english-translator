const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

const reverseDict = (obj) =>
  Object.assign(
    {},
    ...Object.entries(obj).map(([key, value]) => ({ [value]: key }))
  );
class Translator {
  translate(text, dict, titles, timeRegex, locale) {
    const lowerText = text.toLowerCase();
    const matchesMap = {};

    Object.entries(titles).map(([k, v]) => {
      if (lowerText.includes(k)) {
        matchesMap[k] = v.charAt(0).toUpperCase() + v.slice(1);
      }
    });
    const wordsWithSpaces = Object.fromEntries(
      Object.entries(dict).filter(([k, v]) => k.includes(" "))
    );

    Object.entries(wordsWithSpaces).map(([k, v]) => {
      if (lowerText.includes(k)) {
        matchesMap[k] = v;
      }
    });

    lowerText.match(/(\w+([-'])(\w+)?[-']?(\w+))|\w+/g).forEach((word) => {
      if (dict[word]) matchesMap[word] = dict[word];
    });

    const matchedTimes = lowerText.match(timeRegex);

    if (matchedTimes) {
      matchedTimes.map((e) => {
        if (locale === "toBritish") {
          return (matchesMap[e] = e.replace(":", "."));
        }
        return (matchesMap[e] = e.replace(".", ":"));
      });
    }

    if (Object.keys(matchesMap).length === 0) return null;

    console.log("matchesMap :>>", matchesMap);
    const translation = this.replaceAll(text, matchesMap);

    const translationWithHighlight = this.replaceAllWithHighlight(
      text,
      matchesMap
    );

    return [translation, translationWithHighlight];
  }
  replaceAll(text, matchesMap) {
    const re = new RegExp(Object.keys(matchesMap).join("|"), "gi");
    return text.replace(re, (matched) => matchesMap[matched.toLowerCase()]);
  }
  replaceAllWithHighlight(text, matchesMap) {
    const re = new RegExp(Object.keys(matchesMap).join("|"), "gi");
    return text.replace(re, (matched) => {
      const highlighted = matchesMap[matched.toLowerCase()];
      return `<span class="highlight">${highlighted}</span>`;
    });
  }
  toBritishEnglish(text) {
    const dict = { ...americanOnly, ...americanToBritishSpelling };
    const titles = americanToBritishTitles;
    const timeRegex = /([1-9]|1[0-2]):[0-5][0-9]/g;
    const translated = this.translate(
      text,
      dict,
      titles,
      timeRegex,
      "toBritish"
    );
    if (!translated) return text;
    return translated;
  }
  toAmericanEnglish(text) {
    const dict = { ...britishOnly, ...reverseDict(americanToBritishSpelling) };
    const titles = reverseDict(americanToBritishTitles);
    const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g; ///([1-9]|1[0-2]):[0-5][0-9]/g;
    const translated = this.translate(
      text,
      dict,
      titles,
      timeRegex,
      "toAmerican"
    );
    if (!translated) return text;
    return translated;
  }
}

module.exports = Translator;
