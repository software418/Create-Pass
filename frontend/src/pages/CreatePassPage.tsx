/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { LocationStateData } from "../shared/utils/locationData";
// import { Button } from "../shared/ui/atoms/Button";
// import { Checkbox } from "../shared/ui/atoms/Checkbox";
// import { FormField } from "../shared/ui/molecules/FormField";
// import { Input } from "../shared/ui/atoms/Input";
// // import { API_ENDPOINTS } from "../shared/const/api";
// // import api from "../shared/services/api";

// import axios from "axios"; // Import standard axios

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
// } from "../shared/ui/molecules/Card";
// import { CameraInput, type CameraInputHandle } from "../pages/CameraInput";

// interface PersonDetail {
//   name: string;
//   phoneNo: string;
//   aadharNumber: string;
//   aadharFile: File | null;
// }

// interface FormData {
//   gatePassType: "single" | "multi";
//   passDate: string;
//   mobileNo: string;
//   name: string;
//   emailId: string;
//   companyName: string;
//   address: string;
//   state: string;
//   city: string;
//   representingVisitorType: string;
//   subLocation: string;
//   toMeetWith: string; // Added missing field
//   carryWith: {
//     mobile: boolean;
//     laptop: boolean;
//     pendrive: boolean;
//     camera: boolean;
//   };
//   idType: string;
//   idNumber: string;
//   description: string;
//   maskCovid: "yes" | "no" | "";
//   noOfPerson: string;
//   persons: PersonDetail[];
//   visitArea: string[];
//   temperature: string;
//   token: string;
//   purpose: string;
//   allowedHours: string;
// }

// const CreatePassPage: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     gatePassType: "single",
//     passDate: "",
//     mobileNo: "",
//     name: "",
//     emailId: "",
//     companyName: "",
//     address: "",
//     state: "",
//     city: "",
//     representingVisitorType: "",
//     subLocation: "",
//     toMeetWith: "", // Initialized
//     carryWith: {
//       mobile: false,
//       laptop: false,
//       pendrive: false,
//       camera: false,
//     },
//     idType: "PASSPORT",
//     idNumber: "",
//     description: "",
//     maskCovid: "",
//     noOfPerson: "",
//     persons: [{ name: "", phoneNo: "", aadharNumber: "", aadharFile: null }],
//     visitArea: [],
//     temperature: "",
//     token: "",
//     purpose: "",
//     allowedHours: "",
//   });

//   const [cities, setCities] = useState<string[]>([]);
//   const cameraInputRef = React.useRef<CameraInputHandle>(null);

//   // Fixed Type Syntax here
//   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedState = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       state: selectedState,
//       city: "",
//     }));

//     const stateCities =
//       LocationStateData[selectedState as keyof typeof LocationStateData] || [];
//     setCities(stateCities as string[]);
//   };

//   const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       city: e.target.value,
//     }));
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Separated Select Change for better TS clarity
//   const handleSelectChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     category: keyof FormData["carryWith"] | "visitArea",
//   ) => {
//     const { value, checked } = e.target;

//     if (category === "visitArea") {
//       setFormData((prev) => ({
//         ...prev,
//         visitArea: checked
//           ? [...prev.visitArea, value]
//           : prev.visitArea.filter((item) => item !== value),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         carryWith: {
//           ...prev.carryWith,
//           [category]: checked,
//         },
//       }));
//     }
//   };

//   const handlePersonChange = (
//     index: number,
//     field: keyof PersonDetail,
//     value: string | File | null,
//   ) => {
//     const newPersons = [...formData.persons];
//     // Create a copy of the person object to update
//     newPersons[index] = {
//       ...newPersons[index],
//       [field]: value,
//     };

//     setFormData((prev) => ({
//       ...prev,
//       persons: newPersons,
//     }));
//   };

