const EmployeeService  = require('../services/employee.service');
const ApiError = require('../api-error');

exports.create = async( req , res , next ) => {
    if ( !req.body?.name ) {
         return next ( new ApiError ( 400 , 'Name can not be empty'));
    }
    try {
         const employeeService = new EmployeeService();
         const employee = await employeeService.create ( req.body );
         return res.send (employee) ;
    } catch ( error ) {
         console.log ( error ) ;
         return next (
             new ApiError ( 500 , 'An error occurred while creating the employee')
        );
    }
};

// Retrieve all employees of a user from the database
exports.findAll = async(req , res , next) => {
    let employees = [ ];
    try {
         const employeeService = new EmployeeService();
         const { name } = req.query ;
         if ( name ) {
              employees = await employeeService.findByName (name);
         } else {
              employees = await employeeService.all();
         }
    } catch (error) {
         console.log (error) ;
         return next (
              new ApiError ( 500 , 'An error occurred while retrieving employees')
         );
    }
    return res.send ( employees ) ;
};

exports.findOne = async ( req , res , next ) => {
    try {
        const employeeService = new EmployeeService();
        const employee = await employeeService.findById(req.params.id);
        if (!employee) {                  
            return next(new ApiError ( 404 , 'employee not found'));
        }
        return res.send ( employee ) ;
    } catch ( error ) {
        console.log (error);
        return next(
            new ApiError(
                500,
                `Error retrieving employee with id=${req.params.id}`
            )
        );
    }
};

exports.update = async ( req , res , next ) => {
    if ( Object.keys (req.body).length == 0 ) {
        return next ( new ApiError ( 400 , ' Data to update can not be empty ' )) ;
   }
   try {
        const employeeService = new EmployeeService () ;
        const updated = await employeeService.update ( req.params.id , req.body ) ;
        if ( ! updated ) {
            return next ( new ApiError ( 404 , 'employee not found'));
       }
        return res.send ( { message : 'employee was updated successfully' }) ;
   } catch (error) {
        console.log (error) ;
        return next (
            new ApiError ( 500 , `Error updating employee with id=${req.params.id}`)
        );
    }
};

exports.delete = async ( req , res , next ) => {
    try {
        const employeeService = new EmployeeService ();
        const deleted = await employeeService.delete ( req.params.id ) ;
        if ( ! deleted ) {
            return next ( new ApiError ( 404 , ' employee not found ' ) ) ;
        }
        return res.send ( { message : ' employee was deleted successfully ' } ) ;
    } catch ( error ) {
        console.log ( error ) ;
        return next (
           new ApiError (
                500 ,
                `Could not delete employee with id = ${req.params.id}`
           )
        );
    }
};

// exports.findAllFavorite = async ( req , res , next ) => {
//     try {
//         const contactService = new ContactService(); 
//         const contacts = await contactService.allFavorite();
//         return res.send (contacts) ;
//     } catch ( error ) {
//         console.log ( error ) ;
//         return next (                           
//              new ApiError (
//                  500 ,
//                  ' An error occurred while retrieving favorite contacts '
//              )
//         );
//     }
// };

exports.deleteAll = async ( req , res , next ) => {
    try {
        const employeeService = new EmployeeService();
        const deleted = await employeeService.deleteAll() ;
        return res.send ({
            message : ` ${deleted} employees were deleted successfully`,
        });
    } catch ( error ) {
        console.log ( error ) ;
        return next (
            new ApiError ( 500 , 'An error occurred while removing all employees')
        );
    }
};

