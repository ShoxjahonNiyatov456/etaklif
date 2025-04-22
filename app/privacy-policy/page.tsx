export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Cookie Policy</h2>
        <p className="mb-4">
          Our website uses cookies to enhance your browsing experience. Cookies
          are small text files that are stored on your device when you visit our
          website.
        </p>

        <h3 className="text-lg font-medium mb-2">Types of Cookies We Use</h3>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">
            <strong>Essential Cookies:</strong> These cookies are necessary for
            the website to function properly and cannot be turned off in our
            systems.
          </li>
          <li className="mb-2">
            <strong>Analytics Cookies:</strong> These cookies allow us to count
            visits and traffic sources so we can measure and improve the
            performance of our site.
          </li>
          <li className="mb-2">
            <strong>Functional Cookies:</strong> These cookies help us to
            personalize and enhance your experience on our website.
          </li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Third-Party Cookies</h3>
        <p className="mb-4">
          Our website may use third-party services that set their own cookies.
          We do not have control over these cookies. These services include
          analytics tools, social media platforms, and advertising networks.
        </p>

        <h3 className="text-lg font-medium mb-2">Managing Cookies</h3>
        <p className="mb-4">
          You can manage your cookie preferences through your browser settings.
          Please note that disabling certain cookies may affect the
          functionality of our website.
        </p>

        <h3 className="text-lg font-medium mb-2">
          Changes to Our Cookie Policy
        </h3>
        <p className="mb-4">
          We may update our cookie policy from time to time. Any changes will be
          posted on this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p>
          If you have any questions about our privacy policy or cookie
          practices, please contact us at
          <a href="mailto:contact@example.com" className="text-blue-600 ml-1">
            contact@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
