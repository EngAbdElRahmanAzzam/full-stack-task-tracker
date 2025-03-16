const Loader = () => {
  return ( 
    <div className="flex items-center w-fit mx-auto">
      <span className="inline-block w-[2px] h-2 bg-[rgba(30,25,25,0.5)] rounded-[10px] animate-scaleUp"></span>
      <span className="inline-block w-[2px] h-[15px] bg-[rgba(30,25,25,0.5)] rounded-[10px] my-[0] mx-[3px] animate-scaleUp delay-200"></span>
      <span className="inline-block w-[2px] h-2 bg-[rgba(30,25,25,0.5)] rounded-[10px] animate-scaleUp delay-500"></span>
    </div>
  );
};

export default Loader;