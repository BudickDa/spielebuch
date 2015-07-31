/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

export class Player {
    constructor(effects){
        this.backpack = [];
        this.leftHand = -1;
        this.rightHand = -1;
        if(effects)
            this.effects = effects;
        else
            this.effects = [];

    }

    /**
     * takes object from the right hand and puts it into the backback.
     * It takes object from the right hand, when second paramter is set true
     * @param fromLeftHand optional: set this paramter to take object from the left hand
     */
    addToBackpack(fromLeftHand){
        if(fromLeftHand){
            if(this.leftHand!==-1) {
                this.backpack.push(this.leftHand);
                this.leftHand = -1;
            }
        }else {
            if(this.rightHand!==-1) {
                this.backpack.push(this.rightHand);
                this.rightHand = -1;
            }
        }
    }

    removeFromBackpack(_id){

    }

    getBackpack(){
        return this.backpack;
    }

    takeLeftHand(object){
        this.leftHand = object;
    }

    takeRightHand(object){
        this.rightHand = object;
    }

    addEffect(effect){
        this.effects.push(effect);
    }

    getStats(name) {
        return getStats(this, name);
    }
}