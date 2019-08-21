<template>
  <div class="outter">
    <img
      @click="closeMusic"
      class="background-music-button"
      src="../assets/student_music.png"
      alt="music"
    />
    <audio autoplay="autoplay" ref="music">
      <source src="//img.tukuppt.com/newpreview_music/09/00/99/5c89b225eed2d10864.mp3" />
    </audio>
  </div>
</template>

<script>
import Bus from '../bus.js'
export default {
  name: 'StudentBackgroundMusic',
  methods: {
    closeMusic () {
      const audio = this.$refs.music
      if (audio.paused) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  },
  mounted () {
    Bus.$on('restNoMusic', () => {
      const audio = this.$refs.music
      audio.pause()
    })
    Bus.$on('studyHasMusic', () => {
      const audio = this.$refs.music
      audio.play()
    })
  }
}
</script>

<style scoped>
.outter {
  display: inline-block;
  height: 50px;
}

.background-music-button {
  width: 50px;
  height: 50px;
}
</style>
