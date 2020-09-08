// Rutas encargadas de almacenar enlaces

const express = require("express");
const pool = require("../database");
const router = express.Router();

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
  };
  await pool.query("INSERT INTO links set ?", [newLink]);
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  console.log(links);
  res.render("links/list.hbs", { links });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: links[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  const newLink = {
    title,
    description,
    url,
  };

  console.log(newLink);
  await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
  res.redirect("/links");
});

module.exports = router;
