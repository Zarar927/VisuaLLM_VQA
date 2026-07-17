// // src/components/MainPage.jsx
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";

// /**
//  * If you have local UI components in src/components/ui/* (button, input, card),
//  * keep these imports. If not, this will still work using plain HTML elements.
//  */
// let Button, Textarea, Input, Card, CardContent;
// try {
//   Button = require("./ui/button").Button;
//   Textarea = require("./ui/textarea").Textarea;
//   Input = require("./ui/input").Input;
//   const cardModule = require("./ui/card");
//   Card = cardModule.Card;
//   CardContent = cardModule.CardContent;
// } catch (e) {
//   // fallback to simple components when shadcn/ui files are not available
//   Button = ({ children, ...p }) => <button {...p}>{children}</button>;
//   Textarea = (props) => <textarea {...props} />;
//   Input = (props) => <input {...props} />;
//   Card = ({ children, ...p }) => <div {...p}>{children}</div>;
//   CardContent = ({ children }) => <div>{children}</div>;
// }

// export default function MainPage() {
//   const [image, setImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageUpload = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;
//     setImage(URL.createObjectURL(file)); // client-only blob preview
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
//       const response = await fetch("http://127.0.0.1:8000/api/images/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setAnswer(data.answer || "No answer yet (processing).");
//       } else {
//         setError(data.error || "Server error.");
//       }
//     } catch (err) {
//       console.error("Network error:", err);
//       setError("Network error. Check backend and CORS.");
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
//         >
//           VisuaLLM
//         </motion.h1>

//         <p className="text-center text-white mb-10 text-lg">
//           Ask questions about any image using AI-powered vision and language models.
//         </p>

//         <Card className="p-6 space-y-4 shadow-xl bg-white/90 rounded-lg">
//           <Input type="file" accept="image/*" onChange={handleImageUpload} />

//           {image && (
//             <div className="flex justify-center">
//               <img
//                 src={image}
//                 alt="preview"
//                 width={300}
//                 height={300}
//                 style={{ borderRadius: 12, objectFit: "cover" }}
//               />
//             </div>
//           )}

//           <Textarea
//             placeholder="Type your question here..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="w-full"
//           />

//           {error && (
//             <motion.div className="bg-red-500 text-white p-3 rounded">
//               {error}
//             </motion.div>
//           )}

//           <div className="flex justify-end">
//             <Button onClick={handleSubmit} disabled={loading}>
//               {loading ? <Loader2 className="animate-spin mr-2" /> : null}
//               Ask
//             </Button>
//           </div>

//           {answer && (
//             <Card className="bg-green-50 p-4 mt-4">
//               <CardContent>
//                 <motion.p className="text-green-800 font-medium">Answer: {answer}</motion.p>
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

// export default function MainPage() {
//   const [image, setImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
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
//       const response = await fetch("http://127.0.0.1:8000/api/images/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setAnswer(data.answer);
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
//       <div className="max-w-4xl mx-auto space-y-10">
//         {/* Title */}
//         <motion.h1
//           className="text-5xl font-bold text-center text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           VisuaLLM
//         </motion.h1>

//         {/* Description */}
//         <p className="text-center text-white text-lg">
//           Upload any image and ask a question about it.  
//           Powered by AI vision and language models, this app gives you instant insights. 🚀
//         </p>

//         {/* Upload + Question Section */}
//         <Card className="p-6 shadow-xl bg-white/90 backdrop-blur-xl rounded-lg space-y-4">
//           {/* Image Upload */}
//           <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-6 cursor-pointer hover:bg-indigo-50 transition">
//             <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//             {image ? (
//               <Image src={image} alt="Uploaded" width={300} height={300} className="rounded-xl shadow-md" />
//             ) : (
//               <p className="text-indigo-500 font-medium">
//                 📂 Click or drag an image here to upload
//               </p>
//             )}
//           </label>

//           {/* Question Input */}
//           <Textarea
//             placeholder="Type your question here..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="border-2 border-indigo-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500"
//           />

