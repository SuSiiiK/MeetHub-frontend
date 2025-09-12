<script>
import { useRouter } from "vue-router";

export default {
  name: "HomePage",
  data() {
    return {
      upcomingConferences: [
        {
          id: 1,
          title: "Цифровая трансформация бизнеса 2024",
          date: "15 декабря 2024",
          time: "10:00 - 18:00",
          speakers: 12,
          participants: 250,
          image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=300&fit=crop",
          category: "Бизнес-технологии",
          location: "Онлайн",
        },
        {
          id: 2,
          title: "Искусственный интеллект в промышленности",
          date: "20 января 2025",
          time: "09:00 - 17:00",
          speakers: 8,
          participants: 180,
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop",
          category: "AI & ML",
          location: "Москва",
        },
        {
          id: 3,
          title: "Кибербезопасность и защита данных",
          date: "5 февраля 2025",
          time: "11:00 - 19:00",
          speakers: 6,
          participants: 120,
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=300&fit=crop",
          category: "Безопасность",
          location: "Онлайн",
        },
      ],
      stats: [
        { number: "500+", label: "Проведенных мероприятий" },
        { number: "10K+", label: "Профессиональных участников" },
        { number: "200+", label: "Экспертных спикеров" },
        { number: "95%", label: "Удовлетворенности клиентов" },
      ],
      features: [
        {
          icon: "🎯",
          title: "Профессиональная организация",
          description:
              "Полный цикл организации мероприятий от планирования до проведения",
        },
        {
          icon: "🔒",
          title: "Корпоративная безопасность",
          description:
              "Enterprise-уровень защиты данных и видеокоммуникаций",
        },
        {
          icon: "📊",
          title: "Детальная аналитика",
          description:
              "Глубокий анализ участия и вовлеченности аудитории",
        },
        {
          icon: "💬",
          title: "Интерактивные сессии",
          description:
              "Q&A, опросы и групповые дискуссии для максимального вовлечения",
        },
      ],
      activeTab: "upcoming",
      searchQuery: "",
      animatedStats: [],
    };
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    joinConference(conferenceId) {
      this.$router.push(`/conference/${conferenceId}`);
    },
    createConference() {
      if(this.isAuthenticated) {
        this.$router.push("/create-conference");
      } else {
        this.$router.push("/login");
      }
    },
    animateCounters() {
      this.animatedStats = this.stats.map((stat) => ({
        ...stat,
        animatedNumber: 0,
      }));

      this.animatedStats.forEach((stat, index) => {
        const target = parseInt(stat.number);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          this.animatedStats[index].animatedNumber = Math.floor(current);
        }, duration / steps);
      });
    },
  },
  mounted() {
    setTimeout(this.animateCounters, 500);
  },
};
</script>


