/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

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
    backback: function(){
        //return Gamebook.story.player.printBackback();
        return '<li>Schriftrolle</li><li>Karte</li>';

    }
});

Template.page.events({
    'click .keyword, mousedown .keyword': function (event) {
        var elem = $('#mousedown');
        Session.set('activatedObjectId', event.currentTarget.dataset.objectid);
        elem.css({
            left: event.pageX - 50,
            top: event.pageY - 50
        }).show();
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

    /**
     * Show content of backback
     */
   /* 'click .dropdown-button': function(event){

    },
*/
    /**
     * Show left and right hand on backback
     */
    'click .backback-left, mouseup .white-box.backback-left': function(){

    },
    'click .backback-right, mouseup .white-box.backback-right': function(){

    },

    /**
     * Hide .daVinci-view on any click or keyup
     */
    'click': function (event) {
        /**
         * if click is on an element or if it is a keyup, hide daVinci-view
         */
        $('#mousedown').hide();
    },

});