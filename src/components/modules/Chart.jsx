import { useState } from "react";
import { convertData } from "../../helpers/convertdata";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function Chart({ chart, setchart }) {
  const { coin, prices, market_caps, total_volumes } = chart;
  const {
    id,
    name,
    image,
    symbol,
    current_price,
    price_change_percentage_24h,
    ath,
    market_cap,
  } = coin;


  
  const btnstyle = `py-2  px-10 text-white rounded-lg mr-4 font-bold border-solid border-2 border-blue-600`;
  const onbtn="bg-blue-600"



  const [type, settype] = useState("prices");

  convertData(chart, type);

  return (
    <div className=" w-full h-full fixed  top-0 right-0 bottom-0 left-0  p-4 backdrop-blur-sm flex  flex-col ">
      <span
        className=" text-red-500 text-3xl font-bold cursor-pointer   "
        onClick={() => setchart(!chart)}
      >
        X
      </span>

      <div className=" flex self-center justify-self-center flex-col w-[1000px] h-[600px] bg-slate-900 bg-opacity-80 p-4  backdrop-blur-sm  rounded-2xl ">
        <div className=" pb-4 flex items-center  ">
          <img src={image} className=" w-14 h-14  mr-4 rounded-full" />
          <h1 className=" text-white font-bold text-2xl"> {name}</h1>
        </div>

        <div className=" w-full h-[350px]  border-solid border-2 border-blue-300 p-4 rounded-md ">
          <ChartComponents data={convertData(chart, type)} type={type} />
        </div>

        <div className="flex items-center mt-6">
          <button className={`${btnstyle}  ${type=="prices" && onbtn}`}  onClick={()=>settype("prices")} >Price</button>
          <button className={`${btnstyle}  ${type=="market_caps" && onbtn}`}  onClick={()=>settype("market_caps")} >market_caps</button>
          <button className={`${btnstyle}  ${type=="total_volumes" && onbtn}`}  onClick={()=>settype("total_volumes")} >total_volumes</button>
        </div>

        <div className="flex items-center justify-between w-full mt-6">
          <div className=" flex items-center gap-2 ">
            <p className=" text-blue-600 text-2xl  ">price :</p> <span className=" text-white text-xl "> $ {current_price}</span>
          </div>

          <div className=" flex items-center gap-2 ">
            <p className=" text-blue-600 text-2xl  ">ATH :</p> <span className=" text-white text-xl "> $ {ath}</span>
          </div>

          <div className=" flex items-center gap-2 ">
            <p className=" text-blue-600 text-2xl  ">Market cap :</p> <span className=" text-white text-xl "> $ {market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChartComponents = ({ data, type }) => {

  const dataWidth = null

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={800} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth={"2px"}
        />
        <CartesianGrid stroke="#ffff" />
        <XAxis dataKey={"data"} hide />
        <Legend />
        <YAxis width={107} stroke="#ffff" dataKey={type} domain={["auto", "auto"]} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
