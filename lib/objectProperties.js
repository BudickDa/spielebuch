objectProperties = new Mongo.Collection('objectProperties');

/**
 * Fetches or creates all the properties for the chosen object.
 *
 * Load text to objectname from wikipedia.
 */
setObjectProperties = function (objectId) {
    var currentObject = Gamebook.story.getSceneObject(objectId), objectProperty, currentObjectName, wikiText, cacheCursor;
    if (currentObject === undefined)
        return;
    currentObjectName = currentObject.name;

    //test, if properties for object are already set, if not create them
    cacheCursor = objectProperties.find({name: currentObjectName})
    if (cacheCursor.count() === 0) {
        $.ajax({
            url: 'https://de.wikipedia.org/w/api.php?action=query&titles=' + encodeURI(currentObject.name) + '&rvprop=content&format=jsonty&callback=?',
            data: {
                format: 'json'
            },
            dataType: 'jsonp'
        }).done(
            function (data) {
                wikiText = parseWikiText(data);
                objectProperty = {
                    name: currentObjectName,
                    wikiText: wikiText
                };
                //store it to our database
                objectProperties.insert(objectProperty);
                if (Meteor.isClient)
                    Session.set('objectProperty', objectProperty);
            }
        );
    }
    else {
        objectProperty = cacheCursor.fetch()[0];
        if (Meteor.isClient)
            Session.set('objectProperty', objectProperty);
    }
}

function parseWikiText(json) {
    console.log(data);
    return "Text";
}


if (Meteor.isServer) {
    Meteor.publish('objectProperties', function () {
        return objectProperties.find();
    });
    objectProperties.allow({
        insert: function () {
            return true;
        }
    })
}