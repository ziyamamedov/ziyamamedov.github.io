const{src, dest, task, series, watch, parallel} = require('gulp');
const rm = require( 'gulp-rm' ); //removing files and directories plugin
const sass = require('gulp-sass');//
sass.compiler = require('node-sass');//sass compiler
const autoprefixer = require('gulp-autoprefixer');//auto-add prefixes to styles
const concat = require('gulp-concat'); //concatenates files(joins)
const gcmq = require('gulp-group-css-media-queries');//Grouping all css media queries
const cleanCSS = require('gulp-clean-css');//Minifies css and cleans it
const browserSync = require('browser-sync').create();//Local server
const reload = browserSync.reload;//For auto-relodanig the server on change
const sourcemaps = require('gulp-sourcemaps');//creates sourcemaps for minified files
const babel = require('gulp-babel');//Translation es6 js to more cross-browser version
const uglify = require('gulp-uglify-es').default;//Minification of js code
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config'); //Settings from gulp.config
const gulpif = require('gulp-if'); // Conditionally running a task
const env = process.env.NODE_ENV; // Global variable from package.json

const toClean = [
  `${DIST_PATH}/*.html`,
  `${DIST_PATH}/*.css`,
  `${DIST_PATH}/*.js`
]

task('clean', ()=>{
  return src(toClean, { read: false }).pipe(rm())
});

task('copy:html', () => {
  return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH)).pipe(reload({stream:true}))
}); 

task('styles', () => {
  return src([ ...STYLE_LIBS, 'src/scss/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream:true}));
});

task('scripts', () => {
  return src([ ...JS_LIBS, './src/js/*.js'])
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.js'))
  // .pipe(babel({
  //   presets: ['@babel/env']
  // }))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest(DIST_PATH))
  .pipe(reload({stream:true}));
})

task('server', () => {
  browserSync.init({
      server: {
          baseDir: DIST_PATH
      }
  });
});

task('watch', function(){
  watch(`${SRC_PATH}/scss/**/*.scss`, series('styles'));
  watch(`${SRC_PATH}/*.html`, series('copy:html'));
  watch(`${SRC_PATH}/js/*.js`, series('scripts')); 
})


task('build', series('clean', parallel('copy:html', 'styles', 'scripts')));
task('default', series('clean', parallel('copy:html', 'styles', 'scripts'), parallel('server', 'watch')));