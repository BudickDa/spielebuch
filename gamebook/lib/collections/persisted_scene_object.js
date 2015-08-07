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
    collection: PersistedSceneObjects,
    fields: {
        sceneObject: {
            type: 'object',
            default: {}
        },
        'sceneObject.name': {
            type: 'string'
        },
        'sceneObject.effects': {
            type: 'array',
            default: []
        },
        'sceneObject.hooks': {
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
        location: {
            type: 'string',
            index: 1
        },
    },
    methods: {
        addEffect: function (effect) {
            this.sceneObject.effects.push(effect);
        },

        /**
         * take object into inventory
         */
        take: function (playerId) {
            this.location = playerId;
        },

        /**
         * drop object into scene
         */
        drop: function (sceneId) {
            this.location = sceneId;
        },

        /**
         * deletes object from scene
         */
        destroy: function () {
            var afterDestruction;
            this.remove();

            if (Meteor.isClient) {
                Gamebook.story.currentScene().updateText();
            }

            if (this.sceneObject.events.afterDestruction) {
                afterDestruction = new Function(this.sceneObject.events.afterDestruction);
                return (afterDestruction());
            }

        },

        /**
         * Adds eventlistener to the object, these events are called via the da-vinci-system
         * @param event: should be one of those values: ['top','rightTop','right','rightBottom','bottom','leftBottom','left','leftTop']. If Box is acitvated in UI, callback will be called.
         * @param callback: Function that will be executed when event is triggered
         * @param name (optioinal): Name of action shown in UI
         */
        addEvent: function (event, callback, name) {
            if (Meteor.isServer) {
                /**
                 * Check if event was defined in config.
                 */
                if (!validateEvent(event))
                    return;
                //If you're going to do something ugly, do it with regex.
                //- nrabinowitz -
                //http://stackoverflow.com/questions/14885995/how-to-get-a-functionss-body-as-string
                /**
                 * Store the event as string. Because of security, this should only be possible on serverside.
                 */
                this.sceneObject.events[event] = callback.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];

                /**
                 * if a name is defined, override default string for action
                 */
                if (name) {
                    this.sceneObject.overrides[event] = name;
                }
            }
        },

        addHook: function (hook, hookFunction) {
            if (Meteor.isServer) {
                /**
                 * Check if event was defined in config.
                 */
                if (!validateEvent(event))
                    return;
                //If you're going to do something ugly, do it with regex.
                //- nrabinowitz -
                //http://stackoverflow.com/questions/14885995/how-to-get-a-functionss-body-as-string
                /**
                 * Store the event as string. Because of security, this should only be possible on serverside.
                 */
                this.sceneObject.events[event] = callback.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];

                /**
                 * if a name is defined, override default string for action
                 */
                if (name) {
                    this.sceneObject.overrides[event] = name;
                }
            }
        },

        /**
         * does the same as addEvent, only to an array of events
         * @param events e.g. ['left', 'right']
         * @param callback is connected to each event
         * @param name is used for all the events
         */
        addEvents: function (events, callback, name) {
            var self = this; //this is a typical example, where when this is needed it does no longer exists. You got to <3 JavaScript
            _.forEach(events, function (event) {
                self.addEvent(event, callback, name);
            });
        },

        checkEvent: function (event) {
            return !!this.sceneObject.events[event];
        },

        checkOverride: function (event) {
            return !!this.sceneObject.overrides[event];
        },

        getStats: function (name) {
            return getStats(this, name);
        },

        beforeHook: function (cb) {
            var afterHookOverride;
            if (this.sceneObject.hooks['beforeHook']) {
                afterHookOverride = new Function(this.sceneObject.hooks['beforeHook']);
                (afterHookOverride());
            }

            return cb();
        },
        afterHook: function () {
            var self = this, health, beforeHookOverride;
            if (this.sceneObject.hooks['beforeHook']) {
                beforeHookOverride = new Function(this.sceneObject.events['beforeHookOverride']);
                (beforeHookOverride());
            } else {
                /**
                 * Things can only break if we now, what stats we have to observe
                 * */
                if (GamebookBackend.story.defaultHitpoints) {
                    health = self.getStats(GamebookBackend.story.defaultHitpoints)[Gamebook.story.defaultHitpoints];

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
            if (Meteor.isClient) {
                var self = this, eventFunction;
                self.beforeHook(function () {
                    if (!validateEvent(event)) {
                        return;
                    }
                    if (!self.checkEvent(event)) {
                        eventFunction = new Function(self.sceneObject.events[event]);
                        (eventFunction());
                    }
                    return self.afterHook();
                });
            }
        }
    }
});
