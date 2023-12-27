const express = require('express');
const router = express.Router();
const leave = require('../services/leave');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await leave.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting leave records `, err.message);
    next(err);
  }
});


/* POST programming language */
router.post('/', async function(req, res, next) {
    try {
      res.json(await leave.create(req.body));
    } catch (err) {
      console.error(`Error while creating leave record`, err.message);
      next(err);
    }
  });

  /* POST programming language */
router.put('/:id', async function(req, res, next) {
  try {
    //console.log(req.body);
    res.json(await leave.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while creating leave record`, err.message);
    next(err);
  }
});

/* Delete leave */
router.delete('/:id', async function(req, res, next) {
  try {
    //console.log(req.body);
    res.json(await leave.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting leave record`, err.message);
    next(err);
  }
});

/* Delete leave */

router.get('/:leave_type', async function(req, res, next) {
  try {
    const { leave_type } = req.params;    //console.log(req.body);
    res.json(await leave.get_no_of_days(leave_type));
    
  } catch (err) {
    console.error(`Error while retrieving number of leave days`, err.message);
    next(err);
  }
});

module.exports = router;
