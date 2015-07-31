/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

export class Scene extends BaseObject {
    constructor(weather) {
        this.environment = new Environment(weather);
        this.sceneObjects = [];
        this.text = '';
        this.effects = [];
    }


    updateWeather(weather) {
        this.environment.setWeather(weather);
    }


    /**
     * add description of the weather to the scene text
     * @param language (optional) language of the string. If not set, we take the default language.
     */
    howIsTheWeather(language) {
        if (!language)
            language = defaultLanguage; //no language param, take default language
        var weather = this.environment.getWeather();
        if (weather.text) {
            if (weather.text[language]) {
                this.text += weather.text[language];
            }
        }
        return;
    }


    /**
     * Adds an effect to the whole scene.
     * @param effect
     */
    addEffect(effect) {
        this.effects.push(effect);
    }

    /**
     * adds some text to the scene. This text is not dynamic and not interactive
     * @param text
     */
    addText(text) {
        this.text += text;
    }

    /**
     * Creates a sceneObject out of a text.
     * @param sceneObjectText: Text in which the object/objects is/are embedded.
     * @returns sceneObject
     */
    createKeyword(sceneObjectText) {
        var keywordText = sceneObjectText, re = /[^[\]]+(?=])/, keyword, sceneObject;
        keyword = re.exec(keywordText)[0];
        sceneObject = new SceneObject(keyword);
        this.sceneObjects.push(
            {
                sceneObject:sceneObject,
                text:keywordText
            }
        );
        return sceneObject;
    }



    updateText() {
        var text = this.text;
        _.forEach(this.sceneObjects, function (sceneObject) {
            text += createKeywordText(sceneObject);
        });
        if (Meteor.isClient) {
            Session.set('mainText', text);
        }
    }


    /**
     * find object in scene by id
     * @param _id
     * @returns {number} returns -1 when nothing is found
     */
    findSceneObject(_id) {
        var result = -1, sceneObject;
        _.each(this.sceneObjects, function (object) {
            sceneObject = object.sceneObject;
            if (sceneObject._id === _id)
                result = sceneObject;
        });
        if(result===-1)
            debugMsg('Sceneobject not found', 'The object with the id: '+_id+' is not in this scene.');
        return result;
    }


    /**
     * find and remove object in scene by id
     * @param _id
     * @returns {boolean} returns -1 when nothing is found
     */
    removeSceneObject(_id) {
        var result = false, sceneObject;
        _.each(this.sceneObjects, function (object, index) {
            sceneObject = object.sceneObject;
            if (sceneObject._id === _id) {
                this.sceneObjects.splice(index, 1);
                result = true;
            }
        });
        return result;
    }

    getStats(name) {
        return getStats(this, name);
    }
}