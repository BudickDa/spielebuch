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
var sceneOne = new Gamebook.Scene();

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
var schwert01 = sceneOne.createKeyword('Auf diesem liegt ein silbrig glänzendes [Schwert].');

/**
 * Step 5: Manipulate a GameObject
 * Via the returned GameObject wie can manipulate an Object behind a Keyword.
 * We add the effects 'verrottet' and 'alt'.
 *
 * You can find more info to effects in the effect and rules tutorial (tutorialTwo.js)
 *
 * for now we only add empty effects instead of real effects with rules. An effect without a rule does nothing
 */
var rotten = new Gamebook.Effect('verrottet', []);
var old = new Gamebook.Effect('alt', []);
holztisch.addEffect(rotten);
holztisch.addEffect(old);

/**
 * Step 6: Add an event handler
 * In the da-vinci System there is an action for every direction.
 * We chose the direction top, if top is called in the ui, we go to the next scene.
 * The Name of the action will be: 'Den Tisch betrachten.'
 */
holztisch.addEvent('center', function(){
    storyOne.nextScene();
}, 'Den Tisch betrachten.');

storyOne.addScene(sceneOne);


/**
 * Step 6: Let's add another scene where we change to
 */
var sceneTwo = new Gamebook.Scene('rainy');
sceneTwo.addText('Du betrachtest den Tisch und denkst über die Möglichkeiten nach, die dieses Spiel bietet. ');
var schwert02  = sceneTwo.createKeyword('Dein Blick fällt auf das [Schwert] das vollkommen nutzlos erscheint. ');
schwert02.addEvent('left', function(){
    sceneTwo.addText('Was Du mit dem Schwert machen kannst findest Du im zweiten Tutorial (tutorialTwo.js)');
    sceneTwo.updateText();
}, 'Das Schwert nehmen.');

storyOne.addScene(sceneTwo);


/**
 * Step 7: Start story
 * Add story to Gamebook.stories, that makes it globally available.
 */
Gamebook.stories.storyOne = storyOne;

/**
 * this application contains multiple stories. These stories are chosen by the URL in the router (/gamebook/lib/router.js)
 */