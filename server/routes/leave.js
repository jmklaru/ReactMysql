const express = require('express');
const router = express.Router();
const db = require('../services/db');
const leave = require('../services/leave');

const service_code = 's01';
/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    //console.log(req.user.role);
    //const roles = req.user.role.find(u => u.role === 'role_04');

    //const services = req.user.role.find(u => u.service_code === service);
   // if (req.user && req.user.role === role) {
    //console.log({service:services});
    const permissionServiceRole = db.get_permissionServiceRole(req.user.username,service_code,'read');
    if(permissionServiceRole.length > 0)
      res.status(200).json(await leave.getMultiple(req.query.page));
    else
      res.status(403).json({message:'Unauthorized role access'});
  } catch (err) {
    console.error(`Error while getting leave records `, err.message);
    next(err);
  }
});


/* POST programming language */
router.post('/', async function(req, res, next) {
    try {
          const permissionServiceRole = db.get_permissionServiceRole(req.user.username,service_code,'create');
            if(permissionServiceRole.length > 0)
                res.status(201).json(await leave.create(req.body));
            else
                res.status(403).json({message:'Unauthorized role access'});
      
    } catch (err) {
      console.error(`Error while creating leave record`, err.message);
      next(err);
    }
});

  /* POST programming language */
router.put('/:id', async function(req, res, next) {
  try {
        const permissionServiceRole = db.get_permissionServiceRole(req.user.username,service_code,'update');
        if(permissionServiceRole.length > 0)
            res.status(200).json(await leave.update(req.params.id, req.body));
        else
            res.status(403).json({message:'Unauthorized role access'});
  } catch (err) {
    console.error(`Error while creating leave record`, err.message);
    next(err);
  }
});

/* Delete leave */
router.delete('/:id', async function(req, res, next) {
  try {
    //console.log(req.body);
        const permissionServiceRole = db.get_permissionServiceRole(req.user.username,service_code,'delete');
        if(permissionServiceRole.length > 0)
            res.status(200).json(await leave.remove(req.params.id));
        else
            res.status(403).json({message:'Unauthorized role access'});
  } catch (err) {
    console.error(`Error while deleting leave record`, err.message);
    next(err);
  }
});

/* Delete leave */

router.get('/:leave_type', async function(req, res, next) {
  try {
          const permissionServiceRole = db.get_permissionServiceRole(req.user.username,service_code,'read');
            if(permissionServiceRole.length > 0)
            {
              const { leave_type } = req.params;    //console.log(req.body);
              res.status(200).json(await leave.get_no_of_days(leave_type));
            }
            else
            res.status(403).json({message:'Unauthorized role access'});
    
    
  } catch (err) {
    console.error(`Error while retrieving number of leave days`, err.message);
    next(err);
  }
});

module.exports = router;
