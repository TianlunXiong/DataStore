<template>
    <v-container fluid fill-height>
        <v-layout justify-center >
            <v-flex xs12 md10 lg9>
                <v-card >
                    <v-card-media
                    @dblclick="changeImage"
                    :src="imagePath"
                    height="350px"
                    >
                    </v-card-media>
                    <v-text-field box label="Image's URL" v-model="imagePathBuffer" v-show="isShownPath"></v-text-field>
                    <v-card-title>
                    <div>
                        <span class="headline font-weight-bold">
                            Computer Information
                        </span>
                        <div class="headline">
                            Platform&nbsp;<span class="teal--text"> {{platform}}</span>
                            <br>
                            CPU&nbsp;<span class="teal--text">{{cpu.model}} <span class="title green--text">X</span> {{n}} </span>
                            <br>
                            FreeMemory&nbsp;<span class="teal--text">{{freeMemK}}</span>
                        </div>
                        <div>
                            <v-text-field :loading="isLoading ? 'error' : false" :disabled="$store.state.creator.serverStatus" v-model="port" type="number" outline label="Server Port"></v-text-field>
                        </div>
                        <div>
                          <v-select
                            :items="localeType"
                            v-model="locale"
                            label="Language"
                            @change="switchLocale"
                          ></v-select>
                        </div>
                    </div>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn flat icon color="teal accent-4" @click="toggleServer">
                        <v-icon>{{$store.state.creator.serverStatus ? 'lens' : 'panorama_fish_eye'}}</v-icon>
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { ipcRenderer } from 'electron'
const os = require('os')
export default {
  data () {
    return {
      platform: os.platform(),
      cpu: os.cpus()[0],
      n: os.cpus().length,
      freeMem: os.freemem(),
      port: 9090,
      isLoading: false,
      localeType: [
        'en',
        'ja',
        'ko',
        'zh_CN',
        'zh_TW'
      ],
      locale: 'en',
      isShownPath: false,
      imagePath: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535489298937&di=42889babe658b1c1f5bf1ee9a51f69ab&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2F%25CE%25D2%25D4%25D9%25D2%25B2%25B2%25BB%25CB%25AE%25CC%25FB%25C1%25CB%2Fpic%2Fitem%2F1f26530aca9e1c8a63d98641.jpg`,
      imagePathBuffer: ''
    }
  },
  computed: {
    freeMemK () {
      return `${(this.freeMem / 1024 / 1024 / 1024).toFixed(1)}Gb`
    }
  },
  watch: {
    isShownPath (newVal) {
      if (newVal === false && this.imagePathBuffer !== '') {
        this.imagePath = this.imagePathBuffer
      }
    }
  },
  mounted () {
    setInterval(() => {
      this.freeMem = os.freemem()
    }, 1500)
  },

  methods: {
    toggleServer () {
      switch (this.$store.state.creator.serverStatus) {
        case true:
          new Promise((resolve, reject) => {
            this.isLoading = true
            this.$electron.remote.app.dispatch('switchServer', {
              signal: 'close'
            })
            ipcRenderer.on('switchServer', (e, signal) => {
              resolve(signal)
            })
          }).then(r => {
            if (r === 'closed') {
              this.$store.dispatch('creator/setServer', false)
              ipcRenderer.removeAllListeners('switchServer')
              this.isLoading = false
            }
          })
          break
        case false:
          /* eslint-disable no-new */
          new Promise((resolve, reject) => {
            this.isLoading = true
            ipcRenderer.on('switchServer', (e, signal) => {
              resolve(signal)
            })
            this.$electron.remote.app.dispatch('switchServer', {
              signal: 'open',
              port: this.port
            })
          }).then(r => {
            if (r === 'opened') {
            //   console.log('开启成功')
              this.$store.dispatch('creator/setServer', true)
              ipcRenderer.removeAllListeners('switchServer')
              this.isLoading = false
            }
          })
          break
      }
    },
    switchLocale (val) {
      this.$faker.locale = val
    },
    changeImage () {
      this.isShownPath = !this.isShownPath
    }
  }
}
</script>

<style>

</style>
