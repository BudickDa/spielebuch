/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */
Gamebook = {
    //contains the playing story
    story: {},
    //contains the created stories
    stories: {},
    //saves player object on the client
    localStorage: new Mongo.Collection(null),
    Effect: Effect,
    Rule: Rule,
    Story: Story,
    Scene: Scene

}