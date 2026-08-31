/**
 * Booking layer — UI-only for now.
 *
 * The booking page collects a complete BookingRequest and calls
 * submitBookingRequest(). Today that's a stub (simulated success) so the
 * site can run fully static on GitHub Pages. When a backend is ready,
 * swap the implementation below for a real call — the UI won't need
 * to change.
 *
 * Easy future options that still work on GitHub Pages:
 *  - POST to a serverless endpoint (Cloudflare Workers, Vercel fn, AWS Lambda)
 *  - A form service (Formspree, Basin) — POST the payload to their URL
 *  - Google Apps Script web app writing to a Sheet / sending an email
 */

export type BookingRequest = {
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;      // ISO date, e.g. "2026-09-12"
  timeSlot: string;  // e.g. "10:00 AM"
  name: string;
  phone: string;
  email: string;
  vehicle: string;   // e.g. "2021 Honda Civic"
  notes: string;
};

export type BookingResult = { ok: boolean; message: string };

export const TIME_SLOTS = [
  '9:00 AM',
  '11:00 AM',
  '1:00 PM',
  '3:00 PM',
  '5:00 PM',
];

export async function submitBookingRequest(
  req: BookingRequest
): Promise<BookingResult> {
  // ---- STUB: replace with a real API call when the backend exists ----
  // Example:
  //   const res = await fetch('https://api.fmdetailing.com/bookings', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(req),
  //   });
  //   return res.ok
  //     ? { ok: true, message: 'Booking request received!' }
  //     : { ok: false, message: 'Something went wrong — please call us.' };

  console.info('[FM Detailing] booking request (not yet sent anywhere):', req);
  await new Promise((r) => setTimeout(r, 900)); // simulate network
  return {
    ok: true,
    message:
      "Request received! We'll text you shortly to confirm your appointment.",
  };
}
