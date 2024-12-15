// file ini untuk melakukan setup table ke dalam database
const pool = require("./connection");

let createTableMovies = `
  CREATE TABLE Movies (
  "id" SERIAL PRIMARY KEY, 
  "title" VARCHAR(50),
  "releaseYear" INTEGER,
  "imageUrl" TEXT, 
  "genre" VARCHAR(10)
);
`;

// koneksi ke database => asynchronous

async function runSetup() {
  try {
    await pool.query(createTableMovies);
    console.log("Success setup table movies");
  } catch (error) {
    console.log(error);
  }
}

runSetup();
