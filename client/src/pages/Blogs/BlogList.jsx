import React from "react";
import { useNavigate } from "react-router-dom";
import blogs from "./blogs.json";
import Navbar from "../../components/Navbar";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function BlogList() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ position: "relative", top: "100px", left: "100px" }}
      >
        {blogs?.map((obj, index) => (
          <div
            className="bg-white border shadow mx-auto max-w-xs sm:max-w-none sm:mx-0 sm:w-full px-4 py-6 sm:px-6 sm:py-8 lg:max-w-xs lg:px-8 lg:py-10"
            key={index}
          >
            <div className="group relative bg-gray-200 rounded-lg shadow">
              <img
                src={obj.image}
                alt="Course cover image"
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">
                {t(`${obj.title}`)}
              </h3>
              <div className="mt-2">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={() => navigate(`/blogs/${obj.id}`)}
                >
                  {t("Read")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BlogList;
