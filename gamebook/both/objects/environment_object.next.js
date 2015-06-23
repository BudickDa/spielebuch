/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
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
        if (tmpWeather === undefined || tmpWeather.text === undefined || tmpWeather.effects === undefined) {
            console.log('The chosen weather: ');
            console.log(tmpWeather);
            console.log('is invalid. Take a look into gamebook/both/book/weather.js if it is defined corectly.');
            console.log('It should have a text and effects as attribute.');
            console.error('Your weather book is messed up. This application will not work, please fix it! Take a look into the documentation.');
            return false;
        }
    } catch (e) {
        console.log('An exception occured. It is possibly caused by an invalide weatherType. Details:');
        console.log(e);
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