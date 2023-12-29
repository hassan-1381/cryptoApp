import chartUP from "../../assets/chart-up.svg";
import chartdown from "../../assets/chart-down.svg";
import { Hourglass } from "react-loader-spinner";
import { marketChart } from "../services/CryptoApi";


export default function TableCoin({ Coins, loading, setchart }) {

  const charthandelar = async (coin) => {
  
    const {id, name, image, symbol, current_price, price_change_percentage_24h,ath,market_cap} =
    coin;

    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setchart({ ...json, coin });
    } catch (error) {
      console.error(error);
      setchart(null);
    }
  };

  return (
    <>
      <table className="w-full mt-10 grid  grid-cols-1 grid-rows-[3rem 1fr] bg-white p-8 rounded-2xl">
        <thead className="w-full grid grid-rows-1 grid-cols-1 h-20 border-slate-800 border-b-2 border-solid ">
          <tr className=" w-full font-mono font-bold text-2xl text-slate-500  grid grid-rows-1 grid-cols-6 items-center justify-between  gap-auto">
            <th className=" grid grid-cols-1 "> Coin </th>
            <th className=" grid grid-cols-1 "> Name </th>
            <th className=" grid grid-cols-1"> Price </th>
            <th className=" grid grid-cols-1"> 24 h </th>
            <th className=" grid grid-cols-1 "> Total Volume </th>
            <th className=" grid grid-cols-1 "></th>
          </tr>
        </thead>

        <tbody className="w-full grid grid-cols-1 h-auto  py-8 items-center justify-center ">
          <Tableitems
            loading={loading}
            Coins={Coins}
            charthandelar={charthandelar}
          />
        </tbody>
      </table>
    </>
  );
}

const Tableitems = ({ Coins, loading, charthandelar }) => {
  return (
    <>
      {loading && (
        <tr className="w-full grid  items-center justify-center">
          <td>
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
              className="grid  items-self-center  w-full"
            />
          </td>
        </tr>
      )}
      {!loading &&
        Coins.map((Coin) => (
          <tr
            key={Coin.id}
            className="w-full grid grid-rows-1 grid-cols-6 items-center justify-center  border-solid border-slate-400 border-b-2 py-4 text-lg"
          >
            <td
              className="grid grid-cols-1 items-self-center justify-self-center "
              onClick={() => charthandelar(Coin)}
            >
              <div className="flex">
                <img
                  src={Coin.image}
                  alt={Coin.name}
                  className="w-6 h-6  object-cover mr-2"
                />
                <span>{Coin.symbol.toUpperCase()}</span>
              </div>
            </td>
            <td className="grid grid-cols-1 items-self-center justify-self-center  ">
              {Coin.name}
            </td>
            <td className="grid grid-cols-1 w-fullvc items-self-center justify-self-center ">
              {"$" + Coin.current_price.toLocaleString()}
            </td>
            <td
              className={`grid grid-cols-1 items-self-center justify-self-center  font-bold ${
                Coin.price_change_percentage_24h > 0
                  ? `text-lime-500`
                  : `text-red-500`
              }`}
            >
              {Coin.price_change_percentage_24h.toFixed()}%
            </td>
            <td className="grid grid-cols-1  items-self-center justify-self-center  ">
              {Coin.total_volume.toLocaleString()}
            </td>
            <td className="grid grid-cols-1 items-self-center justify-self-center ">
              <img
                src={Coin.price_change_percentage_24h > 0 ? chartUP : chartdown}
              />
            </td>
          </tr>
        ))}
    </>
  );
};
