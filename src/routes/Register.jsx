import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";
import FormError from "../components/FormError";
import FormInput from "../components/FromInput";
import Title from "../components/Title";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/fromValidate";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEqual } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text="User Register" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            validate: validateEqual(getValues("password")),
          })}
          label="Repite tu contraseña"
          error={errors.repassword}
        ></FormInput>
        <FormError error={errors.repassword} />
        {loading ? <ButtonLoading /> : <Button text="Register" type="submit" />}
      </form>
    </>
  );
};

export default Register;
