

export default function Pagination({setpageapi:setpageNumber,pagapi:pageNumber}) {



  const previuoshandelar = () => {
    if (pageNumber <= 1) return;
    setpageNumber((pageNumber) => pageNumber - 1);
    
  };

  const nexthandelar = () => {
    if (pageNumber >= 10) return;

    setpageNumber((pageNumber) => pageNumber + 1);


  };

  const PaginationStyle = {
    
    pagenavPublic:"w-8 h-8  rounded-md flex items-center justify-center border-2  border-slate-400 border-solid text-white",
    pagenavon: " bg-blue-600",
    pagenavbtn: "rounded-md flex items-center justify-center text-white bg-blue-800 py-2 px-6 font-bold hover:bg-blue-600",
     
  };

  const { pagenavPublic, pagenavbtn, pagenavon } = PaginationStyle;
  return (
    <>
      <div className="flex w-full  items-center justify-center gap-4 my-10">
        <button  className={`${pagenavbtn} ${pageNumber ==  1 && "opacity-25 hover:bg-blue-800"}`} onClick={previuoshandelar}>
          Previuos
        </button>

        <p className={` ${pageNumber == 1 && pagenavon} ${pagenavPublic}  `}>
          1
        </p>
        <p className={` ${pageNumber == 2 && pagenavon} ${pagenavPublic}  `}>
          2
        </p>

        {(pageNumber > 2) & (pageNumber < 9) ? (
          <>
            <span className="text-white text-2xl font-bold">...</span>
            <p className={`${pagenavon} ${pagenavPublic}`}>{pageNumber}</p>
          </>
        ) : null}

        <span className="text-white text-2xl font-bold">...</span>

        <p className={` ${pageNumber == 9 && pagenavon} ${pagenavPublic}  `}>
          9
        </p>
        <p className={` ${pageNumber == 10 && pagenavon} ${pagenavPublic}  `}>
          10
        </p>

        <button className={`${pagenavbtn} ${pageNumber ==  10 && "opacity-25 hover:bg-blue-800"}`} onClick={nexthandelar}>
          Next
        </button>
      </div>
    </>
  );
}
