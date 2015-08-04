# Spielebuch
A Meteor package that makes writing interactive books very easy.

# Core concepts
Interactive gameobjects are created while writing text. The author can create rules and effects and add those to gameobjects, scenes or the whole story.
Effects are a set of rules. A rule is a key-value-pair.
E.g.:
'Firedamage' and '-40'
This rule reduces the firedamage by 40 on the object/scene/story it affects.

Properties are always set by rules.

For more information take a look at the tutorials in `/book`.


# Installation
1. Install Meteor
2. clone repository
3. go into directory of repository
4. start application by typing 'meteor'
5. ...
6. visit localhost:3000 with chrome
7. $Profit$

# Release
First release is a proof of concept prototype:



# Dual License
This package is licensed under GPL V3. This means, if you create an application with this package it has to be open source too.
For more information look at http://www.gnu.org/licenses/gpl-3.0.en.html

For using this package in a proprietary or closed source application please contact daniel@budick.eu. 


# Todo and ideas after project:
- Put the framework into a package (waiting for the next version of meteor, which will support ES6)
- a imo better system than daVinci: interactions should be context aware:
    - in backpack: 
        - interact
        - info
        - put into hand or, if usable item: use
    - in scene:
        - interact
        - info
        - take into backpack (if item is 'takeable')
        
    action when interacting depends on item in hand and item/npc you interact with
    - in fight with npc: interact = attack (item in hand gives bonus on players statistics)
    - in peace with npc: interact: trading
    - always with item: if item in hand repairs or in scene repairs, not repairing item is repaired, when both repair, both are repaired. 
    If nothing repairs: Both item take damage (You hit the table with a sword). 
    
    BUT: if one likes the daVince-way, one could create a package. I think the view should be put in its own package, so everyone can code happy his own book with its own view and way of interaction.
    I think it would be possible, because the interactions are set on each item.
    
- rewrite that objects are no longer stored in arrays of scene, backpack etc. but contain a reference to the place they are stored in.
I think this would be the better way to do it.
- make all the stuff 'database driven' (everyting exists in the database). So we have persistence and a lot of $$$:
item get properties (name and description) for the view and store them into the database. This gives the opportunity to store there global properties by name.
 a 'Schwert' can have always the same default properties. So if I write 'Schwert' in my story I have not to care about its properties.
 As a consequence, one could make a library with a lot of items and create random generated scenes. Or even better: a hybrid solution. Some scenes are handmade, others are generated.
 You walk through the forest, everything is generated, you can find items, enemies and friends... but the you find a house. You go in and a handmade scene starts that drives the story forward.
- actio = ractio: meaning, that when you attack something (hit it with a stick), it 'hits' back and the stick breaks.

# Language
This is a german project, this means the examples are written in german for now. I promise there will be a example in english soon. 
And when I think about it, it is one more reason to put the UI into its own package.

# Contribution
This not even an alpha version. Please do not send pull request/bug reports and be patient for now.
If this goes into beta I hopefully will have created an API that supports addons in form of other packages can be written and used in a gamebook.
This where you can start coding your own package and hit me with bug reports, ideas, etc, in by generating issues.
If you want to make your own thing, just fork and go into your own direction, but please respect the GPL at all time.
