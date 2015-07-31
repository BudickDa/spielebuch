/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

/**
 * Allowed events for da-vinci
 */
var daVinciEvents = ['top', 'rightTop', 'right', 'rightBottom', 'bottom', 'leftBottom', 'left', 'leftTop', 'center'];
var validateEvent = function (event) {
    if (_.indexOf(daVinciEvents, event) === -1) {
        debugMsg('This event does not exist', 'The event ' + event + ' is not a part of the da vinci system.');
        return false;
    }
    return true;
}

/**
 * Public
 * An Object the player can interact with
 */
export class SceneObject extends BaseObject {
    constructor(name) {
        this._id = chance.guid();
        this.name = name;

        this.effects = [];
        this.effectsDep = new Tracker.Dependency();

        this.events = {};

        /**
         * these parameter can be set with a function
         * that will be executed before and after an event is fired.
         * @type {function}
         */
        this.beforeHookOverride = undefined;
        this.afterHookOverride = undefined;

        /**
         * here a function can be defined that is called when the object was destroyed
         * @type {function}
         */
        this.afterDestruction = undefined;

        /**
         * overrrides name of da-vinci-action in UI
         */
        this.overrrides = {};
    }

    addEffect(effect) {
        this.effects.push(effect);
        this.effectsDep.changed();
    }

    /**
     * take object into inventory
     */
    take() {
        Gamebook.story.player.addToBackpack(this);
        Gamebook.story.currentScene().removeSceneObject(this._id);
    }

    /**
     * drop object into scene
     */
    drop() {
        Gamebook.player.removeFromBackback(this._id);
        Gamebook.story.currentScene().addSceneObject(this);
    }

    /**
     * deletes object from scene
     */
    destroy() {
        var self = this;
        Gamebook.story.currentScene().removeSceneObject(this._id);
        Gamebook.story.currentScene().updateText();
        if (typeof self.afterDestruction === "function") {
            self.afterDestruction();
        }

    }

    /**
     * Adds eventlistener to the object, these events are called via the da-vinci-system
     * @param event: should be one of those values: ['top','rightTop','right','rightBottom','bottom','leftBottom','left','leftTop']. If Box is acitvated in UI, callback will be called.
     * @param callback: Function that will be executed when event is triggered
     * @param name (optioinal): Name of action shown in UI
     */
    addEvent(event, callback, name) {
        if (!validateEvent(event))
            return;
        this.events[event] = callback;
        if (name)
            this.overrrides[event] = name;
    }

    /**
     * does the same as addEvent, only to an array of events
     * @param events e.g. ['left', 'right']
     * @param callback is connected to each event
     * @param name is used for all the events
     */
    addEvents(events, callback, name) {
        var self = this; //this is a typical example, where when this is needed it not longer exists. You got to <3 JavaScript
        _.forEach(events, function (event) {
            self.addEvent(event, callback, name);
        });
    }

    checkEvent(event) {
        return typeof this.events[event] === 'function';
    }

    checkOverride(event) {
        return !!this.overrrides[event];
    }

    getStats(name) {
        this.effectsDep.depend();
        return getStats(this, name);
    }

    beforeHook(cb) {
        if (typeof self.beforeHookOverride === "function")
            self.afterHookOverride();
        return cb();
    }

    afterHook() {
        var self = this, health;

        if (typeof self.afterHookOverride === "function") {
            self.afterHookOverride();
        } else {
            /**
             * Things can only break if we now, what stats we have to observe
             * */
            if (Gamebook.story.defaultHitpoints) {
                health = self.getStats(Gamebook.story.defaultHitpoints)[Gamebook.story.defaultHitpoints];

                /**
                 * health has to be subzero
                 * */
                if (health < 0) {
                    self.destroy();
                }
            }
        }
    }

    fireEvent(event) {
        var self = this;
        self.beforeHook(function () {
            if (!validateEvent(event))
                return;
            self.events[event]();
            return self.afterHook();
        });
    }


}
