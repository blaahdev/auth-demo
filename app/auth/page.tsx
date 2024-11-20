"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";

const regex = /^[a-zA-Z0-9._%+-]+@dso\.org\.sg$/;

export default function AuthPage() {
  const [mode, setMode] = useState(1);
  const [form, setForm] = useState({ email: "", tnc: false });

  return (
    <div className={`w-full h-screen flex justify-center items-center `}>
      <div className="relative w-[100rem] h-[70rem] bg-white rounded-[3rem] shadow-md overflow-hidden">
        {/* Banner */}
        <div
          className={`absolute top-[50%] left-[-30rem] text-center text-white w-[30rem] z-[100] transition-all duration-[800ms] ${
            mode === 0 ? "" : "left-[5rem]"
          }`}
        >
          <h1 className="text-5xl mb-12">Welcome</h1>
        </div>
        {/* LHS:: Green Background */}
        <div
          className={`absolute inset-0 z-[50] bg-gradient transition-all duration-[1500ms] ${
            mode === 0 ? "w-full" : "w-[40%]"
          } hidden md:block`}
        >
          {mode === 0 ? (
            <button
              type="button"
              className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[16rem] h-[5rem] border-[1px] border-white rounded-[3rem] uppercase tracking-wide text-white hover:bg-accent"
              onClick={() => setMode(1)}
            >
              Sign Up
            </button>
          ) : (
            <button
              type="button"
              className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[16rem] h-[5rem] border-none items-center gap-4 text-white flex justify-center"
              onClick={() => setMode(0)}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          )}
        </div>
        {/* RHS:: FORM */}
        {mode === 1 && (
          <EmailScreen
            mode={mode}
            setMode={setMode}
            form={form}
            setForm={setForm}
          />
        )}
        {mode === 2 && (
          <OTPScreen mode={mode} setMode={setMode} email={form.email} />
        )}
      </div>
    </div>
  );
}
// -------------------------------------------- SUB SCREENS: EMAIL -------------------------------------//

function EmailScreen({ mode, setMode, form, setForm }) {
  const [errors, setErrors] = useState({ email: "", tnc: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e) => {
    const value = e.target.value;
    console.log(value, regex.test(value));
    setForm((prev) => ({ ...prev, email: value }));
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, email: "E-mail is required." }));
    } else if (!regex.test(value.toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        email: "Require email ending with @dso.org.sg",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handleCheckbox = (e) => {
    const value = e.target.checked;
    setForm((prev) => ({ ...prev, tnc: value }));
  };

  const passed =
    Object.values(form).every((each) => each) &&
    Object.values(errors).every((each) => !each);

  const handleGetOTP = () => {
    //check form
    if (!passed) {
      alert("ENTERED 1");
      return;
    }
    //loading
    setIsLoading(true);

    //call API

    //set screen mode
    setMode(2);
    setIsLoading(false);
  };

  return (
    <>
      {/* Signup Form */}
      <form
        className={`absolute top-0 left-0 flex flex-col gap-[100px] justify-center items-center p-40 w-[60rem] h-full transition-all duration-[1500ms] ${
          mode === 0 ? "" : "left-[40rem]"
        }`}
      >
        <div className="flex flex-col gap-2 text-center ">
          <h1 className="text-6xl text-accent">Login to MyAuthDemo</h1>
          <p className="text-xl text-black">
            Please enter your credentials and log in
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full relative">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[5rem] pl-12 pr-4 rounded border border-gray-300"
            required={true}
            onChange={handleEmail}
            name="email"
            value={form.email}
          />
          {
            <span className="text-red-400 absolute bottom-[-20px]">
              {errors?.email}
            </span>
          }
        </div>
        <div className="flex flex-col gap-2 text-center w-full items-center ">
          <div className="flex items-center gap-2 w-full">
            <input
              type="checkbox"
              id="tnc"
              name="tnc"
              required={true}
              value={form.tnc}
              onChange={handleCheckbox}
            />
            <label htmlFor="tnc" className="text-black">
              I accept and agree to the Terms of User and Privacy Policy
            </label>
          </div>
          <button
            type="button"
            className="w-full h-[5rem] bg-accent text-white rounded-[3rem] uppercase tracking-wide mt-12 hover:bg-accent disabled:bg-slate-300"
            onClick={handleGetOTP}
            disabled={!passed || isLoading}
          >
            {isLoading ? "Please Wait..." : "Get OTP"}
          </button>
        </div>
      </form>
    </>
  );
}

// -------------------------------------------- SUB SCREENS: OTP -------------------------------------//

const OTP_LENGTH = 6;
const SECONDS = 60 * 5;
function OTPScreen({ mode, setMode, email }) {
  const [counter, setCounter] = useState(SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      return;
    }
    //   loginVerifyOTP({ email, OTP: otp })
    //     .unwrap()
    //     .then(() => {
    //       navigate(URL_ROUTES.COMPANY_SEARCH);
    //     })
    //     .catch((err) => {});
  };

  const handleReset = () => {
    setOtp("");
    setCounter(SECONDS);
  };

  const handleChange = (newValue) => {
    if (isLoading) {
      return;
    }
    setOtp(newValue);
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  const disabled = otp.length !== OTP_LENGTH || isLoading;

  return (
    <form
      className={`absolute top-0 left-0 flex flex-col gap-[100px] justify-center items-center p-40 w-[60rem] h-full transition-all duration-[1500ms] ${
        mode === 0 ? "" : "left-[40rem]"
      }`}
    >
      <div className="flex flex-col gap-2 text-center ">
        <h1 className="text-6xl text-accent">Login to MyAuthDemo</h1>
        <p className="text-xl text-black">
          Please enter your credentials and log in
        </p>
        <p className="text-base text-black">
          We have sent you an OTP to {email}. Please check your email inbox.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-center w-full">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          renderInput={(props) => <input {...props} />}
          shouldAutoFocus={true}
          inputStyle={{
            border: "1px solid grey",
            borderRadius: "5px",
            width: "50px",
            height: "50px",
          }}
          containerStyle={{ display: "flex", gap: "20px" }}
        />
      </div>
      <div className="flex flex-col gap-2 text-center w-full">
        <button
          type="button"
          className="w-full h-[5rem] bg-accent text-white rounded-[3rem] uppercase tracking-wide mt-12 hover:bg-accent disabled:bg-slate-300"
          onClick={handleVerifyOTP}
          disabled={isLoading || disabled}
        >
          {isLoading ? "Please Wait..." : "Verify OTP"}
        </button>
        <Counter counter={counter} setCounter={setCounter} />
        <div className="text-base text-black">
          <span>Did not receive OTP?</span>
          <button className="ml-2 text-accent">Resend OTP</button>
        </div>
      </div>
    </form>
  );
}

// -------------------------------------------- SUB SCREENS: COUNTER  -------------------------------------//

function Counter({ counter = SECONDS, setCounter = () => {} }) {
  const minuteLeft = Math.floor(counter / 60);
  const remainder = counter % 60;
  const secondLeft = remainder < 9 ? "0" + remainder : remainder;

  useEffect(() => {
    const timer =
      counter > 0 &&
      setTimeout(() => {
        setCounter((time) => time - 1);
      }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return (
    <span>
      OTP Expiry:{" "}
      <span className="text-accent">
        {minuteLeft}:{secondLeft}
      </span>
    </span>
  );
}

export function matchIsNumeric(text) {
  const isNumber = typeof text === "number";
  const isString = typeof text === "string";
  return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
}
