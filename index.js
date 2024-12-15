const express = require("express");
const pool = require("./connection"); // Pastikan koneksi ke database sudah dikonfigurasi dengan benar
const cors = require("cors");

const app = express();

const port = 3001;

// Menambahkan CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware untuk mem-parsing body request yang berisi JSON
app.use(express.json());

// Endpoint utama
app.get("/", (request, response) => {
  response.send("Welcome to the Restaurant REZA API");
});

// Endpoint untuk mendapatkan semua hidangan
app.get("/dishes", async (request, response) => {
  try {
    // Menggunakan nama kolom yang benar: dish_image
    const data = await pool.query(
      "SELECT dish_name AS name, dish_image AS image, price, chef_name FROM dishes"
    );
    response.json(data.rows); // Mengirimkan data ke frontend
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});


// Endpoint untuk mendapatkan hidangan berdasarkan ID
app.get("/dishes/:id", async (request, response) => {
  try {
    // Menggunakan parameterized query untuk mencegah SQL Injection
    const { id } = request.params;
    const data = await pool.query(
      `SELECT * FROM dishes WHERE id = $1`, [id]
    );

    let dataDish = data.rows[0];

    if (!dataDish) {
      response.status(404).json({ message: "Dish Not Found" });
    } else {
      response.json(dataDish);
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
