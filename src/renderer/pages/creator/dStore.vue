<template>
<v-container fluid grid-list-md>
    <v-data-iterator
      :items="dataDone"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <v-card class="elevation-5" >
          <v-card-title >
            <v-layout>
              <v-flex xs12>
                <v-btn block @click="handleEdit(props.index)">
                  {{ props.item.name }}
                  {{ props.index}}
                </v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat icon color="error" @click="() => {}">
                  <v-icon>close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-list  dense>
            <v-list-tile v-for="data in props.item.values" :key="data.key">
              <v-list-tile-content>key:{{data.key}} </v-list-tile-content> <br>
              <v-list-tile-content class="align-end">{{ data.descriptor }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    }
  }),
  computed: {
    dataDone () {
      const names = Object.keys(this.$store.state.creator.objects)
      return names.map(name => {
        const someMember = this.$store.state.creator.objects[name]
        const values = Object.keys(someMember).map(key => ({
          key,
          descriptor: someMember[key].descriptor
        }))
        return {
          name,
          values
        }
      })
    }
  },

  mounted () {
    console.log(Object.keys(this.$store.state.creator.objects)[0])
  },

  methods: {
    handleEdit (val) {
      console.log(this.dataDone[val].name)
    }
  }
}
</script>

<style>

</style>
