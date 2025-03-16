"use client";
import Image from "next/image";
import { useAccount } from "wagmi";

export default function Post() {
  const { address } = useAccount();
  return (
    <section className="mx-auto px-20 my-2 max-w-6xl items-center rounded-2xl shadow-2xl overflow-y-auto">
      <Image src="./window.svg" alt="post_picture" width={100} height={100} />
      <div className=" text-6xl max-w-3xl ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        vero accusantium, iusto quidem incidunt quisquam? Aperiam suscipit,
        officiis pariatur ex totam consequuntur impedit velit quo.
      </div>
      {address?.slice(0, 4)}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, magnam!
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        sint commodi, culpa sapiente adipisci quidem a unde quibusdam soluta.
        Ipsum.
      </div>
    </section>
  );
}
