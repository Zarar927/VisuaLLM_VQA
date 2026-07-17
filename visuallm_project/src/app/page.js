// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import { motion } from "framer-motion"; // Import framer-motion for animations

// export default function Home() {
//   const [image, setImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null); // Store the actual file for uploading
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImage(URL.createObjectURL(file)); // Preview image
//     setImageFile(file); // Store file to send to backend
//   };

//   const handleSubmit = async () => {
//     if (!question || !imageFile) {
//       setError("Please enter a question and upload an image!");
//       return;
//     }
//     setLoading(true);
//     setError(""); // Clear previous errors

//     // Form data to send image and question
//     const formData = new FormData();
//     formData.append("image", imageFile); // "imageFile" should be the selected file from the input
//     formData.append("question", question);

//     // Send data to the backend (replace with your backend API)
//     try {
//       const response = await fetch("/api/ask", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setAnswer(data.answer); // Get the generated answer
//       } else {
//         setError(data.error || "Something went wrong!");
//       }
//     } catch (error) {
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
//       <div className="max-w-4xl mx-auto">
//         <motion.h1
//           className="text-5xl font-bold text-center text-white mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           VisuaLLM
//         </motion.h1>
//         <p className="text-center text-white mb-10 text-lg">
//           Ask questions about any image using AI-powered vision and language models.
//         </p>

//         <Card className="p-6 space-y-4 shadow-xl bg-white/90 backdrop-blur-xl rounded-lg">
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="border-2 border-indigo-300 rounded-md p-2"
//           />
//           {image && (
//             <div className="flex justify-center">
//               <Image
//                 src={image}
//                 alt="Uploaded"
//                 width={300}
//                 height={300}
//                 className="rounded-xl shadow-md transition-all transform hover:scale-105"
//               />
//             </div>
//           )}

//           <Textarea
//             placeholder="Type your question here..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="border-2 border-indigo-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 transition-all"
//           />

//           {error && (
//             <motion.div
//               className="bg-red-500 text-white p-4 rounded-md mt-4"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p className="font-semibold">{error}</p>
//             </motion.div>
//           )}

//           <div className="flex justify-end">
//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
//             >
//               {loading ? (
//                 <motion.div
//                   className="animate-spin mr-2 h-5 w-5"
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: 360 }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 1,
//                     ease: "linear",
//                   }}
//                 >
//                   <Loader2 />
//                 </motion.div>
//               ) : null}
//               Ask
//             </Button>
//           </div>

//           {answer && (
//             <Card className="bg-green-50 p-4 mt-6 rounded-md shadow-md">
//               <CardContent>
//                 <motion.p
//                   className="text-green-800 font-medium text-lg"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   Answer: {answer}
//                 </motion.p>
//               </CardContent>
//             </Card>
//           )}
//         </Card>
//       </div>
//     </main>
//   );
// }

// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Home() {
//   const [image, setImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null); 
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(URL.createObjectURL(file)); 
//     setImageFile(file); 
//   };

//   const handleSubmit = async () => {
//     if (!question || !imageFile) {
//       setError("Please enter a question and upload an image!");
//       return;
//     }
//     setLoading(true);
//     setError("");

//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("question", question);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/images/", {  // Updated URL
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setAnswer(data.answer || ""); // Display the answer from backend
//       } else {
//         setError(data.error || "Something went wrong!");
//       }
//     } catch (err) {
//       setError("Network error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
//       <div className="max-w-4xl mx-auto">
//         <motion.h1
//           className="text-5xl font-bold text-center text-white mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           VisuaLLM
//         </motion.h1>
//         <p className="text-center text-white mb-10 text-lg">
//           Ask questions about any image using AI-powered vision and language models.
//         </p>

//         <Card className="p-6 space-y-4 shadow-xl bg-white/90 backdrop-blur-xl rounded-lg">
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="border-2 border-indigo-300 rounded-md p-2"
//           />
//           {image && (
//             <div className="flex justify-center">
//               <Image
//                 src={image}
//                 alt="Uploaded"
//                 width={300}
//                 height={300}
//                 className="rounded-xl shadow-md transition-all transform hover:scale-105"
//               />
//             </div>
//           )}

//           <Textarea
//             placeholder="Type your question here..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="border-2 border-indigo-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500 transition-all"
//           />

//           {error && (
//             <motion.div
//               className="bg-red-500 text-white p-4 rounded-md mt-4"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p className="font-semibold">{error}</p>
//             </motion.div>
//           )}

//           <div className="flex justify-end">
//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
//             >
//               {loading && (
//                 <motion.div
//                   className="animate-spin mr-2 h-5 w-5"
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: 360 }}
//                   transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                 >
//                   <Loader2 />
//                 </motion.div>
//               )}
//               Ask
//             </Button>
//           </div>

//           {answer && (
//             <Card className="bg-green-50 p-4 mt-6 rounded-md shadow-md">
//               <CardContent>
//                 <motion.p
//                   className="text-green-800 font-medium text-lg"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 1 }}
//                 >
//                   Answer: {answer}
//                 </motion.p>
//               </CardContent>
//             </Card>
//           )}
//         </Card>
//       </div>
//     </main>
//   );
// }

// src/app/page.js
// import MainPage from "../components/ui/MainPage";

// export default function Page() {
//   return <MainPage />;
// }
// src/app/page.js
// src/app/page.js
import MainPage from "../components/ui/MainPage";
import AboutMe from "../components/ui/AboutMe"; // import AboutMe component

export default function Page() {
  return (
    <>
      <MainPage />
      <AboutMe />
    </>
  );
}







