const getNavigation = (loggedIn, user) => {
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
      title: "Добави",
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
  return loggedIn ? links : guestLinks;
};

export default getNavigation;
