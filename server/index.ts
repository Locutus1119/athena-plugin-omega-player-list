import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { PLAYER_SYNCED_META } from '../../../shared/enums/playerSynced';


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
        openPlayerList(player);

});
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