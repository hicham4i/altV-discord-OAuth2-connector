/// <reference types="@altv/types-server" />
import * as alt from 'alt-server';

import config from './config.json';
import * as bot from './bot';

let SPAWN = {
    x: -1291.7142333984375,
    y: 83.43296813964844,
    z: 54.8916015625
};
let SPAWN_RANGE = 10;
let RANDOM_PLAYER_MODELS = ['mp_f_freemode_01', 'mp_m_freemode_01'];

alt.on('playerConnect', player => {
    alt.emitClient(player, 'discord:showHUD', config.connectionURI);
});

alt.onClient('discord:connected', (player, discordUser) => {
    const whitelist = bot.getWhitelist();
    alt.log(`${bot.logDiscord}${bot.logSuccess} ${JSON.stringify(discordUser)}`);
    if (whitelist.includes(discordUser.id)) {
        alt.emitClient(player, 'chat:Init');
        const randomModelNumber = Math.floor(Math.random() * RANDOM_PLAYER_MODELS.length);
        const randomModel = RANDOM_PLAYER_MODELS[randomModelNumber];
        const randomPosition = randomPositionAround(SPAWN, SPAWN_RANGE);
    
        // Set Model, Set Spawn, Send Message
        player.model = randomModel;
        player.spawn(randomPosition.x, randomPosition.y, randomPosition.z, 0);
        alt.emitClient(player, 'discord:destroy:succeed');
    } else {
        alt.emitClient(player, 'discord:destroy:failed');
    }
});
function randomPositionAround(position, range) {
    return {
        x: position.x + Math.random() * (range * 2) - range,
        y: position.y + Math.random() * (range * 2) - range,
        z: position.z
    };
}