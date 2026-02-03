import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Under Maintenence',
  description: "We're currently under maintenance. Please check back later.",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Under Maintenance</h1>
        <p className="text-gray-700">
          We are currently performing maintenance on our site. Please check back
          later.
        </p>
      </div>
    </div>
  );
}
