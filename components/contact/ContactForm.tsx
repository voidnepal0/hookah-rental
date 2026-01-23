"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { socialLinks } from "../../constants/footerConstants";
import { Send } from "lucide-react";
import { PhoneIcon } from "../icons/PhoneIcon";
import { MailIcon } from "../icons/MailIcon";
import { AddressIcon } from "../icons/AddressIcon";
import { ClockIcon } from "../icons/ClockIcon";

const ContactForm = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <section className="max-w-[2000px]  relative bg-(--bg-secondary) text-(--text-primary) lg:pt-12 pt-5 mx-auto ">
      <div className="max-w-[1440px]  mx-auto px-4 lg:px-8">
        <div className="flex  lg:items-center  justify-between flex-col lg:flex-row  gap-8">
          {/* Left Side - Contact Form */}
          <div className="w-full lg:w-5/3">
            <div className="flex items-center gap-6">
              <span className="bg-primary h-10 lg:h-15 w-3"></span>
              <h2 className="font-bebas-neue text-[28px] lg:text-[48px] ">
                DROP US A MESSAGE
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-5">
              <div>
                <label className="block font-poppins text-[16px] ">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 font-poppins border-b border-gray-300 focus:outline-none "
                  required
                />
              </div>

              <div>
                <label className="block font-poppins text-[16px] ">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 font-poppins border-b border-gray-300 focus:outline-none "
                  required
                />
              </div>

              <div>
                <label className="block font-poppins text-[16px] ">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 font-poppins border-b border-gray-300 focus:outline-none "
                  required
                />
              </div>

              <div>
                <label className="block font-poppins text-[16px] ">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows={3}
                  className="w-full px-4 py-3  font-poppins border-b border-gray-300 focus:outline-none focus:border-primary resize-none "
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary cursor-pointer w-full  text-black font-bebas-neue text-[20px] px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                SEND MESSAGE
                <Send size={20} />
              </button>
            </form>
          </div>

          {/* Right Side - Contact Information */}
          <div className="flex-1  lg:flex-initial lg:mt-20 mt-0  text-black overflow-hidden w-full">
            <div className="bg-primary flex justify-between items-center w-full  rounded-[24px] px-8 py-12 relative lg:h-[500px]">
              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-15 pointer-events-none">
                <Image
                  src={
                    theme === "dark"
                      ? "/contact/blackcloud.svg"
                      : "/contact/whitecloud.svg"
                  }
                  alt="Cloud decoration"
                  width={60}
                  height={60}
                  className="w-auto h-auto"
                />
              </div>

              <div className="absolute -bottom-5 right-0 pointer-events-none">
                <Image
                  src={
                    theme === "dark"
                      ? "/contact/blackhookah.svg"
                      : "/contact/whitehookah.svg"
                  }
                  alt="Hookah decoration"
                  width={80}
                  height={80}
                  className="w-auto h-auto"
                />
              </div>

              {/* Contact Information */}
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="font-bebas-neue text-[24px] ">CONTACT US</h3>
                  <div className="font-poppins">
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-5 h-5" />
                      <p className="text-[16px]">986XXXXXXX</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MailIcon className="w-5 h-5" />
                      <p className="text-[16px]">hookahrental@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bebas-neue text-[24px] ">ADDRESS</h3>
                  <div className="flex items-center gap-2">
                    <AddressIcon className="w-5 h-5" />
                    <p className="font-poppins text-[16px]">
                      Kalanki, Kathmandu
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bebas-neue text-[24px] ">
                    OPENING HOURS
                  </h3>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    <p className="font-poppins text-[16px]">
                      9AM - 5PM (Sunday - Friday)
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bebas-neue text-[24px]">FOLLOW US ON</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-10 h-10 bg-black rounded-full p-2  flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                      >
                        <div className="text-primary">{social.icon}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" rounded-[24px]   lg:my-[160px] my-[80px] overflow-hidden relative z-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.966782299878!2d85.2642674743237!3d27.68748727618934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb23e11f11a477%3A0x74274811a764b85!2sKalanki%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1705046200000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0, position: "relative", zIndex: 10 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="relative lg:pt-40 pt-90">
        <div className="absolute  bottom-0  right-0 pointer-events-none z-0">
          <Image
            src={theme === "dark" ? "/hookahBlack.svg" : "/hookah.svg"}
            alt="smoke"
            width={250}
            height={250}
            className="w-auto h-auto"
          />
        </div>
        <div className="absolute  lg:-bottom-10 -bottom-6 left-0 pointer-events-none z-0">
          <Image
            src={theme === "dark" ? "/cloudBlack.svg" : "/cloud.svg"}
            alt="smoke"
            width={250}
            height={250}
            className="lg:w-auto lg:h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
