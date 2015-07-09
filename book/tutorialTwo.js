/**
 * Created by Daniel Budick on 04.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
storyTwo = new Story();

var sceneOne = new Scene();
sceneOne.addText('Diese Geschichte muss noch geschrieben werden.');

storyTwo.addScene(sceneOne);

/**
 * Tutorial 2: Effects and rules
 *
 */
var rotted = new Effect('verrottet', []);
var old = new Effect('alt', []);
