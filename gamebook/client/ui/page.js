/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

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
    hasStatistics: function (statistics) {
        return statistics.length !== 0;
    },
    objectProperty: function () {
        return Session.get('objectProperty');
    }
});

Template.page.helpers({
    criticalTimingActive: function () {
        return Session.get('criticalTimingActive');
    },
    criticalTiming: function () {
        return Session.get('criticalTiming');
    },
    normalTimingActive: function () {
        return Session.get('normalTimingActive');
    },
    normalTiming: function () {
        return Session.get('normalTiming');
    },
    actionText: function () {
        return Session.get('actionText');
    },
    mainText: function () {
        return Session.get('mainText');
    },
    focusTextActive: function () {
        return Session.get('focusTextActive');
    },
    focusText: function () {
        return Session.get('focusText');
    },
    statusText: function () {
        return Session.get('statusText');
    },
    backback: function () {
        //return Gamebook.story.player.printBackback();
        return '<li>Schriftrolle</li><li>Karte</li>';

    }
});

Template.page.events({
    'click .keyword, mousedown .keyword': function (event) {
        //get the id of the object and store it int the session for later use
        var objectId = event.currentTarget.dataset.objectid;
        //prevent default
        event.preventDefault();
        Session.set('activatedObjectId', objectId);
        //test if left or right click
        if (event.button === 2)
            showStats();


        //if it was a left click, show daVince View
        showDaVince(objectId);
        return false;
    },
    'click .white-box, mouseup .white-box': function (event) {
        var mousedown = $('#mousedown').hide();
        var currentObject = Gamebook.story.getSceneObject(Session.get('activatedObjectId'));
        var override = currentObject.overrrides[event.currentTarget.id]
        if (override)
            Session.set('actionText', override);
        else
            Session.set('actionText', ACTION.de[event.currentTarget.id]);
        currentObject.fireEvent(event.currentTarget.id);
    },

    /* 'click .dropdown-button': function(event){

     },
     */
    /**
     * Show left and right hand on backback
     */
    'click .backback-left, mouseup .white-box.backback-left': function () {

    },
    'click .backback-right, mouseup .white-box.backback-right': function () {

    },

    /**
     * Hide .daVinci-view on any click or keyup
     */
    'click': function (event) {
        /**
         * if click is on an element or if it is a keyup, hide daVinci-view
         */
        $('#mousedown').hide();
    }
});

/**
 * Shows stats in toast for chosen object
 */
function showStats() {
    Session.set('objectProperty', false);
    setObjectProperties(Session.get('activatedObjectId'));
    $('#statistics').openModal();
}

/**
 * Show davince view for the element with this objectId
 * @param objectId
 */
function showDaVince(objectId) {
    var currentObject = Gamebook.story.getSceneObject(objectId),
        elem = $('#mousedown');

    //count the elements
    var length = elem.children('.white-box').length;
    elem.children('.white-box').each(function () {
        var self = this;
        length--;
        if (currentObject.events[this.id] === undefined)
            $(this).hide();
    });
    //we reduced the length for every object not implemented. If length === 0, there are no white-boxes, which means, we do not have show the mousedown menu
    if (length !== 0) {
        elem.css({
            left: event.pageX - 50,
            top: event.pageY - 50
        }).show();
    }
}

