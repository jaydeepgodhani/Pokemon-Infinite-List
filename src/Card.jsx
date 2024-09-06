/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { pokeArt } from "./helper/statics";

const Card = ({ name }) => {
  return (
    <div className="border-black w-60 p-3 m-4 rounded-lg border-2 hover:shadow-2xl duration-300 hover:scale-105">
      <Link key={name} to={`/pokemon/${name}`}>
        <p className="text-center font-semibold text-xl">{name}</p>
        <div className="flex flex-col justify-start items-center p-4 h-80 w-full">
          <img
            className="m-auto max-h-full"
            src={pokeArt.replace("ZZZ", name)}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
