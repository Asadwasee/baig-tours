"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/constants/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <ul className='hidden items-center gap-10 lg:flex'>
            {NAV_LINKS.map((item) => (
                <li key={item.title}>
                    <Link
                    href={item.href}
                    className={`font-medium transition-colors duration-300 ${
                        pathname === item.href
                        ? "font-semibold text-[#0F766E] "
                        : "text-[#1E293B] hover:text-[#0F766E]"
                    }`}>
                    {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}