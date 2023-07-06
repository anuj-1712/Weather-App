import React from "react";

export default function Searchlist({ searchList,setQuery }) {
  return (
    <>
      <div className="flex flex-col bg-black absolute" style={{width:"197px",top:"6.5rem"}}>
        {searchList.map((element, index) => {
          return (
            <p className="text-white" key={index} onClick={(e)=>setQuery(element)}>
              {element}
            </p>
          );
        })}
      </div>
    </>
  );
}
