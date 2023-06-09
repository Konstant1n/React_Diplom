import axios from 'axios';
import store from '../store';

const API_URL = 'http://52.3.249.107:9000';

class HipsatgramApi {
    constructor(){
        this.API_URL = API_URL;
        this.api = axios.create({
            baseURL: API_URL,
        });

        this.api.interceptors.request.use(config => {
            config.headers.Authorization = store.getState().user.token;

            if(config.method === 'post' && config.url === '/posts') {
                delete config.headers['Content-Type'];
            } else {
                config.headers['Content-Type'] = 'application/json';
            }

            return config;
        });
    }

    async login(data) {
        const response = await this.api.post('/auth/login', data);
        return response.data;
    }

    async registration(data) {
        const response = await this.api.post('/auth/registration', data);
        return response.data;
    }

    async currentUser() {
        const response = await this.api.get('/users/current');
        return response.data;
    }

    async getUsers(userLogin = '') {
        const response = await this.api.get('/users?search=' + userLogin);
        return response.data;
    }

    async getUserById(userId) {
        const response = await this.api.get('/users/'+userId);
        return response.data;
    }

    async createPost(data) {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('image', data.image);

        const response = await this.api.post('/posts', formData);
        return response.data;
    }

    async getPostById(postId) {
        const response = await this.api.get('/posts/'+postId);
        return response.data;
    }

    async updateCurrentUser(data) {
        const response = await this.api.patch('/users/current', data);
        return response.data;
    }

    async handleChangeFollow(userId) {
        const response = await this.api.get('/users/follow/'+userId._id);
        return response.data;
    }
    async handleLike(post) {
        const response = await this.api.get('/posts/like/'+post._id);
        return response.data;
    }

    async getFeed() {
        const response = await this.api.get('/posts/feed');
        return response.data;
    }

    async getComments(post) {
        const response = await this.api.get('/comments/' + post._id);
        return response.data;
    }

    async createComment(data) {
        const response = await this.api.post('/comments', data);
        return response.data;
    }

    async deleteComment(id) {
        const response = await this.api.delete('/comments/' + id);
        return response.data;
    }
    
    async editComment(id, text) {
        const response = await this.api.patch('/comments/'+ id, text);
        return response.data;
    }

    async getFollowers(user) {
        const response = await this.api.patch('/users/followersAndFollowing/'+ user._id);
        return response.data;
    }
    
}
// eslint-disable-next-line
export default new HipsatgramApi();