<template>
  <v-layout justify-center>
    <v-flex xs12 lg6>
      <v-container class="slim-padding" fluid grid-list-sm text-xs-center >
          <v-layout align-space-between fill-height column>
              <v-flex d-flex >
                  <v-layout justify-center column>
                      <v-flex>
                        <v-toolbar
                          dark
                          dense
                          color="teal accent-4"
                        >
                          <v-btn @click="query" flat icon >
                            <v-icon>people</v-icon>
                          </v-btn>
                          <v-toolbar-title class="font-weight-light">
                            {{name}}
                            <span></span>
                          </v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon @click="appendChild">
                              <v-icon>add</v-icon>
                          </v-btn>
                          <v-btn icon @click="commit">
                              <v-icon>check</v-icon>
                          </v-btn>
                        </v-toolbar>
                      </v-flex>
                      <v-flex>
                        <v-text-field 
                          v-model="name" 
                          label="Name"
                          clearable></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                          v-model="currentKey"
                          color="blue"
                          label="Key"
                          @keypress="enter"
                          clearable
                        ></v-text-field>
                      </v-flex>
                  </v-layout>
              </v-flex>
              <v-flex  xs8 sm9 md10 lg12>
                  <v-expansion-panel>
                        <KeyValuePair @deleteMe="deleteItem" v-for="(item, i) in $store.state.creator.factory.entriesBuffer" :belong="name" :index="i" :key="item.key" :initialName="item.key"></KeyValuePair>
                  </v-expansion-panel>
              </v-flex>
          </v-layout>
      </v-container>
    </v-flex>
  </v-layout>  
</template>

<script>
import KeyValuePair from '@/components/KeyValuePair.vue'

export default {
  data () {
    return {
      name: '',
      currentKey: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.query.target) {
        let key, value
        vm.$store.dispatch('creator/resetEntriesBuffer').then(() => {
          Object.entries(vm.$store.state.creator.objects[to.query.target]).forEach(item => {
            [key, value] = item
            vm.name = to.query.target
            vm.$store.dispatch('creator/pushEntriesBuffer', {
              key,
              value
            })
          })
        })
      }
    })
  },
  methods: {
    appendChild () {
      // 键名不可为: 空,存在空格,重名
      if (this.currentKey &&
          this.currentKey.search(/\s/g) === -1 &&
          this.$store.state.creator.factory.entriesBuffer.every(item => item.key !== this.currentKey)) {
        this.$store.dispatch('creator/pushEntriesBuffer', {
          key: this.currentKey,
          value: {
            descriptor: '',
            initiator: null
          }
        })
      }
      this.currentKey = ''
    },
    commit () {
      if (this.name && this.name.search(/\s/g) === -1 && this.$store.state.creator.factory.entriesBuffer.some(item => !(item.value.descriptor === '' || (typeof item.value.initiator !== 'function')))) {
        const temp = {}
        this.$store.state.creator.factory.entriesBuffer.forEach(item => {
          temp[item.key] = item.value
        })
        this.$store.dispatch('creator/save', {
          name: this.name,
          body: {...temp}
        }).then(() => {
          this.reset()
        })
      }
    },
    deleteItem (val) {
      this.$store.dispatch('creator/deleteEntriesBuffer', val)
    },
    reset () {
      this.name = ''
      this.currentKey = ''
      this.$store.dispatch('creator/resetEntriesBuffer')
    },
    query () {
      this.currentKey = ''
      this.name = ''
      this.$store.dispatch('creator/resetEntriesBuffer')
    },
    enter (e) {
      if (e.key === 'Enter') {
        this.appendChild()
      }
    }
  },
  components: {
    KeyValuePair
  }
}
</script>

<style>

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.header-font{
  font-size: 24px;
}
</style>
