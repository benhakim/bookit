import React from 'react'

const Hero = () => {
  return (
    <section className="wrapper pt-28 mb-10 md:mb-16">
      <div className="bg-(--bg-secondary) rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 shadow-soft">

        {/* Left: heading, description, button */}
        <div className="md:w-1/3">
          <h1 className="page-title-xl">Your Library</h1>
          <p className="mt-3 subtitle max-w-md">
            Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite reads.
          </p>
          <div className="mt-6">
            <button className="btn-secondary">+ Add new book</button>
          </div>
        </div>

        {/* Center: illustration (vintage books + globe) */}
        <div className="md:w-1/3 flex justify-center">
          <svg width="260" height="160" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            {/* Books stack */}
            <g transform="translate(10,30)">
              <rect x="0" y="40" width="120" height="18" rx="4" fill="#EEDFC6" stroke="#D8C2A8" />
              <rect x="6" y="24" width="110" height="18" rx="4" fill="#D8BFA3" stroke="#C7A887" />
              <rect x="12" y="8" width="100" height="18" rx="4" fill="#C49A78" stroke="#AC7E5A" />
              <rect x="28" y="-8" width="74" height="18" rx="4" fill="#A56A3E" stroke="#8C4F2B" />
              <rect x="4" y="60" width="124" height="6" rx="3" fill="#FFF6E5" />
            </g>

            {/* Globe */}
            <g transform="translate(150,10)">
              <circle cx="40" cy="56" r="36" fill="#D8E3E0" stroke="#B8C7C4" strokeWidth="2" />
              <path d="M40 20 C50 34, 50 78, 40 92" stroke="#9FB0AE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M28 30 C44 34, 54 44, 28 60" stroke="#9FB0AE" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.9" />
              <ellipse cx="40" cy="56" rx="30" ry="10" fill="rgba(255,255,255,0.3)" />
            </g>

            {/* Decorative shadow */}
            <ellipse cx="120" cy="150" rx="90" ry="10" fill="rgba(0,0,0,0.06)" />
          </svg>
        </div>

        {/* Right: small steps card */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-xl p-4 shadow-soft">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-(--bg-primary) flex items-center justify-center border border-(--border-subtle) font-semibold">1</div>
                <div>
                  <p className="font-semibold text-sm">Upload PDF</p>
                  <p className="text-xs text-(--text-secondary)">Add your book file</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-(--bg-primary) flex items-center justify-center border border-(--border-subtle) font-semibold">2</div>
                <div>
                  <p className="font-semibold text-sm">AI Processing</p>
                  <p className="text-xs text-(--text-secondary)">We analyze the content</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-(--bg-primary) flex items-center justify-center border border-(--border-subtle) font-semibold">3</div>
                <div>
                  <p className="font-semibold text-sm">Voice Chat</p>
                  <p className="text-xs text-(--text-secondary)">Discuss with AI</p>
                </div>
              </li>
            </ol>
          </div>
        </div>

      </div>
    
    </section>
  )
}

export default Hero
