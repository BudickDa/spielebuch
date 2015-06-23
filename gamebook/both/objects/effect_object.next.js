/**
 * Created by Daniel Budick on 04.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */

export class Effect extends BaseStorageObject {
    constructor(name, rules){
        this.name = name;
        this.rules = rules;
    }
    addRule(rule){
        this.rules.push(rule);
    }
}