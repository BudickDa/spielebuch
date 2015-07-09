debugMsg = function(title,msg){
    if(Meteor.isServer)
        throw new Meteor.Error(500, title + '\n' + msg);
    if(Meteor.isClient)
        Notifications.error(title, msg);
}