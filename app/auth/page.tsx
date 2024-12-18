"use client";

import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

const regex = /^[a-zA-Z0-9._%+-]+@dso\.org\.sg$/;

interface Form {
  email: string;
  tnc: boolean;
}

interface EmailScreenProps {
  setMode: (mode: number) => void;
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}

interface OTPScreenProps {
  setMode: (mode: number) => void;
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}

interface CounterProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export default function AuthPage() {
  const [mode, setMode] = useState<number>(0);
  const [form, setForm] = useState<Form>({
    email: "",
    tnc: false,
  });

  return (
    <div
      className={`w-full h-screen flex justify-center items-center bg-gradient2 dark:bg-darkGradient2 p-0 sm:p-20`}
    >
      <div className="relative w-[100rem] h-full sm:min-h-[90vh] bg-white dark:bg-black sm:rounded-[3rem] shadow-md overflow-hidden flex content-center items-center p-20">
        <div
          className={`absolute top-[50%] left-[-30rem] text-center text-white dark:text-white w-[30rem] z-[100] transition-all duration-[800ms] ${
            mode === 0 ? "" : "left-[5rem]"
          }`}
        >
          <h1 className="text-6xl mb-12 hidden md:block">Welcome</h1>
        </div>
        <div
          className={`absolute inset-0 z-[50] bg-gradient dark:bg-darkGradient transition-all duration-[1500ms] ${
            mode === 0 ? "w-full" : "w-[40%] hidden md:block"
          }`}
        >
          {mode === 0 ? (
            <button
              type="button"
              className="absolute top-[60%]  text-2xl left-1/2 -translate-x-1/2 w-[16rem] h-[5rem] border-[1px] border-white rounded-[3rem] uppercase tracking-wide text-white hover:bg-accent"
              onClick={() => setMode(1)}
            >
              Log In
            </button>
          ) : (
            <button
              type="button"
              className="absolute text-2xl top-[60%] left-1/2 -translate-x-1/2 w-[16rem] h-[5rem] border-none items-center gap-4 text-white flex justify-center"
              onClick={() => setMode(0)}
            >
              <IoIosArrowRoundBack /> Back
            </button>
          )}
        </div>
        <form
          className={`w-full  top-0 left-0 flex flex-col gap-[100px] justify-center items-center p-5 md:p-40 md:w-[60rem] h-full transition-all duration-[1500ms] ${
            mode === 0 ? "" : "left-[40rem] md:absolute"
          }`}
        >
          {/* RHS:: FORM */}
          {mode === 1 && (
            <EmailScreen setMode={setMode} form={form} setForm={setForm} />
          )}
          {mode === 2 && (
            <OTPScreen setMode={setMode} form={form} setForm={setForm} />
          )}
        </form>
      </div>
    </div>
  );
}
// -------------------------------------------- SUB SCREENS: EMAIL -------------------------------------//

function EmailScreen({ setMode, form, setForm }: EmailScreenProps) {
  const [errors, setErrors] = useState<{
    email: string;
    tnc: string;
    api: string;
  }>({
    email: "",
    tnc: "",
    api: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setForm((prev) => ({ ...prev, tnc: value }));
  };

  const passed =
    Object.values(form).every((each) => each) &&
    Object.values(errors).every((each) => !each);

  const handleGetOTP = async () => {
    if (!passed) {
      return;
    }
    setIsLoading(true);
    try {
      //Actually call api but i will temp set timer
      await axios.post("/api/genOTP", {
        email: form.email,
      });
      setMode(2);
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        api: err?.message,
      }));
    } finally {
      //because API will fail, we will bypass to show next stage...
      setIsLoading(false);
      setMode(2);
    }
  };

  return (
    <>
      {/* Signup Form */}
      <div className="flex flex-col gap-2 text-center ">
        <h1 className="text-6xl text-accent">Login to MyAuthDemo</h1>
        <p className="text-xl text-black pt-2">
          Please enter your credentials and log in
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full relative">
        <MdOutlineEmail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600" />

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[5rem] text-xl pl-12 pr-4 rounded border border-gray-30 dark:bg-black dark:text-white"
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
            className="bg-white text-black dark:bg-black dark:text-white"
            type="checkbox"
            id="tnc"
            name="tnc"
            required={true}
            value={form.tnc.toString()}
            onChange={handleCheckbox}
          />
          <label htmlFor="tnc" className="text-black dark:text-white text-xl">
            I accept and agree to the Terms of User and Privacy Policy
          </label>
        </div>
        <button
          type="button"
          className="w-full h-[5rem]  text-xl bg-accent text-white rounded-[3rem] tracking-wide mt-12 hover:bg-accent disabled:bg-slate-300"
          onClick={handleGetOTP}
          disabled={!passed || isLoading}
        >
          {isLoading ? "Please Wait..." : "Get OTP"}
        </button>
        {
          <span className="text-red-400 absolute bottom-[-20px]">
            {errors?.api}
          </span>
        }
      </div>
    </>
  );
}

