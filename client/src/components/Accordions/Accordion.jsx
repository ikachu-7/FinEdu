import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
const Accordion = ({ question, answer }) => {
  const [show, setShow] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      {/* question section */}
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h1 className="text-sm font-semibold text-green">{t(`${question}`)}</h1>
        <BiChevronDown
          className={`text-xl transition-all duration-500 ${
            show ? "rotate-180" : ""
          }`}
        ></BiChevronDown>
      </div>

      {/* answer section */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-clip"
          >
            <p className="pt-3 text-sm">{t(`${answer}`)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
