export const erroresFirebase = (error) => {

    switch (error) {
        case "auth/email-already-in-use":
            return  "Usuario ya registrado";

        case "auth/invalid-email":
            return "Formato de email no valido"

        case "auth/weak-password":
            return "Contraseña no valida"

        case "auth/wrong-password":
            return "Contraseña y/o usuario no es valido"
            
        case "auth/user-not-found":
            return "Contraseña y/o usuario no es valido"

        default:
          return "ocurrio un error en el servidor"

      }

}