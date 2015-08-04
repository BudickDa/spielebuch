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



/**
 * Public
 * An Object the player can interact with
 */
export class SceneObject {
    constructor(name) {
        /**
         * Creating a persisted scene object (pso)
         */
        var pso = new PersistedSceneObject();

        pso.set('sceneObject.name', name);
        pso.save(function (err) {
            if (err) {
                return debugMsg('Error persisting SceneObject', 'Could not insert obejct ' + name + ': ' + err);
            }
        });
    }
}
