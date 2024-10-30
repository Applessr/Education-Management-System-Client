import React from "react";

function LandingItem3() {
  return (
    <div className="flex">
      <div className="w-2/5 h-[100vh]">
        <img
          src="https://www.meatiful.co.uk/wp-content/uploads/2022/05/5-reasons-why-working-dogs-are-the-best-dogs.jpg"
          alt="dog"
        />
      </div>

      <div className="w-3/5 h-[100vh]">
        <div className="flex flex-col gap-10 px-16 ">
          <div>
            <p className="flex justify-center text-5xl">
              IMPACT AS BIG AS PIERRE{" "}
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <p className="text-3xl">
              value : Value for the editor as a controlled component. Can be a
              string containing HTML, a Quill Delta instance, or a plain object
              representing a Delta. Note that due to limitations in Quill, this
              is actually a semi-controlled mode, meaning that the edit is not
              prevented, but changing value will still replace the contents.
              Also note that passing a Quill Delta here, and then an HTML
              string, or vice-versa,
            </p>

            <div className="flex justify-around h- border">
              <div>
                <p>#1</p>
                <p>PUBLIC UNIVERSITY</p>
                <p>IN TEXAS</p>
              </div>

              <div>
                <p>170+</p>
                <p>FIELDS OF STUDY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingItem3;
