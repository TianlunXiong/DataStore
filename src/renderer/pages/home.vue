<template>
    <v-container fluid fill-height>
        <v-layout justify-center >
            <v-flex xs12 md10 lg9>
                <v-card >
                    <v-card-media
                    src="https://asset.msi.com/global/picture/wallpaper/nb-20170619-6.jpg"
                    height="300px"
                    >
                    </v-card-media>
                        <v-card-title>
                        <div>
                            <span class="display-1 font-weight-bold">
                                Computer Information
                            </span>
                            <div class="headline">
                                Platform&nbsp;<span class="lime--text"> {{platform}}</span>
                                <br>
                                CPU&nbsp;<span class="lime--text">{{cpu.model}} <span class="title orange--text">X</span> {{n}} </span>
                                <br>
                                FreeMemory&nbsp;<span class="lime--text">{{freeMemK}}</span>
                            </div>
                            <div>
                                <v-text-field :loading="isLoading ? 'error' : false" :disabled="isOpen" v-model="port" type="number" outline label="Server Port"></v-text-field>
                            </div>
                        </div>
                        </v-card-title>

                    <v-card-actions>
                    <v-btn flat icon color="lime" @click="toggleServer">
                        <v-icon>{{isOpen ? 'lens' : 'adjust'}}</v-icon>
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
      isOpen: false,
      port: 9090,
      isLoading: false
    }
  },
  computed: {
    freeMemK () {
      return `${(this.freeMem / 1024 / 1024 / 1024).toFixed(1)}Gb`
    }
  },

  mounted () {
    setInterval(() => {
      this.freeMem = os.freemem()
    }, 1500)
  },

  methods: {
    toggleServer () {
      switch (this.isOpen) {
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
              console.log('关闭成功')
              this.isOpen = false
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
              this.isOpen = true
              ipcRenderer.removeAllListeners('switchServer')
              this.isLoading = false
            }
          })
          break
      }
    }
  }
}
</script>

<style>

</style>
