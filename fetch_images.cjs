const https = require('https');
const fs = require('fs');
const path = require('path');

const queries = [
  { q: "Sandalwood elephant", name: "sandalwood_elephant.jpg" },
  { q: "George VI 2 annas coin", name: "antique_2_annas.jpg" },
  { q: "India 1947 stamp", name: "independence_stamp.jpg" },
  { q: "Uruli vessel", name: "brass_uruli.jpg" },
  { q: "Assamese man", name: "assam_man.jpg" },
  { q: "Mizo woman", name: "mizo_woman.jpg" },
  { q: "Naga woman", name: "naga_woman.jpg" },
  { q: "Sikkim man", name: "sikkim_man.jpg" },
  { q: "Assam people", name: "assam_person2.jpg" }
];

async function searchWikimedia(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.search && json.query.search.length > 0) {
            resolve(json.query.search[0].title);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getImageUrl(title) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].imageinfo) {
            resolve(pages[pageId].imageinfo[0].url);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(__dirname, 'public', 'images', filename);
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'NodeJS/1.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filename).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const item of queries) {
    console.log(`Searching for: ${item.q}`);
    const title = await searchWikimedia(item.q);
    if (title) {
      console.log(`Found: ${title}`);
      const url = await getImageUrl(title);
      if (url) {
        console.log(`Downloading: ${url}`);
        await downloadImage(url, item.name);
        console.log(`Saved as ${item.name}`);
      } else {
        console.log(`No URL found for ${title}`);
      }
    } else {
      console.log(`No results for ${item.q}`);
    }
  }
}

main().catch(console.error);
