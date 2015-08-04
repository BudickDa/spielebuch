PersistedPlayerObject = Astro.Class({
    name: 'Player',
    collection: Meteor.users,
    fields: {
        emails: 'array',
        services: 'object',
        createdAt: 'date'
    },
    indexes: {
        fullName: {
            fields: {
                lastName: 1,
                firstName: 1
            },
            options: {}
        }
    }
});