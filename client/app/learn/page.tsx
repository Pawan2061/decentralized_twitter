import { FeatureDemo } from "@/components/learn-feature";

export default function Learn() {
  return (
    <section className="mx-auto px-20 my-2 py-6 max-w-6xl space-y-16 items-center rounded-2xl shadow-2xl overflow-y-auto">
      <div>
        <h1 className="text-4xl font-semibold">Featured learnings</h1>
        <h1 className="font-normal text-lg text-gray-400">
          The most interesting things to learn here
        </h1>
      </div>
      <div>
        <FeatureDemo />
      </div>
      <div>3</div>
    </section>
  );
}
