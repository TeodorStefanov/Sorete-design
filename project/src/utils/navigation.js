const getNavigation = (isAdmin, user) => {
  const links = [
    {
      title: "Towels",
      link: "/Towels",
    },
    {
      title: "Bath Rugs and Mats",
      link: "/Bath-Rugs-and-Mats",
    },
    {
      title: "Bathrobes",
      link: "/Bathrobes",
    },
    {
      title: "BathAccessories",
      link: "/BathAccessories",
    },
    {
      title: "Add",
      link: "/add",
    },
  ];
  const guestLinks = [
    {
      title: "Towels",
      link: "/Towels",
    },
    {
      title: "Bath Rugs and Mats",
      link: "/Bath-Rugs-and-Mats",
    },
    {
      title: "Bathrobes",
      link: "/Bathrobes",
    },
    {
      title: "BathAccessories",
      link: "/BathAccessories",
    },
  ];
  return isAdmin ? links : guestLinks;
};

export default getNavigation;
