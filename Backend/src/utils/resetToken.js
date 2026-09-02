import crypto from "crypto";

export function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function calculateTokenExpiry(hours = 1) {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + hours);
  return expiry;
}
