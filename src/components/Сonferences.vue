<template>
  <div class="conference-page">
    <header class="conference-header">
      <h1>Онлайн-конференция</h1>
      <p>Подключайтесь и делитесь ссылкой</p>
    </header>

    <div v-if="inviteLink" class="invite-card">
      <p class="invite-label">🔗 Пригласительная ссылка:</p>
      <a :href="inviteLink" target="_blank" class="invite-link">{{ inviteLink }}</a>
      <div class="invite-actions">
        <button class="btn-copy" @click="copyLink">📋 Скопировать</button>
      </div>
    </div>

    <div class="video-wrapper">
      <video ref="videoRef" autoplay playsinline class="video mirrored"></video>
    </div>

    <div class="control-bar">
      <button @click="toggleVideo" :class="['btn-control', isVideoOn ? 'danger' : 'primary']">
        {{ isVideoOn ? "📷 Выкл. камеру" : "📷 Вкл. камеру" }}
      </button>
      <button @click="toggleAudio" :class="['btn-control', isAudioOn ? 'danger' : 'primary']">
        {{ isAudioOn ? "🎤 Выкл. микрофон" : "🎤 Вкл. микрофон" }}
      </button>
      <button class="btn-exit" @click="$router.push('/')">↩️ Выйти</button>
    </div>

    <div v-if="copied" class="toast">✅ Ссылка скопирована!</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stream: null,
      isVideoOn: true,
      isAudioOn: true,
      inviteLink: localStorage.getItem("inviteLink"),
      copied: false
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
    },
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.inviteLink);
        this.copied = true;
        setTimeout(() => (this.copied = false), 2000);
      } catch (err) {
        console.error("Ошибка копирования:", err);
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
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 20px;
  align-items: center;
  justify-content: flex-start;
}

/* Хедер */
.conference-header {
  text-align: center;
  margin-bottom: 20px;
}
.conference-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
}
.conference-header p {
  font-size: 1rem;
  color: #94a3b8;
}

/* Карточка ссылки */
.invite-card {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 14px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}
.invite-label {
  margin-bottom: 10px;
  font-weight: 600;
  color: #cbd5e1;
}
.invite-link {
  display: block;
  color: #60a5fa;
  font-weight: 500;
  margin-bottom: 15px;
  word-break: break-all;
  text-decoration: none;
}
.invite-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.btn-copy, .btn-open {
  background: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
  text-decoration: none;
}
.btn-copy:hover, .btn-open:hover {
  background: #2563eb;
}

/* Видео */
.video-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 8px;
  backdrop-filter: blur(8px);
  margin-bottom: 20px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);
}
.video {
  width: 640px;
  max-width: 90vw;
  border-radius: 12px;
}
.mirrored {
  transform: scaleX(-1);
}

/* Нижняя панель */
.control-bar {
  position: fixed;
  bottom: 20px;
  background: rgba(15, 23, 42, 0.8);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}
.btn-control {
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-control.primary {
  background: #3b82f6;
  color: white;
}
.btn-control.primary:hover {
  background: #2563eb;
}
.btn-control.danger {
  background: #ef4444;
  color: white;
}
.btn-control.danger:hover {
  background: #dc2626;
}
.btn-exit {
  background: transparent;
  border: 2px solid #94a3b8;
  color: #94a3b8;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.3s;
}
.btn-exit:hover {
  background: #475569;
  color: white;
  border-color: #64748b;
}

.toast {
  position: fixed;
  bottom: 80px;
  background: #22c55e;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  animation: fadeInOut 2s ease forwards;
}
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(10px); }
  20% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-10px); }
}
</style>