//           {/* Error Message */}
//           {error && (
//             <motion.div
//               className="bg-red-500 text-white p-4 rounded-md"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p>{error}</p>
//             </motion.div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md shadow-lg transition-all"
//             >
//               {loading ? <Loader2 className="animate-spin mr-2" /> : null}
//               Ask
//             </Button>
//           </div>

//           {/* Answer Box */}
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

//         {/* About Me Section
//         <Card className="p-6 shadow-lg bg-white/80 rounded-lg text-center mt-10">
//           <h2 className="text-2xl font-bold text-indigo-600 mb-2">About Me</h2>
//           <p className="text-gray-700">
//             This project was designed and developed by <b>Zarar Ahmad</b>.  
//             I am passionate about Artificial Intelligence, Computer Vision,  
//             and creating intelligent solutions for real-world problems.
//           </p>
//         </Card> */}
//         {/* About Project Section */}
//         <Card className="p-6 shadow-lg bg-white/80 rounded-lg text-center mt-10">
//              <h2 className="text-2xl font-bold text-indigo-600 mb-2">About This Project</h2>
//              <p className="text-gray-700 leading-relaxed">
//              <b>VisuaLLM</b> is an AI-powered application that combines 
//                 <span className="text-indigo-600 font-medium"> Computer Vision </span> and 
//                 <span className="text-indigo-600 font-medium"> Natural Language Processing </span> 
//              to answer questions about images.  
//              <br /><br />
//                     Users can upload an image, ask a question in natural language, 
//                 and receive intelligent answers generated in real time.  
//             <br /><br />
//                 The project demonstrates the integration of a 
//              <span className="text-indigo-600 font-medium"> Django REST API backend </span> 
//             with a <span className="text-indigo-600 font-medium"> Next.js frontend </span>, 
//             providing a modern, user-friendly interface for seamless interaction.
//          </p>
//     </Card>
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

// export default function MainPage() {
//   const [image, setImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
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
//       const response = await fetch("http://127.0.0.1:8000/api/images/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setAnswer(data.answer);
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
//     <main className="min-h-screen w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-8">
//       <div className="max-w-4xl mx-auto space-y-10">
//         {/* Title */}
//         <motion.h1
//           className="text-5xl font-bold text-center text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           VisuaLLM
//         </motion.h1>

//         {/* Description */}
//         <p className="text-center text-white text-lg">
//           Upload any image and ask a question about it.  
//           Powered by AI vision and language models, this app gives you instant insights. 🚀
//         </p>

//         {/* Upload + Question Section */}
//         <Card className="p-6 shadow-xl bg-white/90 backdrop-blur-xl rounded-lg space-y-4">
//           {/* Image Upload */}
//           <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-6 cursor-pointer hover:bg-indigo-50 transition">
//             <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//             {image ? (
//               <Image src={image} alt="Uploaded" width={300} height={300} className="rounded-xl shadow-md" />
//             ) : (
//               <p className="text-indigo-500 font-medium">
//                 📂 Click or drag an image here to upload
//               </p>
//             )}
//           </label>

//           {/* Question Input */}
//           <Textarea
//             placeholder="Type your question here..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             className="border-2 border-indigo-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500"
//           />

//           {/* Error Message */}
//           {error && (
//             <motion.div
//               className="bg-red-500 text-white p-4 rounded-md"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p>{error}</p>
//             </motion.div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md shadow-lg transition-all"
//             >
//               {loading ? <Loader2 className="animate-spin mr-2" /> : null}
//               Ask
//             </Button>
//           </div>

//           {/* Answer Box */}
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

//         {/* About Project Section */}
//         <Card className="p-6 shadow-lg bg-white/90 backdrop-blur-xl rounded-lg text-center">
//           <h2 className="text-2xl font-bold text-indigo-600 mb-2">About This Project</h2>
//           <p className="text-gray-700 leading-relaxed">
//             <b>VisuaLLM</b> is an AI-powered application that combines 
//             <span className="text-indigo-600 font-medium"> Computer Vision </span> and 
//             <span className="text-indigo-600 font-medium"> Natural Language Processing </span> 
//             to answer questions about images.  
//             <br /><br />
//             Users can upload an image, ask a question in natural language, 
//             and receive intelligent answers generated in real time.  
//             <br /><br />
//             The project demonstrates the integration of a 
//             <span className="text-indigo-600 font-medium"> Django REST API backend </span> 
//             with a <span className="text-indigo-600 font-medium"> Next.js frontend </span>, 
//             providing a modern, user-friendly interface for seamless interaction.
//           </p>
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
// import { Loader2, Mic, FileDown } from "lucide-react";
// import { motion } from "framer-motion";

