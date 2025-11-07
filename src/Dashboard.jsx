import { useState } from "react";
import { Link } from "react-router-dom";
import Body from "./Body";
import Header from "./Header";
import { findRelatedPokemons } from "./helper/findRelatedPokemons";

// save index and data also for page switch

function Dashboard() {
  const [searchList, setSearchList] = useState(null);

  const handleKeyUp = (e) => {
    setSearchList(findRelatedPokemons(e.target.value));
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center mt-8">
        <div>
          <input
            className="border-black rounded p-2 border-2 w-80 focus:outline-none focus:ring-0 focus:border-black"
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
                  rel="noopener noreferrer"
                  className="block py-2 px-2 hover:text-blue-800 cursor-pointer hover:bg-slate-100"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Body />
    </div>
  );
}

export default Dashboard;
