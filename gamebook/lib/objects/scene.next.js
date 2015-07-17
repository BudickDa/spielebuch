/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

export class Scene extends BaseObject{
    constructor(weather) {
        this.environment = new Environment(weather);
        this.sceneObjects = [];
        this.sceneObjectTexts = [];
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
        if(!language)
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
        var keywordText = sceneObjectText, re = /[^[\]]+(?=])/, keyword, sceneObject, needle;

        keyword = re.exec(sceneObjectText)[0];
        needle = new RegExp('\\[' + keyword + '\\]', 'g');
        sceneObject = this.addSceneObject(keyword);
        keywordText = keywordText.replace(needle, createKeywordAnker(sceneObject));

        this.sceneObjectTexts.push(keywordText);
        return sceneObject;
    }

    updateText() {
        var text = this.text;
        _.forEach(this.sceneObjectTexts, function (objecttext) {
            text += objecttext;
        });
        if(Meteor.isClient)
            Session.set('mainText', text);
    }


    /**
     * find object in scene by id
     * @param _id
     * @returns {number} returns -1 when nothing is found
     */
    findSceneObject(_id){
        var result = -1;
        _.each(this.sceneObjects, function(object){
            if(object._id===_id)
                result = object;
        });
        return result;
    }

    addSceneObject(objectname) {
        var sceneObject = new SceneObject(objectname);
        this.sceneObjects.push(sceneObject);
    }

    /**
     * find and remove object in scene by id
     * @param _id
     * @returns {boolean} returns -1 when nothing is found
     */
    removeSceneObject(_id){
        var result = false;
        _.each(this.sceneObjects, function(object, index){
            if(object._id===_id) {
                this.sceneObjects.splice(index, 1);
                result = true;
            }
        });
        return result;
    }
}