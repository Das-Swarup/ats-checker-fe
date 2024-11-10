// calculateATS.js

export const calculateATS = async (jobDescription, resume) => {
    try {
      const formData = new FormData();
      
      // Check if jobDescription is text or file
      if (typeof jobDescription === "string") {
        formData.append("jobDescriptionText", jobDescription);
      } else if (jobDescription instanceof File) {
        formData.append("jobDescription", jobDescription);
      }
  
      // Check if resume is text or file
      if (typeof resume === "string") {
        formData.append("resumeText", resume);
      } else if (resume instanceof File) {
        formData.append("resume", resume);
      }
  
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error in fetching ATS score");
      }
  
      const data = await response.json();
      return data; // { atsScore, suggestions }
    } catch (error) {
      console.error("Error calculating ATS:", error);
      return { atsScore: null, suggestions: [] }; // Default error return
    }
  };
  