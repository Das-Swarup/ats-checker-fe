"use client";

import React, { useState } from "react";

const InputFields = ({ title, value, onChange }) => {
  const [inputType, setInputType] = useState(null);
  const [fileName, setFileName] = useState(null); // State to store the selected file name

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Set the file name when a file is selected
      if (onChange) {
        onChange(file); // Send the file to the parent component
      }
    }
  };

  const handleTextChange = (e) => {
    if (onChange) {
      onChange(e.target.value); // Send the entered text to the parent component
    }
  };

  return (
    <section>
      <div className="container">
        <div className="w-max h-max p-5 border border-gray-300 flex flex-col items-center justify-center rounded-md">
          <p className="text-left self-start">{title}</p>
          <select
            onChange={(e) => setInputType(e.currentTarget.value)}
            name="type"
            id="type"
            className="text-black p-1 border border-gray-300 rounded-md"
          >
            <option value="">File/Text Input</option>
            <option value="File">File</option>
            <option value="Text Input">Text Input</option>
          </select>

          {/* Input Box */}
          <div className="mt-4 h-[300px] w-[500px] border border-gray-300 rounded-md p-2 flex items-center justify-center">
            {inputType === "File" ? (
              <label className="cursor-pointer text-gray-600">
                <div className="text-center">
                  <p>{fileName ? fileName : "Click here to select a file"}</p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </label>
            ) : inputType === "Text Input" ? (
              <textarea
                className="w-full h-full p-2 resize-none bg-transparent"
                placeholder="Provide your text"
                value={value}
                onChange={handleTextChange}
              />
            ) : (
              <p className="text-gray-600">
                Please select an option from the dropdown
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputFields;
