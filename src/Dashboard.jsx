import { useEffect, useState } from "react";
import Card from "./Card";

function Dashboard() {
  const [pokeList, setPokeList] = useState();

  const fetchPokemon = async () => {
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=24&offset=0')
      .then((data) => data.json())
      .then((data) => {
        console.log(data.body);
        setPokeList(data.results);
      });
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="flex items-center justify-center flex-col w-screen">
      <h1 className="text-3xl font-bold mt-8">Pokémon World</h1>
      <div className="flex flex-wrap flex-row mt-6 mx-auto justify-center">
        {pokeList &&
          pokeList.map((item) => (
            <Card key={item.name} name={item.name} url={item.url} />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
