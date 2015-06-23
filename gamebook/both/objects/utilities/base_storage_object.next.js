/**
 * Created by Daniel Budick on 23.06.2015.
 * Copyright 2015, Daniel Budick, All rights reserved.
 */
export class BaseStorageObject {
    constructor() {
        "use strict";
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