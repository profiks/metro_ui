import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import easysprite from 'postcss-easysprites';
import sourcemaps from 'gulp-sourcemaps';
import connect from 'gulp-connect';
import babelify from 'babelify';
import browserify from 'browserify';
import sourceStream from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';



const ENV = 'production';

const processors = [
   //autoprefixer({browsers: ['IE 8', 'IE 9', 'last 5 versions', 'Firefox > 14', 'Opera > 11.1', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 5']}),
   autoprefixer({browsers: ['last 2 versions']}),
   easysprite({
       imagePath: 'app/img/sprite', 
       spritePath: 'app/img'
   })
];

let sassStyle, jsDebug;


if(ENV === 'production'){
    sassStyle = 'compressed';
    jsDebug = true;
} else{
    sassStyle = 'expanded';
    jsDebug = false;
} 


gulp.task('css', () => { 
    return gulp.src('./app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: sassStyle}).on('error', sass.logError))  
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
});



gulp.task('html', () => { 
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});




gulp.task('js', () => {   
    return browserify('./app/js/src/app.js', { debug: true })        
        .transform(babelify)
        .bundle()        
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(sourceStream('bundle.js'))        
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpif(jsDebug, uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/js'))
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

