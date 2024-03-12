import ArrowDownIcon from "../ArrowDownIcon/ArrowDownIcon";

const HiddenContent = (props) => {
  return (
    <div className="w-72 text-white text-xl bg-[#0A48DBB2] block text-center px-14 py-2 rounded-3xl mx-1 my-2 hover:bg-blue-700 transition duration-500 ease-in-out">
      <span className="pr-5">Show More</span>{" "}
      <ArrowDownIcon className="inline-block fill-white w-6 h-6" />
    </div>
  );
};

export default HiddenContent;
