export const formValidate = () => {
    return {
        required: {
            value: true,
            message: "El email obligatorio",
          },
        patternEmail: {
            value:
              /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
          },
        minLength: { 
            value: 6, 
            message: "Minimo 6 caracteres" 
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                  return "No seas Payaso,escribe algo";
                }
                return true;
              },
        },
        validateEqual(value) {
            return{
                equal: (v) =>
                  v === value || "las contraseñas no coinciden",
              };

            },
        

    };
};