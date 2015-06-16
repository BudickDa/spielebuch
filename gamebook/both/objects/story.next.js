/**
 * Created by Daniel Budick on 16.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
export class StoryObject {
    constructor(){
        this.scenes = [];
    }
    addScene(scene){
        this.scenes.push(scene);
    }
    startStory(){
        Notifications.error('Not implemented', 'not implemented yet.');
    }
    saveStory(){
        Notifications.error('Not implemented', 'not implemented yet.');
    }
}