//   const addPerson = () => {
//     setFormData((prev) => ({
//       ...prev,
//       persons: [
//         ...prev.persons,
//         { name: "", phoneNo: "", aadharNumber: "", aadharFile: null },
//       ],
//     }));
//   };

//   const removePerson = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       persons: prev.persons.filter((_, i) => i !== index),
//     }));
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   const capture = await cameraInputRef.current?.takePhoto();

//   //   if (!capture) return alert("Please take a photo!");
//   //   if (capture) {
//   //     const submissionData = { ...formData, capture };

//   //     const formDataObj = new FormData();
//   //     formDataObj.append("photo", capture, "my-photo.jpg");

//   //     const responce = await api.post(API_ENDPOINTS.UPLOAD, formDataObj, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });
//   //     console.log("API Response:", responce);
//   //     console.log("Submitting form with data:", submissionData);
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const capture = await cameraInputRef.current?.takePhoto();
//       if (!capture) return alert("Please take a photo!");

//       const formDataObj = new FormData();
//       formDataObj.append("carryWith", JSON.stringify(formData.carryWith));
//       formDataObj.append("visitArea", JSON.stringify(formData.visitArea));

//       // Append everything else
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key !== "carryWith" && key !== "visitArea") {
//           formDataObj.append(key, value as string);
//         }
//       });

//       formDataObj.append("photo", capture, "my-photo.jpg");
//       // Add other fields to formDataObj here...

//       // FIX IS HERE: Ensure the brackets match up
//       const responce = await axios.post(
//         "http://localhost:5000/api/v1/capture/upload",
//         formDataObj,
//       );

//       console.log("API Response:", responce);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleClear = () => {
//     setFormData({
//       gatePassType: "single",
//       passDate: "",
//       mobileNo: "",
//       name: "",
//       emailId: "",
//       companyName: "",
//       address: "",
//       state: "",
//       city: "",
//       representingVisitorType: "",
//       subLocation: "",
//       toMeetWith: "",
//       carryWith: {
//         mobile: false,
//         laptop: false,
//         pendrive: false,
//         camera: false,
//       },
//       idType: "PASSPORT",
//       idNumber: "",
//       description: "",
//       maskCovid: "",
//       noOfPerson: "",
//       persons: [{ name: "", phoneNo: "", aadharNumber: "", aadharFile: null }],
//       visitArea: [],
//       temperature: "",
//       token: "",
//       purpose: "",
//       allowedHours: "",
//     });
//     setCities([]);
//   };

//   const visitAreaOptions = [
//     "CPVC PLANT",
//     "CA 1 PLANT",
//     "STORE AREA",
//     "H2O2 AREA",
//     "OCD BLOCK",
//     "CT PROJECT AREA",
//     "ECH PLANT",
//     "SECURITY BLOCK",
//     "CA 2 PLANT",
//     "CPP (POWER PLANT)",
//     "SAFETY BLOCK",
//     "CMS PLANT",
//     "H2O2 PLANT",
//     "ADMIN_BLOCK",
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50 p-6">
//       <Card className="max-w-6xl mx-auto shadow-lg">
//         <CardHeader>
//           <CardTitle>Create Gate Pass</CardTitle>
//         </CardHeader>

//         <CardContent className="p-8">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div className="grid grid-cols-2 gap-8">
//               <FormField label="Gate Pass Type">
//                 <div className="space-y-3">
//                   <label className="flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="gatePassType"
//                       value="single"
//                       onChange={handleSelectChange}
//                       checked={formData.gatePassType === "single"}
//                       className="w-4 h-4 accent-teal-600"
//                     />
//                     <span className="ml-3 text-sm font-medium">Single Day</span>
//                   </label>
//                   <label className="flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name="gatePassType"
//                       value="multi"
//                       checked={formData.gatePassType === "multi"}
//                       onChange={handleSelectChange}
//                       className="w-4 h-4 accent-teal-600"
//                     />
//                     <span className="ml-3 text-sm font-medium">Multi Day</span>
//                   </label>
//                 </div>
//               </FormField>

//               <FormField label="Pass Date">
//                 <Input
//                   type="date"
//                   name="passDate"
//                   value={formData.passDate}
//                   onChange={handleInputChange}
//                 />
//               </FormField>
//             </div>

//             <div className="space-y-6 border-t-2 border-gray-200 pt-6">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 Personal Information
//               </h3>
//               <div className="grid grid-cols-2 gap-6">
//                 <FormField label="Name">
//                   <Input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Enter name"
//                   />
//                 </FormField>
//                 <FormField label="Mobile No">
//                   <Input
//                     type="tel"
//                     name="mobileNo"
//                     value={formData.mobileNo}
//                     onChange={handleInputChange}
//                     placeholder="Enter mobile number"
//                   />
//                 </FormField>
//                 <FormField label="Email-Id">
//                   <Input
//                     type="email"
//                     name="emailId"
//                     value={formData.emailId}
//                     onChange={handleInputChange}
//                     placeholder="Enter email"
//                   />
//                 </FormField>
//                 <FormField label="Address">
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     placeholder="Enter address"
//                     className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none resize-none"
//                     rows={3}
//                   />
//                 </FormField>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <FormField label="Company Name">
//                   <Input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleInputChange}
//                     placeholder="Enter company name"
//                   />
//                 </FormField>
//               </div>

//               <div className="grid grid-cols-2 gap-6">
//                 <FormField label="State">
//                   <select
//                     name="state"
//                     value={formData.state}
//                     onChange={handleStateChange}
//                     className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
//                   >
//                     <option value="">Select State</option>
//                     {Object.keys(LocationStateData).map((state) => (
//                       <option key={state} value={state}>
//                         {state}
//                       </option>
//                     ))}
//                   </select>
//                 </FormField>

//                 <FormField label="City">
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleCityChange}
//                     disabled={!formData.state}
//                     className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white disabled:bg-gray-100"
//                   >
//                     <option value="">SELECT</option>
//                     {cities.map((city) => (
//                       <option key={city} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                   </select>
//                 </FormField>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <FormField label="Representing VisitorType">
//                 <select
//                   name="representingVisitorType"
//                   value={formData.representingVisitorType}
//                   onChange={handleSelectChange}
//                   className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
//                 >
//                   <option value="">Select</option>
//                   <option value="AUDITOR">AUDITOR</option>
//                   <option value="VENDOR">VENDOR</option>
//                   <option value="CONTRACTOR">CONTRACTOR</option>
//                   <option value="CONSULTANT">CONSULTANT</option>
//                   <option value="VISITOR">VISITOR</option>
//                 </select>
//               </FormField>

