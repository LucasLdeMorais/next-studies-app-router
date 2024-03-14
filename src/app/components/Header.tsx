import type { ReactNode } from "react";
import Navigation from "./Navigation";

const Header = (): JSX.Element => {
    return <>
        <header>
            <h2>React Studies (Next.js)</h2>
            <Navigation />
        </header>
    </>
}

export default Header;