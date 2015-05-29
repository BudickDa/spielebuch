/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'ApplicationLayout'

});

Router.route('/', function () {
    this.render('topMenu', {to: 'topMenu'});
    this.render('mainMenu', {});
});

Router.route('/book', function () {
    this.render('topMenuBack', {to: 'topMenu'});
    this.render('book', {});
});
Router.route('/impressum', function () {
    this.render('topMenuBack', {to: 'topMenu'});
    this.render('impressum', {});
});