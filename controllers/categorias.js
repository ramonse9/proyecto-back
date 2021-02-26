//const BD = require('../databaseVarias/configOracleDB');

const pool = require('../database');

const getCategorias = async (req, res) => {
    
    try{

        const sql =           
        `select * from test_categorias order by ID_CATEGORIA
        `; 
      
        //let resultado  = await BD.Open( sql, [ ], true ) ;  
        let resultado = await pool.query( sql );
              
        let Categorias = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Categorias
            })
        }    
         /*
         categorias resultado:  {
            metaData: [ { name: 'ID_CATEGORIA' }, { name: 'NOMBRE' } ],
            rows: [
              [ 1, 'Deportivos' ],
              [ 4, 'Abarrote' ],
              [ 5, 'Joyeria' ],
              [ 6, 'Tecnología' ]
            ]
          }*/

        resultado.map( ( categoria ) => {            
            let categoriaSchema = {
                "ID_CATEGORIA"              : categoria.ID_CATEGORIA,
                "NOMBRE"                    : categoria.NOMBRE  
            }         
            Categorias.push( categoriaSchema );
        });

        /*
        resultado.map( ( RowDataPacket ) => {            
            let categoriaSchema = {
                "ID_CATEGORIA"              : RowDataPacket.ID_CATEGORIA,
                "NOMBRE"                    : RowDataPacket.NOMBRE  
            }         
         
            Categorias.push( categoriaSchema );
        });
        */
        
        res.json({
            ok: true,
            Categorias
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en getCategorias: ${ err }`
        })
    }  
  
}

module.exports = {
    getCategorias    
}