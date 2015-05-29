/**
 * Created by Daniel Budick on 29.05.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
class Environment {
    /**
     * Chooses the weather of the scene. If random, the weather is chosen randomly.
     * Weather types are configured in
     * @param String weather: rainy, sunny, random...
     *
     */
    constructor(chosenWeather) {
        setWeather(chosenWeather);
    }

    /**
     * get weather
     * @returns {*}: return the chosen weather of the Environment.
     */
    get weather(){
        if(this.weather)
            return this.weather;
        console.error('No weather defined.');
        return false;
    }


    /**
     * Setter for weather in environment.
     * @param chosenWeather
     */
    set weather(chosenWeather) {
        var tmpWeather;
        if (chosenWeather === 'random') {
            /**
             * Get Weather from weather.js in config randomly
             */
            tmpWeather = chance.pick(weatherTypes);

        }
        else {
            /**
             * Get Weather from weather.js in config
             */
            tmpWeather = _.pick(weatherTypes, chosenWeather);
        }
        /**
         * Test if weather is valid
         */
        this.weather = validateWeather(tmpWeather);

    }

    /**
     * Validates the chosen weather.
     * @param tmpWeather: the weather type that shall be validated
     * @returns {*} if everything works, this will return a valid weatherType.
     * If tmpWeather is invalid it will set weather false and throw an error.
     */
    var validateWeather = function (tmpWeather) {
        var err = false;
        try {
            err = tmpWeather === undefined || tmpWeather.text === undefined || tmpWeather.effects === undefined;
        } catch (e) {
            console.log('An exception occured. It is possibly caused by an invalide weatherType. Details:');
            console.log(e);
            err = true;
        }
        if (err) {
            console.log('The chosen weather: ');
            console.log(tmpWeather);
            console.log('is invalid. Take a look into gamebook/both/config/weather.js if it is defined corectly.');
            console.log('It should have a text and effects as attribute.');
            console.log('We will not stop your flow, so we chose a random weather. But if all your weathertypes are messed up, it will and badly...');
            console.error('Your weather config is messed up. This application will not work, please fix it! Take a look into the <a href="#">documentation</a>');
            return false;
        }
        return tmpWeather;

    }
}