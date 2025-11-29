"use client";

import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu, // 👈 Used for the Profile dropdown
  MenuButton, // 👈 Button for the Profile dropdown
  MenuItem, // 👈 Menu item links
  MenuItems, // 👈 Container for menu items
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import { Button } from "@mui/material";
import { store } from "../../../State/Store";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";

// Helper function for conditionally joining class names
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
            // UPDATED: Added 'id' fields
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
        {
          id: "accessories",
          name: "Accessories",
          items: [
            // UPDATED: Added 'id' fields
            { name: "Watches", id: "watches", href: "#" },
            { name: "Wallets", id: "wallets", href: "#" },
            { name: "Bags", id: "bags", href: "#" },
            { name: "Sunglasses", id: "sunglasses", href: "#" },
            { name: "Hats", id: "hats", href: "#" },
            { name: "Belts", id: "belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            // UPDATED: Added 'id' fields
            { name: "Full Nelson", id: "full-nelson", href: "#" },
            { name: "My Way", id: "my-way", href: "#" },
            { name: "Re-Arranged", id: "re-arranged", href: "#" },
            { name: "Counterfeit", id: "counterfeit", href: "#" },
            { name: "Significant Other", id: "significant-other", href: "#" },
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
            // UPDATED: Added 'id' fields
            { name: "Tops", id: "tops", href: "#" },
            { name: "Pants", id: "pants", href: "#" },
            { name: "Sweaters", id: "sweaters", href: "#" },
            { name: "T-Shirts", id: "t-shirts", href: "#" },
            { name: "Jackets", id: "jackets", href: "#" },
            { name: "Activewear", id: "activewear", href: "#" },
            { name: "Browse All", id: "browse-all", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            // UPDATED: Added 'id' fields
            { name: "Watches", id: "watches", href: "#" },
            { name: "Wallets", id: "wallets", href: "#" },
            { name: "Bags", id: "bags", href: "#" },
            { name: "Sunglasses", id: "sunglasses", href: "#" },
            { name: "Hats", id: "hats", href: "#" },
            { name: "Belts", id: "belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            // UPDATED: Added 'id' fields
            { name: "Re-Arranged", id: "re-arranged", href: "#" },
            { name: "Counterfeit", id: "counterfeit", href: "#" },
            { name: "Full Nelson", id: "full-nelson", href: "#" },
            { name: "My Way", id: "my-way", href: "#" },
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
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };
  const handleCategoryClick = (category, section, item, close) => {
    // Navigating using the new item.id property
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  const handleMenuClick = (route) => {
    // Basic navigation logic for the profile menu
    navigate(route);
  };

  const handleLogOut = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
    }
  }, [jwt, auth.jwt]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }

    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user]);

  return (
    <div className="bg-white">
      {/* Mobile menu (omitted for brevity, assume similar structure is maintained) */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            {/* ... Mobile menu content ... */}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
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
                        <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
                          {category.name}
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                          />
                        </PopoverButton>
                      </div>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                      >
                        {({ close }) => (
                          <Fragment>
                            {/* Presentational element used to render the bottom shadow... */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow-sm"
                            />
                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                  <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative text-base sm:text-sm"
                                      >
                                        <img
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                        />
                                        <a
                                          href={item.href}
                                          className="mt-6 block font-medium text-gray-900"
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-900"
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <p
                                                onClick={() =>
                                                  handleCategoryClick(
                                                    category,
                                                    section,
                                                    item,
                                                    close
                                                  )
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
                      </PopoverPanel>
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

              {/* Profile Menu, Search, and Cart */}
              {/* Profile Menu, Search, Cart, and SignIn aligned to right */}
              <div className="ml-auto flex items-center space-x-4">
                {auth.user?.firstName ? (
                  <>
                    {/* 🚀 Profile Dropdown */}
                    <Menu as="div" className="relative z-30">
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <Avatar
                          className="text-white"
                          sx={{
                            bgcolor: "purple",
                            color: "white",
                            cursor: "pointer",
                            width: 32,
                            height: 32,
                          }}
                        >
                          {auth.user.firstName[0].toUpperCase()}
                        </Avatar>
                      </MenuButton>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              onClick={() => handleMenuClick("/profile")}
                              className={`block px-4 py-2 text-sm text-gray-700 ${
                                focus ? "bg-gray-100" : ""
                              }`}
                            >
                              Profile
                            </a>
                          )}
                        </MenuItem>

                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              onClick={() => handleMenuClick("/account/order")}
                              className={`block px-4 py-2 text-sm text-gray-700 ${
                                focus ? "bg-gray-100" : ""
                              }`}
                            >
                              My Orders
                            </a>
                          )}
                        </MenuItem>

                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              onClick={() => handleLogOut()}
                              className={`block px-4 py-2 text-sm text-gray-700 ${
                                focus ? "bg-gray-100" : ""
                              }`}
                            >
                              Logout
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Menu>

                    {/* Search */}
                    <div className="flex">
                      <a
                        href="#"
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <MagnifyingGlassIcon
                          aria-hidden="true"
                          className="size-6"
                        />
                      </a>
                    </div>

                    {/* Cart */}
                    <div className="flow-root">
                      <a href="#" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          0
                        </span>
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="ml-auto flex items-center space-x-6">
                    {/* SignIN button */}
                    <Button
                      onClick={handleOpen}
                      variant="text"
                      className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      SignIn
                    </Button>

                    {/* Search */}
                    <div className="flex">
                      <a
                        href="#"
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <MagnifyingGlassIcon
                          aria-hidden="true"
                          className="size-6"
                        />
                      </a>
                    </div>

                    {/* Cart */}
                    <div className="flow-root">
                      <a href="#" className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          0
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  );
}
