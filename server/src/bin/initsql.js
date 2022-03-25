"use strict";

const path = require("path");
const fs = require("fs");

const modelsPath = path.join(__dirname, "../models");
const child = fs.readdirSync(modelsPath);

const requireModels = (item) => {
  const model = item.substring(0, item.indexOf("."));
  return require(path.join(modelsPath, model))[model];
};

for (let item of child) {
  if (item != "index.js") {
    requireModels(item).sync();
  }
}