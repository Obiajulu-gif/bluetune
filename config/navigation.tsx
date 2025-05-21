import {
  Home,
  Compass,
  ListMusic,
  LineChart,
  User,
  Upload,
  Search,
  Library
} from "lucide-react";

export const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    description: "Return to homepage"
  },
  {
    name: "Explore",
    href: "/explore",
    icon: Compass,
    description: "Discover new music"
  },
  {
    name: "Playlists",
    href: "/playlist-management",
    icon: ListMusic,
    description: "Manage your playlists"
  },
  {
    name: "Dashboard",
    href: "/dashboard/creator",
    icon: LineChart,
    description: "Creator analytics"
  },
  {
    name: "Upload",
    href: "/upload",
    icon: Upload,
    description: "Share your music"
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    description: "Your account"
  }
];

export const mobileNavItems = [
  {
    name: "Home",
    href: "/",
    icon: Home
  },
  {
    name: "Search",
    href: "/explore",
    icon: Search
  },
  {
    name: "Library",
    href: "/playlist-management",
    icon: Library
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User
  }
];