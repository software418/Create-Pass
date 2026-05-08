/* eslint-disable @typescript-eslint/no-explicit-any */
// shared/hooks/usePassSubmission.ts

export const submitGatePass = async (data: any) => {
  try {
    const formData = new FormData();

    // 1. Append standard fields
    Object.keys(data).forEach((key) => {
      if (key !== "persons" && key !== "carryWith" && key !== "visitArea") {
        formData.append(key, data[key]);
      }
    });

    // 2. Handle Complex Objects
    formData.append("carryWith", JSON.stringify(data.carryWith));
    formData.append("visitArea", JSON.stringify(data.visitArea));

    // 3. Handle Nested Array with Files
    data.persons.forEach((person: any, index: number) => {
      formData.append(`person_${index}_name`, person.name);
      formData.append(`person_${index}_phone`, person.phoneNo);
      formData.append(`person_${index}_aadhar`, person.aadharNumber);
      if (person.aadharFile) {
        formData.append(`person_${index}_file`, person.aadharFile);
      }
    });

    const response = await fetch("YOUR_API_ENDPOINT_HERE", {
      method: "POST",
      body: formData,
      // Note: Don't set Content-Type header manually when sending FormData
    });

    return await response.json();
  } catch (error) {
    console.error("Submission failed with script error:", error);
    throw error;
  }
};