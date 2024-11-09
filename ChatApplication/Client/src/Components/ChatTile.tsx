const ChatTile = ({name,id,img}) => {
  return (
    <div key={id} className="h-24 flex-grow grid grid-cols-[25%_1fr] px-1 gap-2 border border-gray-100 cursor-pointer transition transform  active:animate-click hover:bg-gray-100">
  <div className="w-24 h-24 flex items-center px-2">
    <img src={img} alt="pic" className="border h-14 w-14 rounded-3xl" />
  </div>
  <div className="flex flex-col justify-center">
    <div className="flex items-center gap-2">
      <h1 className="font-bold text-sm">{name}</h1>
      <span className="text-gray-400 relative top-1">
        <svg
          width="8px"
          height="8px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path fill="#c1bebe" d="M8 3a5 5 0 100 10A5 5 0 008 3z" />
        </svg>
      </span>
      <h4 className="text-xs font-medium text-[#c1bebe]">Time</h4>
    </div>

    <div>
      <p className="text-xs w-full">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
        nostrum repudiandae adipisci earum maiores in?
      </p>
    </div>
  </div>
</div>

  );
};

export default ChatTile;
