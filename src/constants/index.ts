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

export const generateVenueData = () => {
  const venues = [
    {
      id: 1,
      name: "Kontiki Park & Resort",
      category: "Leisure/Entertainment",
      address: "Kontiki Park & Resort",
      lastUpdated: "25th May, 2025",
    },
    {
      id: 2,
      name: "Oxbow Lake",
      category: "Culture/Nature",
      address: "Oxbow Lake",
      lastUpdated: "5th May, 2025",
    },
    {
      id: 3,
      name: "De Gracious Event Centre",
      category: "Entertainment",
      address: "De Gracious Event Centre",
      lastUpdated: "16th April, 2025",
    },
    {
      id: 4,
      name: "De Moon",
      category: "Entertainment",
      address: "DE MOON",
      lastUpdated: "5th April, 2025",
    },
    {
      id: 5,
      name: "64 LOUNGE",
      category: "Entertainment",
      address: "64 LOUNGE",
      lastUpdated: "13th July, 2025",
    },
    {
      id: 6,
      name: "Golden Tulip Hotel",
      category: "Leisure/Entertainment",
      address: "Golden Tulip Hotel, Airport Road",
      lastUpdated: "2nd March, 2025",
    },
    {
      id: 7,
      name: "La Palm Royal Beach Hotel",
      category: "Leisure/Entertainment",
      address: "La Palm Royal Beach Hotel",
      lastUpdated: "15th June, 2025",
    },
    {
      id: 8,
      name: "Labadi Beach Hotel",
      category: "Leisure/Entertainment",
      address: "Labadi Beach Hotel, La",
      lastUpdated: "8th February, 2025",
    },
    {
      id: 9,
      name: "National Theatre",
      category: "Culture/Nature",
      address: "National Theatre of Ghana",
      lastUpdated: "22nd January, 2025",
    },
    {
      id: 10,
      name: "Akosombo Continental Hotel",
      category: "Leisure/Entertainment",
      address: "Akosombo Continental Hotel",
      lastUpdated: "12th August, 2025",
    },
    {
      id: 11,
      name: "Cape Coast Castle",
      category: "Culture/Nature",
      address: "Cape Coast Castle",
      lastUpdated: "30th September, 2025",
    },
    {
      id: 12,
      name: "Kakum National Park",
      category: "Culture/Nature",
      address: "Kakum National Park, Central Region",
      lastUpdated: "18th October, 2025",
    },
    {
      id: 13,
      name: "Republic Bar & Grill",
      category: "Entertainment",
      address: "Republic Bar & Grill, East Legon",
      lastUpdated: "7th November, 2025",
    },
    {
      id: 14,
      name: "Twist Nightclub",
      category: "Entertainment",
      address: "Twist Nightclub, Osu",
      lastUpdated: "14th December, 2025",
    },
    {
      id: 15,
      name: "Elmina Beach Resort",
      category: "Leisure/Entertainment",
      address: "Elmina Beach Resort",
      lastUpdated: "3rd January, 2025",
    },
    {
      id: 16,
      name: "W.E.B. DuBois Centre",
      category: "Culture/Nature",
      address: "W.E.B. DuBois Centre, Cantonments",
      lastUpdated: "25th February, 2025",
    },
    {
      id: 17,
      name: "Mole National Park",
      category: "Culture/Nature",
      address: "Mole National Park, Northern Region",
      lastUpdated: "11th April, 2025",
    },
    {
      id: 18,
      name: "SkyBar 25",
      category: "Entertainment",
      address: "SkyBar 25, Labadi",
      lastUpdated: "19th May, 2025",
    },
    {
      id: 19,
      name: "Movenpick Ambassador Hotel",
      category: "Leisure/Entertainment",
      address: "Movenpick Ambassador Hotel, Airport City",
      lastUpdated: "6th June, 2025",
    },
    {
      id: 20,
      name: "Independence Square",
      category: "Culture/Nature",
      address: "Independence Square, Osu",
      lastUpdated: "23rd July, 2025",
    },
  ];

  return venues;
};

