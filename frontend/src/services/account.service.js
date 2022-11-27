import axios from 'axios';
const url = import.meta.env.VITE_APP_API_URL;
class AccountService {
    constructor() {
        this.baseUrl = `${url}/api/account`;
        this.baseUr2 = `${url}/api/login`;
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
    async login(payload) {
        return (await this.api.post(this.baseUr2,payload)).data;
    }
    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }
    async create(account) {
        return (await this.api.post(this.baseUrl, account)).data;
    }
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    async update(id, account) {
        return (await this.api.put(`${this.baseUrl}/${id}`, account)).data;
    }
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}
export const accountService = new AccountService();