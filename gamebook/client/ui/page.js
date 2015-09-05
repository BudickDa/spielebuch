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


/**
 * global helper
 */
Template.registerHelper("isEmpty", function (array) {
    return array.length !== 0;
});


Template.infoAboutObject.helpers({
    statistics: function () {
        var statistics = [];
        var currentObject;
        if (Session.get('activatedObjectId')) {
            currentObject = Gamebook.story.getSceneObject(Session.get('activatedObjectId'));
            if (currentObject) {
                _.map(currentObject.getStats(), function (value, key) {
                    statistics.push({key: key, value: value});
                });
            }
        }
        return statistics;
    },
    objectProperty: function () {
        return Session.get('objectProperty');
    }
});

Template.backpackContent.helpers({
    backpack: function () {
        var backpack = [];
        if (Gamebook.story.player !== -1) { //this makes sure, that the story has a player defined.
            backpack = Gamebook.story.player.getBackpack();
        }
        return backpack;
    }
});

Template.page.helpers({
    criticalTiming: function () {
        return Session.get('criticalTiming');
    },
    actionText: function () {
        return Session.get('actionText');
    },
    mainText: function () {
        return Session.get('mainText');
    },
    statusText: function () {
        var stats = [], statsAsObject;
        if (Gamebook && Gamebook.story) {
            if(Gamebook.story.player===-1){
                return stats;
            }
            statsAsObject = Gamebook.story.player.getStats();
            if (statsAsObject) {
                _.map(statsAsObject, function (value, key) {
                    stats.push({key: key, value: value});
                });
            }
        }
        return stats;
    }
});

var menuActive = false;
Template.page.events({
    'mousedown .keyword': function (event) {
        //get the id of the object and store it int the session for later use
        var objectId = event.currentTarget.dataset.objectid, position;
        //prevent default
        event.preventDefault();
        Session.set('activatedObjectId', objectId);
        menuActive = true;
        //test if left or right click
        if (event.button === 2)
            return showStats();


        position = {pageX: event.pageX, pageY: event.pageY};
        //if it was a left click, show daVince View
        showDaVince(Gamebook.story.getSceneObject(objectId), position);
        return false;
    },
    'mouseup .white-box': function (event) {
        var currentObject, override, jCurrentTarget = $(event.currentTarget), eventId = event.currentTarget.id;
        event.preventDefault();
        $('#mousedown').css({'top':'-2000px'}).hide();
        if (jCurrentTarget.hasClass('suppressed')) {
            //this should be ignored, so we do nothing.
            return;
        }
        if (menuActive) {
            menuActive = false;

            currentObject = Gamebook.story.getSceneObject(Session.get('activatedObjectId'));


            if (currentObject.checkOverride(eventId)) {
                override = currentObject.overrrides[eventId];
                Session.set('actionText', override);
            }
            else {
                Session.set('actionText', ACTION.de[event.currentTarget.id]);
            }
            if(currentObject.checkEvent(eventId)) {
                currentObject.fireEvent(eventId);
            }else{

            }
        }
    },

    /**
     * Put left or right hand into backback by clicking on it with left or right
     */
    'mouseup #backpack': function (event) {
        //prevent default
        event.preventDefault();


        //we need to test, if there is player implemented, because no player -> no backpack
        if (Gamebook.story.player === -1)
            return;

        //test if left or right click
        if (event.button === 0)
            Gamebook.story.player.addToBackpackFromLeftHand();
        if (event.button === 2)
            Gamebook.story.player.addToBackpackFromRightHand();

    },
    'click #openBackpack': function () {
        event.preventDefault();
        $('#backpackContent').openModal();
    },
    /**
     * Get left or right hand from backback by clicking on item with left or right
     */
    'mouseup .backpack-item': function (event) {
        var gameObject = Gamebook.story.player.getObjectFromBackpack(event.currentTarget.dataset._id);
        Gamebook.story.player.removeObjectFromBackpack(gameObject._id);

        //prevent default
        event.preventDefault();


        //test if left or right click
        if (event.button === 0)
            Gamebook.story.player.takeLeftHand(gameObject);

        if (event.button === 2)
            Gamebook.story.player.takeRightHand(gameObject);

        Session.set('actionText', 'Das ' + gameObject.name + ' wurde in die Hand genommen.');
    },

    /**
     * Hide .daVinci-view on any click or keyup
     */
    'click': function (event) {
        /**
         * if click is on an element or if it is a keyup, hide daVinci-view
         */
        $('#mousedown').css({'top':'-2000px'}).hide();
    }
});


function showStats() {
    Session.set('objectProperty', false);
    setObjectProperties(Session.get('activatedObjectId'));
    $('#statistics').openModal();
}

/**
 * Show davince view for the element with this objectId
 * @param objectId
 */
function showDaVince(currentObject, position) {
    var elem = $('#mousedown'),
        self;

    //count the elements
    var length = elem.children('.white-box').length;
    elem.children('.white-box').each(function () {
        self = $(this);
        if (! currentObject.checkEvent(self.attr('id'))) {
            length--;
            self.addClass('suppressed');
        }else{
            self.removeClass('suppressed');
        }
    });
    //we reduced the length for every object not implemented. If length === 0, there are no white-boxes, which means, we do not have show the mousedown menu
    if (length !== 0) {
        elem.css({
            left: position.pageX - 50,
            top: position.pageY - 50
        }).show();
    }
}