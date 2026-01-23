"use client";
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PhoneIcon } from "../../components/icons/PhoneIcon";
import { MailIcon } from "../../components/icons/MailIcon";
import { HookahIcon } from "../../components/icons/HookahIcon";
import Image from "next/image";

const CateringClient = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    location: "",
    package: "Small (10 to 20)",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Catering form submitted:", formData);
    // Handle form submission here
  };

  return (
    <section className="max-w-[2000px] lg:pt-[110px] pt-[80px] relative bg-(--bg-secondary) text-(--text-primary) lg:py-12 py-5 mx-auto">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <nav className="flex items-center justify-between mb-6 font-poppins text-sm">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              Home
            </Link>
            <ChevronRight size={16} className="opacity-60" />
            <span className="font-medium">Catering</span>
          </div>
        </nav>

        {/* Catering Content */}
        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2">
            <header className=" mb-2 relative z-10">
              <div className="flex  items-center gap-6">
                <span className="bg-primary h-10 lg:h-15 w-3"></span>
                <h1 className="font-bebas-neue text-[28px] lg:text-[34px] xl:text-[48px]">
                  Get booking leads immediately.
                </h1>
              </div>
              <p className="font-bebas-neue xl:text-[60px] lg:text-[50px] leading-tight text-[32px]   font-medium">
                Hookah Catering for Events & Parties
              </p>
            </header>
            <div className="font-poppins font-normal text-[16px] leading-[160%] tracking-wider ">
              <p>
                We offer professional hookah catering services for private
                parties, weddings, corporate events, birthdays, and special
                celebrations of all sizes. Whether it’s a small gathering or a
                large-scale event, our goal is to deliver a smooth, premium, and
                hassle-free hookah experience that your guests will enjoy from
                start to finish.
              </p>
              <p className="mt-2 tracking-wider">
                Our service includes clean and fully sanitized hookahs,
                premium-quality flavors, and a trained team that handles setup,
                flavor management, and on-site service at your location. With
                attention to hygiene, presentation, and guest comfort, we help
                elevate your event atmosphere and create a relaxed, memorable
                vibe everyone can enjoy.
              </p>
            </div>
            <div className="flex font-poppins font-medium flex-col gap-2  mt-4">
              <h3 className="font-bebas-neue text-[24px] ">CONTACT US</h3>

              <div className="flex  gap-2">
                <PhoneIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                <p className="text-[16px]">986XXXXXXX</p>
              </div>
              <div className="flex  gap-2">
                <MailIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
                <p className="text-[16px]">baghbhairabbhs@gmail.com</p>
              </div>
            </div>
          
              <Image 
              src={theme === 'dark' ? '/contact/whiteHookah.svg' : '/contact/blackHookah.svg'}
              alt="Hookah"
              width={200}
              height={200}
              
              />
            
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-(--bg-primary) text-(--text-primary) rounded-[32px] px-4 py-5 lg:px-8">
              <h3 className="font-bebas-neue text-[32px] lg:text-[40px]  mb-4">
                CATERING BOOKING FORM
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block font-poppins text-[16px] mb-2 ">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent  "
                      required
                    />
                  </div>

                 
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins text-[16px] mb-2 ">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent  "
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-poppins text-[16px] mb-2 ">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      className="w-full px-4 py-3 font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent  "
                      required
                    />
                  </div>
                        
                  
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-poppins text-[16px] mb-2 ">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 cursor-pointer font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent "
                      required
                    >
                      <option className="text-black " value="">
                        Select type
                      </option>
                      <option className="text-black" value="birthday">
                        Birthday
                      </option>
                      <option className="text-black" value="wedding">
                        Wedding
                      </option>
                      <option className="text-black" value="corporate">
                        Corporate
                      </option>
                      <option className="text-black" value="private">
                        Private Party
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-poppins text-[16px] mb-2 ">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3  font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent "
                      required
                    />
                  </div>
                        
                  
                </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-[16px] mb-2 ">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="w-full px-4 py-3 font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent "
                    required
                  />
                </div>
                       <div>
                    <label className="block font-poppins text-[16px] mb-2 ">
                      Guests *
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      placeholder="Enter number of guests"
                      className="w-full px-4 py-3 font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent  "
                      required
                    />
                  </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
  <label className="block font-poppins text-[16px]">
   <HookahIcon className={`w-10 h-10 inline-block mr-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />Packages *
  </label>

  <div className="flex flex-col lg:flex-row gap-1">
    {["Small (10 to 20)", "Medium (20 to 30)", "Large (30 to 40)"].map((pkg) => (
      <button
        key={pkg}
        type="button"
        onClick={() =>
          setFormData((prev) => ({ ...prev, package: pkg }))
        }
        className={`
          flex-1  py-1 border-2 font-poppins cursor-pointer rounded-[100px] text-black capitalize transition-all
          ${
            formData.package === pkg
              ? "bg-primary "
              : "bg-gray-300 hover:bg-primary"
          }
        `}
      >
        {pkg}
      </button>
    ))}
  </div>

  {/* Hidden input so form validation & submit still works */}
  <input
    type="hidden"
    name="package"
    value={formData.package}
    required
  />
</div>

                <div>
                  <label className="block font-poppins text-[16px] mb-2 ">
                    Message / Special Requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter you message"
                    rows={4}
                    className="w-full px-4 py-3 font-poppins border-b-2 border-(--border-color) focus:outline-none focus:border-(--border-color) bg-transparent  resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary cursor-pointer w-full text-black font-bebas-neue text-[20px] px-8 py-2 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Book Catering
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringClient;
