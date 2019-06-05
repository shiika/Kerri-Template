const gulp = require("gulp");
const sass = require("gulp-sass");
const server = require("gulp-server-livereload");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");


const build = gulp.series(buildJs, buildCss, buildHtml, buildImages, buildFonts);

gulp.task("watch", function () {
    return gulp.src("./dist")
        .pipe(server({
            livereload: true,
            directoryListening: true
        }))
});

gulp.task('watchScss', function () {
    gulp.watch(['./src/scss', './src/css/owl.theme.default.min.css'], compileSass)
});

gulp.task("build", build);

gulp.task("buildCss", buildCss);

gulp.task("buildHtml", buildHtml);

function compileSass() {
    return gulp.src("./src/scss/main.scss")
        .pipe(sass({
            bundleExec: true,
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest("./src/css"))
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
}

function buildImages() {
    return gulp.src("./src/img/*")
        .pipe(gulp.dest("./dist/img"))
}

function buildFonts() {
    return gulp.src("./src/fonts/*")
        .pipe(gulp.dest("./dist/fonts"))
}

function buildJs() {
    return gulp.src(["./src/js/*.js", "!./src/js/typedjs", "!./src/js/main.js"])
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
}