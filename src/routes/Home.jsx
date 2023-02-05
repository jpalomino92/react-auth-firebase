import Button from "../components/Button";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Title from "../components/Title";
import useFirestore from "../hooks/useFirestore";
import { formValidate } from "../utils/fromValidate";
import FormInput from "../components/FromInput";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
  const [copy, setCopy] = useState({});
  const { required, patternURL } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    resetField,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState("");

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <Loading />;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message,
      });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = async (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };

  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(pathURL + nanoid);
    setCopy({ [nanoid]: true });
    console.log("copiado");
  };

  return (
    <>
      <Title text="Add URL" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="https://example.com"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          label="Ingresa URL"
          error={errors.url}
        >
          <FormError error={errors.url} />
        </FormInput>

        {newOriginID ? (
          <Button
            text="Edit URL"
            type="submit"
            color="yellow"
            loading={loading.updateData}
          />
        ) : (
          <Button
            text="ADD URL"
            type="submit"
            color="green"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 mb-2"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>

          <div className="flex space-x-2">
            <Button
              text="delete"
              type="button"
              color="red"
              loading={loading[item.nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              text="edit"
              type="button"
              color="yellow"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              text={copy[item.nanoid] ? "Copied" : "copy"}
              type="button"
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
