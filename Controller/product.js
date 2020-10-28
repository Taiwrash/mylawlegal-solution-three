const Produce = require("../models/product");

// Retrieve all Products
exports.allProducts = (req, res) => {
  Produce.find({}, (err, allProduce) => {
    if (err) {
      console.log(err);
    } else {
      console.log("here---", allProduce);
      res.json(allProduce);
    }
  });
};

// Add Products
exports.addProduct = (req, res) => {
  const newProduce = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
  };
  Produce.create(newProduce, (err, newlyCreatedProduce) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ newlyCreatedProduce, message: "Your Produce has been added" });
    }
  });
};

// Edit / Update Products
exports.editProduct = (req, res) => {
  Produce.findByIdAndUpdate(req.params.id, req.body, (err, updatedProduce) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body);
      res.json(updatedProduce);
      console.log(updatedProduce);
    }
  });
};

// Delete Products
exports.deleteProduct = (req, res) => {
  Produce.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Deleted");
    }
  });
};
