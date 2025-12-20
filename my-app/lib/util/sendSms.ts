export default async function sendSms(
  ticketNumber: string,
  locationId: string
) {
  //a real phone number would be used in production. In its current state this endpoint sends a message to a virtual phone number in the backend for testing purposes.

  if (!ticketNumber) {
    console.error(
      "Phone number and ticket number are required to send an SMS."
    );
    return;
  }

  try {
    // Simulate sending an SMS

    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/v1/location/${locationId}/messaging/send-welcome`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketNumber }),
      }
    );

    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    console.log("SMS sent successfully:", data);
    // Add your SMS sending logic here
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
}
