const gulp = require("gulp");
const sass = require("gulp-sass");
const server = require("gulp-server-livereload");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");

const assets = [
    "./src/index.html",
    "./src/fonts",
    "./src/img",
    "./src/mobirise",
    "./src/mobirise/*"
];


// const build = gulp.series(buildJs, buildCss, buildHtml);

gulp.task("watch", function () {
    return gulp.src("./src")
        .pipe(server({
            livereload: true,
            directoryListening: true
        }))
});

gulp.task('watchScss', function () {
    gulp.watch(['./src/scss', './src/css/owl.theme.default.min.css'], compileSass)
});

// gulp.task("build", build);

gulp.task("compressJs", compressJs);

gulp.task("buildCss", buildCss);

gulp.task("buildHtml", buildHtml);

gulp.task("minimizeJquery", minimizeJquery);

function compileSass() {
    return gulp.src("./src/scss/main.scss")
        .pipe(sass({
            bundleExec: true,
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest("./src/css"))
}

function minimizeJquery() {
    return gulp.src(["./src/js/jquery.min.js", "./src/js/jquery.easing.compatibility.js", "./src/js/jquery.easing.js", "./src/js/jquery.magnific-popup.min.js"])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat("jquery.conc.js"))
        .pipe(gulp.dest("./dist/js"))
}

function compressJs() {
    // return gulp.src(["./src/js/popper.min.js", "./src/js/isotope.min.js", "./src/js/owl.carousel.min.js", "./src/js/bootstrap.min.js", "./src/js/main.js"])
    //     .pipe(gulp.dest("./dist/js"))
    return gulp.src("./src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
}

function buildCss() {
    return gulp.src("./src/css/*.css")
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/css'))
}

function buildHtml() {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"))
        .pipe(gulp.src("./src/img/*.jpg"))
        .pipe(gulp.dest("./dist/img"))
        .pipe(gulp.src("./src/fonts/*"))
        .pipe(gulp.dest("./dist/fonts"))
        .pipe(gulp.src("./src/mobirise/*"))
        .pipe(gulp.dest("./dist/mobirise"))
}