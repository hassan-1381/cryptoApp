import { useState, useEffect } from "react";
import { Hourglass } from "react-loader-spinner";
import { serchapi } from "../services/CryptoApi";


export default function Search({ setcurrency }) {
  const [serchtext, setserchtext] = useState("");
  const [coinsed, setcoinsed] = useState([]);

  useEffect(() => {
    setcoinsed([]);
    if (!serchtext) return;
    const reqapi = new AbortController();

    const reqserchapi = async () => {
      try {
        const req = await fetch(serchapi(serchtext), { signal: reqapi.signal });
        const res = await req.json();
        if (res.coins) setcoinsed(res.coins);
        console.log(coinsed);
        return () => {
          reqapi.abort();
        };
      } catch {
        return null;
      }
    };
    reqserchapi();
  }, [serchtext]);


  

  return (
    <div className="flex mt-10 relative">
      <input
        value={serchtext}
        type="text"
        placeholder="search..."
        onChange={(e) => setserchtext(e.target.value)}

        className="flex relative outline-none focus:outline-none py-2 px-8 rounded-lg w-auto  text-blue-500 font-bold  "
      />

      <select onChange={(e) => setcurrency(e.target.value)} className="py-2 px-8 text-blue-500 font-bold rounded-lg ml-2">
        <option value="usd">USd</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

      {serchtext && (
        <div className="flex p-5  w-72 h-96 overflow-y-scroll absolute  rounded-lg bg-slate-100  top-12 border-solid border-2 border-blue-500 ">
          <ul className=" flex gap-4 flex-col w-full">

            {coinsed.length ?

              coinsed.map((coin) => (
                <li key={coin.id} className="w-full flex gap-2   py-2 border-slate-400  border-solid border-b-2    focus:bg-slate-300">
                  <img src={coin.thumb} alt={coin.name} />
                  <span>{coin.name}</span>
                </li>

              ))

            : (
              <li className="flex w-full h-full items-center justify-center">

                <Hourglass

                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="hourglass-loading"
                  // wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#306cce", "#72a1ed"]}
             
                />
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
