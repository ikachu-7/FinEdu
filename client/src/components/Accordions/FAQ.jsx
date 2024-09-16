"use client";
// import "./App.css";
/* import Accordion component */
import Accordion from "./Accordion";
import { accordions } from "./FAQData";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();
  return (
    <div className="max-w-[700px] px-[15px] mx-auto py-5 mt-[8em] mb-[8em]">
      <h1 className="text-center text-xl font-semibold mb-8">
        {t("FREQUENTLY ASKED QUESTIONS")}
      </h1>

      <h4 className="text-center text-md font-normal mb-5">
        {t(
          "We here at Shiksha want to simplify things for you. Read some of the frequently asked questions to help you understand more about us."
        )}
      </h4>
      {/* main content here */}
      <div className="max-w-[700px] w-full mx-auto mt-10 flex flex-col gap-4">
        {accordions.map((item, id) => {
          // destruct
          const { question, answer } = item;
          return (
            <div className="bg-darkcolor p-5 rounded-md" key={id}>
              {/* passing two props to this component */}
              <Accordion question={question} answer={answer}></Accordion>
            </div>
          );
        })}
      </div>
      <h4 className="text-center text-md font-normal mt-5">
        {t(
          "If you have any more questions feel free to contact us via email at"
        )}
        <h4 className="font-semibold">info@www.shiksha.com</h4> .
      </h4>
    </div>
  );
}

export default FAQ;
