<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="()=>{}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/">home</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="()=>{}">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="()=>{}">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link to="/creator/factory">creator</router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="child-view"></router-view>
        </keep-alive>
      </transition>
    </v-content>
    <v-footer color="indigo" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import ObjectMap from './components/ObjectMap.vue'
import ipcInitial from './renderIpc'
export default {
  data: () => ({
    drawer: null,
    transitionName: 'slide-left'
  }),
  props: {
    source: String
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  },
  components: {
    ObjectMap
  },
  mounted () {
    ipcInitial(this.$store)
  }
}
</script>

<style>
  .min-width-60{
    min-width: 60px;
  }

  .min-height-200{
    min-height: 200px;
  }

  .min-width-300 {
    min-width: 300px;
  }
  .max-width-80 {
    max-width: 80px;
  }
  .fade-enter-active .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter .fade-leave-to {
    opacity: 0;
  }

.child-view {  
  /* position: absolute;
  left: 0;
  right:0;
  bottom: 0; */
  /* top: 0; */
  /* width: 100%; */
  /* height: 100%; */
  transition: all .5s cubic-bezier(.55,0,.1,1);
}  
.slide-left-enter, .slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30px, 15px) scale(1.2);
  transform: translate(30px, 15px) scale(1.2);
}  
.slide-left-leave-active, .slide-right-enter {  
  opacity: 0;  
  -webkit-transform: translate(-30px, 15px) scale(1.2);
  transform: translate(-30px, 15px) scale(1.2);
}  
</style>
