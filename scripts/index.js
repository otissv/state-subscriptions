const util = require("util");
const childProcess = require("child_process");
const path = require("path");
const pkg = require(`${process.cwd()}/package.json`);

const exec = util.promisify(childProcess.exec);

const npmPkg = JSON.stringify(
  {
    name: pkg.name,
    version: pkg.version,
    license: pkg.license,
    main: pkg.main,
    typings: pkg.typings,
    author: pkg.author,
    module: pkg.module,
    description: pkg.description,
    publishConfig: {
      access: "public",
    },
    ...(pkg.peerDependencies ? { peerDependencies: pkg.peerDependencies } : {}),
    ...(pkg.peerDependencies ? { dependencies: pkg.dependencies } : {}),
  },
  null,
  2
);

exec("tsc --project tsconfig.json && touch build/package.json")
  .then(() => {
    return exec(`echo '${npmPkg}' > build/package.json`);
  })
  .then(() => {
    console.log(`Finished building ${pkg.name}`);
  })
  .catch(({ stderr, stdout }) => {
    if (stderr) {
      console.log(stderr);
    } else {
      console.log(stdout);
    }
  });
