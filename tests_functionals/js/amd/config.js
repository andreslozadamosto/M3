'use strict';

requirejs.config({
    deps: ['app'],

    baseUrl: '../bin/amd/src',
    paths: {
        app: '../../../tests_functionals/js/amd/app',
        M3: 'M3',
        M3Class: 'utils/M3Class'
    },
    shim: {

    }
});