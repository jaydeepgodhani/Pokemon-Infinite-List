import { useCallback, useEffect, useRef, useState } from "react";
import Card from "./Card";
import Loading from "./Loading";

const limit = 24;

const Body = () => {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${index}`)
      .then((data) => data.json())
      .then((data) => {
        setIsLoading(false);
        setItems((prev) => [...prev, ...data.results]);
        setIndex((prev) => prev + limit);
      });
  }, [index, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) fetchData();
      },
      { threshold: 1.0, rootMargin: "200px" }
    ); // browser's viewport is default root considered

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap flex-row mt-6 mx-auto justify-center">
        {items &&
          items.map((item) => (
            <Card key={item.name} name={item.name} url={item.url} />
          ))}
      </div>

      <div ref={loaderRef} className="h-24 w-full">
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
};

export default Body;
