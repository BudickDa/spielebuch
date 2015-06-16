/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
var sceneOne = new Scene('rainy');
sceneOne.addText('Du wachst in einem dunklen Raum auf, was Wasser rieselt von der Decke.')
//we can save the object behind a keyword like this, to manipulate it
var holztisch = sceneOne.createKeyword('Der Raum ist dunkel, in der Mitte steht ein alter, nasser und halbverotteter [Holztisch]. ');
//Holztisch has now the effect 'rotten' and 'old', exactly like we wrote it in the text.
holztisch.hasEffect('rotten');
holztisch.hasEffect('old');
sceneOne.updateText();

//this will be printed after 5 seconds:
Meteor.setTimeout(function(){
    sceneOne.createKeyword('Auf diesem liegt ein silbrig glänzendes [Schwert].');
    sceneOne.updateText();
}, 5000)



