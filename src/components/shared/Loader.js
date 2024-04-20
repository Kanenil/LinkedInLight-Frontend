import {ThreeDots} from "react-loader-spinner";

const Loader = () => {
  return (
      <div className="flex-grow w-full h-full flex justify-center items-center">
          <ThreeDots
              visible={true}
              width="100%"
              height="100%"
              color="#24459A"
              radius="9"
              wrapperClass="h-[10%] w-[10%]"
          />
      </div>
  )
}

export default Loader;