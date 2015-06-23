/**
 * Created by Daniel Budick on 16.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
export class Story {
    constructor(){
        this.scenes = [];
        this.rules = [];
    }
    addScene(scene){
        this.scenes.push(scene);
    }
    startStory(startScene){

    }
    startScene(scene){

    }
    saveStory() {
        Notifications.error('Not implemented', 'not implemented yet.');
    }
}