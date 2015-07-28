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

    /**
     * get effective statistics of this effec as array  by computing all the rules
     * @returns {{}}
     */
    getStats(){
        return createStats(this.rules);
    }
}