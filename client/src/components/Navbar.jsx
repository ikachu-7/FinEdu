import { useState, Fragment } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Events", href: "#" },
  { name: "My Courses", href: "/student/courses" },
];

const products = [
  {
    name: "Expense Tracker",
    description: "Get a better understanding of your Expenses",
    href: "/expense-tracker",
    icon: ChartPieIcon,
  },
  {
    name: "EMI Calculator",
    description: "Get you EMI at your finger tips",
    href: "/emiCalculator",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Map",
    description: "Connect with nearby banks",
    href: "/map-banks",
    icon: SquaresPlusIcon,
  },
  {
    name: "FAQ",
    description: "Get the answers frequently asked question",
    href: "/faq",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact Us", href: "/contact", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [lang, setLang] = useState("en");

  const handleChange = (e) => {
    i18next.changeLanguage(e.target.value);
    setLang(e.target.value);
  };
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div
          className="flex lg:flex-1"
          onClick={() => {
            navigate("/");
          }}
        >
          <a className="-m-1.5 p-1.5">
            <span className="text-black-700 text-2xl">WealthWise</span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              {t("Product")}
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      onClick={() => {
                        navigate(item.href);
                      }}
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          // href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      onClick={() => {
                        navigate(item.href);
                      }}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a
            onClick={() => {
              navigate("/blogs");
            }}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {t("Featured")}
          </a>
          <a
            onClick={() => {
              navigate("/events");
            }}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {t("Events")}
          </a>
          <a
            onClick={() => {
              navigate("/student/courses");
            }}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {t("My Courses")}
          </a>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 130, paddingRight: 10 }}
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={lang}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="chi">HIN</MenuItem>
              <MenuItem value="ko">TML</MenuItem>
            </Select>
          </FormControl>
          {localStorage.getItem("auth") ? (
            <a
              onClick={() => {
                navigate("/logout");
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {t("Log out")} <span aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <>
              <a
                onClick={() => {
                  navigate("/register/user");
                }}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {t("User Log in")} <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                onClick={() => {
                  navigate("/register/volunteer");
                }}
                className="text-sm font-semibold leading-6 text-gray-900 mx-3"
              >
                {t("Vol. Log in")} <span aria-hidden="true">&rarr;</span>
              </a>
            </>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-black-700 text-2xl">WealthWise</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">{t("Close menu")}</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => {
                      console.log(item.href);
                      navigate(item.href);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {t("User Log In")}
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {t("Vol. Log In")}
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
