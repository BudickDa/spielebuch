# Spielebuch
A Meteor package that makes writing interactive books very easy.

I decided for a complete rewrite, you can find the new project here: [spielebuch:core](https://github.com/spielebuch/core)


# Core concepts
Interactive gameobjects are created while writing text. The author can create rules and effects and add those to gameobjects, scenes or the whole story.
Effects are a set of rules. A rule is a key-value-pair.
E.g.:
'Firedamage' and '-40'
This rule reduces the firedamage by 40 on the object/scene/story it affects.

Properties are always set by rules.

For more information take a look at the tutorials in [/book](book)
or in the docs: [/documentation_gamebook_alpha_0_1_1.pdf](documentation_gamebook_alpha_0_1_1.pdf).


# Installation
1. [Install Meteor](https://www.meteor.com/install)
2. [Download](https://github.com/BudickDa/spielebuch/archive/Alpha-0.1.0.zip) the last release.
3. Unzip it and go into directory of repository with you console.
4. Start application by typing 'meteor'
5. Visit localhost:3000 with Chrome or another modern browser.
7. $Profit$


# Releases
2015-08-04 [Alpha 0.1.0](https://github.com/BudickDa/spielebuch/releases/tag/Alpha-0.1.0) 


# Dual License
This package is licensed under GPL V3. This means, if you create an application with this package it has to be open source too.
For more information look at http://www.gnu.org/licenses/gpl-3.0.en.html.

The Documentation Gamebook by Daniel Budick is licensed under a Creative Commons AttributionNonCommercial-ShareAlike 4.0 International License. 

For using this package in a proprietary or closed source application please contact daniel@budick.eu. 


# Language
This is a german project, this means the examples are written in german for now. 


# Contribution
This a prototype. Please do not send pull request/bug reports and be patient for now.
If this goes into beta I hopefully will have created an API that supports addons in form of other packages that can be used in a game book.
This where you can start coding your own packages and hit me with bug reports, ideas, etc, by generating issues.
If you want to make your own thing, just fork and go into your own direction, but please respect the GPL at all time.


