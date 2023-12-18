import { useState, useEffect } from "react";

//_____________________ <components /> ________________________//
import TableCoin from "../modules/TableCoin";
import { getCoinList } from "../services/CryptoApi";

export default function HomePage() {
  const [Coins, setCoins] = useState([]);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const getApiCoins = async () => {
      try {
        const res = await fetch(getCoinList());
        const json = await res.json();
        setCoins(json);
      } catch (error) {
        seterror(true);
      }
    };
    getApiCoins();
  }, []);
  return (
    <>
      <TableCoin Coins={Coins} />
    </>
  );
}
