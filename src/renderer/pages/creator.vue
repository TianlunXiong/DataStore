<template>
    <v-container text-xs-center fluid fill-height>
        <v-layout justify-center  >
            <v-flex>
                <v-layout column>
                    <v-flex>
                        <v-breadcrumbs divider="->">
                        <v-breadcrumbs-item
                            v-for="item in getPath()"
                            :key="item.text"
                            :disabled="item.disabled"
                        >
                            {{ item.text }}
                        </v-breadcrumbs-item>
                        </v-breadcrumbs>
                    </v-flex>
                    <v-flex>
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
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
  },
  methods: {
    getPath () {
      return this.$route.path.split('/').slice(1).map((item, i) => ({
        text: item,
        disabled: this.$route.name === item
      }))
    }
  }
}
</script>

<style>
    .slim-padding{
        padding: 5px 0px;
    }
</style>
