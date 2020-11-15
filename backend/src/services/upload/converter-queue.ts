import * as queue from 'async/queue';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

export function createConverterQueue(logger) {

  const cwd = path.join(__dirname, '../../../upload');

  return queue((task, cb) => {
    logger.log(`Converting ${JSON.stringify(task.rawFile)}`);

    const filename = task.rawFile.filename;
    const outputDir = path.join(cwd, filename + '_c');

    // Open Office is required in file conversion, please install it first.
    // $ apt install libreoffice imagemagick ghostscript

    // Convert PPT to PDF
    exec(`soffice --headless --convert-to pdf ${filename} --outdir ${outputDir}`, { cwd }, (error, stdout, stderr) => {
      logger.debug(`soffice exec result: ${JSON.stringify({error, stdout, stderr})}`);
      if (error) {
        return cb(error);
      }

      // Convert PDF to images
      exec(`convert -density 80 ${filename}.pdf -quality 80 ${filename}.jpg`, { cwd: outputDir }, (error, stdout, stderr) => {
        logger.debug(`convert exec result: ${JSON.stringify({error, stdout, stderr})}`);
        if (error) {
          return cb(error);
        }

        // Find output images
        fs.readdir(outputDir, function(error, files) {
          if (error) {
            return cb(error);
          }

          let imgs = files.filter(f => /\.jpg$/.test(f)).map(f => `${filename + '_c'}/${f}`);
          // imgs holds a set of image file name, eg:
          // [
          //   "40644a8ec7b9dc789e05ba20450a2cb8_c/40644a8ec7b9dc789e05ba20450a2cb8-0.jpg",
          //   "40644a8ec7b9dc789e05ba20450a2cb8_c/40644a8ec7b9dc789e05ba20450a2cb8-1.jpg"
          // ]

          // Make sure the images are listed in correct order,
          // So we sort them by using the tailing index number.
          imgs = imgs.map(f => [f, parseInt(f.match(/-(\d+).jpg$/)[1])]).sort((a, b) => <number>a[1] - <number>b[1]).map(f => <string>f[0]);

          logger.debug(`generated images: ${JSON.stringify(imgs)}`);

          // Send images to job owner
          return cb(null, imgs);
        })
      });
    });
  }, 1);
}
