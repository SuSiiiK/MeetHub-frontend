import api from './http-common';

export default {
    async login(username, password) {
        try {
            const response = await api.post('/login', { username, password });
            const token = response.data.token;

            const decodedToken = this.decodeToken(token);
            const expTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            if (currentTime > expTime) {
                console.error("Токен истек. Пожалуйста, войдите снова.");
                this.logout();
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            return token;
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    },

    decodeToken(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
};
