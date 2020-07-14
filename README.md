# altv-discord-OAuth2-connector
* altv:MP resource that uses OAuth2 discord api to connect players to server depanding on the roles

* clone this repo in dir 'discord' otherwise you need to change the code
* you need to create a discord app & bot here "https://discord.com/developers/applications"
* go to OAuth2 tab and add a Redirect uri as "http://resources/discord/html/index.html"
* copy ClientID and 
* got to : discord/server/config.json
* set connectionURI to 
* "https://discord.com/api/oauth2/authorize?client_id=**************&redirect_uri=http%3A%2F%2Fresources%2Fdiscord%2Fhtml%2Findex.html&response_type=token&scope=identify"
* and change client_id
* copy token from bot tab and past it in config file where key = token 
* create 'whitelise' role in your discord server and 'owner' role
* start the resource
* send !set config to the bot 
* and !wl to update the list of the whitelisted players (user clients that have role whitelist)