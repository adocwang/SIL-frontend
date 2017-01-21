'use strict';

import config        from '../config';
import gulp          from 'gulp';
import eslint          from 'gulp-eslint';

const lintConfig = {
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    rules: {
      // 'my-custom-rule': 1,
      'strict': 0
    },
    globals: [
      // 'jQuery',
      // '$'
    ],
    envs: [
      'es6',
      'browser'
    ]
  };


gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src([config.src+'**/!(templates).js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint( lintConfig ))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});
