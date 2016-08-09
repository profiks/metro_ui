import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import easysprite from 'postcss-easysprites';
import sourcemaps from 'gulp-sourcemaps';
import connect from 'gulp-connect';
import babel from 'gulp-babel';
import concat from 'gulp-concat';




const ENV = 'development';

const processors = [
   //autoprefixer({browsers: ['IE 8', 'IE 9', 'last 5 versions', 'Firefox > 14', 'Opera > 11.1', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 5']}),
   autoprefixer({browsers: ['last 2 versions']}),
   easysprite({
       imagePath: 'app/img/sprite', 
       spritePath: 'app/img'
   })
];

let sassStyle;


if(ENV === 'production'){
    sassStyle = 'compressed';
} else{
    sassStyle = 'expanded';
} 


gulp.task('css', () => { 
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: sassStyle}).on('error', sass.logError))  
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
});



gulp.task('html', () => { 
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});



gulp.task('js', () => { 
    return gulp.src('./app/js/src/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/js'))
        .pipe(connect.reload());
});




gulp.task('watch', () => { 
  gulp.watch(['app/scss/*.scss', 'app/scss/**/*.scss'], ['css']);
  gulp.watch(['app/*.html', 'app/**/*.html'], ['html']);
  gulp.watch(['app/js/src/*.js', 'app/js/src/**/*.js'], ['js']);
});


gulp.task('connect', () => { 
  connect.server({
    root: 'app',
    livereload: true
  });
});


gulp.task('default', ['connect', 'watch', 'html', 'css', 'js']);

