'use strict';
var app = angular.module('taskApp', ['ngMaterial','ngMdIcons','angular-loading-bar', 'ngAnimate', 'ui.router']);

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = true;
}]);

