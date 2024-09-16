import React, { useEffect, useState } from "react";
import SidebarStud from "./../../components/SidebarStud";
import Navbar from "./../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ViewStudCourse = () => {
  const { id } = useParams();
  const [obj, setObj] = useState();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };
  const closeVideo = () => {
    setSelectedVideo(null);
  };
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/getSingleCourse/${id}`
        );
        if (res?.status === 200) {
          console.log(res.data);
          setObj(res.data);
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong");
      }
    };
    getdata();
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="pt-6">
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8 justify-center">
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-5 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:5000/uploads/${obj?.coverImage?.filename}`}
                  alt="Model wearing plain black basic tee."
                  className=" w-full object-cover object-center mt-[3.5em]"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Course Info:
              </h1>
            </div>
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Tutorials</h3>
                <div className="grid grid-cols-1 gap-4 mt-4 w-full">
                  {obj?.videos?.map((video, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <h3>Lecture {index + 1}</h3>
                    </div>
                  ))}
                  {selectedVideo && (
                    <div className="mt-4">
                      <video
                        src={`http://localhost:5000/uploads/${selectedVideo.filename}`}
                        controls
                      ></video>
                      <button
                        className="mt-2 px-4 py-2 bg-gray-200 text-sm font-medium text-gray-800 rounded-md"
                        onClick={closeVideo}
                      >
                        Close
                      </button>
                    </div>
                  )}
                  <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer">
                    Assignment
                  </div>
                  <div className="bg-white shadow-md">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={() => navigate(`/student/quiz/${id}`)}
                    >
                      Take Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <h3>Author Name: {obj?.authorId?.name}</h3>
                  <p className="text-base text-gray-900">
                    Email : {obj?.authorId?.email} <br />
                    Proficiency: C++,java,MERN stack ,Python
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">Very Effective</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">Beginner friendly</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">Industry relevant</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Certification Available
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    The 6-Pack includes two black, two white, and two heather
                    gray Basic Tees. Sign up for our subscription service and be
                    the first to get new, exciting colors, like our upcoming
                    "Charcoal Gray" limited release.
                  </p>
                  <br />
                  <span style={{ fontSize: "2rem" }}>Note: </span>
                  <h2 style={{ color: "red" }}>
                    Certification can be Achieved only by taking Quiz . You
                    should score above 70% to get certified..
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudCourse;
