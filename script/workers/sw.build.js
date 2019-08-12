/* eslint-disable no-console */
const workboxBuild = require('workbox-build');
const path = require('path');
// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () =>
  // This will return a Promise
  workboxBuild
    .injectManifest({
      globDirectory: 'build/',
      globPatterns: ['**/*.{json,ico,svg,png,html,js,css}'],
      swDest: 'build/sw.js',
      swSrc: 'internals/worker/sw.template.js',
      injectionPointRegexp: /(const precacheManifest = )\[\](;)/,
    })

    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
buildSW();
