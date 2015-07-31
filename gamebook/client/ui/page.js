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
    backpack: function () {
        return Gamebook.story.player.getBackpack();
    }
});

Template.page.events({
    'click .keyword, mousedown .keyword': function (event) {
        //get the id of the object and store it int the session for later use
        var objectId = event.currentTarget.dataset.objectid, position;
        //prevent default
        event.preventDefault();
        Session.set('activatedObjectId', objectId);
        //test if left or right click
        if (event.button === 2)
            return showStats();


        position = {pageX: event.pageX, pageY: event.pageY};
        //if it was a left click, show daVince View
        showDaVince(objectId, position);
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
     * Put left or right hand into backback by clicking on it with left or right
     */
    'click #backpack': function () {
        //prevent default
        event.preventDefault();
        //test if left or right click
        if(event.button === 0)
            console.log('Drop left hand')
        if (event.button === 2)
            console.log('Drop right hand')
    },
    /**
     * Get left or right hand from backback by clicking on item with left or right
     */
    'click #backpack': function () {
        //prevent default
        event.preventDefault();
        //test if left or right click
        if(event.button === 0)
            console.log('Put into left hand')
        if (event.button === 2)
            console.log('Put into right hand')
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
function showDaVince(objectId, position) {
    var currentObject = Gamebook.story.getSceneObject(objectId),
        elem = $('#mousedown');

    console.log(currentObject.events);
    //count the elements
    var length = elem.children('.white-box').length;
    elem.children('.white-box').each(function () {
        var self = this;
        if (currentObject.events[this.id] === undefined) {
            length--;
            $(this).hide();
        }
    });
    //we reduced the length for every object not implemented. If length === 0, there are no white-boxes, which means, we do not have show the mousedown menu
    console.log(length);
    if (length !== 0) {
        elem.css({
            left: position.pageX - 50,
            top: position.pageY - 50
        }).show();
    }
}

