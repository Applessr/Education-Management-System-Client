import React from "react";

function LandingItem2() {
  return (
    <div className="px-[15vw] flex flex-col gap-10 items-center justify-center h-[100vh]">
      <h1 className="font-bold text-7xl">IMPACT AS BIG AS PIERRE </h1>
      <p className="text-4xl">
        value: Value for the editor as a controlled component. Can be a string
        containing HTML, aQuill Delta instance, or a plain object representing a
        Delta. Note that due to limitations in Quill, this is actually a
        semi-controlled mode, meaning that the edit is not prevented, but
        changing value will still replace the contents. Also note that passing a
        Quill Delta here, and then an HTML string, or vice-versa, will always
        trigger a change, regardless of whether they represent the same
        document.⚠️ Do not pass the delta object from the onChange event as
        value, as it will cause a loop. See Using Deltas for details.
      </p>
    </div>
  );
}

export default LandingItem2;
