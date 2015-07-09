/**
 * Created by Daniel Budick on 09.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

/**
 * This is the active story. Never use the variable story in your book.
 * Things will break and you will cry.
 * @type {{}}
 */
story = {};

/**
 * seeding random-Generator chance for the server, client can simply use chance (e.g. chance.name())
 * @type {Chance}
 */
if(Meteor.isServer)
    chance = new Chance();