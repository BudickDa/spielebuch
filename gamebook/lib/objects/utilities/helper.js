/**
 * Creates anker-tag for sceneObject
 * @param sceneObject
 */
createKeywordAnker = function(sceneObject) {
    return '<a href=\"#\" class=\"keyword\" data-objectid=\"' + sceneObject._id + '\">' + sceneObject.name + '</a>';
}