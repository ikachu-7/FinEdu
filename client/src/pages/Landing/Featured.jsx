import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const features = [
  {
    name: "Delivering Comprehensive Education.",
    description:
      "Our platform offers tailored financial education from basic principles to advanced strategies for underprivileged communities.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Promoting Banking Access.",
    description:
      "We facilitate access to banking by guiding users on account opening, financial products, and navigating the banking system.",
    icon: LockClosedIcon,
  },
  {
    name: "Interactive Learning.",
    description:
      "Our user-friendly tools, including quizzes and games, make financial learning engaging and effective.",
    icon: ServerIcon,
  },
  {
    name: "Fostering Empowerment.",
    description:
      "We empower individuals to make informed financial decisions, breaking the cycle of poverty.",
    icon: ServerIcon,
  },
  {
    name: "Community Engagement.",
    description:
      "Our platform fosters a sense of belonging and support through forums and events, creating a stronger community.",
    icon: ServerIcon,
  },
];

export default function Example() {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                {t("Our feature")}
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t(
                  "Empowering Underprivileged Communities through Financial Literacy and Banking Inclusion"
                )}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t(
                  "At the heart of our mission lies a commitment to addressing the pressing challenges faced by underprivileged communities worldwide."
                )}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {t(`${feature.name}`)}
                    </dt>{" "}
                    <dd className="inline">{t(`${feature.description}`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="/undraw.svg"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 lg:flex lg:items-center"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
