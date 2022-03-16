const fs = require('fs');
const process = require('process');
const axios = require('axios');
let path;
let out;


function getOut(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });

  } else {
    console.log(text);
  }
}

/** read file at path and print it out. */

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(2);
    } else {
      getOut(data, out);
    }
  });
}

/** read page at URL and print it out. */

async function webCat(url, out) {
  try {
    let htmlVer = await axios.get(url);
    getOut(htmlVer.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(3);
  }
}


if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 5) == 'https' || path.slice(0, 4) == 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}