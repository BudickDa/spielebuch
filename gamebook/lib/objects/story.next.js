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

export class Story extends BaseObject {
    /**
     * this.scenes holds all the scenes of the story in the order of their creation
     * this.rules holds all the rules oft the story
     * this.sceneHistory the history the indices of scenes the player visited
     */
    constructor() {
        this.scenes = [];
        this.effects = [];
        this.sceneHistory = [];
        this.player = -1;
    }

    addScene(scene) {
        return this.scenes.push(scene);
    }

    createNewPlayer(player){
        if(this.player!==-1){
            debugMsg('Overriding old player', 'This story already had a player. You killed him and created a new one. Are you sure, you know what you are doing?')
        }
        this.player = player;
    }

    /**
     * Takes the scene via the index and updates text in the view.
     * @param index index of the scene in scenes that will be played.
     */
    startScene(index) {
        var length = this.scenes.length;
        if (index >= length)
            return hardDebugMsg('This scene does not exist in story', 'Maybe the parameter scene was invalid or scene was not added to the Story.');
        if (index < 0)
            return hardDebugMsg('The index is invalid', 'The index must be greater or equal 0');
        this.sceneHistory.push(index);
        if(typeof this.scenes[index].onStart=== "function"){
            this.scenes[index].onStart();
        }
        return this.scenes[index].updateText();
    }

    /**
     * Adds an effect to the whole story.
     * @param effect
     */
    addEffect(effect) {
        this.effects.push(effect);
    }

    /**
     * starts the next scene. The next scene is the one after the parameter lastScene.
     * Will call startScene withe the nextScene as parameter.
     */
    nextScene() {
        var index = _.last(this.sceneHistory) + 1; //the next scene's index is always the last ones in the history + 1
        if (index <= 0)
            return debugMsg('Last scene does not exist in story', 'Maybe the parameter lastScene was invalid or not added to the Story.');
        if (index > this.scenes.length) {
            return debugMsg('Next scene does not exist in story', 'lastScene was actually the last scene, there is no scene after this one.');
        }
        return this.startScene(index);
    }

    /**
     * starts the previous scene. The scene is the one before the present scene in the history.
     */
    previousScene() {
        var length = this.sceneHistory.length, index;
        if (length <= 1) {
            return debugMsg('No previous scene in history', 'The player is at the first scene in the history or history is empty.');
        }
        index = sceneHistory[length - 2]; //we want the one before the last.

        return this.startScene(index);
    }

    saveStory() {
        return debugMsg('Not implemented', 'not implemented yet.');
    }

    /**
     * starts with the first scene
     */
    start() {
        if (this.scenes.length === 0)
            return hardDebugMsg('This story has no scenes', 'You should create some scenes and add it to the story.');
        this.startScene(0);
    }

    /**
     * get current scene object
     * or throws error if story has no scene.
     */
    currentScene() {
        if (this.sceneHistory.length === 0)
            return hardDebugMsg('This story has no scenes', 'You should create some scenes and add it to the story.');
        var index = _.last(this.sceneHistory);
        return this.scenes[index];
    }

    /**
     * Get object with by the id.
     * If not found, it will throw an error.
     * @param _id
     * @returns {*}
     */
    getSceneObject(_id) {
        var currentScene = this.currentScene(),
            sceneObject = currentScene.findSceneObject(_id);
        if (sceneObject === -1)
            return debugMsg('This sceneObject does not exist', 'The sceneObject with the id: ' + _id + ' does not exist.');
        return sceneObject;
    }

    getStats(name) {
        return getStats(this, name);
    }

}