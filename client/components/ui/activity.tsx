export default function Activity() {
  return (
    <div className="w-full md:flex-1 lg:flex-2">
      <h1 className="text-xl md:text-2xl font-bold">Activities</h1>
      <h1 className="text-md md:text-lg font-extralight">
        Explore all the activities here
      </h1>
      <div className="bg-gray-200 shadow-xl rounded-xl w-full min-h-64 py-10 mt-4 flex items-center justify-center text-center">
        Your activity is empty now
      </div>
    </div>
  );
}
