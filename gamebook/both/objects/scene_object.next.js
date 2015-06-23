/**
 * Created by Daniel Budick on 23.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

/**
 * Public
 * An Object the player can interact with
 */
export class SceneObject extends BaseObject {
    constructor(name) {
        this.name = name;
        this.effects = [];
        this.properties = [];
    }

    hasEffect(effect) {
        this.effects.push(effect);
    }

    hasProperty(property) {
        this.effects.push(property);
    }

    effectText() {
        //todo: make it right...
        var text = "";
        _.each(this.effects, function (effect) {
            text+= effect + ', ';
        });
        return text;
    }

    drop(){
        "use strict";

    }

    /**
     * Reacts to controlling in UI.
     * @param daVinciCode the clicked box's direction
     */
    daVinci(daVinciCode) {
        switch (daVinciCode) {
            case 'center':
                break;
            case 'bottom':
                break;
            case 'up':
                break;
            case 'left':
                break;
            case 'leftUp':
                break;
            case 'leftBottom':
                break;
            case 'right':
                break;
            case 'rightUp':
                break;
            case 'rightBottom':
                break;
            default:
                console.error('Unknown daVinciCode');
        }
    };


}