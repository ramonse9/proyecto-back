//const BD = require('../databaseVarias/configOracleDB');
const pool = require('../database');

const getInventario = async (req, res) => {
    
    try{

        const sql =           
            ` select
                ti.id_inventario,
                ti.id_tienda,
                tt.nombre as nombre_tienda,
                ti.id_articulo,
                ta.nombre as nombre_articulo,
                ta.id_categoria,
                tc.nombre as nombre_categoria,
                ti.cantidad

            from test_inventario ti
            left join test_tiendas tt
                on ti.id_tienda = tt.id_tienda
            left join test_articulos ta
                on ti.id_articulo = ta.id_articulo
            left join test_categorias tc
                on ta.id_categoria = tc.id_categoria
            order by tt.id_tienda, ta.id_articulo
            `; 
      
        //let resultado  = await BD.Open( sql, [ ], true ) ; 
        let resultado = await pool.query( sql ); 
              
        let Inventario = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Inventario
            })
        }
        
        /*resultado.rows.map( ( inventario ) => {            
            let inventarioSchema = {
                "ID_INVENTARIO"                 : inventario[0],
                "ID_TIENDA"                     : inventario[1],
                "NOMBRE_TIENDA"                 : inventario[2],
                "ID_ARTICULO"                   : inventario[3],
                "NOMBRE_ARTICULO"               : inventario[4],
                "ID_CATEGORIA"                  : inventario[5],
                "NOMBRE_CATEGORIA"              : inventario[6],
                "CANTIDAD"                      : inventario[7]                
            }         
            Inventario.push( inventarioSchema );
        });*/

        resultado.map( ( inventario ) => {            
            let inventarioSchema = {
                "ID_INVENTARIO"                 : inventario.id_inventario,
                "ID_TIENDA"                     : inventario.id_tienda,
                "NOMBRE_TIENDA"                 : inventario.nombre_tienda,
                "ID_ARTICULO"                   : inventario.id_articulo,
                "NOMBRE_ARTICULO"               : inventario.nombre_articulo,
                "ID_CATEGORIA"                  : inventario.id_categoria,
                "NOMBRE_CATEGORIA"              : inventario.nombre_categoria,
                "CANTIDAD"                      : inventario.cantidad                
            }         
            Inventario.push( inventarioSchema );
        });
        
        res.json({
            ok: true,
            Inventario
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en getInventario: ${ err }`
        })
    }  
  
}

const crearInventario = async (req, res) => {
    
    const { 
        id_tienda, id_articulo, cantidad
           }  = req.body;

    try{

        const items = {
            id_tienda, id_articulo, cantidad
        };

        const sql =           
        `INSERT INTO test_inventario set ?`; 
      
        //let resultado  = await BD.Open( sql, [ id_tienda, id_articulo, cantidad ], true ) ;  
        let resultado = await pool.query( sql, [ items ]);
             
        //let Inventario = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Inventario
            })
        }

        res.json({
            ok: true,
            msg: 'Se agregó a inventario'
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en postInentario: ${ err }`
        })
    }
}

const actualizarInventario = async( req, res ) => {
    
    const id_inventario = req.params.id;
    
    const { 
        ID_TIENDA,
        ID_ARTICULO,
        CANTIDAD
           }  = req.body;  

    try{

        //const sql =           
        //`UPDATE test_inventario set cantidad = :CANTIDAD 
        //where id_inventario = :ID_INVENTARIO
        //and ID_TIENDA = :ID_TIENDA
        //and ID_ARTICULO = :id_articulo
        //`; 
        const sql =           
        `UPDATE test_inventario set cantidad = ?  
        where id_inventario = ?
        and ID_TIENDA = ?
        and ID_ARTICULO = ?
        `; 
      
        //let resultado  = await BD.Open( sql, [ CANTIDAD, id_inventario, ID_TIENDA, ID_ARTICULO ], true ) ;  
        let resultado = await pool.query( sql, [ CANTIDAD, id_inventario, ID_TIENDA, ID_ARTICULO ]);
              
        //let Inventario = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Inventario
            })
        }

        res.json({
            ok: true,
            msg: 'Se actualizó el inventario'
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en putInventario: ${ err }`
        })
    }

}

module.exports = {
    getInventario,
    crearInventario,
    actualizarInventario
}