const execa = require("execa");

exports.onPostBuild = async ({ reporter, store }) => {
  const program = store.getState().program;

  let stats;
  try {
    stats = require(`${program.directory}/public/webpack.stats.json`);
  } catch (err) {
    reporter.warn('Cannot get webpack stats, try running "gatsby clean"');
    return;
  }

  const chunks = [];
  for (const key in stats.assetsByChunkName) {
    chunks.push(...stats.assetsByChunkName[key]);
  }

  reporter.info(`generating source-map files..`);
  await execa("yarn", [
    "source-map-explorer",
    `public/{${chunks.join(",")}}`,
    "--html",
    "public/_analyze.html"
  ]);
  await execa("yarn", [
    "source-map-explorer",
    `public/{${chunks.join(",")}}`,
    "--gzip",
    "--html",
    "public/_analyze.gz.html"
  ]);
  reporter.info(`DONE generating source-map files..`);
};
