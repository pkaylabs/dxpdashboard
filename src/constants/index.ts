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
        href: "/user-management",
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

export const tooltipStyle = {
  fontSize: "12px",
  fontWeight: "300",
  backgroundColor: "#101828",
  color: "#fff",
  borderRadius: "8px",
  marginTop: "10px",
};

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

export const generateNotificationData = () => {
  const notifications = [
    {
      id: 1,
      title: "New Tourist Attraction Added",
      message: "Kontiki Park & Resort has been successfully added to the system.",
      date: "May 30th, 2025",
      time: "2:15pm",
      type: "success",
      read: false
    },
    {
      id: 2,
      title: "Venue Update Required",
      message: "Please update the contact information for Golden Tulip Hotel.",
      date: "May 30th, 2025",
      time: "11:30am",
      type: "warning",
      read: false
    },
    {
      id: 3,
      title: "New Blog Post Published",
      message: "James M. Bracket published 'A Trip to Brass Island' - 245 views so far.",
      date: "May 29th, 2025",
      time: "4:22pm",
      type: "info",
      read: true
    },
    {
      id: 4,
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance on June 1st, 2025 from 2:00am - 4:00am GMT.",
      date: "May 29th, 2025",
      time: "9:45am",
      type: "info",
      read: true
    },
    {
      id: 5,
      title: "High Traffic Alert",
      message: "Unusual high traffic detected on Cape Coast Castle page - 1,250 visitors in the last hour.",
      date: "May 28th, 2025",
      time: "6:30pm",
      type: "warning",
      read: false
    },
    {
      id: 6,
      title: "Content Approval Needed",
      message: "Sarah K. Williams submitted 'Exploring Hidden Gems of Cape Coast' for review.",
      date: "May 28th, 2025",
      time: "3:18pm",
      type: "action",
      read: true
    },
    {
      id: 7,
      title: "User Registration Spike",
      message: "25 new users registered today. Consider reviewing onboarding process.",
      date: "May 28th, 2025",
      time: "10:15am",
      type: "info",
      read: true
    },
    {
      id: 8,
      title: "Venue Deletion Request",
      message: "Request to remove 'Old Conference Center' from listings - requires admin approval.",
      date: "May 27th, 2025",
      time: "8:40pm",
      type: "error",
      read: false
    },
    {
      id: 9,
      title: "Weekly Analytics Report",
      message: "Your weekly performance report is ready. Total page views: 12,450 (+15% from last week).",
      date: "May 27th, 2025",
      time: "7:00am",
      type: "success",
      read: true
    },
    {
      id: 10,
      title: "Database Backup Completed",
      message: "Automated database backup completed successfully at 3:00am GMT.",
      date: "May 26th, 2025",
      time: "3:05am",
      type: "success",
      read: true
    },
    {
      id: 11,
      title: "New Feature Available",
      message: "Advanced search filters are now available for tourist attractions.",
      date: "May 25th, 2025",
      time: "11:20am",
      type: "info",
      read: true
    },
    {
      id: 12,
      title: "Photo Upload Failed",
      message: "Failed to upload gallery images for Elmina Beach Resort. Please retry.",
      date: "May 25th, 2025",
      time: "9:33am",
      type: "error",
      read: false
    },
    {
      id: 13,
      title: "Review Submission",
      message: "New 5-star review submitted for Labadi Beach Hotel by verified traveler.",
      date: "May 24th, 2025",
      time: "5:47pm",
      type: "success",
      read: true
    },
    {
      id: 14,
      title: "API Rate Limit Warning",
      message: "Third-party integration approaching rate limit. Consider upgrading plan.",
      date: "May 24th, 2025",
      time: "2:15pm",
      type: "warning",
      read: true
    },
    {
      id: 15,
      title: "Content Moderation Alert",
      message: "Blog post flagged for review: 'Controversial Views on Local Tourism'.",
      date: "May 23rd, 2025",
      time: "7:22pm",
      type: "warning",
      read: false
    },
    {
      id: 16,
      title: "Server Response Time",
      message: "Average server response time improved by 23% after recent optimizations.",
      date: "May 23rd, 2025",
      time: "1:10pm",
      type: "success",
      read: true
    },
    {
      id: 17,
      title: "Monthly Newsletter Sent",
      message: "Tourism newsletter delivered to 5,847 subscribers with 32% open rate.",
      date: "May 22nd, 2025",
      time: "8:00am",
      type: "info",
      read: true
    },
    {
      id: 18,
      title: "Security Alert",
      message: "Multiple failed login attempts detected from IP 192.168.1.100.",
      date: "May 21st, 2025",
      time: "11:45pm",
      type: "error",
      read: false
    },
    {
      id: 19,
      title: "Event Reminder",
      message: "Tourism board meeting scheduled for tomorrow at 10:00am in Conference Room A.",
      date: "May 21st, 2025",
      time: "4:30pm",
      type: "info",
      read: true
    },
    {
      id: 20,
      title: "Data Export Completed",
      message: "Tourist attraction data export completed. Download link expires in 7 days.",
      date: "May 20th, 2025",
      time: "6:15am",
      type: "success",
      read: true
    },
    {
      id: 21,
      title: "User Feedback Received",
      message: "Anonymous feedback: 'Love the new mobile interface! Much easier to navigate.'",
      date: "May 19th, 2025",
      time: "3:28pm",
      type: "info",
      read: true
    },
    {
      id: 22,
      title: "Seasonal Update Required",
      message: "Update operating hours for 12 venues for summer season starting June 1st.",
      date: "May 19th, 2025",
      time: "9:00am",
      type: "action",
      read: false
    },
    {
      id: 23,
      title: "Partnership Opportunity",
      message: "Ghana Tourism Authority interested in collaboration. Contact details in admin panel.",
      date: "May 18th, 2025",
      time: "12:45pm",
      type: "info",
      read: true
    },
    {
      id: 24,
      title: "Storage Space Warning",
      message: "Image storage 85% full. Consider upgrading storage plan or archiving old content.",
      date: "May 17th, 2025",
      time: "7:20am",
      type: "warning",
      read: false
    },
    {
      id: 25,
      title: "Mobile App Update",
      message: "New mobile app version 2.1.3 released with improved map functionality.",
      date: "May 16th, 2025",
      time: "10:30am",
      type: "info",
      read: true
    },
    {
      id: 26,
      title: "Comment Moderation",
      message: "15 new comments awaiting moderation on recent blog posts.",
      date: "May 15th, 2025",
      time: "5:55pm",
      type: "action",
      read: true
    },
    {
      id: 27,
      title: "Performance Milestone",
      message: "Congratulations! The platform reached 50,000 total unique visitors this month.",
      date: "May 14th, 2025",
      time: "1:15pm",
      type: "success",
      read: true
    },
    {
      id: 28,
      title: "Backup Verification Failed",
      message: "Backup verification failed for May 13th backup. Manual check required.",
      date: "May 13th, 2025",
      time: "8:45pm",
      type: "error",
      read: false
    },
    {
      id: 29,
      title: "Social Media Integration",
      message: "Instagram posts automatically synced. 8 new posts featuring local attractions.",
      date: "May 12th, 2025",
      time: "11:00am",
      type: "success",
      read: true
    },
    {
      id: 30,
      title: "User Session Timeout",
      message: "Updated session timeout to 2 hours for improved security.",
      date: "May 11th, 2025",
      time: "4:10pm",
      type: "info",
      read: true
    }
  ];

  return notifications;
};