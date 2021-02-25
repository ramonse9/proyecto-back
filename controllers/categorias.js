const BD = require('../database/configOracleDB');

const getCategorias = async (req, res) => {
    
    try{

        const sql =           
        `select * from test_categorias order by ID_CATEGORIA
        `; 
      
        let resultado  = await BD.Open( sql, [ ], true ) ;  
              
        let Categorias = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Categorias
            })
        }
        
        resultado.rows.map( ( categoria ) => {
            
            let categoriaSchema = {
                "ID_CATEGORIA"              : categoria[0],
                "NOMBRE"                    : categoria[1]                
            }         
         
            Categorias.push( categoriaSchema );
        });
        
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