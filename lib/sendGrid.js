async function initializeEmail() {
  return sgMail.setApiKey(env.process.API_KEY);
}

export async function sendMailMessage(to, from, subject, otp, name) {
  try {
    // initialize the sendgrid instance
    let sgMail = await initializeEmail();

    // Email Content
    const msg = {
      to: to,
      from: from, // Use the email address or domain you verified above
      subject: subject,
      text: "Html Text here",
      html: template_html,
    };

    // send the email
    await sgMail.send(msg);

    return true;
  } catch (error) {
    return false;
  }
}
