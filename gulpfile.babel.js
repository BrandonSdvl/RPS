const gulp = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser")
const autoprefixer = require("gulp-autoprefixer");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync");

const server = browserSync.create();

// PUG
gulp.task("views", () => {
  return gulp
    .src("./dev/views/pages/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        pretty: false,
      })
    )
    .pipe(gulp.dest("./docs"));
});

// Sass
gulp.task("styles", () => {
  return gulp
    .src("./dev/scss/styles.scss")
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(autoprefixer())
    .pipe(gulp.dest("./docs/css"))
    .pipe(server.stream());
});

// JS
gulp.task("babel", () => {
  return gulp
    .src("./dev/js/*.js")
    .pipe(plumber())
    .pipe(concat("scripts-min.js"))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest("./docs/js"));
});

gulp.task("default", () => {
  server.init({
    server: "./docs/",
  });
  gulp
    .watch("./dev/views/**/*.pug", gulp.series("views"))
    .on("change", server.reload);
  gulp.watch("./dev/scss/**/*.scss", gulp.series("styles"));
  gulp.watch("./dev/js/*.js", gulp.series("babel")).on("change", server.reload);
});