// export default function MainPage() {
//   const [image, setImage] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [pdfUrl, setPdfUrl] = useState(""); // 📄 PDF file link
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 📸 Handle Image Upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(URL.createObjectURL(file));
//     setImageFile(file);
//   };

//   // 🎤 Voice Input
//   const handleVoiceInput = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       setError("Voice recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.start();

//     recognition.onresult = (event) => {
//       const speechText = event.results[0][0].transcript;
//       setQuestion(speechText);
//     };

//     recognition.onerror = () => {
//       setError("Voice recognition failed. Please try again.");
//     };
//   };

//   // 🚀 Submit Image + Question
//   const handleSubmit = async () => {
//     if (!question || !imageFile) {
//       setError("Please enter a question and upload an image!");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setAnswer("");
//     setPdfUrl("");

//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("question", question);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/images/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setAnswer(data.answer);

//         // 📄 If backend sends PDF URL
//         if (data.pdf_url) {
//           setPdfUrl(data.pdf_url);
//         }
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
//     <main className="min-h-screen w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-8">
//       <div className="max-w-4xl mx-auto space-y-10">

//         {/* Title */}
//         <motion.h1
//           className="text-5xl font-bold text-center text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           VisuaLLM
//         </motion.h1>

//         {/* Description */}
//         <p className="text-center text-white text-lg">
//           Upload any image and ask a question about it.  
//           Powered by AI vision and language models, this app gives you instant insights. 🚀
//         </p>

//         {/* Upload + Question Section */}
//         <Card className="p-6 shadow-xl bg-white/90 backdrop-blur-xl rounded-lg space-y-4">

//           {/* Image Upload */}
//           <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-6 cursor-pointer hover:bg-indigo-50 transition">
//             <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//             {image ? (
//               <Image src={image} alt="Uploaded" width={300} height={300} className="rounded-xl shadow-md" />
//             ) : (
//               <p className="text-indigo-500 font-medium">
//                 📂 Click or drag an image here to upload
//               </p>
//             )}
//           </label>

//           {/* Question Input + Voice Button */}
//           <div className="flex gap-2 items-start">
//             <Textarea
//               placeholder="Type your question here or use voice..."
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               className="border-2 border-indigo-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500"
//             />
//             <Button
//               onClick={handleVoiceInput}
//               className="bg-pink-600 hover:bg-pink-700 text-white px-4"
//               title="Speak your question"
//             >
//               <Mic />
//             </Button>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <motion.div
//               className="bg-red-500 text-white p-4 rounded-md"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <p>{error}</p>
//             </motion.div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <Button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md shadow-lg transition-all"
//             >
//               {loading ? <Loader2 className="animate-spin mr-2" /> : null}
//               Ask
//             </Button>
//           </div>

//           {/* Answer Box */}
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

//                 {/* 📄 PDF Download Button */}
//                 {pdfUrl && (
//                   <div className="mt-4">
//                     <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
//                       <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
//                         <FileDown className="mr-2" />
//                         Download PDF
//                       </Button>
//                     </a>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )}
//         </Card>

//         {/* About Project Section */}
//         <Card className="p-6 shadow-lg bg-white/90 backdrop-blur-xl rounded-lg text-center">
//           <h2 className="text-2xl font-bold text-indigo-600 mb-2">About This Project</h2>
//           <p className="text-gray-700 leading-relaxed">
//             <b>VisuaLLM</b> is an AI-powered application that combines 
//             <span className="text-indigo-600 font-medium"> Computer Vision </span> and 
//             <span className="text-indigo-600 font-medium"> Natural Language Processing </span> 
//             to answer questions about images.  
//             <br /><br />
//             Users can upload an image, ask a question in natural language, 
//             and receive intelligent answers generated in real time.  
//             <br /><br />
//             The project demonstrates the integration of a 
//             <span className="text-indigo-600 font-medium"> Django REST API backend </span> 
//             with a <span className="text-indigo-600 font-medium"> Next.js frontend </span>, 
//             providing a modern, user-friendly interface for seamless interaction.
//           </p>
//         </Card>
//       </div>
//     </main>
//   );
// }


