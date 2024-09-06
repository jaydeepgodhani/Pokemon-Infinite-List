import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Header from "./Header";
import { findRelatedPokemons } from "./helper/findRelatedPokemons";

function Dashboard() {
  const [pokeList, setPokeList] = useState();
  const [searchList, setSearchList] = useState(null);

  const fetchPokemon = async () => {
    await fetch("https://pokeapi.co/api/v2/pokemon?limit=24&offset=0")
      .then((data) => data.json())
      .then((data) => {
        setPokeList(data.results);
      });
  };

  const handleKeyUp = (e) => {
    const values = findRelatedPokemons(e.target.value);
    setSearchList(values);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center mt-8">
        <div>
          <input
            className="border-black rounded p-2 border-2 w-64 focus:outline-none focus:ring-0 focus:border-black"
            type="text"
            placeholder="Search Pokemon"
            onInput={handleKeyUp}
          />
          {searchList && (
            <div className="absolute -mt-1 bg-white max-h-36 overflow-y-scroll border-t-0 rounded-t-none border-black rounded border-2 w-64 z-10">
              {searchList.map((item) => (
                <Link
                  key={item}
                  to={`/pokemon/${item}`}
                  target="_blank"
                  rel='noopener noreferrer'
                  className="block py-2 px-2 hover:text-blue-800 cursor-pointer hover:bg-slate-100"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
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
