import Button from "../components/Button";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Title from "../components/Title";
import useFirestore from "../hooks/useFirestore";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState("");

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <Loading />;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setNewOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID("");
      setText("");
      return;
    }

    await addData(text);
    setText("");
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = async (item) => {
    console.log("click edit");
    setText(item.origin);
    setNewOriginID(item.nanoid);
  };

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="ex: http://blueeweb.org"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

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
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
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
        </div>
      ))}
    </>
  );
};

export default Home;