"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Mic, FileDown } from "lucide-react";
import { motion } from "framer-motion";

// ✅ Backend URL
const BACKEND_URL = "http://127.0.0.1:8000";

export default function MainPage() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pdfUrl, setPdfUrl] = useState(""); // PDF link
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 📸 Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setImageFile(file);
  };

  // 🎤 Voice Input
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setQuestion(speechText);
    };

    recognition.onerror = () => {
      setError("Voice recognition failed. Please try again.");
    };
  };

  // 🚀 Submit Image + Question
  const handleSubmit = async () => {
    if (!question || !imageFile) {
      setError("Please enter a question and upload an image!");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");
    setPdfUrl("");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("question", question);

    try {
      const response = await fetch(`${BACKEND_URL}/api/images/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);

        // ✅ Fix PDF link
        if (data.pdf_url) {
          setPdfUrl(`${BACKEND_URL}${data.pdf_url}`);
        }
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Title */}
        <motion.h1
          className="text-5xl font-bold text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          VisuaLLM
        </motion.h1>

        {/* Description */}
        <p className="text-center text-white text-lg">
          Upload any image and ask a question about it.  
          Powered by AI vision and language models, this app gives you instant insights. 🚀
        </p>

        {/* Upload + Question Section */}
        <Card className="p-6 shadow-xl bg-white/90 backdrop-blur-xl rounded-lg space-y-4">

          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 rounded-lg p-6 cursor-pointer hover:bg-indigo-50 transition">
            <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            {image ? (
              <Image src={image} alt="Uploaded" width={300} height={300} className="rounded-xl shadow-md" />
            ) : (
              <p className="text-indigo-500 font-medium">
                📂 Click or drag an image here to upload
              </p>
            )}
          </label>

          {/* Question Input + Voice Button */}
          <div className="flex gap-2 items-start">
            <Textarea
              placeholder="Type your question here or use voice..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="border-2 border-indigo-300 p-2 rounded-md w-full focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              onClick={handleVoiceInput}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4"
              title="Speak your question"
            >
              <Mic />
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="bg-red-500 text-white p-4 rounded-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md shadow-lg transition-all"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              Ask
            </Button>
          </div>

          {/* Answer Box */}
          {answer && (
            <Card className="bg-green-50 p-4 mt-6 rounded-md shadow-md">
              <CardContent>
                <motion.p
                  className="text-green-800 font-medium text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Answer: {answer}
                </motion.p>

                {/* 📄 PDF Download Button */}
                {pdfUrl && (
                  <div className="mt-4">
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <FileDown className="mr-2" />
                        Download PDF
                      </Button>
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </Card>
        {/* //         {/* About Project Section */}
       <Card className="p-6 shadow-lg bg-white/90 backdrop-blur-xl rounded-lg text-center">
           <h2 className="text-2xl font-bold text-indigo-600 mb-2">About This Project</h2>
           <p className="text-gray-700 leading-relaxed">
            <b>VisuaLLM</b> is an AI-powered application that combines 
            <span className="text-indigo-600 font-medium"> Computer Vision </span> and 
             <span className="text-indigo-600 font-medium"> Natural Language Processing </span> 
            to answer questions about images.  
            <br /><br />
            Users can upload an image, ask a question in natural language, 
            and receive intelligent answers generated in real time.  
            <br /><br />
            The project demonstrates the integration of a 
             <span className="text-indigo-600 font-medium"> Django REST API backend </span> 
            with a <span className="text-indigo-600 font-medium"> Next.js frontend </span>, 
             providing a modern, user-friendly interface for seamless interaction.
           </p>
         </Card> 

      </div>
    </main>
  );
}
