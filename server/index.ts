import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { PLAYER_SYNCED_META } from '../../../shared/enums/playerSynced';
import ChatController from '../../../server/systems/chat';
import { PERMISSIONS } from '../../../shared/flags/permissionFlags';

export const OPLAYERLIST = {
    name: 'OPLAYERLIST',
    version: 'v1.0',
  }
  
  PluginSystem.registerPlugin(OPLAYERLIST.name, () => {
    alt.log(`~lg~${OPLAYERLIST.name} successfully loaded!`);
  });

  alt.onClient(
    `omegaPlayerList:Server:Open`,
     async (player: alt.Player,) => {
        openPlayerList(player,);
        //alt.log(JSON.stringify(`HcraftitemsdbName: ${craftItems.dbName} `));
        //alt.log(JSON.stringify(`HcraftitemsRecipe: ${craftItems.recipe} `));
});



  ChatController.addCommand('PlayerList', '/PlayerList - Shows a the administrative ticket menu.', PERMISSIONS.NONE,  openPlayerList);
  async function openPlayerList(player: alt.Player) {

  const validPlayers = [];

  alt.Player.all.forEach((player) => {
      if (!player.hasSyncedMeta(PLAYER_SYNCED_META.PING)) {
          return;
      }

      const id = player.id;
      const name = player.getSyncedMeta(PLAYER_SYNCED_META.NAME);
      const ping = player.getSyncedMeta(PLAYER_SYNCED_META.PING);

      validPlayers.push({ id, name, ping });
  });

    alt.emitClient(player, 'OPlayerList:Client:OpenCEF', validPlayers,);
  
}