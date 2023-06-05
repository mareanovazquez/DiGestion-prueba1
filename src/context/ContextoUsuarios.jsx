import { createContext } from "react";

export const ContextoUsuario = createContext ([]);

export const ContextoUsuarioProvider = ({children}) => {


  //estados y funciones globales para INYECTAR
  //funciones arriba
  //estados 


    return 
    (<>
      <ContextoUsuario.Provider
      value= {{

      }}
      >
      
      {children}
      </ContextoUsuario.Provider>   
      </>
    )
}