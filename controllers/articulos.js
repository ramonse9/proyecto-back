const BD = require('../database/configOracleDB');

const getArticulos = async (req, res) => {

    console.log( 'getArticulo: ' );
    
    try{

        const sql =           
        `select 
            ta.id_articulo, ta.nombre as nombre_articulo, ta.id_categoria, tc.nombre as nombre_categoria 
        from test_articulos ta
        left join test_categorias tc
            on ta.id_categoria = tc.id_categoria
        order by ta.id_articulo
        `; 
      
        let resultado  = await BD.Open( sql, [ ], true ) ;  
              
        let Articulos = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Articulos
            })
        }
        
        resultado.rows.map( ( articulo ) => {
            
            let articuloSchema = {
                "ID_ARTICULO"               : articulo[0],
                "NOMBRE_ARTICULO"           : articulo[1],
                "ID_CATEGORIA"              : articulo[2],
                "NOMBRE_CATEGORIA"          : articulo[3]
            }         
         
            Articulos.push( articuloSchema );
        });
        
        res.json({
            ok: true,
            Articulos
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en getArticulos: ${ err }`
        })
    }  
  
}

const crearArticulo = async (req, res) => {
      
    console.log( 'crearArticulo:  body: ', req.body );
    
    const { nombre, id_categoria }  = req.body;
  

    try{

        const sql =           
        `INSERT INTO test_articulos ( ID_ARTICULO, NOMBRE, ID_CATEGORIA ) 
        VALUES ( ID_ARTICULO.NEXTVAL, :nombre, :id_categoria  )
        `; 
      
        let resultado  = await BD.Open( sql, [ nombre, id_categoria ], true ) ;  
              
        let Articulos = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                Articulos
            })
        }

        res.json({
            ok: true,
            msg: 'Se creó un nuevo articulo'
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en postArticulos: ${ err }`
        })
    }
}

const eliminarArticulo = async (req, res) => {
      
    console.log( 'crearArticulo:  body: ', req.body );

    const id_articulo = req.params.id;
    
    try{

        const sql =           
        `delete from test_articulos where ID_ARTICULO = :id_articulo
        `; 
      
        let resultado  = await BD.Open( sql, [ id_articulo ], true ) ;  
              
        let Articulos = [];

        if( !resultado ){            
            res.status(400).json({
                ok: false,
                msg: 'Articulo eliminado'
            })
        }

        res.json({
            ok: true,
            msg: 'Se eliminó un articulo'
        });
        
    }catch(err){

        console.log( err );

        res.status(500).json({            
            ok: false,
            msg: `Error en deleteArticulos: ${ err }`
        })
    }
}

module.exports = {
    getArticulos,
    crearArticulo,
    eliminarArticulo
}