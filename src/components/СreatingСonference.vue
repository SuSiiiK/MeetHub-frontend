<template>
  <div class="join-container">
    <div class="join-background">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="join-card">
      <h1 class="title">Подключение к конференции</h1>

      <div class="form-group">
        <label for="code">Код конференции</label>
        <input
            id="code"
            v-model="joinCode"
            type="text"
            placeholder="Введите код (например: FS30DzGjrhDD2Ipw)"
            class="input-field"
            required
        />
      </div>

      <div class="form-group">
        <label>Доступ</label>
        <div class="radio-group">
          <label>
            <input
                type="radio"
                value="open"
                v-model="accessType"
            /> Открытая
          </label>
          <label>
            <input
                type="radio"
                value="private"
                v-model="accessType"
            /> Закрытая
          </label>
        </div>
      </div>

      <div v-if="accessType === 'private'" class="form-group">
        <label for="password">Пароль конференции</label>
        <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Введите пароль"
            class="input-field"
            required
        />
      </div>

      <button class="btn-join" @click="joinConference">
        🚀 Присоединиться
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joinCode: this.$route.params.code || "",
      accessType: "open",
      password: ""
    };
  },
  methods: {
    joinConference() {
      if (!this.joinCode) {
        alert("Введите код конференции!");
        return;
      }
      if (this.accessType === "private" && !this.password) {
        alert("Введите пароль для закрытой конференции!");
        return;
      }
      this.$router.push(`/conference-room/${this.joinCode}`);
    }
  }
};
</script>

<style scoped>
.join-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.join-background {
  position: absolute;
  inset: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: -100px;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 70%;
}

.join-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #2d3748;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2d3748;
  font-size: 14px;
}

.input-field {
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.input-field:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.radio-group {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #4a5568;
}

.btn-join {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.btn-join:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}
</style>
