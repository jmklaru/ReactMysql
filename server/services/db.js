const mysql = require('mysql2/promise');
const config = require('../config');
const helper = require('../helper');
const crypto = require('node:crypto');

const hash_512 = crypto.createHash('sha512');
const hash_md5 = crypto.createHash('md5');

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

async function generate_password(password,salt='uapro'){
  try
  {
    
    var hash_val=password + salt;
    //var data = hash_512.update(hash_val,'utf-8');
    var gen_hash = hash_512.update(hash_val,'utf-8').digest('hex');// + hash_md5.update(hash_val,'utf-8').digest('hex');
		return gen_hash;
  } catch (err) {
    console.error(err.message);
    //next(err);
  }
  
}

/*
function logs($regno,$log_type,$log_description)
		{

			global $conn;
			if($_SESSION['login_id'] !="" or isset($_SESSION['login_id']))
				$login_id=$_SESSION['login_id'];
			else
				$login_id=$regno;
				
			$date=date("Y-m-d");$log_time=@date('h:s:i a');
			$update_activity="New record inserted";
			$ip=@$_SERVER['REMOTE_ADDR']; //IP Address of remote system
			
				$stmt = $conn->prepare("insert ignore into portal_logstb set regno=?,log_type=?,log_desc=?,log_date=?,log_date_desc=?,log_time=?,entry_by=?,machine_desc=?");
				$stmt->bind_param("ssssssss", $regno, $log_type, $log_description, $date,$date, $log_time, $login_id,$ip);
				if($stmt->execute()){
								$stmt->close();
								return true;
							}
							else	
								return false;
		}// end of logs

*/

module.exports = {
  query,
  dlookup,
  dselect,
  dcount,
  generate_password
}