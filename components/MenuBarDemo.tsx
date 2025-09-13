import React, { useState, useEffect } from "react"
import { Home, PlusSquare, Trophy, User, FileCheck } from "lucide-react"
import { MenuBar, MenuItem } from "./ui/glow-menu"
import { User as UserType } from '../lib/data';

const getMenuItems = (loggedInUserHandle: string, role: UserType['role'], pendingReviewCount?: number) => {
  const baseItems: MenuItem[] = [
    {
      icon: Home,
      label: "Explore",
      href: "#explore",
      gradient:
        "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
    },
    {
      icon: Trophy,
      label: "Leaderboard",
      href: "#leaderboard",
      gradient:
        "radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, rgba(245, 158, 11, 0.06) 50%, rgba(217, 119, 6, 0) 100%)",
      iconColor: "text-yellow-500",
    },
  ];

  if (role === 'student') {
    baseItems.push({
      icon: PlusSquare,
      label: "Post",
      href: "#post",
      gradient:
        "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
    });
  } else {
    baseItems.push({
      icon: FileCheck,
      label: "Review",
      href: "#review",
      gradient:
        "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(147, 51, 234, 0.06) 50%, rgba(126, 34, 206, 0) 100%)",
      iconColor: "text-purple-400",
      notificationCount: pendingReviewCount,
    });
  }

  baseItems.push({
    icon: User,
    label: "Profile",
    href: `#profile/${loggedInUserHandle}`,
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  });

  return baseItems;
}

const getLabelFromRoute = (route: string) => {
  const baseRoute = route.split('/')[0];
  const label = baseRoute.substring(1).toLowerCase();
  
  const menuItems = getMenuItems("", 'student').concat(getMenuItems("", 'mentor', 0));
  const menuItem = menuItems.find(item => item.label.toLowerCase() === label);
  return menuItem ? menuItem.label : "Explore";
}


export function MenuBarDemo({ activeRoute, loggedInUserHandle, role, pendingReviewCount }: { activeRoute: string, loggedInUserHandle: string, role: UserType['role'], pendingReviewCount?: number }) {
  const [activeItem, setActiveItem] = useState<string>(getLabelFromRoute(activeRoute))
  const menuItems = getMenuItems(loggedInUserHandle, role, pendingReviewCount);

  useEffect(() => {
    setActiveItem(getLabelFromRoute(activeRoute));
  }, [activeRoute]);

  const handleItemClick = (label: string) => {
    const menuItem = menuItems.find(item => item.label === label);
    if(menuItem) {
      window.location.hash = menuItem.href;
    }
  };

  return (
    <MenuBar
      items={menuItems}
      activeItem={activeItem}
      onItemClick={handleItemClick}
    />
  )
}