import { useFetch } from "../hooks/usefetch";
import { useCounter } from "../hooks/usecounter";
import { Loading } from "./Loading";
import { Card } from "./Card";

export const CustomHook = () => {
  const { counter, decrement, increment } = useCounter(1);

  const { data, hasError, isLoading } = useFetch(
    `https://rickandmortyapi.com/api/character/${counter}`,
  );

  return (
    <>
      <h1>Rick and Morty Characters</h1>
      <hr />

      {isLoading ? (
        <Loading />
      ) : (
        <Card
          id={data.id}
          name={data.name}
          image={data.image}
          status={data.status}
          species={data.species}
          gender={data.gender}
          origin={data.origin?.name}
        />
      )}
      <button
        className="btn btn-primary"
        onClick={() => decrement()}
        disabled={counter <= 1}
      
      >
        Anterior
      </button>

      <button className="btn btn-primary" onClick={() => increment()}>
        Siguiente
      </button>
    </>
  );
};
