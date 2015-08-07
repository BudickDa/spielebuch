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

GamebookBackend = {
    stories: {},
    Effect: Effect,
    Rule: Rule,
    Story: Story,
    Scene: Scene,
    config: {
        /**
         * if no other language is chosen, we take german.
         * @type {string}
         */
        defaultLanguage: 'de',
        /**
         * events that are allowed while interacting with object
         */
        events: ['view', 'interact', 'take']
    },

};