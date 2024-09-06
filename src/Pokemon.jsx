import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { pokeArt } from "./helper/statics";

const Pokemon = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then((data) => data.json())
      .then((data) => {
        setPokemon(data);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-yellow-500 w-full h-16">
        <h1 className="text-3xl font-bold my-auto">Pokémon World</h1>
      </div>
      <h1 className="text-3xl font-bold mt-8 flex items-center justify-center flex-col">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <div className="flex mt-6 mx-6">
        <img className="max-w-full h-auto" src={pokeArt.replace("ZZZ", name)} />
        {pokemon && <div className="ml-6">
          <p>Height : {pokemon.height}</p>
          <p>Weight : {pokemon.weight}</p>
          <p>Base Experience : {pokemon.base_experience}</p>
          <p>Types : {pokemon.types.map(item => item.type.name).join(', ')}</p>
          <p>Abilities : {pokemon.abilities.map(item => item.ability.name).join(', ')}</p>
          <p>Moves : {pokemon.moves.map(item => item.move.name).join(', ')}</p>
        </div>}
      </div>
    </div>
  );
};

export default Pokemon;
