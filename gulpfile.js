var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    hash         = require("gulp-hash"),
    del          = require("del");

var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify');

var sassDir = 'static/stylesheets',
    imgDir = 'static/img',
    jsDir = 'static/javascripts';

// Compile SCSS files to CSS
gulp.task("sass", function () {
    //Delete our old css files
    del(["static/css/**/*"]);

    //compile hashed css files
    gulp.src(sassDir + "/**/*.scss")
        .pipe(sass({
            outputStyle : "compressed"
        }))
        .pipe(autoprefixer({
            browsers : ["last 20 versions"]
        }))
        .pipe(hash())
        .pipe(gulp.dest("static/css"))
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/css"));
});

// Hash images
// gulp.task("img", function () {
//     del(["static/img/**/*"]);
//     gulp.src(imgDir + "/**/*")
//         .pipe(hash())
//         .pipe(gulp.dest("static/img"))
//         .pipe(hash.manifest("hash.json")
//         .pipe(gulp.dest("data/img");
// });

// Hash javascript
gulp.task("js", function () {
    del(["static/js/**/*"]);
    gulp.src(jsDir + "/**/*")
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(hash())
        .pipe(gulp.dest("static/js"))
        .pipe(hash.manifest("hash.json"))
        .pipe(gulp.dest("data/js"));
});

// Watch asset folder for changes
gulp.task("watch", ["sass"/*, 'img'*/, 'js'], function () {
    gulp.watch(sassDir + "/**/*", ["sass"]);
    // gulp.watch(imgDir + "/**/*", ["img"]);
    gulp.watch(jsDir + "/**/*", ["js"]);
});

// Set watch as default task
gulp.task("default", ["watch"]);
