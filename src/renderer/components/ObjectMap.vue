<template>
    <v-container class="slim-padding" fluid grid-list-sm text-xs-center >
        <v-layout align-space-between fill-height column>
            <v-flex d-flex >
                <v-layout justify-center column>
                    <v-flex>
                      <v-toolbar
                        dark
                        dense
                        color="purple lighten-1"
                      >
                        <v-icon>people</v-icon>
                        <v-toolbar-title class="font-weight-light">
                          {{name}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="addChild">
                            <v-icon>add</v-icon>
                        </v-btn>
                      </v-toolbar>
                    </v-flex>
                    <v-flex>
                      <v-text-field
                        v-model="keyName"
                        color="blue"
                        label="Key"
                      ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex  xs8 sm9 md10 lg12>
                <v-expansion-panel>
                      <KeyValuePair></KeyValuePair>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import KeyValuePair from './KeyValuePair.vue'
const object = {
  name: 'Jelly',
  body: {
    name: 'ju',
    age: 18,
    members: [
      {
        name: 'wang',
        age: 19
      },
      {
        name: 'ju',
        age: 21
      }
    ],
    edvices: {
      go: {
        nu: 'shi'
      },
      ju: {
        nu: 'knk'
      }
    }
  }
}

export default {
  data () {
    return {
      name: object.name,
      body: object.body,
      keyName: '',
      isEditing: false,
      children: []
    }
  },
  computed: {
    pairs () {
      return Object.entries(this.body)
    }
  },
  methods: {
    addChild () {
      if (this.keyName.length && this.keyName.search(/\s/g) === -1) {
        const arr = new Array(5).fill(0).map(item => ({
          name: Math.floor(1000 * Math.random())
        }))
        this.children.push({
          name: Math.floor(1000 * Math.random()),
          children: arr
        })
      }
      this.keyName = ''
    },
    typeName () {
      this.isNaming = true
    },
    deleteMe (i) {
      this.children.splice(i, 1)
      console.log(i)
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
