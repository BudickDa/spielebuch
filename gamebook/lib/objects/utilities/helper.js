/**
 * Creates anker-tag for sceneObject
 * @param sceneObject
 */
createKeywordAnker = function(sceneObject) {
    try {
        var link = '<a href=\"#\" class=\"keyword\" data-objectid=\"' + sceneObject._id + '\">' + sceneObject.name + '</a>'
    }catch(e){
        debugMsg('Error creating Keyword-Anker',e);
        var link = sceneObject.name;
    }finally {
        return link;
    }
}