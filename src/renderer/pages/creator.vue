<template>
    <v-container text-xs-center fluid fill-height>
        <v-layout justify-center  >
            <v-flex lg6>
                <v-layout column>
                    <v-flex>
                        <v-card>
                            <v-card-title>
                                <v-breadcrumbs large divider="->">
                                <v-breadcrumbs-item
                                    v-for="item in path"
                                    :key="item.text"
                                    :disabled="item.disabled"
                                >
                                    {{ item.text }}
                                </v-breadcrumbs-item>
                                </v-breadcrumbs>
                            </v-card-title>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      path: [
        {
          text: 'root',
          disabled: false
        },
        {
          text: 'nini',
          disabled: true
        }
      ]
    }
  }
}
</script>

<style>
    .slim-padding{
        padding: 5px 0px;
    }
</style>
