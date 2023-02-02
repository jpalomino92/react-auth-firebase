import { FirebaseError } from "firebase/app";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormError from "../components/FormError";
import FormInput from "../components/FromInput";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/fromValidate";

const Register = () => {
  const { registerUser } = useContext(UserContext);
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
      await registerUser(email, password);
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
      <h1>Register</h1>

      <FormError error={errors.firebase} />
      <FormError error={errors.email} />
      <FormError error={errors.password} />
      <FormError error={errors.repassword} />

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

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            validate: validateEqual(getValues),
          })}
        ></FormInput>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
