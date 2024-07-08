import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOption = {
      from: "rohan.badgujar2001@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset",
      html:
        emailType === "VERIFY"
          ? `<p>Hello, please verify your email address by clicking the link below:</p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Verify Email</a><hr/> Or copy paste thr following <hr/>${process.env.DOMAIN}/verifyemail?token=${hashedToken} `
          : `<p>Hello, please reset your password by clicking the link below:</p><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Reset Password</a>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
