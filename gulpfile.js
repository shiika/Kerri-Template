const gulp = require("gulp");
const sass = require("gulp-sass");
const server = require("gulp-server-livereload");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");

// const pattern = new RegExp("[^'jquery']");


// const build = gulp.series(buildJs, buildCss, buildHtml);
const buildAssets = gulp.series(buildFonts, buildImgs, buildHtml);
// const compress = gulp.series(compressJs, compressCss);

gulp.task("watch", function () {
    return gulp.src("./dist")
        .pipe(server({
            livereload: true,
            directoryListening: true,
            open: true
        }))
});

gulp.task('watchScss', function () {
    gulp.watch(['./src/scss', './src/css/owl.theme.default.min.css'], compileSass)
});

// gulp.task("build", build);

gulp.task("compileJs", compileJs);

gulp.task("compressCss", compressCss);
gulp.task("compressLib", compressLib);
gulp.task("concatLib", concatLib);

// gulp.task("compress", compress);

gulp.task("buildAssets", buildAssets);

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

function concatLib() {
    return gulp.src(["./src/js/isotope.min.js", "./src/js/owl.carousel.min.js"])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat("lib.conc.js"))
        .pipe(gulp.dest("./dist/js"))
}

function compileJs() {
    // return gulp.src(["./src/js/popper.min.js", "./src/js/isotope.min.js", "./src/js/owl.carousel.min.js", "./src/js/bootstrap.min.js", "./src/js/main.js"])
    //     .pipe(gulp.dest("./dist/js"))
    return gulp.src(["./src/js/defaults.js", "./src/js/html-parser.js", "./src/js/initializer.js", "./src/js/main.js", "./src/js/popper.min.js", "./src/js/typed.js"])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
}

function distJs() {
    // return gulp.src(["./src/js/popper.min.js", "./src/js/isotope.min.js", "./src/js/owl.carousel.min.js", "./src/js/bootstrap.min.js", "./src/js/main.js"])
    //     .pipe(gulp.dest("./dist/js"))
    return gulp.src(["./src/js/bootstrap.min.js", "./src/js/isotope.min.js", "./src/js/jquery.easing.compatibility.js", "./src/js/jquery.easing.js", "./src/js/jquery.magnific-popup.min.js", "./src/js/jquery.min.js", "./src/js/owl.carousel.min.js"])
        .pipe(gulp.dest("./dist/js"))
}

function compressCss() {
    return gulp.src("./src/css/*.css")
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCss())
        .pipe(concat("main.bundle.css"))
        .pipe(gulp.dest("./dist/css"))
}

function compressLib() {
    return gulp.src(["./src/js/bootstrap.min.js", "./src/js/owl.carousel.min.js", "./src/js/isotope.min.js"])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
}

function buildFonts() {
    return gulp.src("./src/fonts/*")
        .pipe(gulp.dest("./dist/fonts"))
}

function buildImgs() {
    return gulp.src("./src/img/*")
        .pipe(gulp.dest("./dist/img"))
}

function buildHtml() {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"))
}