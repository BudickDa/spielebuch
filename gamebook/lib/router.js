/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
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
    var self = this;

    /**
     * Displayed Story is chosen by the url.
     * The story saved in story will be displayed in the view.
     */
    switch (self.params.story) {
        case 'storyOne':
            story = storyOne;
            break;
        case 'storyTwo':
            story = storyTwo;
            break;
        default:
            story = storyOne;
            break;
    }

    console.log(story);
    /**
     * The story is started.
     */
    story.start();


    self.render('topMenuBack', {to: 'topMenu'});
    self.render('book', {});
});
Router.route('/impressum', function () {
    var self = this;
    self.render('topMenuBack', {to: 'topMenu'});
    self.render('impressum', {});
});