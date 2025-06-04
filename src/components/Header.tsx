"use client";

// import { useRef, useState, useEffect, ReactNode, useCallback } from "react";
import { useRef, ReactNode } from "react";

import Link from "next/link";

// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";

// import Button from "@ui/Button";

// gsap.registerPlugin(useGSAP);

// const navLinks = [
//     { name: "Home", href: "#hero" },
//     { name: "About", href: "#about" },
//     { name: "Service", href: "#service" },
// ];

/**
 * Header component.
 * Renders the header with navigation and logo.
 * @returns {ReactNode} Rendered header component.
 */
function Header(): ReactNode {
    const header = useRef<HTMLDivElement>(null);
    // const nav = useRef<HTMLDivElement>(null);

    // const [navOpenState, setNavOpenState] = useState<
    //     "closed" | "opened" | "closing"
    // >("closed");

    // const toggleNav = useCallback(() => {
    //     if (navOpenState === "closed") {
    //         setNavOpenState("opened");
    //     } else if (navOpenState === "opened") {
    //         setNavOpenState("closing");
    //         if (nav.current) {
    //             nav.current.addEventListener(
    //                 "animationend",
    //                 () => {
    //                     setNavOpenState("closed");
    //                 },
    //                 {
    //                     once: true,
    //                 }
    //             );
    //         }
    //     }
    // }, [navOpenState]);

    // useGSAP(
    //     () => {
    //         let lastScrollY = window.scrollY;

    //         // Initial state
    //         // if (nav.current) {
    //         //     gsap.set(nav.current, {
    //         //         xPercent: 100,
    //         //         opacity: 0,
    //         //     });
    //         //     gsap.set(".nav-link", {
    //         //         x: 20,
    //         //         opacity: 0,
    //         //     });
    //         // }

    //         // Create animations
    //         // const openNav = gsap
    //         //     .timeline({
    //         //         paused: true,
    //         //     })
    //         //     .to(nav.current, {
    //         //         xPercent: 0,
    //         //         opacity: 1,
    //         //         duration: 0.4,
    //         //         ease: "power2.out",
    //         //     })
    //         //     .to(
    //         //         ".nav-link",
    //         //         {
    //         //             x: 0,
    //         //             opacity: 1,
    //         //             duration: 0.3,
    //         //             stagger: 0.1,
    //         //             ease: "power2.out",
    //         //         },
    //         //         "-=0.2"
    //         //     );

    //         // const closeNav = gsap
    //         //     .timeline({
    //         //         paused: true,
    //         //     })
    //         //     .to(".nav-link", {
    //         //         x: 20,
    //         //         opacity: 0,
    //         //         duration: 0.2,
    //         //         stagger: 0.05,
    //         //         ease: "power2.in",
    //         //     })
    //         //     .to(
    //         //         nav.current,
    //         //         {
    //         //             xPercent: 100,
    //         //             opacity: 0,
    //         //             duration: 0.3,
    //         //             ease: "power2.in",
    //         //         },
    //         //         "-=0.1"
    //         //     );

    //         // Watch for state changes and trigger animations
    //         // if (navOpenState === "opened") {
    //         //     openNav.play();
    //         // } else if (navOpenState === "closing") {
    //         //     closeNav.play().then(() => setNavOpenState("closed"));
    //         // }

    //         function handleScroll() {
    //             if (!header.current) return;
    //             const currentScrollY = window.scrollY;

    //             if (currentScrollY > lastScrollY) {
    //                 gsap.to(header.current, {
    //                     y: -header.current.offsetHeight,
    //                     duration: 0.25,
    //                 });
    //             } else {
    //                 gsap.to(header.current, { y: 0, duration: 0.25 });
    //             }

    //             lastScrollY = currentScrollY;
    //         }

    //         window.addEventListener("scroll", handleScroll);
    //         return () => {
    //             window.removeEventListener("scroll", handleScroll);
    //         };
    //     },
    //     { scope: header, dependencies: [navOpenState] }
    // );

    // Handle keyboard and scroll interactions
    // useEffect(() => {
    //     function handleKeyDown(e: KeyboardEvent) {
    //         if (navOpenState !== "opened") return;

    //         if (e.key === "Escape") {
    //             toggleNav();
    //             return;
    //         }
    //     }

    //     function handleScroll() {
    //         if (navOpenState === "opened") {
    //             setNavOpenState("closing");
    //             if (nav.current) {
    //                 nav.current.addEventListener(
    //                     "animationend",
    //                     () => {
    //                         setNavOpenState("closed");
    //                     },
    //                     { once: true }
    //                 );
    //             }
    //         }
    //     }

    //     window.addEventListener("keydown", handleKeyDown);
    //     window.addEventListener("scroll", handleScroll);

    //     return () => {
    //         window.removeEventListener("keydown", handleKeyDown);
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [navOpenState, toggleNav]);

    return (
        // header with nav style -> fixed left-0 top-0 isolate z-[1000] w-full
        <header
            className="Header w-full"
            ref={header}
            aria-label="Main Site Header"
        >
            <div className="Container flex flex-row items-center justify-between py-5">
                <div className="Header_logo">
                    <Link href="/" className="focus no-underline">
                        <h1 aria-hidden="true" className="Logo logo_main">
                            حَفْناوِيٍّ
                        </h1>
                        <span className="sr-only">hefnawy studio</span>
                    </Link>
                </div>
                {/* <div className="Header_nav">
                    <Button
                        className="Nav_toggle-button hidden max-md:relative max-md:z-[2] max-md:inline-flex"
                        iconOnlyAlt="Main Header Menu Toggle"
                        type="button"
                        aria-controls="main-navigation-list"
                        aria-expanded={navOpenState === "opened"}
                        handleClick={toggleNav}
                    >
                        <div
                            className={`Nav_burger ${navOpenState === "opened" ? "burgerActive" : ""}`}
                        >
                            <span className="sr-only">
                                {navOpenState === "opened"
                                    ? "Close Menu"
                                    : "Open Menu"}
                            </span>
                        </div>
                    </Button>
                    <nav
                        className="max-md:fixed max-md:left-0 max-md:top-0 max-md:z-[1] max-md:w-full max-md:bg-[var(--bg-clr-dark)] max-md:p-5"
                        ref={nav}
                        data-state={
                            navOpenState === "opened"
                                ? "opened"
                                : navOpenState === "closing"
                                  ? "closing"
                                  : "closed"
                        }
                        aria-label="Main Navigation"
                    >
                        <ul
                            id="main-navigation-list"
                            className="header__nav-list flex h-full items-center justify-end gap-8 max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-10"
                        >
                            {navLinks.map((link, index) => (
                                <li key={index} className="header__nav-item">
                                    <a
                                        href={link.href}
                                        className="Link focus nav-link"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                            <li className="header__nav-item header__nav-item--button">
                                <Button
                                    className="btn-primary"
                                    as="a"
                                    href="#input-name"
                                >
                                    Hire Us
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div> */}
            </div>
        </header>
    );
}

export default Header;

// TODO: make the nav
// TODO: what link should i add
// TODO: make a cool effect for the nav opening and closing with gsap
// TODO: add links and site info for the nav in phone size
