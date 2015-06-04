/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

/**
 * Private
 * Cretates anker-tag for sceneObject
 * @param sceneObject
 */
function createKeywordAnker(sceneObject) {
    return '<a href=\"#\" class=\"keyword\" data-objectid=\"' + sceneObject._id + '\">' + sceneObject.name + '</a>';
}


export class Scene {
    constructor(weather) {
        this.environment = new Environment(weather);
        this.sceneObjects = [];
        this.sceneObjecttexts = [];
        this.sceneRules = [];
        this.sceneEffects = [];
    }

    addSceneObject(objectname) {
        var sceneObject = new SceneObject(objectname), effects = this.getWeatherEffects();
        _.each(effects, function (effect) {
            sceneObject.hasEffect(effect)
        });
        this.sceneObjects.push(sceneObject);
        return sceneObject;
    }

    updateWeather(weather) {
        this.environment.setWeather(weather);
    }

    getWeatherEffects() {
        var weather = this.environment.getWeather();
        if (weather)
            return weather.effects;
        return [];
    }

    getWeatherText(language) {
        var weather = this.environment.getWeather();
        console.log(weather);
        if (weather.text) {
            if (weather.text[language]) {
                return weather.text[language];
            }
        }
        return '';
    }


    addText(text) {
        this.text = text;
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

        this.sceneObjecttexts.push(keywordText);
        return sceneObject;
    }

    updateText() {
        var text = this.text;
        _.forEach(this.sceneObjecttexts, function (objecttext) {
            text += objecttext;
        });
        Session.set('mainText', text);
    }

}