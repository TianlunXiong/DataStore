<template>
<v-container fluid grid-list-md>
    <v-data-iterator
      :items="$store.getters['creator/dStoreList']"
      item-key="name"
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
                </v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat icon color="error" @click="deleteItem(props.item.name)">
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
  methods: {
    handleEdit (val) {
      this.$router.push({name: 'factory', query: {target: this.$store.getters['creator/dStoreList'][val].name}})
    },

    deleteItem (name) {
      this.$store.dispatch('creator/deleteObject', name)
    }
  }
}
</script>

<style>

</style>
