const oracledb = require('oracledb');

const DWSUKA_PBA =
    `(DESCRIPTION=
      (ADDRESS=
        (PROTOCOL=TCP)
        (HOST=192.168.189.228)
        (PORT=1521)
      )
      (CONNECT_DATA=
        (SERVICE_NAME=dwsuka)
      )
    )`;

cns = {
    user          : "DWH_TEST",
    password      : 'TestSuka',
    connectString : DWSUKA_PBA
}

async function Open( sql, binds, autoCommit ){

  //const  pool = await oracledb.createPool( cns );
  //const cnn   = await pool.getConnection();
  
  let cnn = await oracledb.getConnection( cns );
  //const curren_schema = `ALTER SESSION SET current_schema = dwh_suka `;
  //let resultSchema = await cnn.execute( curren_schema );
  let result = await cnn.execute( sql, binds, { autoCommit });

  cnn.release();
  return result;

}

exports.Open = Open;