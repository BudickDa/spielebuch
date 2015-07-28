# Spielebuch
A Meteor package that makes writing interactive books very easy.

# Todos
- Put the framework into a package (waiting for the next version of meteor, which will support ES6)
- finish tutorial two
- finish the backpack
- finish UI
- change the controllview into something usable (this daVinci-bullshit will be thrown out asap)

# Core concepts
Interactive gameobjects are created while writing text. The author can create rules and effects and add those to gameobjects, scenes or the whole story.
Effects are a set of rules. A rule is a key-value-pair.
E.g.:
'Firedamage' and '-40'
This rule reduces the firedamage by 40 on the object/scene/story it affects.

Properies are always set by rules.

For more information take a look at the tutorials.

# Installation
1. Install Meteor
2. clone repository
3. go into directory of repository
4. start application by typing 'meteor'
5. ...
6. visit localhost:3000 with chrome (because all other browsers suck)
7. $Profit$

# Dual License
This package is licensed under GPL V3. This means, if create an application with this package it has to be open source too.
For more information look at http://www.gnu.org/licenses/gpl-3.0.en.html

For using this package in a proprietary or closed source application please contact daniel@budick.eu. 
