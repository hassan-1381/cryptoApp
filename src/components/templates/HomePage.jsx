import { useState, useEffect } from "react";

//_____________________ <components /> ________________________//
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import { getCoinList } from "../services/CryptoApi";

export default function HomePage() {
  const [Coins, setCoins] = useState([]);
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(true);
  const [pagapi, setpageapi] = useState(1);
  const [currency, setcurrency] = useState("usd");

  useEffect(() => {
    setloading(true);
    const getApiCoins = async () => {
      try {
        const res = await fetch(getCoinList(pagapi,currency));
        const json = await res.json();
        setCoins(json);
        setloading(false);
      } catch (error) {
        seterror(true);
      }
    };
    getApiCoins();
  }, [pagapi,currency]);
  return (
    <>
      <Search  setcurrency={setcurrency}/>
      <TableCoin Coins={Coins} loading={loading} />
      <Pagination setpageapi={setpageapi} pagapi={pagapi} />
    </>
  );
}
