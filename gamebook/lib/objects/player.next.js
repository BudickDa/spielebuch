/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

export class Player {
    constructor(){
        this.backback = [];

    }

    addToBackback(object){
        this.backback.push(object);
    }

    removeFromBackback(_id){

    }

    print(){
        var html = '';
        _.forEach(this.backback, function(object){
            html += createKeywordAnker(object);
        });
        return html;
    }

}