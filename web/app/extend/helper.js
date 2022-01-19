'use strict';

const fs = require('mz/fs');
const path = require('path');
const FileType = require('file-type');
const { createCanvas, Image } = require('canvas');
const validator = require('./validator');

const helper = {
  id: function() {
    return  Math.random().toString(36).substr(2, 9);
  },

  avatar: function() {
    const WIDTH = 96;
    const HEIGHT = 96;
    const COLORS = ['#d7c960', '#be71da', '#adf857', '#68a8e8', '#fc8281'];
    const BG_COLORS = ['#8e2503', '#515807', '#7e1919', '#351477', '#259115'];

    const data = [];
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(Math.floor(Math.random() * 2));
      }
      row = row.concat(row.slice().reverse());
      data.push(row);
    }

    const canvas = createCanvas(WIDTH, HEIGHT);
    const context = canvas.getContext('2d');

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const bg_color = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)]
    
    context.fillStyle = bg_color;
    context.fillRect(0, 0, WIDTH, WIDTH);
    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (data[i][j]) {
          context.fillStyle = color;
        } else {
          context.fillStyle = bg_color;
        }
        context.fillRect(j * 12 + 12, i * 12 + 12, 12, 12);
      }
    }

    return {
      name: helper.id() + '.png',
      data: canvas.toBuffer('image/png', { quality: 0.8 })
    }
  },

  isImage: function(file) {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/.test(file);
  },

  rename: async function(file, dir) {
    const mime = await FileType.fromFile(file)
    const newFile = helper.id() + '.' + mime.ext;

    const data = await fs.readFile(file);
    await fs.writeFile(path.join(dir, newFile), data);
    await fs.unlink(file);

    return newFile;
  },

  extractImage: function (input, output, select, size = { width: 96, height: 96 }) {
    return new Promise((resolve, reject) => {
      const img = new Image;
      img.onload = function () {
        const canvas = createCanvas(size.width, size.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, select.x, select.y, select.width, select.height, 0, 0, size.width, size.height);
        fs.writeFile(output, canvas.toBuffer(), (err, file) => {
          if (err) {
            return reject(err);
          }
          resolve(file);
        })
      }
      img.onerror = reject;
      img.src = input;
    })
  },

  validator
}

module.exports = helper;