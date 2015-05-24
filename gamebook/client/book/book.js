Template.book.helpers({
    criticalTimingActive: function () {
        return Session.get('criticalTimingActive');
    },
    criticalTiming: function () {
        return Session.get('criticalTiming');
    },
    normalTimingActive: function () {
        return Session.get('normalTimingActive');
    },
    normalTiming: function () {
        return Session.get('normalTiming');
    },
    actionText: function () {
        return Session.get('actionText');
    },
    mainText: function () {
        return Session.get('mainText');
    },
    focusTextActive: function () {
        return Session.get('focusTextActive');
    },
    focusText: function () {
        return Session.get('focusText');
    },
    statusText: function () {
        return Session.get('statusText');
    }
});

Template.book.events({
    'click #keyword, mouseup #keyword': function (event) {
        var elem = $('#mousedown');
        console.log('open ...-view');
        elem.css({
            left: event.pageX-50,
            top: event.pageY-50
        }).show();
    },
    'click .white-box': function(event){
        var mousedown = $('#mousedown').hide();
        Session.set('actionText', ACTION.de[event.currentTarget.id]);
        switch(event.currentTarget.id) {
            case 'center':
                break;
            case 'bottomBox':
                break;
            case 'upBox':
                break;
            case 'leftBox':
                break;
            case 'leftUpBox':
                break;
            case 'leftBottomBox':
                break;
            case 'rightBox':
                break;
            case 'rightUpBox':
                break;
            case 'rightBottomBox':
                break;
            default:
                /**
                 * this should never happen, but closing anyways
                 * */
                mousedown.hide();
        }
    },

    /**
     * Hide ...-view on any click or keyup
     */
    'click': function (event) {
        /**
         * test if current target is keyword
         * true => do nothing
         */
        if(event.currentTarget.id === 'keyword')
            return;
        /**
         * test of curremt target is ...-view
         */
        if(event.currentTarget.id === 'mousedown')
            return;
        /**
         * if click is on an element or if it is a keyup, hide ...-view
         */
        console.log('close ...-view');
        $('#mousedown').hide();
    }
});