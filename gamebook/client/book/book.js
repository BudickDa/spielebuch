Template.book.helpers({
    criticalTimingActive: function(){
        return Session.get('criticalTimingActive');
    },
    criticalTiming: function(){
        return Session.get('criticalTiming');
    },
    normalTimingActive: function(){
        return Session.get('normalTimingActive');
    },
    normalTiming: function(){
        return Session.get('normalTiming');
    },
    actionText: function(){
        return Session.get('actionText');
    },
    mainText: function(){
        return Session.get('mainText');
    },
    focusTextActive: function(){
        return Session.get('focusTextActive');
    },
    focusText: function(){
        return Session.get('focusText');
    }    ,
    statusText: function(){
        return Session.get('statusText');
    }
});