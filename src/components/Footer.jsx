// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="text-center p-4 mt-10 border-t text-sm text-gray-500 space-y-2">
      <div>
        &copy; {new Date().getFullYear()} BraFlame®. All rights reserved.
      </div>

      <div className="max-w-xl mx-auto px-4 text-xs text-gray-500">
        BraFlame has registered trademarks and uses trademarks. For more information, including terms of use, privacy policy, and trademark usage, please see our{' '}
        <a href="/policies" className="text-pink-600 hover:underline">Policies</a> page.{' '}
        <a href="/privacy-policy" className="text-pink-600 hover:underline">Privacy Policy</a> |{' '}
        <a href="/trademark-usage" className="text-pink-600 hover:underline">Trademark Usage</a>.
      </div>
    </footer>
  );
}
