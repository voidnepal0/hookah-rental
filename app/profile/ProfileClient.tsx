"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Edit2, Save, X, Phone, MapPin } from "lucide-react";
import type { User as FullUser } from "@/types/userTypes";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AddressManager from "@/components/profile/AddressManager";
import toast from "react-hot-toast";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { updateUser } from "@/services/api/userApi";

const ProfileClient = () => {
  const { user, fullUser, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<FullUser>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    if (user && !fullUser) {
      console.log("Fetching user data for:", user.email);
      refreshUser();
    }
  }, [user, fullUser, refreshUser]);

  useEffect(() => {
    if (fullUser) {
      console.log("Full user data received:", fullUser);
      setEditedUser(fullUser);
    }
  }, [fullUser]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(fullUser || {});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(fullUser || {});
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Prepare update data - only include fields that have changed
      const updateData: Partial<FullUser> = {};

      if (editedUser.name !== fullUser?.name) {
        updateData.name = editedUser.name;
      }
      if (editedUser.email !== fullUser?.email) {
        updateData.email = editedUser.email;
      }
      if (editedUser.phone !== fullUser?.phone) {
        updateData.phone = editedUser.phone;
      }
      if (editedUser.address !== fullUser?.address) {
        updateData.address = editedUser.address;
      }
      if (editedUser.gender !== fullUser?.gender) {
        updateData.gender = editedUser.gender;
      }

      // Only call API if there are changes
      if (Object.keys(updateData).length > 0) {
        await updateUser(updateData);
        await refreshUser();
        setIsEditing(false);
        toast.success("Profile updated successfully! 🎉");
      } else {
        setIsEditing(false);
        toast.success("No changes to save");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again. ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FullUser, value: string) => {
    setEditedUser((prev: Partial<FullUser>) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Please Login
          </h1>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            You need to be logged in to view your profile.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--text-primary)",
            }}
          >
            Go to Login
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  const displayName = fullUser?.name || user.name || user.email;
  const initials = displayName
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div
      className="lg:pt-20 pt-15 max-w-[2000px] overflow-hidden mx-auto"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="max-w-[1440px]  mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav
            className="flex  items-center  gap-2 text-sm mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            <Link
              href="/"
              className="opacity-60 transition-opacity hover:opacity-100"
            >
              Home
            </Link>
            <ChevronRight size={16} />
            <span
              className="font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              My Profile
            </span>
          </nav>

          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            My Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2  lg:gap-10 lg:items-start">
        <div className="rounded-lg  relative  font-poppins text-black  bg-primary p-6 mb-6">
          <div className="absolute z-0 -top-20 -right-15 pointer-events-none">
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

          <div className="absolute z-0 -bottom-5 lg:right-1/2  right-0 pointer-events-none">
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

          <div className="relative z-30 flex flex-col  md:flex-row lg:items-center justify-between lg:gap-0 gap-2 mb-6">
            <div className="flex  items-center gap-4">
              <div className="w-auto h-auto rounded-full p-2  bg-(--bg-secondary) text-(--text-secondary) flex items-center justify-center font-bold text-2xl">
                {initials}
              </div>
              <div>
                <h2 className="text-xl  font-bold">{displayName}</h2>
                <p>
                  Member since{" "}
                  {fullUser
                    ? new Date(fullUser.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex z-30 gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="cursor-pointer bg-(--bg-secondary) text-(--text-secondary) px-4 py-2.5 inline-flex items-center justify-center gap-2 font-poppins rounded-[8px] transition-all duration-150 ease-out shadow-[0px_4px_0_#9ca3af] hover:shadow-[0_6px_0_#9ca3af] hover:-translate-y-[2px] active:shadow-[0_0px_0_#9ca3af] active:translate-y-[2px]"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="cursor-pointer bg-green-500 text-white px-4 py-2.5 inline-flex items-center justify-center gap-2 font-poppins rounded-[8px] transition-all duration-150 ease-out shadow-[0px_4px_0_#16a34a] hover:shadow-[0_6px_0_#16a34a] hover:-translate-y-[2px] active:shadow-[0_0px_0_#16a34a] active:translate-y-[2px]"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="cursor-pointer bg-(--bg-secondary) text-(--text-secondary) px-4 py-2.5 inline-flex items-center justify-center gap-2 font-poppins rounded-[8px] transition-all duration-150 ease-out shadow-[0px_4px_0_#9ca3af] hover:shadow-[0_6px_0_#9ca3af] hover:-translate-y-[2px] active:shadow-[0_0px_0_#9ca3af] active:translate-y-[2px]"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="relative z-10 grid  grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <User size={16} />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border"
                />
              ) : (
                <p>{fullUser?.name || user.name || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Mail size={16} />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser.email || user.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border"
                />
              ) : (
                <p>{user.email || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Phone size={16} />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Add your phone number"
                  className="w-full px-3 py-2 rounded-lg border"
                />
              ) : (
                <p>{fullUser?.phone || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="flex  items-center gap-2 text-sm font-medium mb-2">
                <MapPin size={16} />
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={editedUser.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Add your address"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border"
                />
              ) : (
                <p>{fullUser?.address || "Not provided"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Delivery Addresses */}
        <div
          className="rounded-lg font-poppins relative z-10 p-6"
          style={{
            backgroundColor: "var(--bg-primary)",
           
          }}
        >
          <AddressManager />
        </div>
        </div>
      </div>
      <div className="relative pt-60">
        <div className="absolute bottom-0 right-0 pointer-events-none z-0">
          <Image
            src={
              theme === "dark"
                ? "/layout/hookahBlack.svg"
                : "/layout/hookah.svg"
            }
            alt="smoke"
            width={250}
            height={250}
            className="w-auto h-auto"
          />
        </div>
        <div className="absolute lg:-bottom-10 -bottom-6 left-0 pointer-events-none z-0">
          <Image
            src={
              theme === "dark" ? "/layout/cloudBlack.svg" : "/layout/cloud.svg"
            }
            alt="smoke"
            width={250}
            height={250}
            className="lg:w-auto lg:h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
