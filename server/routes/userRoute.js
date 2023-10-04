const express = require("express")
const userRoute = express.Router()
const jsonData = require("../product_Json/products.json")
const fs = require("fs")



userRoute.get("/product-list" ,(req,res) => {
    try {
        res.status(200).send(jsonData.products)
    } catch (error) {
        console.log(error)
        res.status(400).send({success: false , message: "error on server side"})
    }
})

// userRoute.post("/buy", (req,res) => {
//     try {
//         const path = "./product_Json/purchased_product.json"
//         const jsonData = JSON.stringify(req.body, null, 2);
//         fs.appendFile(path, jsonData, 'utf8', (err) => {
//             if (err) {
//               console.error('Error writing JSON file:', err);
//               return;
//             }
//             console.log('JSON file has been written successfully.');
//           });
//     } catch (error) {
//         console.log(error)
//         res.status(400).send({success: false , message: "error on server side"})
//     }
// })

userRoute.post("/buy", (req, res) => {
    try {
      const newProduct = req.body;
      const path = "./product_Json/purchased_product.json"
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading JSON file:', err);
          res.status(500).send({ success: false, message: 'Error on server side' });
          return;
        }
  
        let products = [];
        if (data) {
          products = JSON.parse(data);
        }
  
        const productExists = products.some((product) => product.id === newProduct.id);
  
        if (!productExists) {
          products.push(newProduct);
          const updatedData = JSON.stringify(products, null, 2);
          fs.writeFile(path, updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
              console.error('Error writing JSON file:', writeErr);
              res.status(500).send({ success: false, message: 'Error on server side' });
              return;
            }
            console.log('JSON file has been updated successfully.');
            res.status(200).send({ success: true, message: 'Product added successfully' });
          });
        } else {
          // Product already exists; you can choose to handle this case as needed.
          res.status(200).send({ success: false, message: 'Product already exists' });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ success: false, message: 'Error on server side' });
    }
  });

module.exports = userRoute