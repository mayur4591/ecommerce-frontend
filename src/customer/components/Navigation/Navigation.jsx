"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, clearAuthError } from "../../../State/Auth/Action";
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", id: "tops", href: "#" },
            { name: "Dresses", id: "dresses", href: "#" },
            { name: "Pants", id: "pants", href: "#" },
            { name: "Denim", id: "denim", href: "#" },
            { name: "Sweaters", id: "sweaters", href: "#" },
            { name: "T-Shirts", id: "t-shirts", href: "#" },
            { name: "Jackets", id: "jackets", href: "#" },
            { name: "Activewear", id: "activewear", href: "#" },
            { name: "Browse All", id: "browse-all", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Mens Kurta", id: "mens_kurta", href: "#" },
            { name: "Pants", id: "pants", href: "#" },
            { name: "Sweaters", id: "sweaters", href: "#" },
            { name: "T-Shirts", id: "t-shirts", href: "#" },
            { name: "Jackets", id: "jackets", href: "#" },
            { name: "Activewear", id: "activewear", href: "#" },
            { name: "Browse All", id: "browse-all", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const location = useLocation();
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  // ✅ Correct useSelector to only get auth slice
  const auth = useSelector((state) => state.auth);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
    // Push a route so the modal can be deep-linked to
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }
  };

  const handleClose = () => {
    setOpenAuthModal(false);
    // When modal closes, go back if we're on a auth route to keep URL in sync
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  const handleMenuClick = (route) => {
    navigate(route);
    handleCloseUserMenu();
  };

  // Robust admin detection: backend may return role/isAdmin in different shapes
  const isAdminUser = (user) => {
    if (!user) return false;
    if (user.isAdmin) return true;
    if (user.role && (user.role === "admin" || user.role === "ROLE_ADMIN")) return true;
    if (Array.isArray(user.roles)) {
      for (const r of user.roles) {
        if (!r) continue;
        if (typeof r === "string") {
          const s = r.toLowerCase();
          if (s === "admin" || s === "role_admin" || s === "roleadmin" || s === "administrator") return true;
        }
        if (typeof r === "object") {
          if (r.name && (r.name.toLowerCase() === "admin" || r.name === "ROLE_ADMIN")) return true;
          if (r.role && (r.role.toLowerCase() === "admin" || r.role === "ROLE_ADMIN")) return true;
        }
      }
    }
    if (Array.isArray(user.authorities)) {
      for (const a of user.authorities) {
        if (!a) continue;
        if (typeof a === "string") {
          const s = a.toLowerCase();
          if (s === "role_admin" || s === "roleadmin" || s === "admin") return true;
        }
        if (typeof a === "object") {
          if (a.authority && (a.authority === "ROLE_ADMIN" || a.authority.toLowerCase() === "admin")) return true;
          if (a.name && (a.name.toLowerCase() === "admin")) return true;
        }
      }
    }
    return false;
  };

  const handleLogOut = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUser());
    }
  }, [dispatch]);

    useEffect(() => {
      if (auth.error) setOpenErrorSnackbar(true);
      else setOpenErrorSnackbar(false);
    }, [auth.error]);

  useEffect(() => {
    if (auth.user) handleClose();
    // Open modal when route is /login or /register, otherwise ensure it's closed
    if (location.pathname === "/login" || location.pathname === "/register") {
      setOpenAuthModal(true);
    } else {
      setOpenAuthModal(false);
    }
  }, [auth.user, location.pathname, navigate]);

    const handleCloseErrorSnackbar = (event, reason) => {
      if (reason === 'clickaway') return;
      setOpenErrorSnackbar(false);
      dispatch(clearAuthError());
    };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            {/* Mobile menu content */}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <Popover.Button className="group relative flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-800">
                          {category.name}
                          <span className="absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600" />
                        </Popover.Button>
                      </div>
                      <Popover.Panel className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500">
                        {({ close }) => (
                          <Fragment>
                            <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div key={item.name} className="group relative text-base sm:text-sm">
                                        <img
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                        />
                                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                          <span aria-hidden="true" className="absolute inset-0 z-10" />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">Shop now</p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p className="font-medium text-gray-900">{section.name}</p>
                                        <ul className="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                          {section.items.map((item) => (
                                            <li key={item.name} className="flex">
                                              <p
                                                onClick={() =>
                                                  handleCategoryClick(category, section, item, close)
                                                }
                                                className="cursor-pointer hover:text-gray-800"
                                              >
                                                {item.name}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        )}
                      </Popover.Panel>
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              {/* Right-aligned profile/search/cart */}
              <div className="ml-auto flex items-center space-x-4">
                {auth.user?.firstName ? (
                  <>
                    <Menu as="div" className="relative z-30">
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm">
                        <Avatar sx={{ bgcolor: "purple", width: 32, height: 32 }}>
                          {auth.user.firstName[0].toUpperCase()}
                        </Avatar>
                      </MenuButton>
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              onClick={() => handleMenuClick("/profile")}
                              className={`block px-4 py-2 text-sm text-gray-700 ${focus ? "bg-gray-100" : ""}`}
                            >
                              Profile
                            </a>
                          )}
                        </MenuItem>

                        {/* Admin Dashboard - visible only for admin users */}
                        {isAdminUser(auth.user) && (
                          <MenuItem>
                            {({ focus }) => (
                              <a
                                href="#"
                                onClick={() => handleMenuClick("/admin")}
                                className={`block px-4 py-2 text-sm text-gray-700 ${focus ? "bg-gray-100" : ""}`}
                              >
                                Admin Dashboard
                              </a>
                            )}
                          </MenuItem>
                        )}
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              onClick={() => handleMenuClick("/account/order")}
                              className={`block px-4 py-2 text-sm text-gray-700 ${focus ? "bg-gray-100" : ""}`}
                            >
                              My Orders
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              onClick={handleLogOut}
                              className={`block px-4 py-2 text-sm text-gray-700 ${focus ? "bg-gray-100" : ""}`}
                            >
                              Logout
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                    <div className="flex">
                      <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                    </div>
                    <div className="flow-root">
                      <ShoppingBagIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                    </div>
                  </>
                ) : (
                  <div className="ml-auto flex items-center space-x-6">
                    <Button onClick={handleOpen} variant="text" className="text-sm text-gray-700 hover:text-gray-900">
                      SignIn
                    </Button>
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                    <ShoppingBagIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal} />
      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleCloseErrorSnackbar}>
        <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: '100%' }}>
          {auth.error}
        </Alert>
      </Snackbar>
    </div>
  );
}