/**
 * Created by Daniel Budick on 23.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
/**
 * Public
 * Abstract class for all objectst, that need an _id, because it can has several instances that are not the same in the story.
 */
export class BaseObject {
    constructor(){
        this._id = chance.guid();
    }
}