const express = require("express");
const { products } = require("./data");
const peopleRouter = require("./routes/people.js");

const app = express();

app.use(express.static("./methods-public"));

// logger
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
  next();
};

app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/people", peopleRouter);

// Test route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// All the products route
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// app.get("/api/v1/people", (req, res) => {
//   res.json(people);
// });

// Path to single product
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID, 10);

  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

// Querying
app.get("/api/v1/query", (req, res) => {
  const { search, limit, minPrice, maxPrice } = req.query;

  let filteredProducts = [...products];

  // Starting letter filter
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }

  // Min price filtering
  if (minPrice) {
    const min = Number(minPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min
    );
  }
  // Max price filtering
  if (maxPrice) {
    const max = Number(maxPrice);
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= max
    );
  }
  // Setting limit
  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

  // Return filtered list
  res.json(filteredProducts);
});

// app.post("/api/v1/people", (req, res) => {
//   if (!req.body.name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide a name" });
//   }

//   people.push({ id: people.length + 1, name: req.body.name });
//   res.status(201).json({ success: true, name: req.body.name });
// });

// Handling 404
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Starting server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
