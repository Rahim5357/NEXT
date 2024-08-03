import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import MainHeaderBackground from './main-header-background';
import logoImg from '@/assets/logo.png';
import classes from "./main-hedaer.module.css";
import NavLink from './nav-link';

const MainHeader = () => {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes?.header}>
                <Link className={classes?.logo} href="/">
                    <Image src={logoImg} alt="A plate with food on it" priority />
                    NextLevel Food
                </Link>

                <nav className={classes?.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default MainHeader;