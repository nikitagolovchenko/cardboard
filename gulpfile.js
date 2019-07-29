var gulp           = require('gulp');                    
var browserSync    = require('browser-sync').create();   
var sass           = require('gulp-sass');              
var autoprefixer   = require('gulp-autoprefixer');      
var concatCss      = require('gulp-concat-css');   



// Компилируем scss в css и вставляем изменения в браузер
gulp.task('sass', function(done) {
    gulp.src("src/scss/*.scss")                  
        .pipe(sass().on('error', sass.logError))   
        .pipe(autoprefixer())
        .pipe(concatCss("style.css"))          
        .pipe(gulp.dest("src/css"))         
        .pipe(browserSync.stream());


    done();
});

// Запускаем сервер + отслеживаем scss/html файлы
gulp.task('serve', function(done) {

    browserSync.init({
        server: "src/"
    });

    // следим за изменениями файлов (* - все файлы):
    gulp.watch("src/scss/*.scss", gulp.series('sass'));
    gulp.watch("src/*.html").on('change', () => {
      browserSync.reload();
      done();
    });
  
    done();
});


gulp.task('default', gulp.series('sass', 'serve'));    // default - задача по умолчанию, запускается простым gulp

// -------------------------------------------------------




