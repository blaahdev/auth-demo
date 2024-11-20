# Tech Stack:

1. FrontEnd: NextJS + TypeScript + TailwindCSS
2. Backend: NextJS: Only Logic flow written. Actual integration with BE + OTP generator is not connected.

---
# Files:
1. FrontEnd: /app/auth/page.tsx
2. BackEnd: /app/api/(auth)/genOTP/route.js || /app/api/(auth)/verifyOTP/route.js

---

# Getting Started:

1. Download files
2. `npm install` to install all dependencies. You should see node_modules
3. `npm run dev` to run the file on localhost
4. Alternatively, view the deployed site at: https://auth-demo-j2i3e92hh-blaahs-projects.vercel.app/auth

---

# Requirements

1. To implement a secure email OTP module that can be used for our enterprise application. You are free to use any standard library from the language which you choose to implement the test.
2. Do document any assumptions that you make.
3. Describe how you would test your module.
4. generate_OTP_email sends a new 6 digit random OTP code to the given email address input by the users. Only emails from the ".dso.org.sg" domain should be allowed to receive an OTP code.
5. You can assume a function send_email(email_address, email_body) is implemented.
   Email body to the user should be in this format "You OTP Code is 123456. The code is valid for 1 minute

---
