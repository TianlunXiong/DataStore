<template>
    <v-expansion-panel-content >
        <div slot="header">
            <span class="header-font" >
              {{keyName}}
            </span>
            <span>
              {{type}}
            </span>
            <span>
              {{totalType}}
            </span>
        </div>
        <v-container fluid>
          <v-layout column>
            <v-flex>
              <v-layout>
                <v-flex xs6>
                  <v-switch v-model="advancedType" label="Advanced"></v-switch>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :items="totalType"
                    v-model="type"
                    label="Type"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
                <v-select
                  :items="totalType"
                  v-model="type"
                  label="Type"
                ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel-content>
</template>

<script>

const primaryType = [
  'String',
  'Number',
  'Boolean'
]

const advancedType = [
  'Object',
  'Array'
]

export default {
  data () {
    return {
      keyName: 'Aulie',
      type: '',
      value: null,
      advancedType: false
    }
  },

  computed: {
    totalType () {
      if (this.advancedType) {
        return [
          ...advancedType
        ]
      } else {
        return [
          ...primaryType
        ]
      }
    },

    selection () {
      if (this.advancedType) {
        return [
          ...advancedType
        ]
      } else {
        return [
          ...primaryType
        ]
      }
    }
  }
}
</script>

<style>

</style>
