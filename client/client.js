/// <reference types="@altv/types-client" />

import * as alt from 'alt-client'
import * as native from 'natives';


let view = new alt.WebView("http://resources/discord/html/index.html");;
let discordURL;

native.freezeEntityPosition(alt.Player.local.scriptID, true);

alt.onServer('discord:showHUD', (communityDiscord) => {
    view.focus();
    alt.showCursor(true);
    discordURL = communityDiscord;
    alt.setTimeout(() => {
        view.emit('show', discordURL);
    }, 100);
    native.triggerScreenblurFadeIn(0);
});
alt.onServer('discord:destroy:succeed', () => {
    native.triggerScreenblurFadeOut(0);
    alt.showCursor(false);
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
    view.destroy();
});
alt.onServer('discord:destroy:failed', () => {
    view.emit('show', discordURL);
});
view.on('discord:connected:user', (Token) => {
    alt.emitServer("discord:connected", Token);
});