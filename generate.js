const { randomBytes } = require("crypto");
const dictionary = require("./words.json");

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const punctuation = "!\"#$%&'()*+,-./:;<=>?@[]^_{|}";
const consonants = "bcdfghjklmnpqrstvwxyz";
const starts = [...consonants.replace(/[qxc]/g, ""), ..."bl br cl cr dr fl fr gl gr pl pr sk sl sm sn sp st str sw tr".split(" ")];
const ends = [...consonants.replace(/[qxcsj]/g, ""), ..."ct ft mp nd ng nk nt pt sk sp ss st".split(" ")];
const syllables = starts.flatMap(start => [..."aeiou"].flatMap(vowel => ends.map(end => start + vowel + end)));

const styles = [
  ["含符号", letters + digits + punctuation],
  ["字母数字", letters + digits],
  ["易辨识字母数字", (letters + digits).replace(/[iIlL10Oo]/g, "")],
  ["纯数字", digits],
  ["可发音词组", syllables],
  ["英文单词", dictionary],
];

module.exports = function generate(length) {
  let bytes = [];
  let offset = 0;
  function pick(pool) {
    const limit = 65536 - 65536 % pool.length;
    let sample;
    do {
      if (offset === bytes.length) {
        bytes = randomBytes(256);
        offset = 0;
      }
      sample = bytes[offset++] * 256 + bytes[offset++];
    } while (sample >= limit);
    return pool[sample % pool.length];
  }

  return styles.map(([label, pool]) => {
    const parts = [];
    const words = Array.isArray(pool);
    let size = 0;
    while (size < length) {
      const part = pick(pool);
      parts.push(part);
      size += part.length + (words ? 1 : 0);
    }
    return { label, password: parts.join(words ? "-" : ""), bits: Math.log2(pool.length) * parts.length };
  });
};
