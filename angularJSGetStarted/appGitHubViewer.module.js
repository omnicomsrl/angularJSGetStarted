/*
// Racchiudi i componenti di Angular in una Immediately Invoked Function Expression (IIFE)
//
// evitare
// logger.js
angular
    .module('app')
    .factory('logger', logger);

//La funzione logger è aggiunta come variabile globale
function logger() { }

//
// consigliato
//
// non ci sono più variabili globali
//
logger.js
(function() {
    'use strict';

    angular
        .module('app')
        .factory('logger', logger);

    function logger() { }
})();
*/


(function () {

    /*Definire 1 componente per file.
    //evitare
    angular
        .module('app', ['ngRoute'])
        .controller('SomeController', SomeController)
        .factory('someFactory', someFactory);

    function SomeController() { }

    //consigliato

    // app.module.js
    angular
          .module('app', ['ngRoute']);

    //consigliato

    // some.controller.js
    angular
          .module('app')
          .controller('SomeController', SomeController);

    function SomeController() { }
    */

    angular
        .module('appGitHubViewer', []);

})();