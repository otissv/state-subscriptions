/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const util = require('util');
const childProcess = require('child_process');
const pkg = require(`${process.cwd()}/package.json`);

const exec = util.promisify(childProcess.exec);

const npmPkg = JSON.stringify({
  name: pkg.name,
  version: pkg.version,
  license: pkg.license,
  main: pkg.main,
  typings: pkg.typings,
  author: pkg.author,
  module: pkg.module,
  publishConfig: {
    access: 'public',
  },
  ...(pkg.peerDependencies ? { peerDependencies: pkg.peerDependencies } : {}),
  ...(pkg.peerDependencies ? { dependencies: pkg.dependencies } : {}),
});

console.log('Building...');

exec('cd dist && npm run build')
  .then(() => {
    return exec(`echo '${npmPkg}' > dist/package.json`);
  })
  .then(() => {
    console.log('Finished building ${pkg.name}');
  })
  .catch(({ stderr, stdout }) => {
    if (stderr) {
      console.log(stderr);
    } else {
      console.log(stdout);
    }
  });
