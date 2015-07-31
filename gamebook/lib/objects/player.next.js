/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

export class Player {
    constructor(effects) {
        this.backpack = [];
        this.backpackDep = new Tracker.Dependency(); //make backpack trackable so the view gets informed when something has changed


        this.leftHand = -1;
        this.leftHandDep = new Tracker.Dependency();

        this.rightHand = -1;
        this.rightHandDep = new Tracker.Dependency();

        if (effects)
            this.effects = effects;
        else
            this.effects = [];

        this.effectsDep = new Tracker.Dependency();

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

    getObjectFromBackpack(_id){
        var self = this, result = -1;
        _.each(self.backpack, function (sceneObject) {
            if (sceneObject._id === _id)
                result = sceneObject;
        });
        if(result===-1)
            hardDebugMsg('Object not found in backpack', 'The object with the id: '+_id+' is not in the backpack.');
        return result;
    }

    takeLeftHand(object) {
        this.leftHand = object;
        this.leftHandDep.changed();
    }

    takeRightHand(object) {
        this.rightHand = object;
        this.rightHandDep.changed();
    }

    addEffect(effect) {
        this.effects.push(effect);
        this.effectsDep.changed();
    }

    getStats(name) {
        this.effectsDep.depend();
        return getStats(this, name);
    }
}