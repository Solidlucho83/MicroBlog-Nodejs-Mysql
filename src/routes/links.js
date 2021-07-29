//const { request } = require('express');
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth'); // aporto proteccion a las rutas
// mas midleware
const jsonParser = express.json()
//habilito envio en form pero sin imagenes,etc
const urlencodedParser = express.urlencoded({ extended: false })


//conecto con el archivo ./database
const pool = require('../dabatabase');



router.post('/add', isLoggedIn, urlencodedParser , async (req, res) => {
  const { description } = req.body;
  const newLink = {
     description
  }
 await pool.query('INSERT INTO links set ?', [newLink]);  
 req.flash('success', 'Link añadido con exito');
 res.redirect('/links');
});

router.get('/',    async (req, res) => {
  const links = await pool.query('SELECT * FROM links ORDER BY created_at DESC');
  console.log(links)
  // renderiso el archivo list.hbs y le paso el parametro link el cual consumo con Each
  res.render('links/list', {links})
})

router.get('/delete/:id', isLoggedIn,  async (req, res) => {
 const { id} = req.params; 
 await pool.query('DELETE FROM links where ID = ?',[id]);

 req.flash('success', 'Link removido con exito');

 res.redirect('/links');

});

router.get('/edit/:id',  isLoggedIn,  async (req, res) => {

  const {id} = req.params;   
  const links = await pool.query('SELECT * FROM links WHERE id = ?',[id]);

  res.render('links/edit', {links: links[0]});
 });

 router.post('/edit/:id',  isLoggedIn, urlencodedParser ,async (req, res) => {
  const { id } = req.params;
  const { title, description, url} = req.body; 
  const newLink = {
      title,
      description,
      url
  };
  await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
  req.flash('success', 'Link actualizado con exito');
  res.redirect('/links');
});

module.exports = router;