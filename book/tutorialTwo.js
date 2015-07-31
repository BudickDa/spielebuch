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
var swordDamage = new Gamebook.Rule('Nahkampfschaden', '+60');

/**
 * we create the effects and add the rules
 */
var rotten = new Gamebook.Effect('verrottet', [lowerHP, lowerDamage]);
var old = new Gamebook.Effect('alt', [lowerHP]);

/**
 * we fill the scene
 */
sceneOne.addText('Du stehtst auf einer Lichtung. ');
var holztisch = sceneOne.createKeyword('In der Mitte steht ein alter, nasser und halbverotteter [Holztisch]. ');
var schwert = sceneOne.createKeyword('An einem Baum lehnt ein silbrig glänzendes [Schwert].');

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
schwert.addEffect(new Gamebook.Effect('default', [swordDamage, iron]));

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
 * this time we want to use the backpack. This means we have to create a player.
 * In the constructor we can give him some effects (in our case )
 * the player is added to the story.
 *
 * the player is human, so we add an effect with rule humanHealth that has been defined in /book/rules.js
 * and humanFistDamage to deal some damage with bare hands
 */
var human = new Gamebook.Effect('Mensch', [humanHealth, humanFistDamage]);

storyTwo.createNewPlayer(new Player([human]));

/**
 * in the next step we have to add an event.
 * we have to define what happens when we use the sword with the left and right hand.
 * if we use the object, the player should put it in his backpack
 * Because we are lazy, we use addEvents and add the same function to different events
 */
schwert.addEvents(['left', 'right'], function () {
    schwert.take(); //put the sword from the scene into the backpack
    sceneOne.updateText(); //update the text, which does not mention the sword.
}, 'Das Schwert in den Rucksack nehmen');


/**
 * in the next step we have to add another event.
 * This event is triggered whenever the table is
 * hit with left or right.
 *
 * for this we call the players attackLeft method and attackRight method.
 * We have to define the effect, that will be the damage. In our case it is called 'Nahkampfschaden'.
 * We can chose several effects, so we must use an array.
 *
 * The second parameter should be the effect, the attack will reduce. In our case 'Gesundheit'.
 *
 * All this gives us a new effect, we can add to holztisch.
 *
 *
 */

holztisch.addEvent('left', function () {
    var damageEffect = Gamebook.story.player.attackLeft(['Nahkampfschaden'], 'Gesundheit'); //the var is important, because the damageEffect should exist in the scope of the function only.
    holztisch.addEffect(damageEffect);
}, 'Du schlägst auf den Tisch');
holztisch.addEvent('right', function () {
    var damageEffect = Gamebook.story.player.attackRight(['Nahkampfschaden'], 'Gesundheit');
    holztisch.addEffect(damageEffect);
}, 'Du schlägst auf den Tisch');


/**
 * To make things destructable, we have to chose the effect that stands for the value, often known as hitpoints
 * if the 'Gesundheit' decreases under zero, the object gets destructed and removed.
 **/
storyTwo.defaultHitpoints = 'Gesundheit';

/**
 * When the 'Holztisch' will be destroyed we want to go to the next scene.
 * So we define a afterDestruction hook
 */
holztisch.afterDestruction = function () {
    sceneOne.addText('Die Tümmer des Holztisches sind in der Gegend verteilt.');
    sceneOne.updateText();

    /**
     * but we want more. A countdown should start. And the scene will change in 5 seconds
     */
    Meteor.setTimeout(function () {
        storyTwo.nextScene();
    }, 2500);
};

/**
 * we create the next scene. This time we want sunny weather.
 */
var sceneTwo = new Gamebook.Scene('sunny');
sceneTwo.addText('Deine Beine sind noch wackelig. Die Luft um dich herum riecht nach Schwefel. Du hörst Schritte...');
var etwas = sceneTwo.createKeyword('Vor dir im Nebel ist [etwas]...');
etwas.addEvent('center', function () {
    //do nothing, because player can see nothing.
}, 'Du starrst und starrst, aber kannst nichts erkennen.');
etwas.addEvent('bottom', function () {
    /**
     * wir wollen Spannung. Deswegen nutzen wir für diesen Countdown die UI
     */
    Gamebook.startUiCountdown(3000, 200, function () {
        /**
         * here we have to use the Gamebook object to go to the next scene.
         */
        Gamebook.story.nextScene();

    });
}, 'Du gehst darauf zu.');


var sceneThree  = new Gamebook.Scene();
sceneThree.addText("Stille, die Luft hat sich geklärt. Du stehst auf einer Wiese");
sceneThree.howIsTheWeather(); //we tell the weather, just because we can.
/**
 * let's give the user a possibility to get to the final scene:
 */
var button = sceneThree.createKeyword('Vor dir auf einer Säule ist ein [Knopf]. ');
/**
 * if the use pushes the button he will be teleported to the last scene
 */
button.addEvents(['left', 'right'], function () {
    sceneThree.nextScene();
}, 'Du drückst den Knopf, du drückst ihn für die Ehre!')

sceneThree.updateText();


/**
 * last final scene, there will be an npc!
 */
var sceneFour = new Gamebook.Scene();
sceneFour.addText('Du stehst in einer Arena, um dich herum das tösende gebrüll der Massen.');
var fighter = sceneFour.createKeyword('Ein [Kämpfer] kommt auf dich zugestürmt, was machst du nun? ');
fighter.addEffect(human);
/**
 * we have no npcs atm, so we have to simulate on with countdowns
 * he will attack and kill us if we do not kill him first.
 * But if is killed the countdown should stop. Every countdown gives us a killswitch
 *
 * The countdown should start with  the scene, so we use the onStart hook of the scene object
 */

var killSwitch;
sceneFour.onStart = function () {
    killSwitch = Gamebook.startUiCountdown(10000, 200, function () {
        /**
         * after the countdown, the fighter will kick our ass
         */
        var asskick = new Effect('Todesschlag', [new Rule('Gesundheit', '-200')]);
        Gamebook.story.player.addEffect(asskick);
    });
};
/**
 * we need to kill the fighter, this means we have to add some events
 */
fighter.addEvent('left', function () {
    var damageEffect = Gamebook.story.player.attackLeft(['Nahkampfschaden'], 'Gesundheit'); //the var is important, because the damageEffect should exist in the scope of the function only.
    fighter.addEffect(damageEffect);
}, 'Du schlägst mit links');
fighter.addEvent('right', function () {
    var damageEffect = Gamebook.story.player.attackRight(['Nahkampfschaden'], 'Gesundheit');
    fighter.addEffect(damageEffect);
}, 'Du schlägst mit rechts');


/**
 * we use the afterDestruction function and stop the countdown before it is too late
 * and we start a silent timer, to send a message of celebration. The user has won.
 */
fighter.afterDestruction = function () {
    Gamebook.stopCountdown(killSwitch);
    sceneFour.overrideText('Glückwunsch, Du hast das Abenteuer bestanden.')
};


/**
 * and always remember to add the scenes to the story.
 */
storyTwo.addScene(sceneOne);
storyTwo.addScene(sceneTwo);
storyTwo.addScene(sceneThree);
storyTwo.addScene(sceneFour);
Gamebook.stories.storyTwo = storyTwo;