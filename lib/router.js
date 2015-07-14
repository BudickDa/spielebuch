/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'ApplicationLayout'

});

Router.route('/', function () {
    var self = this;
    self.render('topMenu', {to: 'topMenu'});
    self.render('mainMenu', {});
});

Router.route('/book/:story', function () {
    var self = this, story;

    /**
     * Displayed Story is chosen by the url.
     * The story saved in story will be displayed in the view.
     * WARNING: Never put URL Params directly into a function or the View.
     * It could contain malicious code. Always remember:
     *
     *                 The internet is a dangerous place and all users are evil!
     */
    switch (self.params.story) {
        case 'storyOne':
            story = Gamebook.getStory('storyOne');
            break;
        case 'storyTwo':
            story = Gamebook.getStory('storyTwo');
            break;
        default:
            story = Gamebook.getStory('storyOne');
            break;
    }

    //publish chosen story into gameobject and start it, by callling
    Gamebook.startStory(story);


    self.render('topMenuBack', {to: 'topMenu'});
    self.render('page', {});
});
Router.route('/impressum', function () {
    var self = this;
    self.render('topMenuBack', {to: 'topMenu'});
    self.render('impressum', {});
});