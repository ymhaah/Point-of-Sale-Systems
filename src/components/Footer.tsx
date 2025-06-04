import { ReactNode } from "react";

import Link from "next/link";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SocialLinks from "@ui/SocialLinks";
import LocalTime from "@ui/LocalTime";

/**
 * Footer component renders the footer with various link sections.
 * @returns {React.ReactNode} The rendered footer component.
 */
function Footer(): ReactNode {
    // ? each object in footerLinks array is a column the footer that contains a title and links
    const footerLinks = [
        {
            title: "Buyers",
            links: [
                { href: "#", text: "Authentication", outside: false },
                { href: "#", text: "User Management", outside: false },
                { href: "#", text: "Lead Generation", outside: false },
                { href: "#", text: "Connected Apps", outside: false },
            ],
        },
    ];

    return (
        <footer
            className="main-footer w-full overflow-hidden"
            aria-label="main site footer"
        >
            <div className="Container relative flex flex-col">
                <section className="footer_header flex w-full flex-row justify-center gap-8 pt-20 pb-5 max-sm:flex-col max-sm:gap-5">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="text-center">
                            <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
                                Start Building
                            </h2>
                            <p className="mt-4">
                                Libero sapiente aliquam quibusdam aspernatur.
                            </p>

                            <div className="mt-12 flex flex-wrap justify-center gap-4">
                                <Button className="btn-mono-light">
                                    Get Started
                                </Button>
                                <Button className="btn-mono-light">
                                    Book Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer_header flex w-full flex-row justify-between gap-10 pt-20 pb-5 max-md:flex-col-reverse">
                    <div className="header_info flex flex-col">
                        <Link href="/" className="focus no-underline">
                            <h1 aria-hidden="true" className="Logo logo_main">
                                حَفْناوِيٍّ
                            </h1>
                            <span className="sr-only">hefnawy studio</span>
                        </Link>
                        <small className="md:max-w-[50ch]">
                            Hefnawy Studio is a design studio that focuses on
                            creating innovative and visually stunning websites
                            and applications.
                        </small>
                    </div>
                </section>
                {/* {footerLinks.map((item, index) => (
                    <nav key={index} aria-label="secondary Navigation">
                        <h2 className="footer__title">{item.title}</h2>
                        <ul>
                            {item.links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="small focus"
                                        rel={
                                            link.outside
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        target={
                                            link.outside ? "_blank" : undefined
                                        }
                                    >
                                        {link.text}
                                        {link.outside && (
                                        <img
                                            src={north_east}
                                            alt=""
                                            role="presentation"
                                        />
                                    )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
                {footerLinks.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start justify-start gap-4"
                    >
                        <h2 className="text-base font-medium capitalize text-txt-clr-900">
                            {item.title}
                        </h2>
                        <ul>
                            {item.links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="flex flex-row items-center justify-start gap-2 text-base font-normal capitalize text-txt-clr-900"
                                    >
                                        {link.text}
                                        {link.outside && (
                                            <img
                                                src={north_east}
                                                alt=""
                                                role="presentation"
                                                className="h-[0.5em]"
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))} */}
                <section className="footer_bottom flex w-full flex-row justify-between gap-5 pt-16 pb-5 max-sm:flex-col-reverse">
                    <div className="footer_info flex flex-grow justify-start gap-5 max-sm:w-full max-sm:flex-wrap max-sm:items-start max-sm:justify-between">
                        <div className="flex flex-col">
                            <h2 className="small mb-5">Version</h2>
                            <p>2025 © Edition</p>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="small mb-5">Local time</h2>
                            <LocalTime />
                        </div>
                    </div>
                    <span className="Line mt-5 h-[0.5px] w-full opacity-25 sm:hidden"></span>
                    <nav
                        className="flex flex-col items-start max-sm:w-full"
                        aria-label="social media links"
                    >
                        <h2 className="small mb-5">Socials</h2>
                        <SocialLinks />
                    </nav>
                </section>
            </div>
        </footer>
    );
}

export default Footer;

// TODO: make a cool effect\design for the footer
// TODO: make some game or a cool meme thing for the footer
