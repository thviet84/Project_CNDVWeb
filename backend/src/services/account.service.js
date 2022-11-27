const knex = require('../database/knex');

class AccountService {
    constructor(){
        this.accounts = knex('admin');
    }
    #getAccount(payload) {
        const account = { ...payload };
        const accountProperties = ['name', 'email', 'pass'];

        Object.keys(account).forEach(function (key) {
            if (accountProperties.indexOf(key) == -1) {
                delete account[key];
            }
        });
        return account;
    }

    async login(email, pass) {
        return await this.accounts.where({ email: email, pass: pass }).select('*').first();
    }

    async create(payload) {
        const account = this.#getAccount(payload);
        const [id] = await this.accounts.insert(account);
        return { id, ...account };
    }

    async all() {
        return await this.accounts.select('*');
    }

    async findByName(name) {
        return await this.accounts.where('name', 'like', `%${name}%`).select('*');
    }

    async findByEmail(email) {
        return await this.accounts.where('email', email).select('*').first();
    }

    async findById(id) {
        return await this.accounts.where('id', id).select('*').first();
    }

    async update(id, payload) {
        const update = this.#getAccount(payload);
        return await this.accounts.where('id', id).update(update);
    }

    async delete(id) {
        return await this.accounts.where('id', id).del();
    }

    async deleteAll() {
        return await this.accounts.del();
    }
}

module.exports = AccountService;

  