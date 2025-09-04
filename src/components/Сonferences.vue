<template>
  <div class="conference-page">
    <!-- Заголовок -->
    <header class="conference-header">
      <h1>Онлайн-конференция</h1>
      <p>Ваше подключение к встрече</p>
    </header>

    <!-- Видео блок -->
    <div class="conference-body">
      <div class="video-wrapper">
        <video ref="videoRef" autoplay playsinline class="video mirrored"></video>
      </div>

      <!-- Панель управления -->
      <div class="controls">
        <button @click="toggleVideo" :class="['btn', isVideoOn ? 'btn-danger' : 'btn-primary']">
          {{ isVideoOn ? "📷 Выключить камеру" : "📷 Включить камеру" }}
        </button>
        <button @click="toggleAudio" :class="['btn', isAudioOn ? 'btn-danger' : 'btn-primary']">
          {{ isAudioOn ? "🎤 Выключить микрофон" : "🎤 Включить микрофон" }}
        </button>
        <button class="btn btn-outline" @click="$router.push('/')">
          ↩️ Выйти
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stream: null,
      isVideoOn: true,
      isAudioOn: true
    }
  },
  async mounted() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.$refs.videoRef.srcObject = this.stream;
    } catch (err) {
      console.error("Ошибка доступа к камере/микрофону:", err);
    }
  },
  methods: {
    toggleVideo() {
      const videoTrack = this.stream?.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        this.isVideoOn = videoTrack.enabled;
      }
    },
    toggleAudio() {
      const audioTrack = this.stream?.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        this.isAudioOn = audioTrack.enabled;
      }
    }
  }
}
</script>

<style scoped>
.conference-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  padding: 40px 20px;
}

.conference-header {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 40px;
}

.conference-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

.conference-header p {
  font-size: 1.1rem;
  color: #a0aec0;
}

.conference-body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 10px;
  backdrop-filter: blur(8px);
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.video {
  width: 600px;
  max-width: 90vw;
  border-radius: 12px;
}

.mirrored {
  transform: scaleX(-1);
}

.controls {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}

.btn-danger {
  background: #e53e3e;
  color: white;
}

.btn-danger:hover {
  background: #c53030;
}

.btn-outline {
  background: transparent;
  color: #a0aec0;
  border: 2px solid #a0aec0;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
</style>
