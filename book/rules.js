/**
 * Created by Daniel Budick on 04.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

/**
 * Here you can define rules for your game.
 * You can add those defined rules to an effect, to a scene, a story or a player.
 * Rules should be global.
 */

/**
 * A rule consists of a key and a value.
 * If the value is a string with a + or - it manipulates the absolute value.
 * If it is a number, it overrides the absolute value. The last absolute rule always wins.
 * E.g
 * 15
 * '+5'
 * '-4'
 * = 16
 *
 * 15
 * '+3'
 * '-16'
 * '12'
 * = 12
 *
 * If a rule/effect was added to a scene or a story it affects all the objects in the scene or story.
 * If it was added to a player or object it affects only this player/object
 */
fireDamageReduced = new Gamebook.Rule('Feuerschaden', '-5');

iron = new Gamebook.Rule('Gesundheit', 260);
fragile = new Gamebook.Rule('Gesundheit', 30);

humanHealth = new Gamebook.Rule('Gesundheit', 80);





/**
 * if no other language is chosen, we take german.
 * @type {string}
 */
defaultLanguage = 'de';

