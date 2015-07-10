/**
 * Created by Daniel Budick on 04.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
var storyTwo = new Gamebook.Story();

var sceneOne = new Gamebook.Scene();
sceneOne.addText('Diese Geschichte muss noch geschrieben werden.');

storyTwo.addScene(sceneOne);

/**
 * Tutorial 2: Effects and rules
 *
 */
var rotted = new Gamebook.Effect('verrottet', []);
var old = new Gamebook.Effect('alt', []);


Gamebook.stories.storyTwo = storyTwo;