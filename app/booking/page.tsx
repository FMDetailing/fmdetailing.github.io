import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingFlow from '@/components/BookingFlow';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Book an Appointment — ${SITE.name}`,
  description: 'Pick a service, choose a date and time, and request your detailing appointment.',
};

export default function BookingPage() {
  return (
    <Suspense>
      <BookingFlow />
    </Suspense>
  );
}
