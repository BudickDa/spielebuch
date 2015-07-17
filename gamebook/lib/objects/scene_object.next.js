/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */

/**
 * Allowed events for da-vinci
 */
var daVinciEvents = ['top','rightTop','right','rightBottom','bottom','leftBottom','left','leftTop', 'center'];
var validateEvent = function(event){
    if(_.indexOf(daVinciEvents, event)===-1){
        debugMsg('This event does not exist', 'The event '+event+' is not a part of the da vinci system.');
        return false;
    }
    return true;
}

/**
 * Public
 * An Object the player can interact with
 */
export class SceneObject extends BaseObject {
    constructor(name) {
        this._id = chance.guid();
        this.name = name;
        this.effects = [];

        this.events = {};

        /**
         * overrrides name of da-vinci-action in UI
         */
        this.overrrides = {};
    }

    addEffect(effect) {
        this.effects.push(effect);
    }

    /**
     * take object into inventory
     */
    take(){
        Gamebook.player.addToBackback(this);
        Gamebook.story.currentScene().removeSceneObject(this._id);
    }

    /**
     * drop object into scene
     */
    drop(){
        Gamebook.player.removeFromBackback(this._id);
        Gamebook.story.currentScene().addSceneObject(this);
    }

    /**
     * Adds eventlistener to the object, these events are called via the da-vinci-system
     * @param event: should be one of those values: ['top','rightTop','right','rightBottom','bottom','leftBottom','left','leftTop']. If Box is acitvated in UI, callback will be called.
     * @param callback: Function that will be executed when event is triggered
     * @param name (optioinal): Name of action shown in UI
     */
    addEvent(event, callback, name){
        if(!validateEvent(event))
            return;
        this.events[event] = callback;
        if(name)
            this.overrrides[event] = name;
    }

    fireEvent(event){
        if(!validateEvent(event))
            return;
        this.events[event]();
    }


    getEffects(){

    }


    /**
     *
     * @param name string with the name of the key of the property (e.g. meleeDamage, hitpoints)
     */
    getPropertyValueByName(name){

    }

}
