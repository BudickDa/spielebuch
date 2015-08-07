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
 * Here you can define rules for your game.
 * You can add those defined rules to an effect, to a scene, a story or a player.
 * Rules should be global.
 */

/**
 * A rule consists of a key and a value.
 * If the value is a string with a + or - it manipulates the absolute value.
 * If it is a number, it overrides the absolute value. The last absolute rule always wins.
 * E.g
 * 15
 * '+5'
 * '-4'
 * = 16
 *
 * 15
 * '+3'
 * '-16'
 * '12'
 * = 12
 *
 * If a rule/effect was added to a scene or a story it affects all the objects in the scene or story.
 * If it was added to a player or object it affects only this player/object
 */
fireDamageReduced = new GamebookBackend.Rule('Feuerschaden', '-5');

/**
 * these rules have absolute values, they set these values.
 */
iron = new GamebookBackend.Rule('Gesundheit', 260);
fragile = new GamebookBackend.Rule('Gesundheit', 30);
humanHealth = new GamebookBackend.Rule('Gesundheit', 80);
humanFistDamage = new GamebookBackend.Rule('Nahkampfschaden', 20);

