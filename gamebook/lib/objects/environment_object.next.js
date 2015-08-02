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

/**
 * Private
 * Returns the chosen weather from weatherTypes
 * @param chosenWeather
 * @returns {*} if weather is valid, it will be returned, if not return value is -1. -1 will not be validated again and prevents an endless recursion.
 */
var getWeatherFromConfig = function(chosenWeather){
    var weatherArray = [];
    if (chosenWeather === 'random') {
        /**
         * put all the weathertypes in an array to chose one randomly
         */
        weatherArray =  _.keys(weatherTypes);
        /**
         * Get Weather from weatherArray randomly
         */
        chosenWeather = chance.pick(weatherArray);

    }

        /**
         * Get Weather from weather.js in book
         */
        chosenWeather = weatherTypes[chosenWeather];

    if(validateWeather(chosenWeather))
        return chosenWeather;
    else
        return false;
}

/**
 * Private
 * Validates the chosen weather.
 * @param tmpWeather: the weather type that shall be validated
 * @returns {*} if everything works, this will return true
 * If tmpWeather is invalid it return false and throw an error.
 */
var validateWeather = function (tmpWeather) {
    try {
        if (tmpWeather === undefined || tmpWeather.text === undefined) {
            debugMsg('Error validating weather', 'The chosen weather: ' +
                tmpWeather +
            'is invalid. Take a look into gamebook/both/book/weather.js if it is defined corectly.'+
            'It should have a text and effects as attribute.'+
            'Your weather book is messed up. This application will not work, please fix it! Take a look into the documentation.');
            return false;
        }
    } catch (e) {
        debugMsg('An exception in validateWeather is occured','It is possibly caused by an invalid weatherType. Details:' + e);
        return false;
    }
    return true;
}


export class Environment {
    /**
     * Chooses the weather of the scene. If random, the weather is chosen randomly.
     * Weather types are configured in
     * @param optional String weather: rainy, sunny. If no parameter, weather will be chosen randomly.
     *
     */
    constructor(chosenWeather='random') {
        this.setWeather(chosenWeather);
    }

    /**
     * get weather
     * @returns {*}: return the chosen weather of the Environment. If invalid or no weather throw error and return false.
     */
    getWeather() {
        if(this.weather===false)
            console.error('You are using an invalid weather.')
        return this.weather;
    }

    /**
     * Setter for weather in environment.
     * @param chosenWeather
     */
    setWeather(chosenWeather) {
        /**
         * String weather: rainy, sunny. If no parameter is 'random', weather will be chosen randomly.
         */
         this.weather = getWeatherFromConfig(chosenWeather);
    }
}