//               <FormField label="Sub Location">
//                 <select
//                   name="subLocation"
//                   value={formData.subLocation}
//                   onChange={handleSelectChange}
//                   className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
//                 >
//                   <option value="">Select</option>
//                   <option value="MAIN">MAIN</option>
//                   <option value="BRANCH">BRANCH</option>
//                   <option value="OFFICE">OFFICE</option>
//                 </select>
//               </FormField>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <FormField label="To Meet with Employee">
//                 <select
//                   name="toMeetWith"
//                   value={formData.toMeetWith}
//                   onChange={handleSelectChange}
//                   className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
//                 >
//                   <option value="">Select</option>
//                   <option value="HR">HR Department</option>
//                   <option value="OPERATIONS">Operations</option>
//                   <option value="FINANCE">Finance</option>
//                   <option value="ADMIN">Admin</option>
//                 </select>
//               </FormField>

//               <FormField label="Carry With">
//                 <div className="space-y-2">
//                   {(["mobile", "laptop", "pendrive", "camera"] as const).map(
//                     (item) => (
//                       <label
//                         key={item}
//                         className="flex items-center cursor-pointer"
//                       >
//                         <Checkbox
//                           checked={formData.carryWith[item]}
//                           onChange={(e) => handleCheckboxChange(e, item)}
//                         />
//                         <span className="ml-2 text-sm uppercase">{item}</span>
//                       </label>
//                     ),
//                   )}
//                 </div>
//               </FormField>
//             </div>

