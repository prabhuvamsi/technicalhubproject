const firstfloor = require('../../models/firstfloor');
const floorData = require('../../models/product');
const second = require('../../models/second');
const third=require("../../models/secondfloor2")
const forth =require("../../models/secondfloor2.2")
const fifth=require("../../models/thirdfloor3.1")
const sixth=require("../../models/thirdfloor3.2")
const seventh= require("../../models/fourthfloor4.1")
const eight= require("../../models/fourthfloor4.2")
const nine=require("../../models/fourthfloor4.2");
const product = require('../../models/product');

const Software = require('../../models/soft');
const pvrs =require('../../models/permission')
const User=require('../../models/login')



const getData = async (req, res) => {
    try {
        const userdata = await floorData.find();
        console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Define the deleteProductById function
const deleteProductById = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await floorData.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };

//   1.2
const deletefloor11 = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await firstfloor.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };

//   2.1
const deletefloor12 = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await third.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };
//   2.2
const deletefloor21 = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await forth.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };

//   3.1
const deletefloor22 = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await thirdfloor.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };
//   3.2
const deletefloor31 = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await thirdfloor32.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };
//   4.1
const deletefloor32= async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await fourthfloor41.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };
//   4.2
const deletefloor41 = async (req, res, next) => {
    try {
      const _id = req.params.id;
      const deletedProduct = await eight.findByIdAndDelete(_id);
      console.log("Deleted Product:", deletedProduct); // Log the deleted product
      if (deletedProduct) {
        res.status(200).json({ message: "Floor data deleted successfully" });
      } else {
        res.status(404).json({ message: "Floor data not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to delete floor data", error: error.message });
    }
  };
  //delete user
  const deleteusers =async(req,res,next)=>{
    try{
      const _id =req.params.id;
      const deleteuser=await User.findByIdAndDelete(_id);
      console.log("deleted user:",deleteuser);
      if(deleteuser){
        res.status(200).json({message:"user deleted successfully"});
      }else{
        res.status(404).json({message:"user not found"})
      }
    } catch(error){
      res.status(400).json({message:"failed to delete user data",error:error.message})

    }
  }
  // update user
  const updateUserById = async (req, res) => {
    const userId = req.params.Id;
    const { userId: newUserId, password: newPassword } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(userId, { userId: newUserId, password: newPassword }, { new: true });
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  //software 
  const fetchSoftwareData = async (req, res, next) => {
    try {
      // Query the database to fetch all software data
      const softwareData = await Software.find();
      
      // Check if any software data is found
      if (softwareData.length > 0) {
        res.status(200).json(softwareData); // Send software data as JSON response
      } else {
        res.status(404).json({ message: "No software data found" }); // Send 404 if no data found
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch software data", error: error.message }); // Send 500 if error occurs
    }
  };
  








const getsoft = async (req, res) => {
    try {
        const userdatas = await Software.find();
        // console.log(userdatas);
        res.send(userdatas); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};




const firstData = async (req, res) => {
    try {
        const userdata = await firstfloor.find();
        // console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const seconddata= async (req, res) => {
    try {
        const userdata = await second.find();
        // console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getsecond = async (req, res) => {
    try {
        const userdata = await third.find();
        // console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getthird = async (req, res) => {
    try {
        const userdata = await forth.find();
        // console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getfourth = async (req, res) => {
    try {
        const userdata = await fifth.find();
        console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getfifth = async (req, res) => {
    try {
        const userdata = await sixth.find();
        console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getsixth = async (req, res) => {
    try {
        const userdata = await seventh.find();
        console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getseventh = async (req, res) => {
    try {
        const userdata = await eight.find();
        console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const geteight = async (req, res) => {
    try {
        const userdata = await nine.find();
        console.log(userdata);
        res.send(userdata); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// first 1.1
const AddUserData = async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new floorData({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};

  
// 1stfloor1.1
const Addfirstfloor = async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new firstfloor({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};
// firstfloor2.1
const Addfirst = async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new third({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};
// second 2.2

const AddSecond = async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new forth({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};
// second3.1

const Addthitd= async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new thirdfloor({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};
// third 3.2

const Addforth= async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new thirdfloor32({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};
// third4.1

const Addsixth= async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new fourthfloor41({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};
// forth 4.2

const Addseventh= async (req, res, next) => {
    const { id, name, serialNumber, category, attributes } = req.body;

    const user = new fourthfloor42({
        id, name, serialNumber, category, attributes 
    });

    try {
        await user.save();
    } catch (err) {
        return console.log(err);
    }

    return res.status(201).json({ user });
};

const Addurl = async (req, res, next) => {
    const {
        id,
        softwareName,
        alias,
        version,
        serialNumber,
        purchaseDate,
        expirationDate,
        licenseType,
        description
    } = req.body; // Destructure the request body

    try {
        // Create a new instance of the Software model
        const newSoftware = new Software({
            id,
            softwareName,
            alias,
            version,
            serialNumber,
            purchaseDate,
            expirationDate,
            licenseType,
            description
        });

        // Save the new software data to the database
        await newSoftware.save();

        // Respond with the newly created software data
        return res.status(201).json({ software: newSoftware });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server Error' });
    }
};


const fetchDataFromAllCollections = async (req, res) => {
  try {
    const collections = [firstfloor, floorData, Software, second, third, forth, fifth, sixth, seventh, nine];
    
    // Retrieve all unique names present in the collections
    const uniqueNames = new Set();
    await Promise.all(collections.map(async collection => {
      const items = await collection.find({}, { name: 1, _id: 0 });
      items.forEach(item => uniqueNames.add(item.name));
    }));
    
    // Initialize counts for each unique name
    const nameCounts = {};
    uniqueNames.forEach(name => {
      nameCounts[name] = 0;
    });
    
    // Count occurrences of each name across all collections
    await Promise.all(collections.map(async collection => {
      const items = await collection.find({}, { name: 1, _id: 0 });
      items.forEach(item => {
        nameCounts[item.name]++;
      });
    }));

    // Sending the aggregated data with counts for each name
    res.status(200).json(nameCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const updatePermission = async (req, res) => {
  try {
    const { permission } = req.params;
    const { newState } = req.body;

    // Find the existing permission in the database
    const existingPermission = await pvrs.findOne();

    // If the permission exists, update its state
    if (existingPermission) {
      existingPermission[permission] = newState;
      await existingPermission.save();
      return res.status(200).json({ message: 'Permission updated successfully' });
    } else {
      return res.status(404).json({ error: 'Permission not found' });
    }
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get permissions
const getPermissions = async (req, res) => {
  try {
    const permissions = await pvrs.findOne(); // Assuming there's only one document for permissions
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const createUser = async (req, res) => {
  try {
    const { role, userId, password } = req.body;

    // Check if the user already exists
    // const existingUser = await User.findOne({ userId });

    // if (existingUser) {
    //   return res.status(400).json({ error: 'User already exists' });
    // }

    // Create a new user
    const newUser = new User({
      role,
      userId,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
  
// controllers/authController.js

const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If user and password are correct, return success response with user's role
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const GetUserdata = async (req, res) => {
  try {
      const userdata = await User.find();
      console.log(userdata);
      res.send(userdata); 
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};


// update
const getupdatefirstfloor = async (req, res, next) => {
  const _id = req.params.id;
  // Check if _id is a valid ObjectId
  if (!ObjectId.isValid(_id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  try {
    // Query the database using findById
    const softdata = await firstfloor.findById(_id);
    console.log(softdata);
    if (!softdata) {
      console.log('No courses found');
      return res.status(404).json({ message: 'No courses found' });
    }
    return res.status(200).json({ softdata });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error while retrieving course data' });
  }
};



 const updateproduct =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await floorData.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.productdata =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await firstfloor.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.productdatas =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await third.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.productdates =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await forth.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.dates =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await fifth.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.datees =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await sixth.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.dateess =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await seventh.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.dateesss =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await eight.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.dateessss =async (req, res) => {
  const { productId } = req.params;
  const updatedProductData = req.body; // Assuming your frontend sends the updated product data
  
  try {
    // Update the product with the new data
    const updatedProduct = await Software.findByIdAndUpdate(productId, updatedProductData, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Add code here to update the date field
    updatedProduct.editDate = new Date(); // Assuming you have a field called editDate in your schema
    
    // Save the updated product
    await updatedProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the function to use in routes
exports.fetchDataFromAllCollections=fetchDataFromAllCollections
exports.updatePermission=updatePermission
exports.loginUser=loginUser
exports.GetUserdata=GetUserdata
exports.getupdatefirstfloor=getupdatefirstfloor

exports.getData = getData;
exports.deleteProductById=deleteProductById;
exports.AddUserData=AddUserData
exports.getsoft=getsoft
exports.firstData=firstData
exports.seconddata=seconddata
exports.getsecond=getsecond
exports.getthird=getthird
exports.getfourth=getfourth
exports.getfifth=getfifth
exports.getsixth=getsixth
exports.getseventh=getseventh
exports.geteight=geteight
exports.fetchSoftwareData=fetchSoftwareData 
exports.Addfirstfloor=Addfirstfloor
exports.Addfirst=Addfirst
exports.AddSecond=AddSecond
exports.Addthitd=Addthitd
exports.Addforth=Addforth
exports.Addsixth=Addsixth
exports.Addseventh=Addseventh
exports.Addurl=Addurl
exports.deletefloor11=deletefloor11
exports.deletefloor12=deletefloor12
exports.deletefloor21=deletefloor21
exports.deletefloor22=deletefloor22
exports.deletefloor31=deletefloor31
exports.deletefloor32=deletefloor32
exports.deletefloor41=deletefloor41
exports.getPermissions=getPermissions
exports.createUser=createUser
exports.deleteusers=deleteusers
exports.updateUserById=updateUserById
exports.updateproduct=updateproduct
