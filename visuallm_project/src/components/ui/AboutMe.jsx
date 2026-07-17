"use client";

export default function AboutMe() {
  return (
    <section className="bg-gray-50 text-gray-900 py-10 px-6 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">About Me</h2>
      <p className="text-center text-lg max-w-2xl mx-auto leading-relaxed">
        Hello! I’m <span className="font-semibold">Zarar Ahmad</span>, a
        passionate developer specializing in{" "}
        <span className="font-medium">Artificial Intelligence</span>,{" "}
        <span className="font-medium">Computer Vision</span>, and intelligent
        solutions for real-world challenges.
      </p>

      <div className="text-center mt-6">
        <p className="text-md">📧 Email: <a href="mailto:zararahmad92727@gmail.com" className="text-blue-600 hover:underline">zararahmad92727@gmail.com</a></p>
      </div>
    </section>
  );
}
