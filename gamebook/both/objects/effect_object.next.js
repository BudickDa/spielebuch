/**
 * Created by Daniel Budick on 10.07.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 * Contact: daniel@budick.eu / http://budick.eu
 */
export class Effect {
    constructor(name, rules){
        this.name = name;
        this.rules = rules;
    }
    addRule(rule){
        this.rules.push(rule);
    }
}