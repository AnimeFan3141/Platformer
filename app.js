const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    const html = fs.readFileSync("./index.html", "utf8");

    res.type('html').send(html);
}
);

app.get("/index.html", (req, res) => {
  const html = fs.readFileSync("./index.html", "utf8");

  res.type('text/css').send(html);
}
);

app.get("/bg.jpg", (req, res) => {
    const html = fs.readFileSync("./bg.jpg", "utf8");
  
    res.type('image/jpeg').send(html);
}
);

app.get("/pengu.png", (req, res) => {
    const html = fs.readFileSync("./pengu.png", "utf8");
  
    res.type('image/png').send(html);
}
);

app.get("/style.css", (req, res) => {
    const html = fs.readFileSync("./style.css", "utf8");
  
    res.type('text/css').send(html);
}
);

app.get("/index.js", (req, res) => {
    const html = fs.readFileSync("./index.js", "utf8");
  
    res.type('text/css').send(html);
}
);