//             <div className="grid grid-cols-2 gap-6 border-t-2 border-gray-200 pt-6">
//               <FormField label="ID Type">
//                 <select
//                   name="idType"
//                   value={formData.idType}
//                   onChange={handleSelectChange}
//                   className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
//                 >
//                   <option value="PASSPORT">PASSPORT</option>
//                   <option value="AADHAR">AADHAR</option>
//                   <option value="PAN">PAN</option>
//                   <option value="DL">DRIVING LICENSE</option>
//                 </select>
//               </FormField>

//               <FormField label="Id Number">
//                 <Input
//                   type="text"
//                   name="idNumber"
//                   value={formData.idNumber}
//                   onChange={handleInputChange}
//                   placeholder="Enter ID number"
//                 />
//               </FormField>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               <FormField label="Description">
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   placeholder="Enter description"
//                   className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none resize-none"
//                   rows={3}
//                 />
//               </FormField>

//               <div className="space-y-4">
//                 <FormField label="Mask/Covid Certificate">
//                   <div className="space-y-2">
//                     <label className="flex items-center cursor-pointer">
//                       <input
//                         type="radio"
//                         name="maskCovid"
//                         value="yes"
//                         checked={formData.maskCovid === "yes"}
//                         onChange={handleSelectChange}
//                         className="w-4 h-4 accent-teal-600"
//                       />
//                       <span className="ml-2 text-sm">Yes</span>
//                     </label>
//                     <label className="flex items-center cursor-pointer">
//                       <input
//                         type="radio"
//                         name="maskCovid"
//                         value="no"
//                         checked={formData.maskCovid === "no"}
//                         onChange={handleSelectChange}
//                         className="w-4 h-4 accent-teal-600"
//                       />
//                       <span className="ml-2 text-sm">No</span>
//                     </label>
//                   </div>
//                 </FormField>

//                 <FormField label="No of Person">
//                   <Input
//                     type="number"
//                     name="noOfPerson"
//                     value={formData.noOfPerson}
//                     onChange={handleInputChange}
//                     placeholder="Enter number"
//                     min="1"
//                   />
//                 </FormField>
//               </div>
//             </div>

//             <div className="border-t-2 border-gray-200 pt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Person Details
//               </h3>
//               {formData.persons.map((person, index) => (
//                 <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
//                   <div className="grid grid-cols-4 gap-4">
//                     <FormField label="Person Name">
//                       <Input
//                         value={person.name}
//                         onChange={(e) =>
//                           handlePersonChange(index, "name", e.target.value)
//                         }
//                       />
//                     </FormField>
//                     <FormField label="Person Phone No">
//                       <Input
//                         value={person.phoneNo}
//                         onChange={(e) =>
//                           handlePersonChange(index, "phoneNo", e.target.value)
//                         }
//                       />
//                     </FormField>
//                     <FormField label="Aadhar Number">
//                       <Input
//                         value={person.aadharNumber}
//                         onChange={(e) =>
//                           handlePersonChange(
//                             index,
//                             "aadharNumber",
//                             e.target.value,
//                           )
//                         }
//                       />
//                     </FormField>
//                     <FormField label="Aadhar File">
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="file"
//                           id={`file-${index}`}
//                           className="hidden"
//                           onChange={(e) =>
//                             handlePersonChange(
//                               index,
//                               "aadharFile",
//                               e.target.files?.[0] || null,
//                             )
//                           }
//                         />
//                         <label
//                           htmlFor={`file-${index}`}
//                           className="px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer text-xs"
//                         >
//                           {person.aadharFile
//                             ? person.aadharFile.name
//                             : "Choose File"}
//                         </label>
//                         {formData.persons.length > 1 && (
//                           <Button
//                             type="button"
//                             onClick={() => removePerson(index)}
//                             className="bg-red-600 text-white text-xs px-2 py-1"
//                           >
//                             X
//                           </Button>
//                         )}
//                       </div>
//                     </FormField>
//                   </div>
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 onClick={addPerson}
//                 className="bg-red-600 text-white px-4 py-2"
//               >
//                 + Add Person
//               </Button>
//             </div>

