import { useEffect, useState } from "react";
import "./emiCalculator.css";
import Navbar from "../../components/Navbar";

function EMICalculator() {
  const [totalLoanAmount, setTotalLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(5);
  const [rateOfInterest, setRateOfInterest] = useState(6.5);

  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [totalLoanError, setTotalLoanError] = useState("input");
  const [tenureError, setTenureError] = useState("input");
  const [rateOfInterestError, setRateOfInterestError] = useState("input");

  const calculateEMI = () => {
    if (
      !Number(rateOfInterest) ||
      !Number(tenure) ||
      !Number(totalLoanAmount)
    ) {
      return;
    }
    let interest = rateOfInterest / 12 / 100;
    let tenureInMonths = tenure * 12;

    // Sample: 1000000*0.006*(1+0.006)**120 / ((1+0.006) ** 120 -1)
    let emi =
      (totalLoanAmount * interest * Math.pow(1 + interest, tenureInMonths)) /
      (Math.pow(1 + interest, tenureInMonths) - 1);

    let totalAmt = emi * tenureInMonths;
    let totalInt = totalAmt - totalLoanAmount;

    setMonthlyEMI(Math.floor(emi));
    setTotalAmount(Math.ceil(totalAmt));
    setTotalInterest(Math.ceil(totalInt));
  };

  useEffect(() => {
    calculateEMI();
  }, [totalLoanAmount, tenure, rateOfInterest]);

  const handleTotalLoanChange = (e) => {
    // if (e.target.value.length < 6 || e.target.value.length > 8) {
    //   setTotalLoanError("input error");
    // } else {
    //   setTotalLoanError("input");
    // }
    setTotalLoanAmount(parseInt(e.target.value));
  };

  const handleTenureChange = (e) => {
    // if (e.target.value > 40 || e.target.value < 1) {
    //   setTenureError("input error");
    // } else {
    //   setTenureError("input");
    // }
    setTenure(parseFloat(e.target.value));
  };

  const handleRateOfInterestChange = (e) => {
    // if (e.target.value > 45 || e.target.value < 1) {
    //   setRateOfInterestError("input error");
    // } else {
    //   setRateOfInterestError("input");
    // }
    setRateOfInterest(parseFloat(e.target.value).toFixed(2));
  };

  return (
    <>
      <Navbar />
      <div className="emi mt-[6.5em]">
        <h1>EMI Calculator</h1>
        <div className="loan-container">
          <div className="title-container">
            <label htmlFor="loan-amount" className="label">
              Loan amount
            </label>
            <div
              className={`value-container ${
                totalLoanError.includes("error") ? "error" : ""
              }`}
            >
              <span>₹</span>
              <input
                type="number"
                className={totalLoanError}
                style={{ width: "100px" }}
                value={totalLoanAmount}
                onChange={handleTotalLoanChange}
              />
            </div>
          </div>
          <input
            id="loan-amount"
            name="loan-amount"
            type="range"
            min="1"
            max="10000"
            step="1"
            className="input"
            placeholder="0"
            value={totalLoanAmount}
            onChange={handleTotalLoanChange}
          />
        </div>

        <div className="interest-container">
          <div className="title-container">
            <label htmlFor="interest" className="label">
              Rate of interest (p.a)
            </label>
            <div
              className={`value-container ${
                rateOfInterestError.includes("error") ? "error" : ""
              }`}
            >
              <input
                type="number"
                className={rateOfInterestError}
                style={{ width: "100px", textAlign: "right" }}
                value={rateOfInterest}
                onChange={handleRateOfInterestChange}
              />
              <span
                className={`${
                  rateOfInterestError.includes("error") ? "error" : ""
                }`}
              >
                %
              </span>
            </div>
          </div>
          <input
            id="loan-amount"
            name="loan-amount"
            type="range"
            min="1"
            max="45"
            step="0.1"
            className="input"
            value={rateOfInterest}
            onChange={handleRateOfInterestChange}
          />
        </div>

        <div className="tenure-container">
          <div className="title-container">
            <label htmlFor="tenure" className="label">
              Loan tenure
            </label>
            <div
              className={`value-container ${
                tenureError.includes("error") ? "error" : ""
              }`}
            >
              <input
                type="number"
                className={tenureError}
                style={{ width: "100px", textAlign: "right" }}
                value={tenure}
                onChange={handleTenureChange}
              />
              <span>Yr</span>
            </div>
          </div>

          <input
            name="tenure"
            id="tenure"
            type="range"
            min="1"
            max="45"
            step="0.1"
            className="input"
            value={tenure}
            onChange={handleTenureChange}
          />
        </div>

        <div className="result-container">
          <div className="values">
            <span>Monthly EMI</span>
            <span>₹ {monthlyEMI.toLocaleString("en-IN")}</span>
          </div>

          <div className="values">
            <span>Principal amount</span>
            <span>
              ₹ {totalLoanAmount ? totalLoanAmount.toLocaleString("en-IN") : 0}
            </span>
          </div>

          <div className="values">
            <span>Total interest</span>
            <span>₹ {totalInterest.toLocaleString("en-IN")}</span>
          </div>

          <div className="values">
            <span>Total amount</span>
            <span>₹ {totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default EMICalculator;
