const mysql = require('mysql2/promise');
const config = require('../config');
const helper = require('../helper');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);

  // Connect to the MySQL Server
  const [results, ] = await connection.execute(sql, params);
  return results;
}


async function dlookup(field,table,criteria,params){
  try
  {
    var sql=`SELECT ${field} FROM ${table}`;
    if(criteria !== '')
      sql += ` WHERE ${criteria}`;
    const rows = await query(sql,params);
    const data = helper.emptyOrRows(rows);
    if(data.length > 0)
      return data[0][field];
    else
      return null;
  } catch (err) {
    console.error(err.message);
    //next(err);
  }
  
}

async function dcount(field,table,criteria,params){
  try
  {
    var sql=`SELECT COUNT(${field}) as total_count FROM ${table}`;
    if(criteria !== '')
      sql += ` WHERE ${criteria}`;
    const rows = await query(sql,params);
    const data = helper.emptyOrRows(rows);
    if(data.length > 0)
      return data[0].total_count;
    else
      return 0;
  } catch (err) {
    console.error(err.message);
    //next(err);
  }
  
}


async function dselect(fieldList,table,criteria,params){
  try
  {
    var sql=`SELECT ${fieldList} FROM ${table}`;
    if(criteria !== '')
      sql += ` WHERE ${criteria}`;
    const rows = await query(sql,params);
    const data = helper.emptyOrRows(rows);
    if(data.length > 0)
      return data;
    else
      return [];
  } catch (err) {
    console.error(err.message);
    //next(err);
  }
  
}

module.exports = {
  query,
  dlookup,
  dselect,
  dcount
}