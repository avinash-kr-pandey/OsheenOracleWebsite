import React from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import CommonPageHeader from "../CommonPages/CommonPageHeader";

const ContactUs = () => {
  return (
    <div>
      <CommonPageHeader title="Contacts" subtitle="Home - Contact" />
      <div className="bg-[#C4F9FF] py-12 px-4 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Get In Touch And Explore.
            </h2>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              Aenean id enim ut odio porttitor efficitur. Nulla commodo laoreet
              accumsan. Cras tempus odio nec mauris tempor, ac cursus enim
              finibus.
            </p>

            <div className="mt-8 space-y-6">
              {/* Have Queries */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-b from-[#d2f0f7] to-[#efc7f4] shadow-md">
                  <MessageCircle className="text-gray-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-lg">
                    Have Quires ?
                  </h4>
                  <p className="text-gray-500 text-sm">Chat with us</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-b from-[#d2f0f7] to-[#efc7f4] shadow-md">
                  <MapPin className="text-gray-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-lg">
                    Our Location
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Seestrasse St, Zurich, CH
                  </p>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-b from-[#d2f0f7] to-[#efc7f4] shadow-md">
                  <Phone className="text-gray-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-lg">
                    Mobile Number
                  </h4>
                  <p className="text-gray-500 text-sm">+961 348 6845</p>
                </div>
              </div>

              {/* Contact Support */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-b from-[#d2f0f7] to-[#efc7f4] shadow-md">
                  <Mail className="text-gray-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-lg">
                    Contact Support
                  </h4>
                  <p className="text-gray-500 text-sm">Support@osheen.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-black/60 text-white rounded-2xl p-6 md:p-10 shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 rounded-full bg-white text-gray-700 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-white rounded-full text-gray-700 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm  mb-2">Desired Date</label>
                  <input
                    type="text"
                    placeholder="Enter date"
                    className="w-full px-4 py-2 bg-white rounded-full text-gray-700 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Desired Time</label>
                  <input
                    type="text"
                    placeholder="Enter time"
                    className="w-full px-4 py-2 bg-white rounded-full text-gray-700 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Additional Message</label>
                <textarea
                  rows={4}
                  placeholder="Please write any note here..."
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-700 text-sm focus:outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
                >
                  <span className="text-xs">✗</span> SEND{" "}
                  <span className="text-xs">✗</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
