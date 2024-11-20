import { NextResponse } from "next/server.js";
import { ERROR_MESSAGE } from "../../../../lib/messages";

const regex = /^[a-zA-Z0-9._%+-]+@dso\.org\.sg$/;

export const POST = async (request) => {
  try {
    // 3. Get email from request body
    const { email, otp } = await request.json();
    // 3.Validation
    if (!regex.test(email)) {
      return new NextResponse(ERROR_MESSAGE.INVALID_REQUEST_BODY, {
        status: 400,
        message: ERROR_MESSAGE.INVALID_REQUEST_BODY,
      });
    }

    //4. Check in DB if email quota tries has reached its limit
    let quotaExceeded = false;
    if (quotaExceeded) {
      return new NextResponse(ERROR_MESSAGE.MAX_TRIES, {
        status: 400,
        message: ERROR_MESSAGE.MAX_TRIES,
      });
    }

    // 5. Get login log history from DB
    let loginRef = db.collection("login_logs").doc(email);
    let loginObject = await loginRef.get();
    let loginData = await loginObject.data();

    //6. check if the OTP has expired
    if (
      loginData &&
      (!loginData.activeOTP ||
        loginData.activeOTP.expiryTimestamp < admin.firestore.Timestamp.now())
    ) {
      await loginRef.set(
        {
          activeOTP: FieldValue.delete(),
        },
        { merge: true }
      );
      return new NextResponse(ERROR_MESSAGE.OTP_EXPIRE, {
        status: 400,
        message: ERROR_MESSAGE.OTP_EXPIRE,
      });
    }

    //7.Check if OTP is correct
    if (loginData && loginData.activeOTP.OTP != otp) {
      return new NextResponse(ERROR_MESSAGE.WRONG_OTP, {
        status: 400,
        message: ERROR_MESSAGE.WRONG_OTP,
      });
    }

    //8.Check if OTP is correct
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(emailid);
    } catch (error) {
      console.error(error);
      userRecord = await admin.auth().createUser({
        email: email,
        emailVerified: true,
        displayName: username,
        disabled: false,
      });
    }

    await loginRef.set(
      {
        activeOTP: FieldValue.delete(),
      },
      { merge: true }
    );

    //create the new custom Token
    const token = await admin.auth().createCustomToken(userRecord.uid);
    // return the success status
    return new NextResponse(
      JSON.stringify(
        {
          token: token,
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
