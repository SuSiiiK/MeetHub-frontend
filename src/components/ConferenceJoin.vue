<template>
  <div class="join-page">
    <div class="join-card">
      <h1 class="title">Подключение к конференции</h1>

      <div class="form-group">
        <label for="code">Введите код конференции</label>
        <input
            id="code"
            v-model="joinCode"
            type="text"
            placeholder="Например: FS30DzGjrhDD2Ipw"
            class="input-field"
        />
      </div>

      <div class="form-group">
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

      <div v-if="accessType === 'private'" class="form-group">
        <label for="password">Введите пароль</label>
        <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Пароль конференции"
            class="input-field"
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
      joinCode: this.$route.params.code || "", // если кода нет в URL — пустое поле
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

      // здесь можно дернуть бэкенд для валидации пароля/кода
      this.$router.push(`/conference-room/${this.joinCode}`);
    }
  }
};
</script>

<style scoped>
.join-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.join-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #2d3748;
}

.subtitle {
  font-size: 14px;
  margin-bottom: 20px;
  color: #4a5568;
}

.code {
  display: inline-block;
  background: #edf2f7;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: bold;
  color: #2d3748;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
  font-size: 14px;
  color: #2d3748;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-top: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.input-field:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
  outline: none;
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