// -------------------------------------------- SUB SCREENS: OTP -------------------------------------//

const OTP_LENGTH = 6;
const SECONDS = 60 * 5;
function OTPScreen({ setMode, form, setForm }: OTPScreenProps) {
  const [counter, setCounter] = useState<number>(SECONDS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState("");

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      return;
    }
    try {
      setIsLoading(true);
      await axios.post("/api/verifyOTP", {
        email: form.email,
        otp: otp,
      });
      setError("");
    } catch (err: any) {
      console.log("XX err", err);
      setError(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetOTP = () => {
    setCounter(SECONDS);
    setError("");
    handleVerifyOTP();
  };

  const handleChange = (newValue: string) => {
    if (isLoading) {
      return;
    }
    setOtp(newValue);
  };

  const handleLoginAnotherAcc = () => {
    setForm(() => ({ email: "", tnc: false })); //reset
    setMode(1);
  };

  const disabled = otp.length !== OTP_LENGTH || isLoading;

  return (
    <>
      <div className="flex flex-col gap-2 text-center ">
        <h1 className="text-6xl text-accent">Login to MyAuthDemo</h1>
        <p className="text-xl text-black pt-2">
          Please enter your credentials and log in
          <br />
          <br />
          We have sent you an OTP to {form?.email}.
          <br />
          Please check your email inbox.
        </p>
      </div>
      <div className="flex flex-col gap-2 text-center w-full bg-white text-black dark:bg-black dark:text-white">
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={OTP_LENGTH}
          inputType="number"
          renderInput={(props) => <input {...props} />}
          shouldAutoFocus={true}
          inputStyle={{
            border: "1px solid grey",
            borderRadius: "5px",
            width: `calc(90% / ${OTP_LENGTH})`,
            maxWidth: "50px",
            aspectRatio: "1/1",
            background: "inherit",
            color: "inherit",
          }}
          containerStyle={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-evenly",
          }}
        />
      </div>
      <div className="flex flex-col gap-2 text-center w-full text-xl text-black dark:text-white">
        <button
          type="button"
          className="w-full h-[5rem]  text-3xl bg-accent text-white rounded-[3rem] tracking-wide mt-12 hover:bg-accent disabled:bg-slate-300"
          onClick={handleVerifyOTP}
          disabled={isLoading || disabled}
        >
          {isLoading ? "Please Wait..." : "Verify OTP"}
        </button>
        {<span className="text-red-400">{error}</span>}
        <Counter
          counter={counter}
          setCounter={setCounter}
          setError={setError}
        />
        <div>
          <span>Did not receive OTP?</span>
          <button
            className="ml-2 text-accent font-semibold disabled:text-gray-400"
            onClick={handleResetOTP}
            disabled={counter > 0}
          >
            Resend OTP
          </button>
        </div>
        <div>
          <button
            className="ml-2 font-semibold text-accent"
            onClick={handleLoginAnotherAcc}
          >
            Log in With Another Account
          </button>
        </div>
      </div>
    </>
  );
}

// -------------------------------------------- SUB SCREENS: COUNTER  -------------------------------------//

function Counter({
  counter = SECONDS,
  setCounter = () => {},
  setError = () => {},
}: CounterProps) {
  const minuteLeft = Math.floor(counter / 60);
  const remainder = counter % 60;
  const secondLeft = remainder < 9 ? "0" + remainder : remainder;

  useEffect(() => {
    if (counter <= 0) {
      return;
    }
    const timer = setTimeout(() => {
      setCounter((time) => time - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  useEffect(() => {
    if (+counter <= 0) {
      setError("OTP Timer has Ended");
    }
  }, [counter]);

  return (
    <span>
      OTP Expiry:{" "}
      <span className="text-accent font-semibold">
        {minuteLeft}:{secondLeft}
      </span>
    </span>
  );
}
