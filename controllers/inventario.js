const BD = require('../database/configOracleDB');

const getInventario = async (req, res) => {

    console.log( 'getInventario: ' );
    
    try{

        const sql =           
        `select
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
      
        let resultado  = await BD.Open( sql, [ ], true ) ;  
              
        let Inventario = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Inventario
            })
        }
        
        resultado.rows.map( ( inventario ) => {
            
            let inventarioSchema = {
                "ID_INVENTARIO"                 : inventario[0],
                "ID_TIENDA"                     : inventario[1],
                "NOMBRE_TIENDA"                 : inventario[2],
                "ID_ARTICULO"                   : inventario[3],
                "NOMBRE_ARTICULO"               : inventario[4],
                "ID_CATEGORIA"                  : inventario[5],
                "NOMBRE_CATEGORIA"              : inventario[6],
                "CANTIDAD"                      : inventario[7],
                
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
      
    console.log( 'crearInventario:  body: ', req.body );
    
    const { 
        id_tienda, id_articulo, cantidad
           }  = req.body;
  

    try{

        const sql =           
        `INSERT INTO test_inventario (ID_INVENTARIO, ID_TIENDA, ID_ARTICULO, CANTIDAD ) 
        VALUES (ID_INVENTARIO.NEXTVAL, :id_tienda, :id_articulo, :cantidad )
        `; 
      
        let resultado  = await BD.Open( sql, [ id_tienda, id_articulo, cantidad ], true ) ;  
              
        let Inventario = [];

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
    
    console.log( 'actualizar Inventario:  body: ', req.body );
    const id_inventario = req.params.id;
    
    const { 
        cantidad
           }  = req.body;  

    try{

        const sql =           
        `UPDATE test_inventarios set cantidad = :cantidad 
        where id_inventario = :id_inventario
        `; 
      
        let resultado  = await BD.Open( sql, [ cantidad, id_inventario ], true ) ;  
              
        let Inventario = [];

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
            msg: `Error en postInentario: ${ err }`
        })
    }

}

module.exports = {
    getInventario,
    crearInventario,
    actualizarInventario
}