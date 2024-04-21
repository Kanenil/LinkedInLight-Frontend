const Block = () => {
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden py-3 px-6 mb-6">
      <div className="font-bold text-xl">Block</div>
      <div className="my-4">Right now, you haven't blocked anyone.</div>
      <div className="my-4">
        Do you need to block or report someone? Go to the profile of the person
        you want to block and select "Block/Report" from the dropdown menu at
        the top of the profile's general information.
      </div>
      <div className="my-4">
        After you block this person, all previous profile views of both you and
        the other person will disappear from each of the "Who viewed my profile"
        sections.
      </div>
    </div>
  );
};

export default Block;
