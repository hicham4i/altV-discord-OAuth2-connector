# alt:V | discord-OAuth2-connector
altv:MP resource that uses OAuth2 discord api to connect players to server depending on the roles

## Requirements

* clone this repo in dir 'discord' otherwise you need to change the code
* In "discord" directory where resource.cfg file. Simply run these command.

```
npm i
```
* you need to create a discord app & bot here [Discord applications](https://discord.com/developers/applications)
* go to OAuth2 tab and add a Redirect uri as 

```
http://resources/discord/html/index.html
```
![](https://i.imgur.com/nDvFPVe.png)

* copy ClientID and 
* got to : discord/server/config.json
* select ************** and past to set your client_id
* copy token from bot tab  and past it in config file where key = token 

![](https://i.imgur.com/NpmyJ5A.png)

* create 'whitelist' role in your discord server and 'owner' role
* start the resource
* send !set config to the bot 
* and !wl to update the list of the whitelisted players (users that have role whitelist)