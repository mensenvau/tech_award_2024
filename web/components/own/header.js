"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CircleX, PanelRight } from "lucide-react";
import { ModeToggle } from "../theme/theme-button";
import { SubLayout } from "./layout";

const menus = [
    { name: "Bo'sh ish o'rinlari", href: "/" },
    { name: "Telegram kanallar", href: "/channels" },
];

function MenuLink({ item, onClick }) {
    return (
        <Link href={item.href} onClick={onClick} className="text-base font-medium dark:text-white-600 leading-7 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-3 py-2">
            {item.name}
        </Link>
    );
}

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <header className="py-2">
            <SubLayout>
                <nav className="flex flex-row justify-between w-full">
                    <Link href="/" className="flex items-center font-medium py-2">
                        <Image src="/star.png" alt="-" width="24" height="24" className="h-6 w-6" />
                        <h1 className="font-bold text-2xl sm:inline-block ml-2">Jobgram</h1>
                    </Link>

                    <div className="hidden lg:flex justify-center w-full">
                        {menus.map((item) => (
                            <MenuLink key={item.href} item={item} />
                        ))}
                    </div>

                    <button type="button" className="lg:hidden lg:flex justify-end" onClick={toggleMobileMenu}>
                        <span className="sr-only">Open main menu</span>
                        <PanelRight className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <ModeToggle className="hidden lg:flex justify-end" />
                </nav>

                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={toggleMobileMenu}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-slate-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <span className="font-bold sm:inline-block">Jobgram</span>
                            </Link>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 dark:text-white" onClick={toggleMobileMenu}>
                                <span className="sr-only">Close menu</span>
                                <CircleX className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="flex flex-col divide-y divide-gray-500/10">
                                {menus.map((item, index) => (
                                    <MenuLink key={index} item={item} onClick={toggleMobileMenu} />
                                ))}
                                <ModeToggle className="px-3 py-2" />
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </SubLayout>
        </header>
    );
}
