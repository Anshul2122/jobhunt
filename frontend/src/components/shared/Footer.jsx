import { PhoneCall } from "lucide-react";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const iconStyle = "text-white hover:text-gray-300 h-6 w-6";
const textStyle = "text-white hover:underline";
const socialLinks = [
  { to: "/https://www.facebook.com/", icon: FaFacebook },
  { to: "/https://twitter.com/", icon: FaSquareXTwitter },
  { to: "/https://mail.google.com/", icon: IoMailSharp },
];

const links = [
  { to: "/terms", label: "Terms of Services" },
  { to: "/privacy", label: "Privacy Policy" },
];

const Footer = () => {
  return (
    <footer className="border-t border-t-blue-700 py-8 bg-blue-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white text-4xl">Job Hive</h2>
            <p className="text-sm text-white ">
              {" "}
              © 2024 Your Company, All rights reserved
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0 mr-10 justify-evenly text-blue-700">
            {links.map(({ to, label }, index) => (
              <p key={index} className={textStyle}>
                <Link to={to}>{label}</Link>
              </p>
            ))}
            {socialLinks.map(({ to, icon: Icon }, index) => (
              <Link key={index} to={to}>
                <Icon className={iconStyle} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
