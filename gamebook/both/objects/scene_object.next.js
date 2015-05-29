/**
 * Private
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
class AbstractSceneObject {

}

/**
 * Public
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

export class SceneObject extends AbstractSceneObject {
    constructor(name) {
        this._id = chance.guid();
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
    }


}