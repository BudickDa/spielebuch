/**
 * Created by Daniel Budick on 04.08.2015.
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
 * This object is a sceneObject that was persited into the database.
 * @type {Mongo.Collection}
 */
PersistedSceneObjects = new Mongo.Collection('persistedSceneObjects');
PersistedSceneObject = Astro.Class({
    name: 'SceneObject',
    collection: SceneObjects,
    fields: {
        sceneObject: {
            type: 'object'
        },
        'sceneObject.name': {
            type: 'string'
        },
        'sceneObject.effects': {
            type: 'array',
            default: []
        },
        'sceneObject.overrides': {
            type: 'object',
            default: {}
        },
        'sceneObject.events': {
            type: 'object',
            default: {}
        },
        location: 'string'
    },
    methods: {
        addEffect: function (effect) {
            this.sceneObject.effects.push(effect);
            this.save();
        },

        /**
         * take object into inventory
         */
        take: function () {
            Gamebook.story.player.addToBackpack(this);
            Gamebook.story.currentScene().removeSceneObject(this._id);
        },

        /**
         * drop object into scene
         */
        drop: function () {
            Gamebook.player.removeFromBackback(this._id);
            Gamebook.story.currentScene().addSceneObject(this);
        },

        /**
         * deletes object from scene
         */
        destroy: function () {
            var self = this;
            Gamebook.story.currentScene().removeSceneObject(this._id);
            Gamebook.story.currentScene().updateText();
            if (typeof self.afterDestruction === "function") {
                self.afterDestruction();
            }

        },

        /**
         * Adds eventlistener to the object, these events are called via the da-vinci-system
         * @param event: should be one of those values: ['top','rightTop','right','rightBottom','bottom','leftBottom','left','leftTop']. If Box is acitvated in UI, callback will be called.
         * @param callback: Function that will be executed when event is triggered
         * @param name (optioinal): Name of action shown in UI
         */
        addEvent: function (event, callback, name) {
            if (!validateEvent(event))
                return;
            this.events[event] = callback;
            if (name)
                this.overrrides[event] = name;
        },

        /**
         * does the same as addEvent, only to an array of events
         * @param events e.g. ['left', 'right']
         * @param callback is connected to each event
         * @param name is used for all the events
         */
        addEvents: function (events, callback, name) {
            var self = this; //this is a typical example, where when this is needed it not longer exists. You got to <3 JavaScript
            _.forEach(events, function (event) {
                self.addEvent(event, callback, name);
            });
        },

        checkEvent: function (event) {
            return typeof this.events[event] === 'function';
        },

        checkOverride: function (event) {
            return !!this.overrrides[event];
        },

        getStats: function (name) {
            this.effectsDep.depend();
            return getStats(this, name);
        },

        beforeHook: function (cb) {
            if (typeof self.beforeHookOverride === "function")
                self.afterHookOverride();
            return cb();
        },

        afterHook: function () {
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
        },

        fireEvent: function (event) {
            var self = this;
            self.beforeHook(function () {
                if (!validateEvent(event))
                    return;
                self.events[event]();
                return self.afterHook();
            });
        }
    }
});
