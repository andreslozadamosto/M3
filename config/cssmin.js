'use strict';

module.exports = {
    options: {
        report: "gzip",
        sourceMap: true
    },
    themes: {
        files: [{
            expand: true,
            cwd: 'bin/themes',
            src: ['*.css', '!*.min.css'],
            dest: 'bin/themes',
            ext: '.min.css'
        }]
    }
}