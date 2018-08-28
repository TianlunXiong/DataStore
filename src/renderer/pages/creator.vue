<template>
    <v-container text-xs-center fluid fill-height>
        <v-layout justify-center  >
            <v-flex>
                <v-layout column>
                    <v-flex>
                        <v-breadcrumbs large divider="-">
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
  methods: {
    getPath () {
      return this.$route.path.split('/').slice(1).map((item, i) => ({
        text: item,
        disabled: true // this.$route.name === item
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
