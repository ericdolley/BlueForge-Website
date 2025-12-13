const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const outputPath = path.join(projectRoot, 'startup-website.zip');

if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
}

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Created ${outputPath} (${archive.pointer()} total bytes)`);
});
archive.on('warning', err => {
  if (err.code === 'ENOENT') {
    console.warn('Warning during zip:', err.message);
  } else {
    throw err;
  }
});
archive.on('error', err => {
  throw err;
});

archive.pipe(output);
archive.glob('**/*', {
  cwd: projectRoot,
  ignore: ['node_modules/**', 'client/node_modules/**', 'server/node_modules/**', 'startup-website.zip']
});
archive.finalize();
