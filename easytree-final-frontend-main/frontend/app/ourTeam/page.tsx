import Link from 'next/link'
import { Gitlab } from "lucide-react";
import Image from 'next/image';

export default function page() {
    return (
        <div className="container flex-col space-y-6">
            <section className="flex items-center font-poppins dark:bg-gray-800">
                <div className="justify-center flex-1 py-8 px-4 mx-auto max-w-7xl lg:py-4 md:px-6">
                    <div className="text-center mb-14">
                        <h1 className="text-3xl font-bold capitalize dark:text-white"> Meet Our  <span className='text-green-800'>Talented</span> Team </h1>
                    </div>
                    <div className="flex flex-wrap justify-center -mx-4">
                        <div className="w-full px-4 mb-10 sm:w-1/2 lg:w-1/3">
                            <div className="mx-auto text-center">
                                <div
                                    className="inline-block overflow-hidden text-xs text-white bg-blue-500/50 rounded-full w-44 h-44">
                                    <Image className="object-cover w-full h-full transition-all hover:scale-110"
                                        src="/jim.png" alt="jim" />
                                </div>
                                <h2 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-gray-300">Jim Kendzierski</h2>
                                <span className="inline-block mb-3 text-base font-medium text-teal-500 dark:text-gray-400">Frontend
                                </span>
                                <div className="flex items-center justify-center">
                                    <Link href="https://gitlab.bht-berlin.de/s84761" className="inline-block">
                                        <Gitlab color="#e2432a" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 sm:w-1/2 lg:w-1/3 ">
                            <div className="mx-auto text-center">
                                <div
                                    className="inline-block overflow-hidden text-xs text-white bg-teal-500 rounded-full w-44 h-44">
                                    <Image className="object-cover w-full h-full transition-all hover:scale-110"
                                        src="/jesse.png" alt="jesse" />
                                </div>
                                <h2 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-gray-300">Jesse Städter</h2>
                                <span className="inline-block mb-3 text-base font-medium text-teal-500 dark:text-gray-400">Frontend
                                </span>
                                <div className="flex items-center justify-center">
                                    <Link href="https://gitlab.bht-berlin.de/s88539" className="inline-block">
                                        <Gitlab color="#e2432a" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 sm:w-1/2 lg:w-1/3 ">
                            <div className="mx-auto text-center">
                                <div
                                    className="inline-block overflow-hidden text-xs text-white bg-pink-500/50 rounded-full w-44 h-44">
                                    <Image className="object-cover w-full h-full transition-all hover:scale-110"
                                        src="/anna.png" alt="anna" />
                                </div>
                                <h2 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-gray-300">Anna Nguyen</h2>
                                <span
                                    className="inline-block mb-3 text-base font-medium text-teal-500 dark:text-gray-400">Frontend
                                </span>
                                <div className="flex items-center justify-center">
                                    <Link href="https://gitlab.bht-berlin.de/s89203" className="inline-block">
                                        <Gitlab color="#e2432a" />
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 sm:w-1/2 lg:w-1/3 ">
                            <div className="mx-auto text-center">
                                <div
                                    className="inline-block overflow-hidden text-xs text-white bg-red-500 rounded-full w-44 h-44">
                                    <Image className="object-cover w-full h-full transition-all hover:scale-110"
                                        src="/irfan.png" alt="irfan" />
                                </div>
                                <h2 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-gray-300">Irfan Karakas</h2>
                                <span className="inline-block mb-3 text-base font-medium text-teal-500 dark:text-gray-400">Backend
                                </span>
                                <div className="flex items-center justify-center">
                                    <Link href="https://gitlab.bht-berlin.de/s89203" className="inline-block">
                                        <Gitlab color="#e2432a" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 sm:w-1/2 lg:w-1/3 ">
                            <div className="mx-auto text-center">
                                <div
                                    className="inline-block overflow-hidden text-xs text-white bg-yellow-500 rounded-full w-44 h-44">
                                    <Image className="object-cover w-full h-full transition-all hover:scale-110"
                                        src="/kjeld.png" alt="kjeld" />
                                </div>
                                <h2 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-gray-300">Kjeld Hubein</h2>
                                <span className="inline-block mb-3 text-base font-medium text-teal-500 dark:text-gray-400">Backend</span>
                                <div className="flex items-center justify-center">
                                    <Link href="https://gitlab.bht-berlin.de/s51071" className="inline-block">
                                        <Gitlab color="#e2432a" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 sm:w-1/2 lg:w-1/3 ">
                            <div className="mx-auto text-center">
                                <div
                                    className="inline-block overflow-hidden text-xs text-white bg-slate-400 rounded-full w-44 h-44">
                                    <Image className="object-cover w-full h-full transition-all hover:scale-110"
                                        src="/jan.png" alt="jan" />
                                </div>
                                <h2 className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-gray-300">Jan Jores</h2>
                                <span className="inline-block mb-3 text-base font-medium text-teal-500 dark:text-gray-400">Backend
                                </span>
                                <div className="flex items-center justify-center">
                                    <Link href="https://gitlab.bht-berlin.de/s81917" className="inline-block">
                                        <Gitlab color="#e2432a" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}