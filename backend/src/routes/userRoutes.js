const express = require('express');
const Router = express.Router();

const UserController = require('../controllers/userController');
const floor =require('../controllers/floor')


//post-method - used to add data into db
Router.post('/api/add-user', UserController.AddUserData);
//get-method - used to get all the data from db
Router.get('/api/get-users', UserController.GetUserData);
//get-method - used to get single record from db
Router.get("/api/get-single-user/:id", UserController.UserDataById);
//put-method - used to update the records in the db
Router.put("/api/update-user/:id", UserController.UpdateSingleUser);
//delete-method - used to delete the record from db
Router.delete("/api/delete-user/:id", UserController.DeleteUserData);
// software
Router.delete("/api/software/:id", floor.fetchSoftwareData );


Router.get('/api/getfloordata',floor.getData);


Router.get('/api/getfirstdata',floor.firstData);

Router.get('/api/getsecondData',floor.seconddata);

Router.get('/api/getthird',floor.getsecond);

Router.get('/api/getforth',floor.getthird);

Router.get('/api/getfifth',floor.getfourth);

Router.get('/api/getsixth',floor.getfifth);

Router.get('/api/getseventh',floor.getsixth);

Router.get('/api/geteight',floor.geteight);
Router.put('/api/addstudent/:permission', floor.updatePermission);
Router.post('/api/adduser',floor.createUser)
Router.get('/api/getuserdata',floor.GetUserdata);

Router.get("/api/getfirstfloor/:id", floor.getupdatefirstfloor);






// Add form 
Router.post('/api/postflootdata',floor.AddUserData);

Router.post('/api/Addfirstfloor', floor.Addfirstfloor);
Router.post('/api/Addfirst', floor.Addfirst);

Router.post('/api/Addsecond', floor.AddSecond);
Router.post('/api/Addthird', floor.Addthitd);
Router.post('/api/Addforth', floor.Addforth);
Router.post('/api/Addsixth', floor.Addsixth);
Router.post('/api/Addseventh', floor.Addseventh);

Router.post('/api/addform', floor.Addurl);
Router.get('/api/getpermission', floor.getPermissions);
Router.post('/api/addlogin', floor.loginUser);






Router.delete("/api/hardware/:id", floor.deletefloor11 );
Router.delete("/api/hard/:id", floor.deletefloor12 );
Router.delete("/api/hard1/:id", floor.deletefloor21 );
Router.delete("/api/hard2/:id", floor.deletefloor22 );
Router.delete("/api/hard3/:id", floor.deletefloor31 );
Router.delete("/api/hard4/:id", floor.deletefloor21 );
Router.delete("/api/hard5/:id", floor.deletefloor41 );













Router.delete('/api/deleteproduct/:id', floor.deleteProductById);
Router.delete("/api/deleteuser/:id",floor.deleteusers)

Router.get('/api/getsoftware',floor.getsoft );
Router.get('/api/getalldata',floor. fetchDataFromAllCollections);
Router.put('/api/updateuser/:Id', floor.updateUserById);
Router.put('/api/updateproduct/:productId', floor.updateproduct);
Router.put('/api/product/:productId', floor.productdata);
Router.put('/api/thub/:productId', floor.productdatas);
Router.put('/api/thubs/:productId', floor.productdates);
Router.put('/api/thubes/:productId', floor.dates);
Router.put('/api/thubess/:productId', floor.datees);
Router.put('/api/thubesss/:productId', floor.dateess);
Router.put('/api/thubessss/:productId', floor.dateesss);
Router.put('/api/thubesssss/:productId', floor.dateessss);

















module.exports = Router;