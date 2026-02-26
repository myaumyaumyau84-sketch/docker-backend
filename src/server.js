const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   port: 5432,
});

app.get("/", async (req, res) =>  {
  try {
	const result = await pool.query("SELECT NOW()");
	res.json({
	  message: "🔥 Docker Backend Alive" ,
	  time: result.rows[0].now,
    });
  } catch (err)  {
    res.status(500),json({ error: err.message });
  }
});

app.listen(3000, "0.0.0.0", () => {
   console.log("Server running on port 3000")
});
