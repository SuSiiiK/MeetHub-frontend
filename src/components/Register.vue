<script>
import axios from '/src/service/http-common.js'

export default {
  name: 'Register',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      },
      isLoading: false,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async handleRegister() {
      if (!this.formData.username ||
          !this.formData.email || !this.formData.password) {
        this.errorMessage = 'Пожалуйста, заполните все обязательные поля'
        return
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают'
        return
      }

      if (!this.formData.agreeToTerms) {
        this.errorMessage = 'Необходимо принять условия использования'
        return
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        const response = await axios.post('/save-user', {
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password
        })
        console.log('Текущий токен:', localStorage.getItem('token'))

        if(response.status !== 201) {
          throw new Error('Ошибка при регистрации')
        }

        console.log('Registration success:', response.data)

        this.successMessage = 'Регистрация успешна! Перенаправление...'

        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        this.errorMessage = 'Ошибка регистрации. Попробуйте еще раз.'
      } finally {
        this.isLoading = false
      }
    },

    handleLoginRedirect() {
      this.$router.push('/login')
    }
  }
}
</script>


<template>
  <div class="auth-container">
    <div class="auth-background">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>

    <div class="auth-card">
      <div class="auth-header">
        <div class="logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="2"/>
            <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <h1>MeetHub</h1>
        </div>
        <p class="welcome-text">Создайте свой аккаунт</p>
      </div>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="name-fields">
          <div class="form-group">
            <label for="firstName">Логин <span class="required">*</span></label>
            <input
                id="firstName"
                v-model="formData.username"
                type="text"
                placeholder="Введите ваш логин"
                required
                class="input-field"
                :class="{ 'error': errorMessage }"
            >
            <span class="input-icon">👤</span>
          </div>

        </div>

        <div class="form-group">
          <label for="email">Email адрес <span class="required">*</span></label>
          <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Введите ваш email"
              required
              class="input-field"
              :class="{ 'error': errorMessage }"
          >
          <span class="input-icon">📧</span>
        </div>

        <div class="form-group">
          <label for="password">Пароль <span class="required">*</span></label>
          <input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="Создайте пароль"
              required
              class="input-field"
              :class="{ 'error': errorMessage }"
          >
          <span class="input-icon">🔒</span>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Подтверждение пароля <span class="required">*</span></label>
          <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              required
              class="input-field"
              :class="{ 'error': errorMessage }"
          >
          <span class="input-icon">✅</span>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div class="form-options">
          <label class="checkbox-container">
            <input type="checkbox" v-model="formData.agreeToTerms">
            <span class="checkmark"></span>
            Я принимаю <a href="/terms" class="terms-link">условия использования</a> и <a href="/privacy" class="terms-link">политику конфиденциальности</a>
          </label>
        </div>

        <button
            type="submit"
            class="register-button"
            :disabled="isLoading"
            :class="{ 'loading': isLoading }"
        >
          <span v-if="!isLoading">Создать аккаунт</span>
          <div v-else class="spinner"></div>
        </button>
      </form>

      <div class="auth-footer">
        <p>Уже есть аккаунт? <button @click="handleLoginRedirect" class="login-link">Войти</button></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 120px;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: -100px;
  animation-delay: 2s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 20%;
  left: 80%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 30%;
  left: 10%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.logo svg {
  color: #667eea;
}

.logo h1 {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.welcome-text {
  color: #718096;
  font-size: 16px;
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.name-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-group {
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2d3748;
  font-size: 14px;
}

.required {
  color: #e53e3e;
}

.input-field {
  width: 100%;
  padding: 16px 48px 16px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-field.error {
  border-color: #e53e3e;
}

.input-icon {
  position: absolute;
  right: 16px;
  top: 56px;
  transform: translateY(-50%);
  font-size: 18px;
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.success-message {
  background: #c6f6d5;
  color: #2f855a;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.form-options {
  margin-top: 10px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  color: #4a5568;
  font-size: 14px;
  line-height: 1.4;
}

.checkbox-container input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-container input:checked + .checkmark {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-container input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.terms-link {
  color: #667eea;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.register-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 50px;
  margin-top: 10px;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.register-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-button.loading {
  background: #cbd5e0;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.auth-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 14px;
}

.login-link {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
}

.login-link:hover {
  color: #5a67d8;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 30px 20px;
    margin: 10px;
  }

  .name-fields {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .checkbox-container {
    align-items: flex-start;
  }

  .checkmark {
    margin-top: 3px;
  }
}

@media (max-width: 768px) {
  .auth-container {
    padding: 15px;
  }

  .auth-card {
    padding: 30px 25px;
  }
}
</style>