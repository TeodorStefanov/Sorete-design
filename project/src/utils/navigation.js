const getNavigation = (loggedIn, user) => {
  const links = [
    {
      title: "Картички",
      link: "/",
    },
    {
      title: "Towels",
      link: "/Towels",
    },
    {
      title: "Добави",
      link: "/add",
    },
    {
      title: "Profile",
      link: `/profile`,
    },
    {
      title: "Регистрация",
      link: "/registration",
    },
    {
      title: "Вход",
      link: "/login",
    },
  ];
  const guestLinks = [
    {
      title: "Картички",
      link: "/",
    },
    {
      title: "Регистрация",
      link: "/registration",
    },
    {
      title: "Вход",
      link: "/login",
    },
  ];
  return loggedIn ? links : guestLinks;
};

export default getNavigation;
