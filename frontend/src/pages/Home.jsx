const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F0FDFC] to-[#CCF0F0] text-[#004D4D] p-8">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 font-sans leading-tight">
          Track Your Expenses <br /> & Manage Your Money
        </h1>
        <p className="text-xl text-gray-700 mb-8 font-serif">
          A simple, powerful tool to record your income & expenses, and keep your finances under control.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/signup"
            className="bg-[#008080] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#006666] transition duration-200 font-semibold"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-white text-[#008080] border border-[#008080] px-6 py-3 rounded-xl shadow hover:bg-[#f0f0f0] transition duration-200 font-semibold"
          >
            Login
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">✨ Why Use Expense Tracker?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">📈 Income & Expenses</h3>
            <p className="text-gray-600">Easily log your earnings and spending with a simple form.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">📊 Real-time Balance</h3>
            <p className="text-gray-600">See how much you have left instantly after every transaction.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure & Simple</h3>
            <p className="text-gray-600">Modern, responsive, and safe — accessible from any device.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
