import transporter from './connection.js';

export const transporterMail = async ({ email, message, issues }) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: issues ? "Regarding Portfolio Issues" : "Thank You for Your Feedback",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 15px; border-radius: 10px; background: #f4f4f4;">
                    <h1 style="color: #333;">Thank you for your feedback</h1>
                    <p style="font-size: 16px; color: #555;">
                        ${issues 
                            ? `Dear Sir,<br>
                               Hey, I am Jay Kumar, a student of Bengal College of Engineering and Technology, ECE 3rd Year at Durgapur.
                               I noticed that you found issues in my portfolio regarding my skills.
                               Thanks for mentioning the problem to help me improve my skills.<br>
                               <strong>Issue Reported:</strong> ${issues}`
                            : `Thanks for your valuable feedback on my portfolio. Do you have any suggestions for further improvements?`
                        }
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default transporterMail;
