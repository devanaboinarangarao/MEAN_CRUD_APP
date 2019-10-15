const gulp = require('gulp');
const nodemon = require('nodemon');

gulp.task('default', () => {
    return nodemon({
        script : 'server.js',
        env  : {NODE_ENV : 'development'}
    }).on('restart', () => {
        console.log("Using Gulp with Nodemon Restarting Server")
    })
})