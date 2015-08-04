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

GlobalObjectProperties = new Mongo.Collection('globalObjectProperties');
GlobalObjectProperty = Astro.Class({
    name: 'GlobalObjectProperty',
    collection: GlobalObjectProperties,
    fields: {
        name: 'string',
        wikiText: 'string',
        effects: 'array'
    }
});
/**
 * Fetches or creates all the properties for the chosen object.
 *
 * Load text to objectname from wikipedia.
 */
setObjectProperties = function (objectId) {
    var currentObject = Gamebook.story.getSceneObject(objectId), objectProperty, currentObjectName, wikiText, cacheCursor, events;
    if (currentObject === undefined)
        return;
    currentObjectName = currentObject.name;

   console.log(currentObject);


    //test, if properties for object are already set, if not create them
    cacheCursor = globalObjectProperties.find({name: currentObjectName});
    if (cacheCursor.count() === 0) {
        $.ajax({
            url: 'https://de.wikipedia.org/w/api.php',
            data: {
                format: 'json',
                action: 'query',
                titles: currentObject.name,
                prop: 'extracts'

            },
            dataType: 'jsonp'
        }).done(function (data) {
            wikiText = parseWikiText(data);
            objectProperty = {
                name: currentObjectName,
                wikiText: wikiText
            };
        }).fail(function (err) {
            debugMsg('Could not fetch text from Wikipedia', err);
            objectProperty = {
                name: currentObjectName,
                wikiText: ''
            };
        }).always(function () {
            //store it to our database
            GlobalObjectProperty.insert(objectProperty);
            if (Meteor.isClient)
                Session.set('objectProperty', objectProperty);
        });
    }
    else {
        objectProperty = cacheCursor.fetch()[0];
        if (Meteor.isClient)
            Session.set('objectProperty', objectProperty);
    }
};

function parseWikiText(json){
    var text = '';
    if(json && json.query && json.query.pages){
        var pages = json.query.pages;
        _.each(pages, function(page){
           if(page.extract){
               text = page.extract;
           }
        });
    }
    return text;
}


if (Meteor.isServer) {
    Meteor.publish('globalObjectProperties', function () {
        return globalObjectProperties.find();
    });
    globalObjectProperties.allow({
        insert: function () {
            return true;
        }
    })
}