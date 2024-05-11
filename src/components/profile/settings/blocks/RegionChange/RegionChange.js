import { useEffect, useState } from "react";
import { useAlertContext } from '../../../../../providers/AlertProvider'
import ProfileService from "../../../../../services/profileService";

  
  const RegionChange = () => {
    const { success } = useAlertContext()
    const [name, setName] = useState("");
    const handleCurrentNameChange = (event) => {
        setName(event.target.value);
    };
    const [surname, setSurname] = useState("");
    const handleSurNameChange = (event) => {
        setSurname(event.target.value);
    };

    const [region, setRegion] = useState("");
    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };
    const [city, setCity] = useState("");
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    
    const [field, setField] = useState("");
    const handleFieldChaneg = (event) => {
        setField(event.target.value);
    };

    const [values, setValues] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const currentValResponse = await ProfileService.getProfile();
          setValues(currentValResponse.data);
          setName(currentValResponse.data.firstName)
          setSurname(currentValResponse.data.lastName)
          setRegion(currentValResponse.data.country)
          setCity(currentValResponse.data.city)
          setField(currentValResponse.data.currentPosition)
          console.log(currentValResponse.data)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const onClick = async () => {
      success('Data successfully updated')
    }
  
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
        <div className="font-bold text-xl">Name, region and field</div>
        <div className="mt-2">
          Change you name, region or field
        </div>
  
        <div className="mt-2">Enter name</div>
        <div className="relative w-1/2">
          <input
            value={name}
            onChange={handleCurrentNameChange}
            className="mt-2 rounded-2xl w-full"
            placeholder="Name"
          ></input>
        </div>
        <div className="relative w-1/2">
          <input
            value={surname}
            onChange={handleSurNameChange}
            className="mt-2 rounded-2xl w-full"
            placeholder="Surname"
          ></input>
        </div>
  
  
        <div className="mt-2">Enter region</div>
        <div className="relative w-1/2">
          <input
            value={region}
            onChange={handleRegionChange}
            className="mt-2 rounded-2xl w-full"
            placeholder="Country"
          ></input>
        </div>
        <div className="relative w-1/2">
          <input
            value={city}
            onChange={handleCityChange}
            className="mt-2 rounded-2xl w-full"
            placeholder="City"
          ></input>
        </div>

        <div className="mt-2">Enter your field</div>
        <div className="relative w-1/2">
          <input
            value={field}
            onChange={handleFieldChaneg}
            className="mt-2 rounded-2xl w-full"
            placeholder="Your field"
          ></input>
        </div>
        <div className="my-1 flex items-center">
          {/* <div className="inline-block mx-2">
            Require to sign in with new password in all devices
          </div> */}
        </div>
        <div onClick={onClick}
          className={`my-8 text-lg w-[200px] rounded-full py-2 font-semibold ${
            name.length > 0 ||
            region.length > 0 ||
            field.length > 0
              ? "text-white text-center bg-indigo-800 hover:bg-indigo-900 hover:text-gray-200"
              : "text-gray-400 text-center bg-indigo-100"
          }`}
        >
          Update
        </div>
      </div>
    );
  };
  
  export default RegionChange;
  