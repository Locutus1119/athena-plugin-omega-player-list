<template>
  <div class="wrapper">
      <div class="logo">
          <img
              src="./omega.png"
              style="position: sticky; margin-top: -2.5%; width: 256px; height: 256px"
              class="mb-4 mt-0"
          />
          <p style="top: 10%">The panel displays online players.</p>
          <hr />
      </div>
      <div class="content">
          <div class="tableDiv" v-for="(player, index) in validPlayers"  :key="index" >
              <table>
                  <tr>
                      <th>ID <Icon class="green--text mb-2" icon="icon-flask" :size="32" /></th>
                      <th>Name <Icon class="green--text mb-2" icon="icon-clock" :size="32" /></th>
                      <th>Ping <Icon class="green--text mb-2" icon="icon-person" :size="32" /></th>
                  </tr>
                  <tr>
                      <td>{{ validPlayers[index].id }}</td>
                      <td>{{ validPlayers[index].name }}</td>
                      <td>{{ validPlayers[index].ping }} <br /></td>
                  </tr>
                  <br />
              </table>
          </div>
      </div>
      <div class="footer">
          <hr />
          <span style="text-align: center">Online players {{ validPlayers.length }}.</span>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@components/Button.vue';
import Frame from '@components/Frame.vue';
import Icon from '@components/Icon.vue';
import Input from '@components/Input.vue';
import Modal from '@components/Modal.vue';
import Module from '@components/Module.vue';
import RangeInput from '@components/RangeInput.vue';
import Toolbar from '@components/Toolbar.vue';
import { Player } from 'alt-client';

// Very Important! The name of the component must match the file name.
// Don't forget to do this. This is a note so you don't forget.
const ComponentName = 'omegaPlayerList';
export default defineComponent({
  name: ComponentName,
  // Used to add Custom Components
  components: {
      Button,
      Frame,
      Icon,
      Input,
      Modal,
      Module,
      RangeInput,
      Toolbar,
  },
  // Used to define state
  data() {
      return {
        validPlayers: [],
      };
  },
  // Called when the page is loaded.
  mounted() {
      // Bind Events to Methods
      if ('alt' in window) {
          // alt.on('x', this.whatever);
          alt.on('OplayerList:Vue:OnlinePlayers', this.onlinePlayers);
          console.log(this.validPlayers.length);
          alt.emit(`${ComponentName}:Ready`);
      }

      // Add Keybinds for In-Menu
      document.addEventListener('keyup', this.handleKeyPress);
  },
  // Called when the page is unloaded.
  unmounted() {
      // Make sure to turn off any document events as well.
      // Only if they are present of course.
      // Example:
      // document.removeEventListener('mousemove', this.someFunction)
      if ('alt' in window) {
          alt.off('OplayerList:Vue:OnlinePlayers', this.onlinePlayers);
          alt.off(`${ComponentName}:Close`, this.close);
      }

      // Remove Keybinds for In-Menu
      document.removeEventListener('keyup', this.handleKeyPress);
      this.validPlayers = null;
  },
  // Used to define functions you can call with 'this.x'
  methods: {
      onlinePlayers(vuePlayerLists: []) {
         // vuePlayerLists.forEach{
             vuePlayerLists.forEach((entry: Player, index) => {
              this.validPlayers.push({
                  id: entry.id,
                  name: entry.name,
                  //ping: entry.ping,
               });
                return;
            });
        },
        
        handleKeyPress(e) {
            // Escape Key
            if (e.keyCode === 27 && 'alt' in window) {
                alt.emit(`${ComponentName}:Close`);
            }
        },

        handleKeyPress2(e) {
            // F4 Key
            if (e.keyCode === 115 && 'alt' in window) {
                alt.emit(`${ComponentName}:Close`);
            }
        },
            },
});
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 10%;
  border-radius: 25px;
  background-color: #000000c9;
  width: 800px;
  max-height: 880px;
}
.logo {
  margin-top: 3%;
  text-align: center;
}
.footer {
  position: relative;
  text-align: center;
  height: 6vh;
  bottom: 1vh;
}
.content {
  text-align: center;
  color: rgb(255, 255, 255);
  position: relative;
  width: 750px;
  max-width: 750px;
  padding: 25px;
  overflow-x: hidden;
  overflow: auto;
  height: 380px;
  max-height: 380px;
  font-size: 1.2em;
  font-family: monospace;
}
.content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.content {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.button {
  background: black;
  color: white;
}
table {
  text-align: center;
  font-family: monospace;
  border-collapse: collapse;
  width: 750px;
}
td,
th {
  color: white;
  border: 1px solid #24c3f371;
  text-align: center;
  padding: 8px;
  width: 2500px;
  height: 0px;
  max-height: 0px;
}

tr:nth-child(even) {
  background-color: #46454586;
}

.button {
  border-radius: 10px;
}
</style>
