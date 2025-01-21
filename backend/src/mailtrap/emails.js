import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);

  } catch (error) {
    console.log(`Error in sending verification`, error);

    throw new Error(`Error in sending verification email: ${error}`);

  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "14c4c0c8-16fa-40e8-baf8-95677897af33",
      template_variables: {
        company_info_name: "Advance Auth Company",
        name: name,
      }
    });

    console.log("Welcome email sent successfully", response);

  } catch (error) {
    console.log(`Error in sending welcome email `, error);

    throw new Error(`Error in sending welcome email: ${error}`);
  }
};