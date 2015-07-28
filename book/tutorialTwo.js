/**
 * Created by Daniel Budick on 04.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

/**
 * Tutorial 2: Effects and rules
 * First we decide, that the weather is rainy.
 */
var storyTwo = new Gamebook.Story();

var sceneOne = new Gamebook.Scene('rainy');
storyTwo.addScene(sceneOne);

/**
 * We share the waether with reader
 */
sceneOne.howIsTheWeather();

/*
 * Then we create some rules and put them together into an effect.
 * E.g.:
 * We create the effect old:
 * old objects have lower hitpoints
 * rotten object have lower hitpoints too and do less meleeDamage
 */

/**
 * these rules are manipulators, they change the values.
 */
var lowerHP = new Gamebook.Rule('Stabilität', '-15');
var lowerDamage = new Gamebook.Rule('Nahkampfschaden', '-20');

/**
 * these rules have absolute values, they set these values.
 */
var swordDamage = new Gamebook.Rule('Nahkampfschaden', 60);

/**
 * we create the effects and add the rules
 */
var rotten = new Gamebook.Effect('verrottet', [lowerHP, lowerDamage]);
var old = new Gamebook.Effect('alt', [lowerHP]);

/**
 * we fill the scene
 */
var holztisch = sceneOne.createKeyword('Der Raum ist dunkel, in der Mitte steht ein alter, nasser und halbverotteter [Holztisch]. ');
var schwert = sceneOne.createKeyword('Auf diesem liegt ein silbrig glänzendes [Schwert].');

/**
 * we can give the table some standard values
 * fragile is a global rule from /book/rules.js
 * Effects with the name default are shown as the default values of an object
 */
holztisch.addEffect(new Gamebook.Effect('default', [fragile]));
/**
 * and the created effects
 */
holztisch.addEffect(rotten);
holztisch.addEffect(old);

/**
 * the same with the sword
 */
schwert.addEffect(new Gamebook.Effect('default', [swordDamage,iron]));

/**
 * oh no... the weather is rainy... that means fire does less damage.
 * instead of adding an effect to every object, we add an effect to the scene.
 * For this we use the global rules from /book/rules.js with the name 'fireDamageReduced'.
 * We pack it all into the effect 'rainy' and apply it to the scene. We could of course apply it to the story.
 *
 * Story effects are overridden by scene effects and scene effects are overwridden by object effects
 */
var rainy = new Gamebook.Effect('rainy', [fireDamageReduced]);
sceneOne.addEffect(rainy);

/**
 * in the next step we have to add an event.
 * This event is triggered whenever something is hit
 */




















Gamebook.stories.storyTwo = storyTwo;