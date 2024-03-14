"use client";

import styled from "styled-components";

const Footer = (): JSX.Element => {
    return <>
        <StyledFooter>
            footer
        </StyledFooter>
    </>
}

const StyledFooter = styled.footer`
    position: absolute; 
    bottom: 0;
    width: 100%;
    min-height: 100px;
    border-top: 1px solid black
`

export default Footer;