/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
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