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

Gamebook = {
    //contains the playing story
    story: {},
    startStory: function (story) {
        if (!story) {
            console.log(story);
            debugMsg('Story is undefined', 'Make sure, that the parameter is a story.');
            return;
        }
        this.story = story;
        this.story.start();
    },
    getStory: function (storyname) {
        var story = this.stories[storyname];
        if (!story) {
            debugMsg('Story of this name is undefined', 'There is not story saved, you can view the name of the parameter in the Console.');
            //storyname can be an unfiltered user input. Handle with care
            console.log(storyname);
            return;
        }
        return story;

    },
    //contains the created stories
    stories: {},
    //saves player object on the client
    localStorage: new Mongo.Collection(null),
    Effect: Effect,
    Rule: Rule,
    Story: Story,
    Scene: Scene,
    config: {
        /**
         * if no other language is chosen, we take german.
         * @type {string}
         */
        defaultLanguage: 'de'
    },
    startUiCountdown: function (timeInMs, steps, cb) {
        var time = timeInMs;
        Session.set('criticalTiming', (time / timeInMs) * 100);
        killSwitch = Meteor.setInterval(function () {
            time -= steps;
            Session.set('criticalTiming', (time / timeInMs) * 100);
            if (time < 0) {
                Session.set('criticalTiming', 0);
                Gamebook.stopCountdown(killSwitch);
                return cb();
            }
        },steps);
        return killSwitch;
    },
    startSilentCountdown: function (timeInMs, steps, cb) {
        var time = timeInMs,
            killSwitch = Meteor.setInterval(function () {
            time -= steps;
            if (time < 0) {
                Gamebook.stopCountdown(killSwitch);
                return cb();
            }
        },steps);
        return killSwitch;
    },
    stopCountdown: function(killSwitch){
        Meteor.clearInterval(killSwitch);
        Meteor.setTimeout(function(){
            Session.set('criticalTiming', 0);
        }, 2000);
    }
};