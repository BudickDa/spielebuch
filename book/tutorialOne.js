/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

/**
 * Tutorial 1: How to create a scene and add it to a story.
 */


/**
 * Step 1: Create a Story object.
 */
var storyOne = new Gamebook.Story();


/**
 * Step 2: Create the first Scene
 * We will call it 'sceneOne'.
 * Scenes should not be global because they will be added to the story,
 * thus 'sceneOne' is only temporally used
 */
var sceneOne = new Scene('rainy');

/**
 * Step 3: Adding some content
 * With the method 'addText' we can add Text without Keywords.
 * 'addText' will return nothing.
 * Text and Keywords will be saved in an Array,
 * this means, that the order in the created text.
 * This means, that the order of calling 'addText' or
 * 'createKeyword' dictates the order of the text.
 */
sceneOne.addText('Du wachst in einem dunklen Raum auf, was Wasser rieselt von der Decke.');
/**
 * Step 4: Adding a Keyword
 * We create GameObjects implicitly by writing text in the method 'createKeyword'.
 * 'createKeyword' returns the GameObject. We save it temporally in 'holztisch'.
 * In step 5 we will use 'holztisch' to manipulate the object in the scene.
 * The name of the object has to be marked with brackets:
 * e.g. '[Holztisch]' -> The GameObjects name is 'Holztisch'.
 *
 * Warning: If we want to decline a noun e.g. 'Die Macht des Schwertes',
 * we have to be careful:
 * Wrong -> Die Macht des [Schwertes] => in backback: Schwertes
 * Right -> Die Macht des [Schwert]es => in backback: Schwert
 */
var holztisch = sceneOne.createKeyword('Der Raum ist dunkel, in der Mitte steht ein alter, nasser und halbverotteter [Holztisch]. ');
var schwert = sceneOne.createKeyword('Auf diesem liegt ein silbrig glänzendes [Schwert].');

/**
 * Step 5: Manipulate a GameObject
 * Via the returned GameObject wie can manipulate an Object behind a Keyword.
 * We add the effects 'verrottet' and 'alt'.
 *
 * You can find more info to effects in the effect and rules tutorial (tutorialTwo.js)
 */
holztisch.hasEffect('verrottet');
holztisch.hasEffect('alt');

/**
 * Step 6: Add an event handler
 * In the da-vinci System there is an action for every direction.
 * We chose the direction top, if top is called in the ui, we go to the next scene.
 * The Name of the action will be: 'Den Tisch betrachten.'
 */
holztisch.addEvent('center', function(){
    storyOne.nextScene();
}, 'Den Tisch betrachten.')

storyOne.addScene(sceneOne);


/**
 * Step 6: Let's add another scene where we change to
 */
var sceneTwo = new Scene('rainy');
sceneTwo.addText('Du betrachtest den Tisch und denkst über die Möglichkeiten nach, die dieses Spiel bietet. ');
sceneTwo.createKeyword('Dein Blick fällt auf das [Schwert] das vollkommen nutzlos erscheint. ');
sceneTwo.addText('Was Du mit dem Schwert machen kannst findest Du im zweiten Tutorial (tutorialTwo.js)');
storyOne.addScene(sceneTwo);


/**
 * Step 7: Start story
 * Add story to Gamebook.stories, that makes it globally available.
 */
Gamebook.stories.storyOne = storyOne;

/**
 * this application contains multible stories. These stories are choosen by the URL in the router (/gamebook/lib/router.js)
 */






