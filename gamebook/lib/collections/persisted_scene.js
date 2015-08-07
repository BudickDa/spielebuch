/**
 * Created by Daniel Budick on 07.08.2015.
 * Copyright 2015 Daniel Budick All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 *
 * This file is part of
 *  is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 *  is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with . If not, see <http://www.gnu.org/licenses/>.
 */
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
PersistedScenes = new Mongo.Collection('persistedScenes');
PersistedScene = Astro.Class({
    name: 'Scene',
    collection: PersistedScenes,
    fields: {
        'name': {
            type: 'string'
        },
        'effects': {
            type: 'array',
            default: []
        },
        storyId: {
            type: 'string',
            index: 1
        },
    },
    methods: {
        addEffect: function (effect) {
            this.effects.push(effect);
        },
        getStats: function (name) {
            return getStats(this, name);
        },
        fireHook: function (event) {
            if (Meteor.isClient) {
                var self = this, hookFunction;
                hookFunction = new Function(self.events[event]);
                (hookFunction());

            }
        },
        updateWeather: function (weather) {
            this.environment.setWeather(weather);
        },


        /**
         * add description of the weather to the scene text
         * @param language (optional) language of the string. If not set, we take the default language.
         */
        howIsTheWeather: function (language) {
            if (!language)
                language = Gamebook.config.defaultLanguage; //no language param, take default language
            var weather = this.environment.getWeather();
            if (weather.text) {
                if (weather.text[language]) {
                    this.text += weather.text[language];
                }
            }

        }
    }
});
