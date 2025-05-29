import {
  MdOutlineDashboard,
  MdReceiptLong,
  MdPhonelink,
  MdOutlinePowerSettingsNew,
} from "react-icons/md";
import { GiCargoShip } from "react-icons/gi";
import { IoIosBed } from "react-icons/io";
import { ImBell, ImUsers } from "react-icons/im";
import { IoSettings } from "react-icons/io5";
import { DashboardCardProps } from "@/routes/_app/dashboard/-components/analytics-card";
import { TbWorldPin } from "react-icons/tb";
import { HiOutlineSquare3Stack3D, HiMiniUsers } from "react-icons/hi2";
import { SiAirplayvideo } from "react-icons/si";

export const navigations = [
  {
    category: "Main",
    tabs: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: MdOutlineDashboard,
      },
    ],
  },
  {
    category: "Management",
    tabs: [
      {
        name: "Tourist  Attractions",
        href: "/tourist-attraction",
        icon: GiCargoShip,
      },
      {
        name: "Hotels",
        href: "/hotels",
        icon: IoIosBed,
      },
      {
        name: "Political Sites",
        href: "/political-sites",
        icon: MdReceiptLong,
      },
      {
        name: "Travel Blogs",
        href: "/travel-blogs",
        icon: MdPhonelink,
      },
    ],
  },
  {
    category: "Notification",
    tabs: [
      {
        name: "Notifications",
        href: "/notifications",
        icon: ImBell,
      },
    ],
  },
  {
    category: "Manage Users",
    tabs: [
      {
        name: "Manage Users",
        href: "/manage-users",
        icon: ImUsers,
      },
    ],
  },
  {
    category: "Settings",
    tabs: [
      {
        name: "Settings",
        href: "/settings",
        icon: IoSettings,
      },
      {
        name: "Log out",
        icon: MdOutlinePowerSettingsNew,
      },
    ],
  },
];

export const dashboardData: DashboardCardProps[] = [
  {
    icon: TbWorldPin,
    title: "Content Upload",
    value: 26,
    progress: 60,
    progressColor: "bg-[#0ECC44]",
  },
  {
    icon: HiOutlineSquare3Stack3D,
    title: "Blog Posts",
    value: 1204,
    progress: 85,
    progressColor: "bg-[#FFCC00] ",
  },
  {
    icon: SiAirplayvideo,
    title: "Total Views",
    value: 5847,
    progress: 75,
    progressColor: "bg-[#FF3B30] ",
  },
  {
    icon: HiMiniUsers,
    title: "Users",
    value: 2300,
    progress: 45,
    progressColor: "bg-[#AF52DE] ",
  },
];

export const supportTypes = [
  { label: "Aid", value: "AID" },
  { label: "Revolving fund", value: "REVOLVING_FUND" },
];

export const bankNames = [
  { label: "Fidelity Bank", value: "fidelity" },
  { label: "Cal Bank", value: "calbank" },
  { label: "Zenith Bank", value: "zenith" },
  { label: "Standard Chartered Bank", value: "stanchart" },
  { label: "Other", value: "other" },
];

export const churchProjectTypes = [
  {
    label: " Regional headquarters church",
    value: "REGIONAL HEADQUARTERS CHURCH",
  },
  {
    label: "Divisional headquarters church",
    value: "DIVISIONAL HEADQUARTERS CHURCH",
  },
  {
    label: "Group of districts headquarters church",
    value: "GROUP OF DISTRICTS HEADQUARTERS CHURCH",
  },
  { label: "District church", value: "DISTRICT CHURCH" },
  { label: "Location church", value: "LOCATION CHURCH" },
];

export const tooltipStyle = {
  fontSize: "12px",
  fontWeight: "300",
  backgroundColor: "#101828",
  color: "#fff",
  borderRadius: "8px",
  marginTop: "10px",
};

export const statuses = [
  // { label: "DRAFT", value: "DRAFT" },
  { label: "PENDING REVIEW", value: "PENDING REVIEW" },
  { label: "APPROVED", value: "APPROVED" },
  { label: "REJECTED", value: "REJECTED" },
  { label: "UNDER REVIEW", value: "UNDER REVIEW" },
  { label: "WAITING NO'S APPROVAL", value: "WAITING NO'S APPROVAL" },
];

export const ghanaRegions = [
  { label: "Greater Accra", value: "greater_accra" },
  { label: "Ashanti", value: "ashanti" },
  { label: "Western", value: "western" },
  { label: "Eastern", value: "eastern" },
  { label: "Central", value: "central" },
  { label: "Volta", value: "volta" },
  { label: "Northern", value: "northern" },
  { label: "Upper East", value: "upper_east" },
  { label: "Upper West", value: "upper_west" },
  { label: "Bono", value: "bono" },
  { label: "Bono East", value: "bono_east" },
  { label: "Ahafo", value: "ahafo" },
  { label: "Western North", value: "western_north" },
  { label: "Oti", value: "oti" },
  { label: "North East", value: "north_east" },
  { label: "Savannah", value: "savannah" },
];