export const generateTravelData = () => {
  const blogs = [
    {
      id: 1,
      writer: "James M. Bracket",
      title: "A Trip to Brass Island",
      datePosted: "25th May, 2025",
    },
    {
      id: 2,
      writer: "Sarah K. Williams",
      title: "Exploring the Hidden Gems of Cape Coast",
      datePosted: "23rd May, 2025",
    },
    {
      id: 3,
      writer: "Michael A. Thompson",
      title: "Adventures in Kakum National Park",
      datePosted: "20th May, 2025",
    },
    {
      id: 4,
      writer: "Emily R. Johnson",
      title: "Cultural Immersion at Elmina Castle",
      datePosted: "18th May, 2025",
    },
    {
      id: 5,
      writer: "David L. Martinez",
      title: "Wildlife Safari at Mole National Park",
      datePosted: "15th May, 2025",
    },
    {
      id: 6,
      writer: "Jessica N. Brown",
      title: "Beach Hopping Along Ghana's Golden Coast",
      datePosted: "12th May, 2025",
    },
    {
      id: 7,
      writer: "Robert C. Anderson",
      title: "The Vibrant Markets of Kumasi",
      datePosted: "10th May, 2025",
    },
    {
      id: 8,
      writer: "Amanda P. Davis",
      title: "Hiking Through the Aburi Botanical Gardens",
      datePosted: "8th May, 2025",
    },
    {
      id: 9,
      writer: "Christopher J. Wilson",
      title: "A Cultural Journey to Tamale",
      datePosted: "5th May, 2025",
    },
    {
      id: 10,
      writer: "Michelle S. Garcia",
      title: "Sunset Views from Labadi Beach",
      datePosted: "3rd May, 2025",
    },
    {
      id: 11,
      writer: "Steven T. Rodriguez",
      title: "Traditional Crafts in Bolgatanga",
      datePosted: "1st May, 2025",
    },
    {
      id: 12,
      writer: "Nicole F. Lee",
      title: "Food Adventures in Accra's Street Markets",
      datePosted: "28th April, 2025",
    },
    {
      id: 13,
      writer: "Brian K. Taylor",
      title: "Discovering the Wli Waterfalls",
      datePosted: "25th April, 2025",
    },
    {
      id: 14,
      writer: "Rachel M. White",
      title: "Art and History at the National Museum",
      datePosted: "22nd April, 2025",
    },
    {
      id: 15,
      writer: "Kevin D. Miller",
      title: "Island Life on Lake Volta",
      datePosted: "20th April, 2025",
    },
    {
      id: 16,
      writer: "Stephanie H. Clark",
      title: "The Mystical Caves of Paga",
      datePosted: "18th April, 2025",
    },
    {
      id: 17,
      writer: "Anthony G. Lewis",
      title: "Traditional Music and Dance in Ho",
      datePosted: "15th April, 2025",
    },
    {
      id: 18,
      writer: "Lauren B. Walker",
      title: "Canopy Walk Adventures in Kakum",
      datePosted: "12th April, 2025",
    },
    {
      id: 19,
      writer: "Jonathan R. Hall",
      title: "Fishing Villages of the Volta Region",
      datePosted: "10th April, 2025",
    },
    {
      id: 20,
      writer: "Samantha L. Young",
      title: "Spiritual Journey to the Shai Hills",
      datePosted: "8th April, 2025",
    },
    {
      id: 21,
      writer: "Matthew P. King",
      title: "Colonial Architecture in Cape Coast",
      datePosted: "5th April, 2025",
    },
    {
      id: 22,
      writer: "Ashley C. Wright",
      title: "The Festivals of Northern Ghana",
      datePosted: "3rd April, 2025",
    },
    {
      id: 23,
      writer: "Daniel J. Scott",
      title: "Eco-Tourism in the Ankasa Conservation Area",
      datePosted: "1st April, 2025",
    },
    {
      id: 24,
      writer: "Megan E. Green",
      title: "Gold Mining History in Obuasi",
      datePosted: "28th March, 2025",
    },
    {
      id: 25,
      writer: "Tyler W. Adams",
      title: "River Rafting on the White Volta",
      datePosted: "25th March, 2025",
    },
    {
      id: 26,
      writer: "Brittany K. Baker",
      title: "Sacred Groves and Traditional Beliefs",
      datePosted: "22nd March, 2025",
    },
    {
      id: 27,
      writer: "Cameron M. Nelson",
      title: "Modern Art Scene in Accra",
      datePosted: "20th March, 2025",
    },
    {
      id: 28,
      writer: "Hannah L. Carter",
      title: "Textile Traditions in Kente Country",
      datePosted: "18th March, 2025",
    },
    {
      id: 29,
      writer: "Zachary R. Mitchell",
      title: "Mountain Climbing in the Eastern Region",
      datePosted: "15th March, 2025",
    },
    {
      id: 30,
      writer: "Alexis N. Perez",
      title: "Coastal Conservation Efforts",
      datePosted: "12th March, 2025",
    },
    {
      id: 31,
      writer: "Jordan T. Roberts",
      title: "Urban Exploration in Tema",
      datePosted: "10th March, 2025",
    },
    {
      id: 32,
      writer: "Kayla S. Turner",
      title: "Traditional Healing Practices",
      datePosted: "8th March, 2025",
    },
    {
      id: 33,
      writer: "Austin F. Phillips",
      title: "Birdwatching in Ankasa Forest",
      datePosted: "5th March, 2025",
    },
    {
      id: 34,
      writer: "Morgan D. Campbell",
      title: "The Slave Route: A Historical Journey",
      datePosted: "3rd March, 2025",
    },
    {
      id: 35,
      writer: "Blake H. Parker",
      title: "Local Brews and Traditional Drinks",
      datePosted: "1st March, 2025",
    },
    {
      id: 36,
      writer: "Taylor J. Evans",
      title: "Sustainable Tourism in Rural Communities",
      datePosted: "26th February, 2025",
    },
    {
      id: 37,
      writer: "Sierra A. Edwards",
      title: "Photography Safari in the Northern Savanna",
      datePosted: "24th February, 2025",
    },
    {
      id: 38,
      writer: "Dakota L. Collins",
      title: "Ancient Traditions of the Dagara People",
      datePosted: "22nd February, 2025",
    },
    {
      id: 39,
      writer: "Peyton M. Stewart",
      title: "Coastal Erosion and Environmental Impact",
      datePosted: "20th February, 2025",
    },
    {
      id: 40,
      writer: "Casey R. Sanchez",
      title: "Weekend Getaway to Busua Beach",
      datePosted: "18th February, 2025",
    },
  ];

  return blogs;
};