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

/**
 * This function creates from the keyword text and the gameobject a sentence with an interactive keyword anker
 * @param sceneObjectText
 */
createKeywordText = function (sceneObject) {
    var text = sceneObject.text,
        keyword = sceneObject.sceneObject.name,
        needle = new RegExp('\\[' + keyword + '\\]', 'g');
    return text.replace(needle, createKeywordAnker(sceneObject.sceneObject));
};


/**
 * Creates anker-tag for sceneObject
 * @param sceneObject
 */
createKeywordAnker = function (sceneObject) {
    var link = '';
    try {
        link = '<a href=\"#\" class=\"keyword hover\" ' +
            'oncontextmenu="return false;" ' +
            'data-objectid=\"' + sceneObject._id + '\">' + sceneObject.name + '' +
            '</a>'
    } catch (e) {
        debugMsg('Error creating Keyword-Anker', e);
        link = sceneObject.name;
    }
    return link;

};

/**
 * This functions take a set of rules or effects, computes and returns their effective statistics
 * @param rules
 * @returns {{}}
 */
createStats = function (rules) {
    var stats = {};
    _.each(rules, function (rule) {
        /**
         * If the stats already have his key (e.g. Hitpoints),
         * Compute with it or override it.
         * If it is not set (when undefined), set it
         */
        if (stats[rule.key] === undefined) {
            stats[rule.key] = rule.value;
        } else {
            /**
             * If the value is a string, it is a manipulator, it will be computed with the existing value.
             * If it is a numeric, it will override the value.
             */
            if (typeof rule.value === 'string' || rule.value instanceof String) {
                //we parse the values just to be sure. If stats[rule.key] was a manipulator we would do 'string'+'string' = 'stringstring' and this would be bad)
                stats[rule.key] = parseInt(stats[rule.key]) + parseInt(rule.value);
            } else {
                //override the last value
                stats[rule.key] = rule.value;
            }
        }
    });
    return stats;
};

/**
 *
 * @param self is context where this function is called from. It has to used in object and self should be the context of the object (in most cases this)
 * @param name optional, if not set, returns all the effects. If set, returns only the stats of the chosen one
 * @returns {{}}
 */
getStatsHelper = function (self, name) {
    var rules = [], rule, stat;
    _.each(self.effects, function (effect) {
        stat = effect.getStats();
        _.map(stat, function (value, key) {
            if (name === undefined || key === name) {
                rule = {key: key, value: value};
                rules.push(rule);
            }
        });
    });
    return createStats(rules);
};

/**
 * Creates a damage object
 * @param self: the object, that is attacking
 * @param methodsEffects: the effects that are used to attack (e.g. 'Nahkampfschaden')
 * @param helperObject: object that is used to deal damage
 * @param targetEffect: The effect that will be reduced by the amount of damage.
 */
createDamageObject = function (self, methodsEffects, helperObject, targetEffect) {
    var helperObjectDamage = 0, //damage that is created by the object, that was used.
        selfDamage = 0, //damage that is created by the object self (player or npc).
        amount = 0;
    _.each(methodsEffects, function (effect) {

        selfDamage = self.getStats(effect)[effect];
        if (helperObject !== -1)
            helperObjectDamage = helperObject.getStats(effect)[effect];
        else
            helperObjectDamage = undefined;
        if(selfDamage)
            amount += parseInt(selfDamage);
        if(helperObjectDamage)
            amount += parseInt(helperObjectDamage);
    });

    amount = amount * -1;
    console.log(amount.toString());
    return new Effect('damage', [new Rule(targetEffect, amount.toString())])
};


statsToRuleArray = function(statsAsObject){
    var statsAsArray = [];
    _.map(statsAsObject, function (value, key) {
        statsAsArray.push({key: key, value: value});
    });
    return statsAsArray;
};

deleteAbsoluteValues = function(rules){
    if(rules===undefined)
        return [];
    if(rules.length===0)
        return [];
    _.map(rules, function(rule){
        if ( !(typeof rule.value === 'string' || rule.value instanceof String)) { // all the absolute values will set '0'
            rule.value = '0';
        }
    });
    return rules;
};