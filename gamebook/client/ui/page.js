/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
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
        if (Gamebook && Gamebook.story && Gamebook.story.player) {
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
    'click .keyword, mousedown .keyword': function (event) {
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
        showDaVince(objectId, position);
        return false;
    },
    'click .white-box, mouseup .white-box': function (event) {
        var currentObject, override, jCurrentTarget = $(event.currentTarget), eventId = event.currentTarget.id;
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
function showDaVince(objectId, position) {
    var currentObject = Gamebook.story.getSceneObject(objectId),
        elem = $('#mousedown'),
        self;

    //count the elements
    var length = elem.children('.white-box').length;
    elem.children('.white-box').each(function () {
        self = $(this);
        if (! currentObject.checkEvent(self.attr('id'))) {
            length--;
            self.toggleClass('suppressed');
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