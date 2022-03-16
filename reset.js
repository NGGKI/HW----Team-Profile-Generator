const fs = require('fs');
const fse = require('fs-extra')

// create a conditiona if output file is available, if true, delete the folder
if (fs.existsSync('./newhtml')) {
  fse.removeSync('./newhtml');
  console.log('/dist/ folder reset!');
}
