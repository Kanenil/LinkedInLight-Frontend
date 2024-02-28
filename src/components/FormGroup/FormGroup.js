import classNames from "classnames";

const FormGroup = ({handleChange, value, touched, error, title, name, type, ...props}) => {
    return (
        <div className="mt-4">
           <label
               className="block mb-2 text-sm font-medium text-gray-600"
               htmlFor={name}
           >
              {title}
           </label>
           <input
               id={name}
               onChange={handleChange}
               value={value}
               name={name}
               className={classNames(
                   "block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300",
                   {
                      "focus:border-red-400 focus:ring-red-300 border-red-400":
                          touched && error,
                      "focus:border-green-400 focus:ring-green-300 border-green-400":
                          touched && !error,
                   }
               )}
               type={type}
               {...props}
           />
           {touched && error && (
               <p className="mt-3 text-xs text-red-400">{error}</p>
           )}
        </div>
    )
}
export default FormGroup;