import prisma from "../config/database.js";

/**
 * Handle incoming contact form submissions
 */
export const submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon.",
      data: contactMessage,
    });
  } catch (error) {
    next(error);
  }
};
