/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
export class Scene {
    constructor(weather) {
        this.environment = new Environment(weather);
        this.sceneObjects = [];
    }

    addSceneObject(objectname) {
        var sceneObject = new SceneObject(objectname), effects = this.getWeatherEffects();
        _.each(effects, function(effect){
            sceneObject.hasEffect(effect)
        });
        this.sceneObjects.push(sceneObject);
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
        return "";
    }

    updateText() {
        var text = "", effectsText;
        text += this.getWeatherText('de');


        _.each(this.sceneObjects, function(sceneObject){

            text+=sceneObject.name + ' Effekte: ' + sceneObject.effectText() + '';
        });

        Session.set('mainText', text + '<br/>Beispieltext <a href=\"#\" class=\"keyword\" data-objectid=\"12\">Keyword</a>, und noch mehr Text');
    }

}