import React from "react";

const Footer = () => {
    const sections = [
        {
            title: "Company",
            links: ["About", "Blogs", "Jobs", "Press", "Partners"],
        },
        {
            title: "Solutions",
            links: ["Support", "Marketing", "Analytics", "E-commerce", "Development"],
        },
        {
            title: "Resources",
            links: ["Docs", "Guides", "API Status", "Security", "Community"],
        },
        {
            title: "Legal",
            links: ["Terms", "Privacy", "Cookies", "Licenses", "Contact"],
        },
    ];

    return (
        <footer className="bg-black text-white py-12 px-10 md:px-20 mt-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                {sections.map((section, index) => (
                    <div key={index}>
                        <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                        <ul className="space-y-2">
                            {section.links.map((link, i) => (
                                <li key={i} className="cursor-pointer hover:text-gray-300">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
