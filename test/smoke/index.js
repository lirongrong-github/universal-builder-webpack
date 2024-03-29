const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: '1000ms',
})

/* 让文件运行的目录 在 template */
process.chdir(path.join(__dirname, 'template'));

rimraf('./dist', () => {
  const prodConfig = require('../../lib/webpack.prod.js');
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error('err', err);
      process.exit(2)
    };
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }));
    console.log('Webpack build success, begin run test.');
    mocha.addFile(path.join(__dirname, 'html.test.js'));
    mocha.addFile(path.join(__dirname, 'css.js.test.js'));
    mocha.run();
  });
});
