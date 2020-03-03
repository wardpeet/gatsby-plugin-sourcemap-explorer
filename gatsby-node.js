const execa = require("execa");

exports.onPostBuild = async ({ reporter }) => {
  reporter.info(`generating source-map files..`);
  await execa("yarn", [
    "source-map-explorer",
    "public/**/*.js",
    "--html",
    "public/_analyze.html"
  ]);
  await execa("yarn", [
    "source-map-explorer",
    "public/**/*.js",
    "--gzip",
    "--html",
    "public/_analyze.gz.html"
  ]);
  reporter.info(`DONE generating source-map files..`);
};
