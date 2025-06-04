import { ReactNode } from "react";

/**
 * SocialLinks component renders a list of social media links.
 * @returns {ReactNode} Rendered social media links.
 */
function SocialLinks(): ReactNode {
    const socialLinks = [
        {
            href: "https://www.instagram.com/hefnawystudio/",
            siteName: "Instagram",
        },
        {
            href: "https://x.com/hafanwy",
            siteName: "Twitter",
        },
        {
            href: "https://www.linkedin.com/in/youssef-hefnawy/",
            siteName: "Linkedin",
        },
        {
            href: "https://medium.com/@Youssef_Hefnawy",
            siteName: "Medium",
        },
    ];

    return (
        <ul className="social-links flex gap-5 justify-start max-sm:flex-wrap items-center flex-row flex-grow">
            {socialLinks.map((link, index) => (
                <li key={index}>
                    <a
                        href={link.href}
                        className="focus no-underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.siteName}
                    </a>
                </li>
            ))}
        </ul>
    );
}
export default SocialLinks;
