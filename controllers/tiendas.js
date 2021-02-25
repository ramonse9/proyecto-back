const BD = require('../database/configOracleDB');

const getTiendas = async (req, res) => {

    console.log( 'getTienda: ' );
    
    try{

        const sql =           
        `select * from test_tiendas order by ID_TIENDA
        `; 
      
        let resultado  = await BD.Open( sql, [ ], true ) ;  
              
        let Tiendas = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Tiendas
            })
        }
        
        resultado.rows.map( ( tienda ) => {
            
            let tiendaSchema = {
                "ID_TIENDA"                 : tienda[0],
                "NOMBRE"                    : tienda[1]                
            }         
         
            Tiendas.push( tiendaSchema );
        });
        
        res.json({
            ok: true,
            Tiendas
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en getTiendas: ${ err }`
        })
    }  
  
}

const crearTienda = async (req, res) => {
      
    console.log( 'crearTienda:  body: ', req.body );
    
    const { nombre }  = req.body;
  

    try{

        const sql =           
        `INSERT INTO test_tiendas ( ID_TIENDA, NOMBRE ) 
        VALUES ( ID_TIENDA.NEXTVAL, :nombre  )
        `; 
      
        let resultado  = await BD.Open( sql, [ nombre ], true ) ;  
              
        let Tiendas = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Tiendas
            })
        }

        res.json({
            ok: true,
            msg: 'Se creó una nueva tienda'
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en postTiendas: ${ err }`
        })
    }
}

const actualizarTienda = async (req, res) => {
      
    console.log( 'actualizarTienda:  body: ', req.body );
    console.log( 'actualizarTienda:  req.params: ', req.params );
    const id_tienda = req.params.id;
    
    const { NOMBRE }  = req.body;  

    try{

        const sql =           
        `UPDATE test_tiendas SET NOMBRE = :NOMBRE
        where id_tienda = :id_tienda
        `; 
      
        let resultado  = await BD.Open( sql, [ NOMBRE, id_tienda ], true ) ;  

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                msg:"Error al actualizar"
            })
        }

        res.json({
            ok: true,
            msg: 'Se actualizó el nombre de la tienda'
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en actualizarTiendas: ${ err }`
        })
    }
}

module.exports = {
    getTiendas,
    crearTienda,
    actualizarTienda
}