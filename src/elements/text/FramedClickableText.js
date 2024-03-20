const FramedClickableText = (props) => {
  return (
    <div className="text-xl border-indigo-400 border-2 inline-block text-center px-4 py-1 rounded-3xl mx-1 my-2 hover:border-blue-900 transition duration-300 ease-in-out">
      {props.children}
    </div>
  );
};

export default FramedClickableText;
