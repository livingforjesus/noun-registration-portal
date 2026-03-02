export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async (payload: EmailPayload): Promise<void> => {
  // TODO: Implement emails
  console.log("[email:todo]", payload);
};
