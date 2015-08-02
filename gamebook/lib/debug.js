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
 * this sends a message through all chanels. On server side, it will crash the application.
 * @param title
 * @param msg
 */
hardDebugMsg = function (title, msg) {
    if (Meteor.isServer)
        throw new Meteor.Error(500, title + '\n' + msg);
    if (Meteor.isClient) {
        if (console && console.log) {
            console.log(title);
            console.log(msg);
        }
        Notifications.error(title, msg);
    }
};

/**
 * this sends a friendly reminder, that something could be wrong.
 *
 * @param title
 * @param msg
 */
debugMsg = function (title, msg) {
    if (console && console.log) {
        console.log(title);
        console.log(msg);
    }
};