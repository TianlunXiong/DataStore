<template>
    <v-expansion-panel-content >
        <div slot="header">
            <span class="header-font" >
              {{keyName}}
            </span>
            <span>
              {{$store.state.creator.factory.entriesBuffer[index]['value']['descriptor']}}
            </span>
        </div>
        <v-container fluid>
          <v-layout column>
            <v-flex>
              <v-layout>
                <v-flex xs6>
                  <v-layout>
                    <v-flex>
                      <v-switch label="advanced" class="mt-4" v-model="isAdvancedType"></v-switch>
                    </v-flex>
                    <v-flex>
                      <v-switch label="custom" class="mt-4" :disabled="isAdvancedType" v-model="isCustomType"></v-switch>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-if="!isAdvancedType"
                    :items="totalType"
                    v-model="typePrimary"
                    label="Type"
                  ></v-select>
                  <v-select
                    v-else
                    :items="totalType"
                    v-model="typeAdvanced"
                    label="Type"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-layout v-show="!isAdvancedType">
                <v-flex v-show="!isCustomType">
                  <v-layout>
                    <v-flex xs6>
                      <v-select
                        :items="Object.keys($store.state.faker.fakerType[typePrimary])"
                        v-model="fakerType"
                        label="firstType"
                      ></v-select>
                    </v-flex>
                    <v-flex xs6>
                      <v-select
                        :items="$store.state.faker.fakerType[typePrimary][fakerType]"
                        v-model="fakerTypeItem"
                        label="secondType"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex v-show="isCustomType">
                  <v-text-field :type="typePrimary === 'Number'?'number':'text'" v-if="typePrimary === 'String' || typePrimary === 'Number'" label="value" v-model="customField">
                  </v-text-field>
                  <v-select v-else :items="[true, false]" v-model="selectedBoolean">
                  </v-select>
                </v-flex>
              </v-layout>
              <v-layout v-show="isAdvancedType">
                <v-layout>
                  <v-flex xs6>
                    <v-select
                      :items="Object.keys($store.state.creator.objects)"
                      v-model="selectedObject"
                      label="advancedType"
                    ></v-select>
                  </v-flex>
                  <v-flex class="pb-2" v-if="typeAdvanced === 'Array'" xs6>
                    <v-slider
                      v-model="count"
                      thumb-label="always"
                      label="count"
                    ></v-slider>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-toolbar color="white" flat>
                  <v-btn @click="showReName=!showReName"  icon>
                    <v-icon >edit</v-icon>
                  </v-btn>
                  <v-btn @click="save"  icon>
                    <v-icon >save</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon flat color="error" @click="handleClose">
                    <v-icon>close</v-icon>
                  </v-btn>
              </v-toolbar>
            </v-flex>
            <v-flex v-show="showReName">
              <v-text-field
                v-model="keyName"
                @blur="showReName=false"
                label="rename"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel-content>
</template>

<script>
import {builder} from '@/util/'
const primaryTypeList = [
  'String',
  'Number',
  'Boolean'
]

const advancedTypeList = [
  'Object',
  'Array'
]

export default {
  data () {
    return {
      keyName: this.initialName,
      typePrimary: 'String',
      isCustomType: false,
      customField: '',
      typeAdvanced: 'Array',
      fakerType: '',
      fakerTypeItem: '',
      selectedObject: '',
      selectedBoolean: true,
      isAdvancedType: false,
      count: 0,
      showReName: false
    }
  },
  props: {
    index: Number,
    initialName: String,
    belong: String
  },
  mounted () {
  },
  computed: {
    totalType () {
      if (this.isAdvancedType) {
        return [
          ...advancedTypeList
        ]
      } else {
        return [
          ...primaryTypeList
        ]
      }
    }
  },
  watch: {
  },
  methods: {
    save () {
      try {
        // 上传对象前体
        if (this.isAdvancedType) {
          switch (this.typeAdvanced) {
            case 'Object':
              this.$store.dispatch('creator/achieveEntriesBuffer', {
                index: this.index,
                descriptor: `Object|${this.selectedObject}`,
                initiator: () => builder(this.$store.state.creator.objects[this.selectedObject])
              })
              break
            case 'Array':
              this.$store.dispatch('creator/achieveEntriesBuffer', {
                index: this.index,
                descriptor: `Array(${this.count})|${this.selectedObject}`,
                initiator: () => new Array(this.count).fill(0).map(item => builder(this.$store.state.creator.objects[this.selectedObject]))
              })
              break
          }
        } else {
          if (!this.isCustomType) {
            if (this.fakerType && this.fakerTypeItem) {
              this.$store.dispatch('creator/achieveEntriesBuffer', {
                index: this.index,
                descriptor: `${this.typePrimary}|${this.fakerType}.${this.fakerTypeItem}`,
                initiator: this.$faker[this.fakerType][this.fakerTypeItem]
              })
            }
          } else {
            switch (this.typePrimary) {
              case 'String':
                this.$store.dispatch('creator/achieveEntriesBuffer', {
                  index: this.index,
                  descriptor: `String|Custom`,
                  initiator: () => this.customField
                })
                break
              case 'Number':
                this.$store.dispatch('creator/achieveEntriesBuffer', {
                  index: this.index,
                  descriptor: `Number|Custom`,
                  initiator: () => Number(this.customField)
                })
                break
              case 'Boolean':
                this.$store.dispatch('creator/achieveEntriesBuffer', {
                  index: this.index,
                  descriptor: `Boolean|Custom`,
                  initiator: () => this.selectedBoolean
                })
                break
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleClose () {
      this.$emit('deleteMe', this.index)
    }
  }
}
</script>

<style>

</style>
