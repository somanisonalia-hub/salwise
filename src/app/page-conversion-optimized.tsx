import Link from 'next/link';

export default function HomeConversionOptimized() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "SalaryWise.io helped me negotiate a $15K raise! The gross to net calculator showed me exactly what my take-home pay would be.",
      rating: 5,
      avatar: "👩‍💻"
    },
    {
      name: "Mike Chen",
      role: "Financial Analyst",
      content: "The country calculators are incredibly accurate. Used it to compare job offers between US and Canada - saved me thousands in taxes.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      content: "Finally understand my paycheck! The guides and calculators make salary planning so much easier. Highly recommend!",
      rating: 5,
      avatar: "👩‍💼"
    }
  ];

  const stats = [
    { number: "500K+", label: "Calculations Made" },
    { number: "15+", label: "Countries Supported" },
    { number: "99%", label: "Accuracy Rate" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* High-Impact Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Urgency/Scarcity Element */}
            <div className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm mb-6 animate-pulse">
              🔥 FREE Salary Calculator - No Sign-up Required!
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Calculate Your
              <span className="block text-yellow-300">Perfect Salary</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Know exactly what you'll earn. Calculate gross to net pay, hourly wages, bonuses, and compare salaries across 15+ countries.
              <strong className="text-white"> Used by 500,000+ professionals worldwide.</strong>
            </p>

            {/* Prominent CTA Section */}
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Link
                  href="/salary-calculator"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center"
                >
                  🧮 Start Calculating
                  <span className="ml-2 text-sm bg-black bg-opacity-20 px-2 py-1 rounded">FREE</span>
                </Link>
                <Link
                  href="/gross-to-net"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                >
                  📊 Gross → Net Calculator
                </Link>
              </div>

              <p className="text-blue-200 text-sm">
                ✓ Instant Results ✓ No Credit Card Required ✓ 100% Free Forever
              </p>
            </div>

            {/* Social Proof Numbers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-yellow-300">{stat.number}</div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Trust Signals Section */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Trusted by professionals at</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Google</div>
            <div className="text-2xl font-bold text-gray-400">Microsoft</div>
            <div className="text-2xl font-bold text-gray-400">Amazon</div>
            <div className="text-2xl font-bold text-gray-400">Meta</div>
            <div className="text-2xl font-bold text-gray-400">Apple</div>
          </div>
        </div>
      </div>

      {/* Quick Calculator Access */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Salary Calculators</h2>
            <p className="text-xl text-gray-300">Choose your calculator and get instant results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/salary-calculator"
              className="group bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all transform hover:scale-105 border border-gray-700"
            >
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Salary Calculator</h3>
              <p className="text-gray-300 text-sm mb-4">Convert hourly to annual salary</p>
              <div className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium transition-colors">
                Calculate Now →
              </div>
            </Link>

            <Link
              href="/gross-to-net"
              className="group bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all transform hover:scale-105 border border-gray-700"
            >
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Gross to Net</h3>
              <p className="text-gray-300 text-sm mb-4">Find your take-home pay</p>
              <div className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-medium transition-colors">
                Calculate Now →
              </div>
            </Link>

            <Link
              href="/take-home-pay"
              className="group bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all transform hover:scale-105 border border-gray-700"
            >
              <div className="text-6xl mb-4">💵</div>
              <h3 className="text-xl font-bold mb-2">Take-Home Pay</h3>
              <p className="text-gray-300 text-sm mb-4">Calculate net paycheck amount</p>
              <div className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg font-medium transition-colors">
                Calculate Now →
              </div>
            </Link>

            <Link
              href="/hourly-to-salary"
              className="group bg-gray-800 hover:bg-gray-700 p-6 rounded-xl transition-all transform hover:scale-105 border border-gray-700"
            >
              <div className="text-6xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-2">Hourly to Salary</h3>
              <p className="text-gray-300 text-sm mb-4">Compare hourly vs salaried pay</p>
              <div className="bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-lg font-medium transition-colors">
                Calculate Now →
              </div>
            </Link>
          </div>

          {/* Secondary CTA */}
          <div className="text-center mt-12">
            <Link
              href="/country/usa"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 shadow-xl"
            >
              🇺🇸 Try USA Salary Calculator →
            </Link>
          </div>
        </div>
      </div>

      {/* Social Proof - Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Thousands of Professionals
            </h2>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">⭐</span>
              ))}
            </div>
            <p className="text-lg text-gray-600">4.9/5 average rating from 10,000+ users</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country Calculators with Benefits */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Country-Specific Calculators
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get accurate salary calculations tailored to your country's tax system
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium">
                💡 Compare salaries across countries and make informed relocation decisions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "USA", slug: "country/usa", flag: "🇺🇸", benefit: "Federal + State Taxes" },
              { name: "UK", slug: "country/uk", flag: "🇬🇧", benefit: "National Insurance" },
              { name: "Canada", slug: "country/canada", flag: "🇨🇦", benefit: "CPP + EI Premiums" },
              { name: "Australia", slug: "country/australia", flag: "🇦🇺", benefit: "Superannuation" },
              { name: "Ireland", slug: "country/ireland", flag: "🇮🇪", benefit: "USC + PRSI" },
              { name: "India", slug: "country/india", flag: "🇮🇳", benefit: "Income Tax Slabs" }
            ].map((country) => (
              <Link
                key={country.slug}
                href={`/${country.slug}`}
                className="group bg-gray-50 hover:bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all transform hover:scale-105 text-center"
              >
                <div className="text-5xl mb-3 group-hover:animate-bounce">{country.flag}</div>
                <h3 className="font-bold text-gray-900 mb-2">{country.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{country.benefit}</p>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Calculate
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Urgency/Scarcity Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Leave Money on the Table!
          </h2>
          <p className="text-xl mb-8">
            Thousands of professionals use our calculators to negotiate better salaries every year.
            Make sure you're getting paid what you're worth.
          </p>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link
                href="/salary-calculator"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                🧮 Calculate Salary Now
              </Link>
              <Link
                href="/guides/salary-negotiation"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-colors"
              >
                💪 Negotiation Tips
              </Link>
            </div>

            <p className="text-red-200 text-sm">
              ⚡ Instant Results • 📱 Mobile Friendly • 🔒 Privacy First
            </p>
          </div>
        </div>
      </div>

      {/* Educational Content CTA */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Learn More About Salary Calculations
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our comprehensive guides help you understand salary calculations, tax deductions, and negotiation strategies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link
              href="/guides/gross-vs-net"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-2">Gross vs Net Salary</h3>
              <p className="text-gray-600 text-sm mb-4">Understand the difference and why it matters</p>
              <span className="text-blue-600 font-medium">Read Guide →</span>
            </Link>

            <Link
              href="/guides/how-to-calculate-take-home"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-2">Calculate Take-Home Pay</h3>
              <p className="text-gray-600 text-sm mb-4">Step-by-step calculation guide</p>
              <span className="text-blue-600 font-medium">Read Guide →</span>
            </Link>

            <Link
              href="/guides/salary-negotiation"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h3 className="font-bold text-gray-900 mb-2">Salary Negotiation</h3>
              <p className="text-gray-600 text-sm mb-4">Tips to get paid what you're worth</p>
              <span className="text-blue-600 font-medium">Read Guide →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
