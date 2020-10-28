const router = require("express").Router();
const productCtrl = require("../Controller/product");

router.get("/", (req, res) => {
  res.send("MyLawLegal Assignment");
});

router.get("/products", productCtrl.allProducts);
router.post("/products", productCtrl.addProduct);
router.put("/products/:id", productCtrl.editProduct);
router.delete("/products/:id", productCtrl.deleteProduct);

module.exports = router;
