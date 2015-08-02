/**
 * Created by Daniel Budick on 02.08.2015.
 * Copyright 2015 Daniel Budick All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 *
 * This file is part of Spielebuch
 * Spielebuch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Spielebuch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Spielebuch. If not, see <http://www.gnu.org/licenses/>.
 */

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate: 'ApplicationLayout',
    waitOn: function(){
        return [
          Meteor.subscribe('objectProperties')
        ];
    }

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