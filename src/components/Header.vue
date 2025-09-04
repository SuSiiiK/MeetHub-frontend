<script>
import axios from "@/service/http-common.js";
import authService from "@/service/authScript.js";

export default {
  data() {
    return {
      user: {
        username: '',
      },
      isAuthenticated: false,
      isMenuOpen: false
    };
  },
  created() {
    this.checkAuthStatus();
    this.handleLogin();
  },

  methods: {
    handleLogin() {
      this.isAuthenticated = true;
      this.user.username = localStorage.getItem("username");
      // Можно также загрузить дополнительные данные пользователя
      this.fetchUser();
    },
    async fetchUser() {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        console.log(token);
        console.log(username);
        if (!token || !username) {
          this.isAuthenticated = false;
          console.log("Нет токена или имени пользователя в localStorage");

          return;
        }

        const response = await axios.get(`/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("✅ Ответ от сервера:", response.data);

        this.user.username = response.data.username;
        this.isAuthenticated = true;
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        this.logout();
      }
    },

    checkAuthStatus() {
      const token = localStorage.getItem("token");
      this.isAuthenticated = !!token;
    },

    logout() {
      authService.logout();
      this.isAuthenticated = false;
      this.user = { username: "", email: "" };
      this.$router.push("/");
    }
  },
  mounted() {
    this.checkAuthStatus();
  }
};
</script>


<template>
  <header class="header">
    <div class="container">
      <!-- Лого -->
      <div class="logo">MeetHub</div>

      <!-- Навигация (десктоп) -->
      <nav class="nav">
        <router-link class="nav-link" to="/">Главная</router-link>
        <a href="/conferences" class="nav-link">Конференции</a>
        <a href="/recordings" class="nav-link">Записи</a>
      </nav>

      <!-- Авторизация -->
      <div class="auth">
        <template v-if="!isAuthenticated">
        <router-link to="/login" class="btn-login">Войти</router-link>
        </template>
        <template v-else>
          <router-link to="/profile" class="nav-btn profile-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="currentColor" stroke-width="2"/>
              <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ user.username }}</span>

          </router-link>
          <div class="user-info" >
            <i class="fas fa-user"></i>
            <button @click="logout" class="logout-button">
              <i class="fas fa-sign-out-alt"></i> Выйти
            </button>
          </div>
        </template>
      </div>

      <!-- Бургер (мобилка) -->
      <button class="burger" @click="isMenuOpen = !isMenuOpen">
        ☰
      </button>
    </div>

    <!-- Мобильное меню -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <a href="/" class="mobile-link">Главная</a>
      <a href="/conferences" class="mobile-link">Конференции</a>
      <a href="/recordings" class="mobile-link">Записи</a>
      <div class="mobile-auth">
        <button v-if="!isAuthenticated" class="btn-login">Войти</button>
        <div v-else class="profile">
          <span class="avatar">👤</span>
          <span class="username">{{ user.username }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Общий стиль */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(90deg, #2563eb, #1d4ed8);
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  z-index: 1000;
}

/* Контейнер */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Лого */
.logo {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

/* Навигация */
.nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: opacity 0.3s;
}

.nav-link:hover {
  opacity: 0.8;
}

/* Авторизация */
.auth {
  display: flex;
  align-items: center;
}

.btn-login {
  background: white;
  color: #2563eb;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

.btn-login:hover {
  background: #f3f4f6;
}

.profile {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.15);
  padding: 6px 12px;
  border-radius: 8px;
}

.avatar {
  margin-right: 6px;
}

.username {
  font-weight: 500;
}

/* Бургер меню (только мобилка) */
.burger {
  display: none;
  font-size: 22px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* Мобильное меню */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: #1d4ed8;
  padding: 12px;
}

.mobile-link {
  color: white;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.mobile-auth {
  margin-top: 12px;
}

/* Адаптив */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  .auth {
    display: none;
  }
  .burger {
    display: block;
  }
  .mobile-menu {
    display: flex;
  }
}
</style>
