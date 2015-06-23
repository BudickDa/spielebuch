export class StorageObject {
    constructor() {
        this.storage = [];
    }
    add(object) {
        "use strict";
        var index = this.findIndex(object);
        if (index !== -1)
            this.storage[index] = object;
        this.storage.push(object);
    }
    findIndex(objectname) {
        "use strict";
        _.each(this.storage, function (object, index) {
            if (object.name === objectname)
                return index;
        });
        return -1;
    }
    find(objectname) {
        "use strict";
        _.each(this.storage, function (object) {
            if (object.name === rulename)
                return object;
        });
        return -1;
    }
}