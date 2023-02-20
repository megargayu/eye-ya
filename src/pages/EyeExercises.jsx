const Tablet = ({ link }) => {
  return (
    <div className="w-80 h-44 bg-slate-600 rounded-lg p-2">
      <iframe
        width="100%"
        height="100%"
        src={link}
        className="border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

const EyeExercises = () => {
  return (
    <div className="mx-5 flex justify-center flex-col items-center h-[calc(100%-8.5rem)]">
      <h1 className="text-3xl text-white mb-5">eye exercise videos</h1>
      <div className="flex flex-row space-x-6">
        <Tablet link="https://www.youtube.com/embed/mqXR8O2VJLo" />
        <Tablet link="https://www.youtube.com/embed/J7KVbo1ABcc" />
        <Tablet link="https://www.youtube.com/embed/tvb1kjP2mSY" />
      </div>

      <button className="px-7 h-12 rounded-full bg-gray-500 cursor-not-allowed mt-10 text-white text-xl">start virtual exercise (coming soon...)</button>
    </div>
  );
};
export default EyeExercises;
