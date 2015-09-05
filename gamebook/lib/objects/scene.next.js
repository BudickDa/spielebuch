/**
 * Created by Daniel Budick on 02.08.2015.
 * Copyright 2015 Daniel Budick All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 *
 * This file is part of Spielebuch
 * Spielebuch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Spielebuch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Spielebuch. If not, see <http://www.gnu.org/licenses/>.
 */

export class Scene {
    constructor(weather) {
        this.environment = new Environment(weather);
        this.sceneObjects = [];
        this.text = '';
        this.effects = [];
        this.onStart;
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
            language = Gamebook.config.defaultLanguage; //no language param, take default language
        var weather = this.environment.getWeather();
        if (weather.text) {
            if (weather.text[language]) {
                this.text += weather.text[language];
            }
        }
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
     * overrides existing text, is an alternative to a scenechange
     * @param text
     */
    overrideText(text){
        this.text = text;
    }

    /**
     * Creates a sceneObject out of a text.
     * @param sceneObjectText: Text in which the object/objects is/are embedded.
     * @returns sceneObject
     */
    createKeyword(sceneObjectText) {
        var keywordText = sceneObjectText, re = /[^[\]]+(?=])/, keyword, sceneObject;
        try{
            keyword = re.exec(keywordText)[0];
        }catch(e){
            hardDebugMsg('No keyword marked', 'An exception occured, did you forget to mark a keyword with braces (e.g. [Keyword])? Here is the text of the exception: '+ e);
        }
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
        var result = false, sceneObject, self = this;
        _.each(self.sceneObjects, function (object, index) {
            sceneObject = object.sceneObject;
            if (sceneObject._id === _id) {
                self.sceneObjects.splice(index, 1);
                result = true;
            }
        });
        return result;
    }

    getStats(name) {
        return getStatsHelper(this, name);
    }
}