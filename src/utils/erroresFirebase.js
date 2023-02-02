export const erroresFirebase = (error) => {

    switch (error) {
        case "auth/email-already-in-use":
            return{
                code: "email",
                message:"Usuario ya registrado"
            }  
            
        case "auth/invalid-email":
            return{
                code: "email",
                message:"Formato de email no valido"
            }  

        case "auth/weak-password":
            return{
                code: "password",
                message:"Contraseña no valida"
            }  

        case "auth/wrong-password":
            return{
                code: "password",
                message:"Contraseña y/o usuario no es valido"
            }  
            
        case "auth/user-not-found":
            return{
                code: "email",
                message:"Contraseña y/o usuario no es valido"
            }  

        default:
          return "ocurrio un error en el servidor"

      }

}