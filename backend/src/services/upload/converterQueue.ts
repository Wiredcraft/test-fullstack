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

    exec(`soffice --headless --convert-to pdf ${filename} --outdir ${outputDir}`, { cwd }, (error, stdout, stderr) => {
      logger.debug(`soffice exec result: ${JSON.stringify({error, stdout, stderr})}`);
      if (error) {
        return cb(error);
      }

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
          // Send result to job owner
          const imgs = files.filter(f => /\.jpg$/.test(f)).map(f => `${filename + '_c'}/${f}`);
          logger.debug(`generated images: ${JSON.stringify(imgs)}`);
          return cb(null, imgs);
        })
      });
    });
  }, 1);
}
