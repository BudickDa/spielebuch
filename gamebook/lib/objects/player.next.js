/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

export class Player {
    constructor(){
        this.backback = [];
        this.leftHand = -1;
        this.rightHand = -1;

    }

    /**
     * takes object from the right hand and puts it into the backback.
     * It takes object from the right hand, when second paramter is set true
     * @param fromLeftHand optional: set this paramter to take object from the left hand
     */
    addToBackback(fromLeftHand){
        if(fromLeftHand){
            if(this.leftHand!==-1) {
                this.backback.push(this.leftHand);
                this.leftHand = -1;
            }
        }else {
            if(this.rightHand!==-1) {
                this.backback.push(this.rightHand);
                this.rightHand = -1;
            }
        }
    }

    removeFromBackback(_id){

    }

    printBackback(){
        var html = '';
        _.forEach(this.backback, function(object){
            html += createKeywordAnker(object);
        });
        return html;
    }

}