"use client";

import React, { useState } from "react";
import InputFields from "../InputFields";
import { calculateATS } from "@/api/calculateATS"; // Assuming you store the calculateATS function here

const SearchComponent = () => {
  const [resume, setResume] = useState(null); // State to store the resume file
  const [jobDescription, setJobDescription] = useState(""); // State to store job description text
  const [atsScore, setAtsScore] = useState(null); // State to store ATS score
  const [suggestions, setSuggestions] = useState([]); // State to store suggestions
  const [loading, setLoading] = useState(false); // State to track loading state

  const handleResumeChange = (file) => {
    setResume(file); // Handle the file change
  };

  const handleJobDescriptionChange = (text) => {
    setJobDescription(text); // Handle the text change
  };

  const formatText = (text) => {
    // Replace \n with <br />
    let formattedText = text.replace(/\n/g, "<br />");

    // Replace **bold** with <strong>bold</strong>
    formattedText = formattedText.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    return formattedText;
  };

  const handleCalculateATS = async () => {
    setLoading(true); // Start loading

    const result = await calculateATS(jobDescription, resume); // Make the API call

    if (result.atsScore && result.suggestions) {
      setAtsScore(result.atsScore); // Set ATS score
      setSuggestions(formatText(result.suggestions)); // Format suggestions text
    } else {
      setAtsScore(null); // Reset ATS score
      setSuggestions([]); // Reset suggestions
    }

    setLoading(false); // Stop loading
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-28">
        <InputFields
          title="Job Description"
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        />
        <InputFields
          title="Resume"
          value={resume}
          onChange={handleResumeChange}
        />
      </div>
    <section>
      <button
        onClick={handleCalculateATS}
        className="text-center m-auto border border-white p-2 mt-4 bg-blue-500 text-white rounded-md"
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate ATS Score"}
      </button>

      {atsScore !== null && (
        <div className="mt-4">
          <p className="font-bold">ATS Score: {atsScore}</p>
          <div
            className="mt-2"
            dangerouslySetInnerHTML={{ __html: suggestions }} // Render HTML safely
          />
        </div>
      )}
    </section>
    </>
  );
};

export default SearchComponent;
