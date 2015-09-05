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

export class Player {
    constructor(effects) {
        this.backpack = [];
        this.backpackDep = new Tracker.Dependency(); //make backpack trackable so the view gets informed when something has changed


        this.leftHand = -1;
        this.leftHandDep = new Tracker.Dependency();

        this.rightHand = -1;
        this.rightHandDep = new Tracker.Dependency();

        this.afterDestruction = undefined;
        /**
         * these parameter can be set with a function
         * that will be executed before and after an event is fired.
         * @type {function}
         */
        this.beforeHookOverride = undefined;
        this.afterHookOverride = undefined;

        if (effects)
            this.effects = effects;
        else
            this.effects = [];

        this.effectsDep = new Tracker.Dependency();

    }

    /**
     * deletes object from scene
     */
    destroy() {
        var self = this;
        if (typeof self.afterDestruction === "function") {
            self.afterDestruction();
        }

    }

    addToBackpack(object) {
        this.backpack.push(object);
        this.backpackDep.changed();
    }

    /**
     * takes object from the left hand and puts it into the backback.
     */
    addToBackpackFromLeftHand() {
        if (this.leftHand !== -1) {
            this.backpack.push(this.leftHand);
            this.backpackDep.changed();
            this.leftHand = -1;
            this.leftHandDep.changed();
            this.effectsDep.changed();
        }
    }

    /**
     * takes object from the right hand and puts it into the backback.
     */
    addToBackpackFromRightHand() {
        if (this.rightHand !== -1) {
            this.backpack.push(this.rightHand);
            this.backpackDep.changed();
            this.rightHand = -1;
            this.rightHandDep.changed();
            this.effectsDep.changed();

        }
    }

    removeObjectFromBackpack(_id) {
        var result = false, sceneObject, self = this;
        _.each(self.backpack, function (object, index) {
            if (object._id === _id) {
                self.backpack.splice(index, 1);
                self.backpackDep.changed();
                result = true;
            }
        });
        return result;
    }

    getBackpack() {
        this.backpackDep.depend();
        return this.backpack;
    }

    getObjectFromBackpack(_id) {
        var self = this, result = -1;
        _.each(self.backpack, function (sceneObject) {
            if (sceneObject._id === _id)
                result = sceneObject;
        });
        if (result === -1)
            hardDebugMsg('Object not found in backpack', 'The object with the id: ' + _id + ' is not in the backpack.');
        return result;
    }

    takeLeftHand(object) {
        this.leftHand = object;
        this.leftHandDep.changed();
        this.effectsDep.changed();
    }

    takeRightHand(object) {
        this.rightHand = object;
        this.rightHandDep.changed();
        this.effectsDep.changed();
    }

    addEffect(effect) {
        var self = this;
        self.beforeHook(function(){
            self.effects.push(effect);
            self.effectsDep.changed();
            return self.afterHook();
        })
    }

    getStats(name) {
        var ruleArray, self = this, handRules = [];
        ruleArray = statsToRuleArray(getStatsHelper(self, name));
        /*if(self.leftHand !== -1){
            handRules = handRules.concat(statsToRuleArray(self.leftHand.getStats(name)));
        }
        if(self.rightHand !== -1){
            handRules = handRules.concat(statsToRuleArray(self.rightHand.getStats(name)));
        }*/
        /**
         * we have to get rid of the absolute effects of the items we carry.
         * Or else the player would have the health of a sword. And this makes no sense.
         */
        //handRules = deleteAbsoluteValues(handRules);

        //ruleArray = ruleArray.concat(handRules); //this is a problem, if this value is computed in, all items count double


        self.effectsDep.depend();
        return createStats(ruleArray);
    }

    beforeHook(cb) {
        if (typeof self.beforeHookOverride === "function")
            self.afterHookOverride();
        return cb();
    }

    afterHook() {
        var self = this, health;

        if (typeof self.afterHookOverride === "function") {
            self.afterHookOverride();
        } else {
            /**
             * Things can only break if we now, what stats we have to observe
             * */
            if (Gamebook.story.defaultHitpoints) {
                health = self.getStats(Gamebook.story.defaultHitpoints)[Gamebook.story.defaultHitpoints];

                /**
                 * health has to be subzero
                 * */
                if (health < 0) {
                    self.destroy();
                }
            }
        }
    }


    /**
     * Creates damage effect
     * @param methods: methods that are used to attack (e.g. 'Nahkampfschaden')
     * @param targetedEffect: the effect that will be reduced by the amount of damage (e.g. 'Gesundheit')
     */
    attackLeft(methods, targetedEffect) {
        var self = this,
            helperObject = self.leftHand; //thing that is in the players hand and deals damage.
        return createDamageObject(self, methods, helperObject, targetedEffect);

    }

    attackRight(methods, targetedEffect) {
        var self = this,
            helperObject = self.rightHand; //thing that is in the players hand and deals damage.
        return createDamageObject(self, methods, helperObject, targetedEffect);
    }


}

