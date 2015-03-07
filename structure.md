
# Quizcous Receiver app

## Main
Main entry point of app.
Creates App and starts it

## App
Initialize all other parts of application.
Keeps application state (and app-routing?).


## Receiver
Handles all communication with sender applications
### Contents
* users: User[]
* methods for broadcasting


## User
Each sender application is a User.
Has ID and other data related to a sender application
### Contents
* id
* sending message to sender application







# Quiz
## Sender
### Pregame
* Connect to chromecast
* Choose User-data (name, color, avatar)
* Create game
  - One master
    + creates game, sets rules/mode, controls game state)
    + others can join and play
  - Collaborative game
    + everyone votes on rules/mode
    + anyone can join a lobby
    + people can vote to start

### During game
* see question alternatives
* answer question
* see question result 

### After game
* see result
* join/start new game (back to start screen)


## Receiver
### Pregame
* show lobby
* show rules/mode
* show players
* countdown to game

### During game
* show question
* show answer
* show people score

### After game
* show results