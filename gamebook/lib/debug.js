/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

debugMsg = function (title, msg) {
    if (Meteor.isServer)
        throw new Meteor.Error(500, title + '\n' + msg);
    if (Meteor.isClient) {
        if (console && console.log) {
            console.log(title);
            console.log(msg);
        }
        Notifications.error(title, msg);
    }
}