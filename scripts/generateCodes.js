var fs = require("fs");
const dataPath = "./public/data/collections/";

generate("john.json");

const exceptions = ["The", "To", "Vs", "Of", "And", "A", "For", "Edition"];
const maxNumber = 10000;
const maxWordLength = 7;
const minWordLength = 3; // min 1
const maxKeyLength = 16 - maxNumber.toString().length + 1;
const useStrincLength = true;
const maxPhraseLength = 5;
const countKeys = 400;

async function generate(sourceBases) {
  const keys = [];
  const records = await read(`${dataPath}${sourceBases}`).then((response) =>
    JSON.parse(response)
  );
  const games = [...records.map((record) => record.game.alias)].slice(0, 1000);
  const words = games.flatMap((name) =>
    name.split("-").map((word) => formatWord(word))
  );
  const dictionary = getClearDictionary(words);
  console.log(`Длина словаря: ${dictionary.length}`);
  for (let index = 0; index < countKeys; index++) {
    const key = generatePhrase(dictionary);
    keys.push(key);
  }

  const data = keys.join('\n'); // rows

  save(data, `${dataPath}file-with-keys.json`);
}

function generatePhrase(dictionary) {
  const number = generateNumber(maxNumber);
  const words = [];
  let notLongestWord = false;
  for (let index = 0; index < maxPhraseLength; index++) {
    const keyLength = words.join("").length;
    if (keyLength >= maxKeyLength) {
      break;
    }

    notLongestWord = false;
    if (index > 0 && useStrincLength) {
      const emptySpaceLength = maxKeyLength - keyLength;

      if (emptySpaceLength <= maxWordLength + 1) {
        const subDict = dictionary.filter(
          (word) => word.length === emptySpaceLength - 1
        );
        words.push(`${getRandomWord(subDict)}-`);
        break;
      } else if (emptySpaceLength <= maxWordLength + 1 + minWordLength) {
        notLongestWord = true;
      }
    }
    if (notLongestWord) {
      const subDict = dictionary.filter(
        (word) => word.length <= maxWordLength - minWordLength
      );
      words.push(`${getRandomWord(subDict)}-`);
    } else {
      words.push(`${getRandomWord(dictionary)}-`);
    }
  }
  const phrase = `${words.join("")}${number}`;
  return phrase;
}

function getClearDictionary(dictionary) {
  return dictionary
    .filter((word) => word.length <= maxWordLength)
    .filter((word) => word.length >= minWordLength)
    .filter((word) => !exceptions.includes(word))
    .filter((word) => /[A-Za-z]/.test(word));
}

function getRandomWord(dictionary) {
  let index = Math.floor(Math.random() * dictionary.length);
  const word = dictionary[index];

  return word;
}

function generateNumber(max) {
  let number = Math.floor(Math.random() * max).toString();
  number = "0".repeat(max.toString().length - 1 - number.length) + number;

  return number;
}

function formatWord(word) {
  return (
    word.substring(0, 1).toLocaleUpperCase() +
    (word ? word.substring(1).toLocaleLowerCase() : "")
  );
}

async function read(source) {
  return new Promise((resolve, reject) => {
    fs.readFile(source, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject("failure read");
        return;
      }
      resolve(data);
    });
  });
}

function save(data, destination) {
  fs.writeFile(destination, data, function (err) {
    if (err) {
      console.log(err);
    }
  });
}
