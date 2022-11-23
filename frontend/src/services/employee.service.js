import axios from 'axios';
const url = import.meta.env.VITE_APP_API_URL;
class EmployeeService {
    constructor() {
        this.baseUrl = `${url}/api/employee`;
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }
    async create(employee) {
        return (await this.api.post(this.baseUrl, employee)).data;
    }
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    async update(id, employee) {
        return (await this.api.put(`${this.baseUrl}/${id}`, employee)).data;
    }
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}
export const employeeService = new EmployeeService();