<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Профессиональная платформа для
              <span class="gradient-text">бизнес-конференций</span>
            </h1>
            <p class="hero-description">
              MeetHub предоставляет enterprise-решение для организации и проведения
              корпоративных мероприятий мирового уровня с фокусом на безопасность и качество.
            </p>
            <div class="hero-buttons">
              <button @click="createConference" class="btn btn-primary">
                Организовать мероприятие
                <span class="btn-arrow">→</span>
              </button>
              <button @click="$router.push('/conference-join')" class="btn btn-secondary">
                Найти мероприятия
              </button>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">Enterprise</div>
                <div class="stat-label">Уровень безопасности</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">4K</div>
                <div class="stat-label">Качество видео</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Техническая поддержка</div>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="conference-demo">
              <div class="demo-header">
                <div class="demo-live-indicator"></div>
                <span>LIVE • 247 участников</span>
              </div>
              <div class="demo-content">
                <h4>Стратегическая сессия 2024</h4>
                <p>Обсуждение корпоративных инициатив</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="(stat, index) in animatedStats" :key="index" class="stat-card">
            <div class="stat-number">{{ stat.animatedNumber }}{{ stat.number.includes('%') ? '%' : '+' }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming Conferences -->
    <section class="conferences-section">
      <div class="container">
        <div class="section-header">
          <div class="header-content">
            <h2>Ближайшие мероприятия</h2>
            <p>Профессиональные конференции и бизнес-ивенты</p>
          </div>
          <div class="header-actions">
            <div class="tabs">
              <button
                  @click="activeTab = 'upcoming'"
                  :class="['tab-btn', { active: activeTab === 'upcoming' }]"
              >
                Ближайшие
              </button>
              <button
                  @click="activeTab = 'popular'"
                  :class="['tab-btn', { active: activeTab === 'popular' }]"
              >
                Рекомендуемые
              </button>
            </div>
            <div class="search-box">
              <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Поиск мероприятий..."
                  class="search-input"
              >
              <div class="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="conferences-grid">
          <div
              v-for="conference in upcomingConferences"
              :key="conference.id"
              class="conference-card"
          >
            <div class="card-image">
              <img :src="conference.image" :alt="conference.title">
              <div class="category-badge">{{ conference.category }}</div>
              <div class="location-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                {{ conference.location }}
              </div>
            </div>
            <div class="card-content">
              <h3>{{ conference.title }}</h3>
              <div class="conference-meta">
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>{{ conference.date }}</span>
                </div>
                <div class="meta-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>{{ conference.time }}</span>
                </div>
              </div>
              <div class="conference-stats">
                <div class="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ conference.speakers }} спикеров</span>
                </div>
                <div class="stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ conference.participants }} участников</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button @click="joinConference(conference.id)" class="btn btn-primary">
                Присоединиться
              </button>
              <button class="btn btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M18 8V16M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M6 8C7.65685 8 9 6.65685 9 5C9 3.34315 7.65685 2 6 2C4.34315 2 3 3.34315 3 5C3 6.65685 4.34315 8 6 8Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M6 8V16M6 22C7.65685 22 9 20.6569 9 19C9 17.3431 7.65685 16 6 16C4.34315 16 3 17.3431 3 19C3 20.6569 4.34315 22 6 22Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="view-all-container">
          <button @click="$router.push('/conferences')" class="btn btn-outline">
            Показать все мероприятия
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header center">
          <h2>Корпоративные возможности</h2>
          <p>Комплексное решение для бизнес-коммуникаций</p>
        </div>
        <div class="features-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-icon">
              {{ feature.icon }}
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Готовы к трансформации ваших мероприятий?</h2>
          <p>Присоединяйтесь к ведущим компаниям, выбирающим MeetHub для корпоративных коммуникаций</p>
          <div class="cta-buttons">
            <button @click="createConference" class="btn btn-primary large">
              Начать бесплатный trial
              <span class="btn-arrow">→</span>
            </button>
            <button @click="$router.push('/enterprise')" class="btn btn-secondary large">
              Enterprise-решение
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  color: #ffffff;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #a0aec0;
  max-width: 500px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 60px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
}

.btn-icon {
  padding: 12px;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}

.btn-icon:hover {
  background: #edf2f7;
}

.btn-large {
  padding: 20px 40px;
  font-size: 1.1rem;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn:hover .btn-arrow {
  transform: translateX(4px);
}

.hero-stats {
  display: flex;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.conference-demo {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  width: 300px;
  color: white;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #a0aec0;
}

.demo-live-indicator {
  width: 8px;
  height: 8px;
  background: #48bb78;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.demo-content h4 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: white;
}

.demo-content p {
  font-size: 0.9rem;
  color: #a0aec0;
  line-height: 1.4;
}

/* Stats Section */
.stats-section {
  padding: 80px 0;
  background: #f7fafc;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.stat-card {
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.stat-card .stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 12px;
}

.stat-card .stat-label {
  font-size: 1rem;
  color: #718096;
  line-height: 1.4;
}

/* Conferences Section */
.conferences-section {
  padding: 100px 0;
  background: white;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 60px;
}

.section-header.center {
  text-align: center;
  flex-direction: column;
  gap: 16px;
}

.header-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.header-content p {
  font-size: 1.1rem;
  color: #718096;
}

.header-actions {
  display: flex;
  gap: 24px;
  align-items: center;
}

.tabs {
  display: flex;
  gap: 8px;
  background: #f7fafc;
  padding: 4px;
  border-radius: 12px;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #718096;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: white;
  color: #667eea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-box {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.conferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.conference-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.conference-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #667eea;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.location-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #2d3748;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(10px);
}

.card-content {
  padding: 24px;
}

.card-content h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
  line-height: 1.3;
}

.conference-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #718096;
  font-size: 0.9rem;
}

.conference-stats {
  display: flex;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  color: #718096;
}

.card-actions {
  padding: 20px 24px;
  display: flex;
  gap: 12px;
  border-top: 1px solid #e2e8f0;
}

.view-all-container {
  text-align: center;
}

.features-section {
  padding: 100px 0;
  background: #f7fafc;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.feature-card {
  text-align: center;
  padding: 40px 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 24px;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
}

.feature-card p {
  color: #718096;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: white;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #a0aec0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .section-header {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }

  .header-actions {
    flex-direction: column;
    width: 100%;
  }

  .search-box {
    width: 100%;
  }

  .conferences-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-large {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .tabs {
    width: 100%;
  }

  .tab-btn {
    flex: 1;
    text-align: center;
  }
}
</style>