//             <div className="border-t-2 border-gray-200 pt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Visit Area
//               </h3>
//               <div className="grid grid-cols-3 gap-4">
//                 {visitAreaOptions.map((area) => (
//                   <label
//                     key={area}
//                     className="flex items-center cursor-pointer"
//                   >
//                     <Checkbox
//                       checked={formData.visitArea.includes(area)}
//                       onChange={(e) => handleCheckboxChange(e, "visitArea")}
//                       value={area}
//                     />
//                     <span className="ml-2 text-sm">{area}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-6 border-t-2 border-gray-200 pt-6">
//               <FormField label="Purpose">
//                 <select
//                   name="purpose"
//                   value={formData.purpose}
//                   onChange={handleSelectChange}
//                   className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none"
//                 >
//                   <option value="">Select</option>
//                   <option value="AUDIT">AUDIT</option>
//                   <option value="MEETING">MEETING</option>
//                 </select>
//               </FormField>
//               <FormField label="Allowed Hours">
//                 <Input
//                   name="allowedHours"
//                   value={formData.allowedHours}
//                   onChange={handleInputChange}
//                 />
//               </FormField>
//             </div>
//             <CameraInput
//               ref={cameraInputRef}
//               width="400px"
//               height="300px"
//               onCapture={() => {}}
//             />
//             <div className="flex gap-4 justify-center border-t-2 border-gray-200 pt-6">
//               <Button
//                 type="submit"
//                 className="px-8 py-2 bg-red-600 text-white font-semibold rounded"
//               >
//                 Submit
//               </Button>
//               <Button
//                 type="button"
//                 onClick={handleClear}
//                 className="px-8 py-2 bg-gray-500 text-white font-semibold rounded"
//               >
//                 Clear
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default CreatePassPage;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../shared/ui/atoms/Button";
import { Checkbox } from "../shared/ui/atoms/Checkbox";
import { FormField } from "../shared/ui/molecules/FormField";
import { Input } from "../shared/ui/atoms/Input";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../shared/ui/molecules/Card";
import { CameraInput, type CameraInputHandle } from "../pages/CameraInput";

interface PersonDetail {
  name: string;
  phoneNo: string;
  aadharNumber: string;
  aadharFile: File | null;
}

interface FormData {
  gatePassType: "single" | "multi";
  passDate: string;
  mobileNo: string;
  name: string;
  emailId: string;
  companyName: string;
  address: string;
  state: string;
  city: string;
  representingVisitorType: string;
  subLocation: string;
  toMeetWith: string;
  carryWith: {
    mobile: boolean;
    laptop: boolean;
    pendrive: boolean;
    camera: boolean;
  };
  idType: string;
  idNumber: string;
  description: string;
  maskCovid: "yes" | "no" | "";
  noOfPerson: string;
  persons: PersonDetail[];
  visitArea: string[];
  purpose: string;
  allowedHours: string;
}

const INITIAL_FORM_DATA: FormData = {
  gatePassType: "single",
  passDate: "",
  mobileNo: "",
  name: "",
  emailId: "",
  companyName: "",
  address: "",
  state: "",
  city: "",
  representingVisitorType: "",
  subLocation: "",
  toMeetWith: "",
  carryWith: {
    mobile: false,
    laptop: false,
    pendrive: false,
    camera: false,
  },
  idType: "PASSPORT",
  idNumber: "",
  description: "",
  maskCovid: "",
  noOfPerson: "",
  persons: [{ name: "", phoneNo: "", aadharNumber: "", aadharFile: null }],
  visitArea: [],
  purpose: "",
  allowedHours: "",
};

