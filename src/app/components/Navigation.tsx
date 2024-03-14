'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import PostIts from "../PostIts/page";

export default function Navigation() {
    const pathname = usePathname();
    
    return <>
        <nav>
            <ul>
                <li>
                    <Link href={"/"} className={`link ${pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={"/PostIts"} className={`link ${pathname === '/' ? 'active' : ''}`}>
                        PostIts
                    </Link>
                </li>
            </ul>
        </nav>
    </>
}