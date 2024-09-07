import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Header from "./Header";
import Loading from "./Loading";
import { findRelatedPokemons } from "./helper/findRelatedPokemons";

const limit = 24;
let pokeData = [];
let savedIndex = 0;
// save index and data also for page switch

function Dashboard() {
  const [searchList, setSearchList] = useState(null);
  const [items, setItems] = useState(pokeData ? pokeData : null);
  const [index, setIndex] = useState(savedIndex);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const handleKeyUp = (e) => {
    setSearchList(findRelatedPokemons(e.target.value));
  };

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${index}`)
      .then((data) => data.json())
      .then((data) => {
        setItems((prevItems) =>
          (prevItems || []).length === 0
            ? data.results
            : [...prevItems, ...data.results]
        );
      });

    setIndex((prevIndex) => prevIndex + limit);
    setIsLoading(false);
  }, [index, isLoading]);

  pokeData = items;
  savedIndex = index;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) fetchData();
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchData]);

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
      <div className="flex flex-wrap flex-row mt-6 mx-auto justify-center">
        {items &&
          items.map((item) => (
            <Card key={item.name} name={item.name} url={item.url} />
          ))}
      </div>

      <div ref={loaderRef}>
        {isLoading && (
          <div>
            <svg className="flex justify-center items-center w-full h-24 my-12">
              <use xlinkHref="#fade-circles"></use>
              <Loading />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
