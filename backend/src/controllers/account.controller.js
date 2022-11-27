const AccountService = require('../services/account.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }

    try {
        const accountService = new AccountService();
        const account = await accountService.create(req.body);
        res.send({ message: 'Create successfull', ...account });
    } catch (error) {
        res.send({ message: 'Email already exist'});
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the admin'));
    }
};

exports.findAll = async (req, res, next) => {
    let accounts = [];

    try {
        const accountService = new AccountService();
        const { name } = req.query;
        if (name) {
            accounts = await accountService.findByName(name);
        } else {
            accounts = await accountService.all();
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while retrieving admins'));
    }

    return res.send(accounts);
};
exports.login = async (req, res, next) => {
    try {
        const accountService = new AccountService();
        const account = await accountService.login(req.body.email, req.body.pass);
        var data = { isValid: false  }
        var data2 = { isValid: true, acc:  account }
        if (account == undefined) 
            return res.send(data);
        else
            return res.send(data2);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while login'));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const accountService = new AccountService();
        const account = await accountService.findById(req.params.id);
        if (!account) {
            return res.send({ message: 'Retrieve fail'});
        }
        return res.send({message: 'Retrieve success', ...account});
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving admin with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const accountService = new AccountService();
        const updated = await accountService.update(req.params.id, req.body);
        if (!updated) {
            return res.send({ message: 'Admin was not found' });
        }
        return res.send({ message: 'Update success' });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating admin with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const accountService = new AccountService();
        const deleted = await accountService.delete(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'Admin not found'));
        }
        return res.send({ message: 'Admin was deleted successfully' });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete admin with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const accountService = new AccountService();
        const deleted = await accountService.deleteAll();
        return res.send({
            message: `${deleted} Admins deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while removing all admins'));
    }
}