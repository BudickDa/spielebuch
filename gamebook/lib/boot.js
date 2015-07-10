/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */


/**
 * seeding random-Generator chance for the server, client can simply use chance (e.g. chance.name())
 * @type {Chance}
 */
if(Meteor.isServer)
    chance = new Chance();