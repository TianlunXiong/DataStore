<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="$router.replace('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.replace('/creator/factory')">
          <v-list-tile-action>
            <v-icon>build</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Factory</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.replace('/creator/dStore')">
          <v-list-tile-action>
            <v-icon>subject</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>DStore</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
          <v-list-tile @click="quit">
          <v-list-tile-action>
            <v-icon>close</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Exit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="teal accent-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline font-weight-bold no-selected">DataStore</v-toolbar-title>
      <v-spacer ></v-spacer>
      <v-icon class="dragger no-selected">{{$store.state.creator.serverStatus? 'lens' : 'panorama_fish_eye'}}</v-icon>
    </v-toolbar>
    <v-content class="bg-image">
      <transition :name="transitionName">
        <keep-alive>
          <router-view class="child-view"></router-view>
        </keep-alive>
      </transition>
    </v-content>
    <v-footer color="teal accent-4" app>
      <v-spacer></v-spacer>
      <span class="white--text">&copy; 2018 &nbsp;</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    transitionName: 'slide-left'
  }),
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  },
  methods: {
    quit () {
      if (window.confirm('确认退出?')) {
        this.$electron.remote.app.quit()
      }
    }
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
 ::-webkit-scrollbar {
   width: 4px;
 }

 ::-webkit-scrollbar-thumb {
   background: #00BFA5;
   /* border-radius: 2px; */
 }
 button {
   -webkit-app-region: no-drag;
 }
 .dragger {
   -webkit-app-region: drag;
 }
 .no-selected {
   user-select: none;
 }
</style>
