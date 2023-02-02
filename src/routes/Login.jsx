import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import FormInput from "../components/FromInput";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/fromValidate";

const Login = () => {
  const { loginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Login</h1>

      <FormError error={errors.firebase} />
      <FormError error={errors.email} />
      <FormError error={errors.password} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        ></FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
        ></FormInput>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
