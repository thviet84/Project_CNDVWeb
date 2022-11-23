const knex = require('../database/knex');

class EmployeeService {
    constructor(){
        this.employees = knex('employees');
    }
    //Define
    
    #getEmployee ( payload ) {
        const employee = { ... payload } ;
        const employeeProperties = [
            "name" , "email" , "address" , "phone" , "role"
        ] ;
        // Remove non - employee properties
        Object.keys ( employee ) .forEach ( function (key) {
            if ( employeeProperties.indexOf (key) == -1 ) {
                delete employee[ key ] ;
            }
        });
        return employee ;
    }
    async create ( payload ) {
        const employee = this.#getEmployee(payload) ;
        const [id] = await this.employees.insert(employee);          
        return { id , ... employee } ;            
    }
    async all(){
        return await this.employees.select ('*');
    }
    async findByName(name)  {
        return await this.employees
            .where ('name' , 'like' , `%${name}%`) 
            .select ('*') ;
    }
    async findById(id) {
        return await this.employees.where('id' ,id).select('*').first();
    }
    async update(id, payload) {
        const update = this.#getEmployee(payload);
        return await this.employees.where('id', id).update(update); 
    }
    async delete(id) {
        return await this.employees.where('id', id).del();
    }
    // async allFavorite() {
    //     return await this.employees.where('favorite', 1).select('*');
    // }
    async deleteAll() {
        return await this.employees.del();
    }
}

module.exports = EmployeeService;