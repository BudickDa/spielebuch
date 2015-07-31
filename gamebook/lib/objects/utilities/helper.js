/**
 * This function creates from the keyword text and the gameobject a sentence with an interactive keyword anker
 * @param sceneObjectText
 */
createKeywordText = function (sceneObject) {
    var text = sceneObject.text,
        keyword = sceneObject.sceneObject.name,
        needle = new RegExp('\\[' + keyword + '\\]', 'g');

    return text.replace(needle, createKeywordAnker(sceneObject.sceneObject));
}


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
createStats = function(rules){
    var stats = {};
    _.each(rules,function(rule) {
        /**
         * If the stats already have his key (e.g. Hitpoints),
         * Compute with it or override it.
         * If it is not set (when undefined), set it
         */
        if(stats[rule.key]===undefined){
            stats[rule.key] = rule.value;
        }else{
            /**
             * If the value is a string, it is a manipulator, it will be computed with the existing value.
             * If it is a numeric, it will override the value.
             */
            if(typeof rule.value === 'string' || rule.value instanceof String){
                //we parse the values just to be sure. If stats[rule.key] was a manipulator we would do 'string'+'string' = 'stringstring' and this would be bad)
                stats[rule.key] = parseInt(stats[rule.key]) + parseInt(rule.value);
            }else{
                //override the last value
                stats[rule.key] = rule.value;
            }
        }
    });
    return stats;
}

/**
 *
 * @param self is context where this function is called from. It has to used in object and self should be the context of the object (in most cases this)
 * @param name optional, if not set, returns all the effects. If set, returns only the stats of the chosen one
 * @returns {{}}
 */
getStats = function(self ,name) {
    var rules = [], rule, stat;
    _.each(self.effects, function (effect) {
        stat = effect.getStats();
        _.map(stat, function (value, key) {
            if(name === undefined || key === name) {
                rule = {key: key, value: value};
                rules.push(rule);
            }
        });
    });
    return createStats(rules);
}