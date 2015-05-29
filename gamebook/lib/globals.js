/**
 * seeding random-Generator chance for the server, client can simply use chance (e.g. chance.name())
 * @type {Chance}
 */
if(Meteor.isServer)
    chanceOnServer = new Chance();