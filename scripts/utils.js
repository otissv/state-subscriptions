/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-try-statement */
const mkdirp = require('mkdirp');
const util = require('util');
const fs = require('fs');

const writeFile = util.promisify(fs.writeFile);

const exec = util.promisify(childProcess.exec);
exports.exec = exec;

function errorHandler(error) {
  process.stdout.write(error);
  process.exit(1);
}
exports.errorHandler = errorHandler;

async function writeDateToFile({ data, fileName, dest, ...props }) {
  try {
    await mkdirp(dest);
    await writeFile(`${dest}/${fileName}.tsx`, data, { flag: 'w' });

    return {
      ...props,
      data,
      fileName,
      dest,
    };
  } catch (error) {
    errorHandler(error);
  }
}
exports.writeDateToFile = writeDateToFile;
