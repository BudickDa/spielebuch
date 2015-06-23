/**
 * Created by Daniel Budick on 16.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
export class Story {

    /**
     * this.scenes holds all the scenes of the story in the order of their creation
     * this.rules holds all the rules oft the story
     * this.sceneHistory the history the indices of scenes the player visited
     */
    constructor() {
        this.scenes = [];
        this.rules = [];
        this.sceneHistory = [];
    }

    addScene(scene) {
        return this.scenes.push(scene);
    }

    /**
     * Takes the scene via the index and updates text in the view.
     * @param index index of the scene in scenes that will be played.
     */
    startScene(index) {
        var length = this.scenes.length;
        if (index >= length)
            return Notifications.error('This scene does not exist in story', 'Maybe the parameter scene was invalid or scene was not added to the Story.');
        if (index < 0)
            return Notifications.error('The index is invalid', 'The index must be greater or equal 0');
        this.sceneHistory.push(index);
        return this.scenes[index].updateText();
    }

    /**
     * starts the next scene. The next scene is the one after the parameter lastScene.
     * Will call startScene withe the nextScene as parameter.
     */
    nextScene() {
        var index = _.last(sceneHistory) + 1; //the next scene's index is always the last ones in the history + 1
        if (index <= 0)
            return Notifications.error('Last scene does not exist in story', 'Maybe the parameter lastScene was invalid or not added to the Story.');
        if (index > this.scenes.length) {
            return Notifications.error('Next scene does not exist in story', 'lastScene was actually the last scene, there is no scene after this one.');
        }
        return this.startScene(index);
    }

    /**
     * starts the previous scene. The scene is the one before the present scene in the history.
     */
    previousScene() {
        var length = this.sceneHistory.length, index;
        if (length <= 1) {
            return Notifications.error('No previous scene in history', 'The player is at the first scene in the history or history is empty.');
        }
        index = sceneHistory[length-2]; //we want the one before the last.

        return this.startScene(index);
    }

    saveStory() {
        return Notifications.error('Not implemented', 'not implemented yet.');
    }

    /**
     * starts with the first scene
     */
    start(){
        if(this.scenes.length===0)
            return Notifications.error('This story has no scenes', 'You should create some scenes and add it to the story.');
        this.startScene(0);
    }
}