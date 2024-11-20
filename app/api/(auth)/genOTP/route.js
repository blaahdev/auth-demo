import { NextResponse } from "next/server.js";
import { sendMailMessage } from "../../../../lib/sendGrid";
import otpGenerator from "otp-generator";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../../../lib/messages";

export const POST = async (request) => {
  try {
    // 3. Get email from request body
    const { email } = await request.json();

    // 4. Check if email is correct
    if (!regex.test(value.toLowerCase())) {
      return res
        .status(400)
        .send({ status: "error", message: ERROR_MESSAGE.INVALID_REQUEST_BODY });
    }

    //5. Check in DB if email quota tries has reached its limit
    let quotaExceeded = false;

    if (quotaExceeded) {
      return new NextResponse(ERROR_MESSAGE.MAX_TRIES, {
        status: 400,
        message: ERROR_MESSAGE.MAX_TRIES,
      });
    }

    //6. Generate random OTP
    const genotp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    //7. To extract user name based from the email id eg izzah.inani@ dso.org.sg
    const username = email.split("@")[0].replace(".", " ");

    //8. calling the send mail function
    //Check if successfully sent the email from the genotp
    var sendMailStatus = await sendMailMessage(
      email,
      "OTP Login",
      genotp,
      username
    );

    //10. Check if successfully sent the email from the genotp
    if (!sendMailStatus) {
      return res
        .status(400)
        .send({ status: "error", message: ERROR_MESSAGE.EMAIL_SERVER_DOWN });
    }

    //11. Add login attempt to DB + store OTP + expiry time
    await db
      .collection("login_attempts")
      .doc(email)
      .set(
        {
          email,
          activeOTP: {
            OTP: genotp,
            expiryTimestamp: new Date().toISOString(),
          },
          emailSendTime: FieldValue.arrayUnion(admin.firestore.Timestamp.now()),
          loggedinFrom: "app",
        },
        { merge: true }
      );

    return new NextResponse(
      JSON.stringify(
        {
          email: email,
          status: "success",
          message: SUCCESS_MESSAGE.SEND_MAIL,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    return new NextResponse("Error in creating user" + error.message, {
      status: 500,
      message: error.message,
    });
  }
};