const visitAreaOptions = [
  "CPVC PLANT",
  "CA 1 PLANT",
  "STORE AREA",
  "H2O2 AREA",
  "OCD BLOCK",
  "CT PROJECT AREA",
  "ECH PLANT",
  "SECURITY BLOCK",
  "CA 2 PLANT",
  "CPP (POWER PLANT)",
  "SAFETY BLOCK",
  "CMS PLANT",
  "H2O2 PLANT",
  "ADMIN_BLOCK",
];

const CreatePassPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { states, cities, setSelectedState } = useLocation();

  const cameraInputRef = React.useRef<CameraInputHandle>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: keyof FormData["carryWith"] | "visitArea",
  ) => {
    const { value, checked } = e.target;
    if (category === "visitArea") {
      setFormData((prev) => ({
        ...prev,
        visitArea: checked
          ? [...prev.visitArea, value]
          : prev.visitArea.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        carryWith: { ...prev.carryWith, [category]: checked },
      }));
    }
  };

  const handlePersonChange = (
    index: number,
    field: keyof PersonDetail,
    value: string | File | null,
  ) => {
    setFormData((prev) => {
      const newPersons = [...prev.persons];
      newPersons[index] = { ...newPersons[index], [field]: value };
      return { ...prev, persons: newPersons };
    });
  };

  const addPerson = () => {
    setFormData((prev) => ({
      ...prev,
      persons: [
        ...prev.persons,
        { name: "", phoneNo: "", aadharNumber: "", aadharFile: null },
      ],
    }));
  };

  const removePerson = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      persons: prev.persons.filter((_, i) => i !== index),
    }));
  };

  const handleClear = () => {
    setFormData(INITIAL_FORM_DATA);
    cameraInputRef.current?.resetCamera();
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Capture photo
      const photoBlob = await cameraInputRef.current?.takePhoto();
      if (!photoBlob) {
        alert("Please take a photo before submitting!");
        setIsSubmitting(false);
        return;
      }

      // 2. Build FormData
      const payload = new FormData();

      // ── Scalar fields ──────────────────────────────────────────────────────
      const scalarFields: Array<
        keyof Omit<FormData, "carryWith" | "visitArea" | "persons">
      > = [
        "gatePassType",
        "passDate",
        "mobileNo",
        "name",
        "emailId",
        "companyName",
        "address",
        "state",
        "city",
        "representingVisitorType",
        "subLocation",
        "toMeetWith",
        "idType",
        "idNumber",
        "description",
        "maskCovid",
        "noOfPerson",
        "purpose",
        "allowedHours",
      ];

      scalarFields.forEach((key) => {
        payload.append(key, formData[key] as string);
      });

      // ── Object / array fields (JSON-encode so backend can parse) ───────────
      payload.append("carryWith", JSON.stringify(formData.carryWith));
      payload.append("visitArea", JSON.stringify(formData.visitArea));

      // ── Persons: send metadata as JSON + each file separately ──────────────
      // Strip File objects from the JSON — files travel as binary fields below
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const personsMetadata = formData.persons.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ aadharFile: _, ...rest }) => rest,
      );
      payload.append("persons", JSON.stringify(personsMetadata));

      // Append each person's aadhar file with a predictable key: aadharFile_0, aadharFile_1 …
      formData.persons.forEach((person, index) => {
        if (person.aadharFile) {
          payload.append(
            `aadharFile_${index}`,
            person.aadharFile,
            person.aadharFile.name,
          );
        }
      });

      // ── Camera photo ───────────────────────────────────────────────────────
      payload.append("photo", photoBlob, "visitor-photo.jpg");

      // 3. POST (let axios set Content-Type + boundary automatically)
      const response = await axios.post(
        "http://localhost:5000/api/v1/capture/upload",
        payload,
      );

      console.log("API Response:", response.data);
      alert("Gate pass created successfully!");
      handleClear();
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(
        error?.response?.data?.message ||
          "Submission failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Card className="max-w-6xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Create Gate Pass</CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Gate Pass Type & Date */}
            <div className="grid grid-cols-2 gap-8">
              <FormField label="Gate Pass Type">
                <div className="space-y-3">
                  {(["single", "multi"] as const).map((type) => (
                    <label
                      key={type}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="gatePassType"
                        value={type}
                        checked={formData.gatePassType === type}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-teal-600"
                      />
                      <span className="ml-3 text-sm font-medium capitalize">
                        {type === "single" ? "Single Day" : "Multi Day"}
                      </span>
                    </label>
                  ))}
                </div>
              </FormField>

              <FormField label="Pass Date">
                <Input
                  type="date"
                  name="passDate"
                  value={formData.passDate}
                  onChange={handleInputChange}
                />
              </FormField>
            </div>

            {/* Personal Information */}
            <div className="space-y-6 border-t-2 border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <FormField label="Name">
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                  />
                </FormField>
                <FormField label="Mobile No">
                  <Input
                    type="tel"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                  />
                </FormField>
                <FormField label="Email-Id">
                  <Input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                  />
                </FormField>
                <FormField label="Address">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none resize-none"
                    rows={3}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormField label="Company Name">
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FormField label="State">
                  <select
                    name="state"
                    value={formData.state}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    className="w-full px-3 py-2 border-b-2 border-gray-300
                    focus:border-red-600 focus:outline-none bg-white"
                    <option value="">Select State</option>
                    {states.map((s: any) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="City">
                  <select
                    name="city"
                    value={formData.city}
                    disabled={!formData.state}
                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white disabled:bg-gray-100"
                  >
                    <option value="">Select City</option>
                    {cities.map((c: any) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </div>

            {/* Visitor Details */}
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Representing Visitor Type">
                <select
                  name="representingVisitorType"
                  value={formData.representingVisitorType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="AUDITOR">AUDITOR</option>
                  <option value="VENDOR">VENDOR</option>
                  <option value="CONTRACTOR">CONTRACTOR</option>
                  <option value="CONSULTANT">CONSULTANT</option>
                  <option value="VISITOR">VISITOR</option>
                </select>
              </FormField>

              <FormField label="Sub Location">
                <select
                  name="subLocation"
                  value={formData.subLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="MAIN">MAIN</option>
                  <option value="BRANCH">BRANCH</option>
                  <option value="OFFICE">OFFICE</option>
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField label="To Meet with Employee">
                <select
                  name="toMeetWith"
                  value={formData.toMeetWith}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="HR">HR Department</option>
                  <option value="OPERATIONS">Operations</option>
                  <option value="FINANCE">Finance</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </FormField>

              <FormField label="Carry With">
                <div className="space-y-2">
                  {(["mobile", "laptop", "pendrive", "camera"] as const).map(
                    (item) => (
                      <label
                        key={item}
                        className="flex items-center cursor-pointer"
                      >
                        <Checkbox
                          checked={formData.carryWith[item]}
                          onChange={(e) => handleCheckboxChange(e, item)}
                          value={item}
                        />
                        <span className="ml-2 text-sm uppercase">{item}</span>
                      </label>
                    ),
                  )}
                </div>
              </FormField>
            </div>

            {/* ID Details */}
            <div className="grid grid-cols-2 gap-6 border-t-2 border-gray-200 pt-6">
              <FormField label="ID Type">
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none bg-white"
                >
                  <option value="PASSPORT">PASSPORT</option>
                  <option value="AADHAR">AADHAR</option>
                  <option value="PAN">PAN</option>
                  <option value="DL">DRIVING LICENSE</option>
                </select>
              </FormField>

              <FormField label="Id Number">
                <Input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  placeholder="Enter ID number"
                />
              </FormField>
            </div>

            {/* Description & Covid */}
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Description">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-red-600 focus:outline-none resize-none"
                  rows={3}
                />
              </FormField>

              <div className="space-y-4">
                <FormField label="Mask/Covid Certificate">
                  <div className="space-y-2">
                    {(["yes", "no"] as const).map((val) => (
                      <label
                        key={val}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="maskCovid"
                          value={val}
                          checked={formData.maskCovid === val}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-teal-600"
                        />
                        <span className="ml-2 text-sm capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                </FormField>

                <FormField label="No of Person">
                  <Input
                    type="number"
                    name="noOfPerson"
                    value={formData.noOfPerson}
                    onChange={handleInputChange}
                    placeholder="Enter number"
                    min="1"
                  />
                </FormField>
              </div>
            </div>

            {/* Person Details */}
            <div className="border-t-2 border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Person Details
              </h3>
              {formData.persons.map((person, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-4 gap-4">
                    <FormField label="Person Name">
                      <Input
                        value={person.name}
                        onChange={(e) =>
                          handlePersonChange(index, "name", e.target.value)
                        }
                      />
                    </FormField>
                    <FormField label="Person Phone No">
                      <Input
                        value={person.phoneNo}
                        onChange={(e) =>
                          handlePersonChange(index, "phoneNo", e.target.value)
                        }
                      />
                    </FormField>
                    <FormField label="Aadhar Number">
                      <Input
                        value={person.aadharNumber}
                        onChange={(e) =>
                          handlePersonChange(
                            index,
                            "aadharNumber",
                            e.target.value,
                          )
                        }
                      />
                    </FormField>
                    <FormField label="Aadhar File">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          id={`file-${index}`}
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            handlePersonChange(
                              index,
                              "aadharFile",
                              e.target.files?.[0] || null,
                            )
                          }
                        />
                        <label
                          htmlFor={`file-${index}`}
                          className="px-3 py-2 bg-white border border-gray-300 rounded cursor-pointer text-xs"
                        >
                          {person.aadharFile
                            ? person.aadharFile.name
                            : "Choose File"}
                        </label>
                        {formData.persons.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removePerson(index)}
                            className="bg-red-600 text-white text-xs px-2 py-1"
                          >
                            X
                          </Button>
                        )}
                      </div>
                    </FormField>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={addPerson}
                className="bg-red-600 text-white px-4 py-2"
              >
                + Add Person
              </Button>
            </div>

            {/* Visit Area */}
            <div className="border-t-2 border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Visit Area
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {visitAreaOptions.map((area) => (
                  <label
                    key={area}
                    className="flex items-center cursor-pointer"
                  >
                    <Checkbox
                      checked={formData.visitArea.includes(area)}
                      onChange={(e) => handleCheckboxChange(e, "visitArea")}
                      value={area}
                    />
                    <span className="ml-2 text-sm">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Purpose & Hours */}
            <div className="grid grid-cols-2 gap-6 border-t-2 border-gray-200 pt-6">
              <FormField label="Purpose">
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none"
                >
                  <option value="">Select</option>
                  <option value="AUDIT">AUDIT</option>
                  <option value="MEETING">MEETING</option>
                </select>
              </FormField>
              <FormField label="Allowed Hours">
                <Input
                  name="allowedHours"
                  value={formData.allowedHours}
                  onChange={handleInputChange}
                />
              </FormField>
            </div>

            {/* Camera */}
            <div className="border-t-2 border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Visitor Photo
              </h3>
              <CameraInput
                ref={cameraInputRef}
                width="400px"
                height="300px"
                onCapture={() => {}}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center border-t-2 border-gray-200 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 bg-red-600 text-white font-semibold rounded disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "Submit"}
              </Button>
              <Button
                type="button"
                onClick={handleClear}
                className="px-8 py-2 bg-gray-500 text-white font-semibold rounded"
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePassPage;
