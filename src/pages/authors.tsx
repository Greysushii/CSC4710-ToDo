import { type NextPage } from "next";
import { useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Head from "next/head";
import Image from "next/image";

import {
  CADE_BIO,
  GREY_BIO,
  JACK_BIO_PARA_1,
  JACK_BIO_PARA_2,
  MANPREET_BIO,
} from "~/utils/author-bios";
import Navbar from "~/components/navigation/Navbar";

const About: NextPage = () => {
  useEffect(() => toast.dismiss(), []); // Dismiss toasts from other pages.

  return (
    <>
      <Head>
        <title>ToDo App Authors Page</title>
        <meta name="description" content="Project Authors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-b from-[#2e026d] to-[#15162c] pb-40 text-white">
        <div className="container px-4 py-4 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            The <span className="text-[hsl(280,100%,70%)]">Authors</span>
          </h1>
        </div>
        <div className="flex flex-col items-center gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex min-h-screen snap-y flex-col items-center"
          >
            <h2 className="mb-8 text-6xl font-bold">Cayden Koweck</h2>
            <Image
              className="rounded-full"
              src="/Cade_Koweck.jpg"
              height={350}
              width={350}
              alt="Cade"
            />
            <p className="px-40 pt-10 indent-16 text-xl">{CADE_BIO}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex min-h-screen snap-y flex-col items-center"
          >
            <h2 className="mb-8 text-6xl font-bold">Jack Flenna</h2>
            <Image
              className="rounded-full"
              src="/Cayden_Coweck.jpg"
              height={350}
              width={350}
              alt="Cade"
            />
            <p className="mb-5 px-40 pt-10 indent-16 text-xl">
              {JACK_BIO_PARA_1}
            </p>
            <p className="px-40 indent-16 text-xl">{JACK_BIO_PARA_2}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex min-h-screen snap-y flex-col items-center"
          >
            <h2 className="mb-8 text-6xl font-bold">Grey Slatina</h2>
            <Image
              className="rounded-full"
              src="/Cayden_Koweck.jpg"
              height={350}
              width={350}
              alt="Cade"
            />
            <p className="px-40 pt-10 indent-16 text-xl">{GREY_BIO}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex min-h-screen snap-y flex-col items-center"
          >
            <h2 className="mb-8 text-6xl font-bold">Manpreet</h2>
            <Image
              className="rounded-full"
              src="/Cayden_Kwalvik.jpg"
              height={350}
              width={350}
              alt="Cade"
            />
            <p className="px-40 pt-10 indent-16 text-xl">{MANPREET_BIO}</p>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default About;
