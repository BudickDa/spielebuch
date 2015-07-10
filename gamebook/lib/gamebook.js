/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */
Gamebook = {
    //contains the playing story
    story: {},
    startStory: function(story){
        if(!story) {
            console.log(story);
            debugMsg('Story is undefined', 'Make sure, that the parameter is a story.');
            return;
        }
        this.story = story;
        this.story.start();
    },
    getStory: function(storyname){
        var story = this.stories[storyname];
        if(!story) {
            debugMsg('Story of this name is undefined', 'There is not story saved, you can view the name of the parameter in the Console.');
            //storyname can be an unfiltered user input. Handle with care
            console.log(storyname);
            return;
        }
        return story;

    },
    //contains the created stories
    stories: {},
    //saves player object on the client
    localStorage: new Mongo.Collection(null),
    Effect: Effect,
    Rule: Rule,
    Story: Story,
    Scene: Scene
};