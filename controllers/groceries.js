const Grocery = require("../models/grocery");

module.exports = {
  create,
  index,
  deleteGrocery
};




async function create(req, res) {
  console.log(req.body, "<-- req.body in groceries controller")
  console.log(req.user, "<-- req.user in groceries controller")

    // Create the POST in the database
    try {
      // adding the information to the db
      const groceryDoc = await Grocery.create({
        user: req.user, // req.user is from the jwt, token the client sent over (config/auth) is where req.user is set from the token
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        expirationDate: req.body.expirationDate,
      })

      // populate the users information
      await groceryDoc.populate('user')
      // respond to the client!
      // status 201, means resource created!
      res.status(201).json({grocery: groceryDoc})

    } catch(err){
      console.log(err, " <- error in create post")
      res.json({error: 'Problem with creating a post, try again'})
    }
  }

async function index(req, res) {
  try {
    const groceries = await Grocery.find({}).populate("user").exec();
    res.status(200).json({ groceries });
  } catch (err) {
    res.json({error: err})
  }
}

async function deleteGrocery(req, res){
    try {
        
        const grocery = await Grocery.findByIdAndDelete(req.params.id);
        
        res.json({data: 'grocery removed'})
    } catch(err){
        res.status(400).json({err})
    }
}
