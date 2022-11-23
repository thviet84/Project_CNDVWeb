const express = require('express'); 
const cors = require('cors');
const employeeController = require('./controllers/employee.controller');
const ApiError = require('./api-error');

const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to application.' });
});

app.route('/api/employee')
    .get(employeeController.findAll) 
    .post(employeeController.create) 
    .delete(employeeController.deleteAll);

// app.route('/api/contacts/favorite').get(contactController.findAllFavorite);


app.route('/api/employee/:id')
    .get(employeeController.findOne) 
    .put(employeeController.update) 
    .delete(employeeController.delete);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found')); 
}); 

app.use((err, req, res) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error', 
    });
});

module.exports = app;