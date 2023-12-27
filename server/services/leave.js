const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM hr_leavetb LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(leave)
{
    const result = await db.query(
      `INSERT INTO hr_leavetb 
      (leave_type, no_of_days, category,entry_date, entry_time,entry_by) 
      VALUES 
      ('${leave.leave_type}', '${leave.no_of_days}', '${leave.category}', '${leave.entry_date}', '${leave.entry_time}', '${leave.entry_by}')`
      
      
    );
  
    let message = 'Error in creating programming language';
  
    if (result.affectedRows) {
      message = 'Leave created successfully';
    }
  
    return {message};
}


async function update1(id, leave){
  const result = await db.query(
    `UPDATE hr_leavetb SET  
      leave_type = '${leave.leave_type}', 
      no_of_days = '${leave.no_of_days}', 
      category = '${leave.category}',
      entry_date = '${leave.entry_date}', 
      entry_time = '${leave.entry_time}',
      entry_by = '${leave.entry_by}' 
      WHERE id = '${id}'
      `
  );

  let message = 'Error in updating Leave Record';

  if (result.affectedRows) {
    message = 'Leave record updated successfully';
  }

  return {message};
}

async function update(id, leave){
  const result = await db.query(
    `UPDATE hr_leavetb SET  
      leave_type =?, 
      no_of_days =?, 
      category =?,
      entry_date =?, 
      entry_time =?,
      entry_by =?
      WHERE id =?
      `,
      [
        leave.leave_type,
        leave.no_of_days,
        leave.category,
        leave.entry_date,
        leave.entry_time,
        leave.entry_by,
        id
      ]  
  );

  let message = 'Error in updating Leave Record';

  if (result.affectedRows) {
    message = 'Leave record updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM hr_leavetb WHERE id =?`,
    [id]
  );

  let message = 'Error in deleting Leave Record';

  if (result.affectedRows) {
    message = 'Leave record deleted successfully';
  }

  return {message};
}

async function get_no_of_days(leave_type)
{
  const result = db.dlookup("no_of_days","hr_leavetb","leave_type=?",[leave_type]);
  const data = helper.emptyOrRows(result);
  return data;
}

async function get_leave_count(leave_type)
{
  const result = db.dcount("*","hr_leavetb","leave_type=?",[leave_type]);
  const data = helper.emptyOrRows(result);
  return data;
}


module.exports = {
  getMultiple,
  create,
  update,
  remove,
  get_no_of_days
  
}