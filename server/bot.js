/// <reference types="@altv/types-server" />

import config from './config.json';
import fs from 'fs';

import * as alt from 'alt-server'
import Discord from 'discord.js';
import chalk from 'chalk';

export const logDiscord = chalk.cyan('[DISCORD]');
export const logSuccess = chalk.greenBright('[SUCCESS]');
export const logError = chalk.redBright('[ERROR]');

const client = new Discord.Client();

let whitelist = [];

client.on('ready', () => {
    alt.log(`${logDiscord}${logSuccess} BOT has authenticated`);
    if (config.serverID && config.WlRoleID) {
        setWhitelist();
    }
});

client.on('error', err => {
    alt.log(`${logDiscord}${logError} ${err}`);
});

client.on('rateLimit', rateLimit => {
    alt.log(`${logDiscord}${logError} Rate Limit Exceeded ${rateLimit}`);
});


client.on('message', async msg => {
    if (msg.author.bot) return;
    if (msg.channel.type === 'dm') {
        if (msg.content.includes('!wl')) {
            setWhitelist(); 
            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('SUCCESS')
            .setDescription('the whitelist has been updated.');
            msg.reply(embed).catch(err => {
                console.log('Could not send message to user from bot.');
            });        
            return
        }
        if (msg.content.includes('!set config')) {
            const Server = msg.author.client['guilds'].cache.first();
            const roleOwnerID = Server.roles.cache.find(role => role.name === 'owner').id; // TYPE HERE THE NAME OF THE OWNER 'ROLE' IN YOUR SERVER
            setVariablesInJson('ownerRoleID', roleOwnerID);
            const roleWhitelistID = Server.roles.cache.find(role => role.name === 'whitelist').id; // TYPE HERE THE NAME OF THE Whitelisted players 'ROLE' IN YOUR SERVER
            setVariablesInJson('WlRoleID', roleWhitelistID);
            setVariablesInJson('serverID', Server.id);
            const embed = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('SUCCESS')
            .setDescription('the config file has been set.');
            msg.reply(embed).catch(err => {
                console.log('Could not send message to user from bot.');
            });
            return;
        }

        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('ERROR')
        .setDescription('this command doesn\'t exist.');
        msg.reply(embed).catch(err => {
            console.log('Could not send message to user from bot.');
        });      
    }
});

client.login(config.token);
/**
 * this function set "key": "value" in the
 * config.json file and update if the key exist
 * @param {string} key 
 * @param {string} value
 * @returns {void}
 */ 
function setVariablesInJson(key, value) {
    const fileName = './resources/discord/server/config.json'; // if you change the name of the resource Change 'discord' in this path
    config[key] = value;
    JSON.stringify(config, null, 2);

    fs.writeFile(fileName, JSON.stringify(config), function writeJSON(err) {
        if (err) return console.log(err);
    });
}
/**
 * this function get all the users that have the role
 * 'whitelist' and put them in the array whitelist
 * @returns {void}
 */ 
function setWhitelist() {
    whitelist = [];
    const server = client.guilds.cache.get(config.serverID);
    
    const members = server.roles.cache.get(config.WlRoleID).members;

    members.map((GuildMember) => {
        whitelist.push(GuildMember['user'].id);
    });

    alt.log(`${logDiscord}${logSuccess} the whiteList has been set`);
}
export function getWhitelist() {
    return whitelist;
}
