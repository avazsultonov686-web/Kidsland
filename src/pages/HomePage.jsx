function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function HomePageContent() {
  return (
    <div>
      {/* Banner Slides Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {BANNER_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === slide ? 'bg-[#E8312A] w-4' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      
      {/* Categories */}
      <CategorySection className="mb-5" />

      {/* Popular */}
      <div className="mb-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-[17px] font-bold text-gray-800">
            Популярно сегодня 🔥
          </h3>
          <button className="text-[13px] text-blue-500 font-medium">
            Смотреть все
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-none">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[160px] bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[120px] object-cover"
                  onError={(e) => { e.target.style.display='none' }}
                />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  0-3 лет
                </span>
                <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-gray-400 text-sm">♡</span>
                </button>
              </div>
              <div className="p-2.5">
                <p className="text-[12px] text-gray-700 font-medium leading-tight mb-1 line-clamp-2">
                  {product.name}
                </p>
                <p className="text-[15px] font-bold text-[#E8312A] mb-2">
                  {product.price} <span className="text-[11px] font-normal text-gray-400">сом/день</span>
                </p>
                <button className="w-full bg-[#E8312A] text-white text-[12px] font-semibold py-1.5 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-1">
                  🛍️ Арендовать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Perks */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-2">
          {PERKS.map((perk) => (
            <div key={perk.label} className="bg-white rounded-2xl p-2 flex flex-col items-center text-center shadow-sm">
              <span className="text-2xl mb-1">{perk.icon}</span>
              <p className="text-[10px] text-gray-500 leading-tight">{perk.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}