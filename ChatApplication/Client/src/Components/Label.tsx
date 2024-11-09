
const Label = () => {
  return (
    <div className="h-10 text-sm my-1  w-full py-1">
      <button className="border rounded-xl py-1 px-3 mx-1 text-white bg-[#fd8530]">All</button>
      <button className="border rounded-xl py-1 px-2 mx-1">Unread</button>
      <button className="border rounded-xl py-1 px-2 mx-1">Archived</button>
      <button className="border rounded-xl py-1 px-2 mx-1">Blocked</button>
    </div>
  );
};

export default Label;
