"use client";

import { Header } from "./header";
import { Search } from "./search";

export function MainLayout({ children }) {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <div className="py-2 pb-12 border-b bg-white dark:bg-background">
                    <Header />
                    <Search />
                </div>

                <div className="sm:py-4 flex-grow bg-neutral-50 dark:bg-gray-900">
                    <SubLayout > {children} </SubLayout>
                </div>
            </div>
        </div>
    );
}

export function SubLayout({ children, className }) {
    return <div className={`max-w-7xl mx-auto px-2 sm:px-6 ${className}`}>{children}</div>;
}
