var gulp = require('gulp');
var nodeSass = require('node-sass');
var path = require('path');
var fs = require('fs');
var map = require('map-stream');
var srcPath = 'src/';
var buildPath = '';
var buildSrcPath = path.join(buildPath);

gulp.task('sass', function () {
  return gulp.src([srcPath + '*.html'])
    .pipe(map(function (file, cb) {
      var injectString = '/* inject{scss} */';
      // convert file buffer into a string
      var contents = file.contents.toString();
      if (contents.indexOf(injectString) >= 0) {
        //Getting scss
        var scssFile = file.path.replace(/\.html$/i, '.scss');
        console.log(scssFile);
        fs.readFile(scssFile, function (err, data) {
          if (!err && data) {
            nodeSass.render({
              data: data.toString(),
              includePaths: [path.join(srcPath, ''), './bower_components/'],
              outputStyle: 'compressed'
            }, function (err, compiledScss) {
              if (!err && compiledScss) {
                file.contents = new Buffer(contents.replace(injectString, compiledScss.css.toString()), 'binary');
              }
              return cb(null, file);
            });
          } else {
            return cb(null, file);
          }
        });
      } else {
        // continue
        return cb(null, file);
      }
    }))
    .pipe(gulp.dest(path.join(buildSrcPath, '')));
});

gulp.task('watch', function () {
  gulp.watch([srcPath + '*'], ['sass']);
});