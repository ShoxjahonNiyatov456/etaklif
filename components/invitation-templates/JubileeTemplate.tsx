import React from 'react';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';

interface JubileeTemplateProps {
  style: string;
  firstName: string;
  celebrationType: string;
  date: string;
  time: string;
  location: string;
  additionalInfo?: string;
  uploadedImage?: string;
}

const JubileeTemplate: React.FC<JubileeTemplateProps> = ({
  style,
  firstName,
  celebrationType,
  date,
  time,
  location,
  additionalInfo,
  uploadedImage,
}) => {
  const formattedDate = date
    ? format(new Date(date), 'd MMMM', { locale: uz })
    : '';

  // Function to truncate text if too long
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Default to provided celebrationType or "60" if not available
  const age = celebrationType || "60";

  // Apply different styles based on the style prop
  switch (style) {
    case 'classic':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-[#f5e9dc] overflow-hidden">
            {/* Border decoration */}
            <div className="absolute top-0 left-0 right-0 bottom-0 border-[15px] border-[#d4b59e]"></div>
            <div className="absolute top-4 left-4 right-4 bottom-4 border-[1px] border-[#8a6d5c]"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%]">
              <div className="text-[#8a6d5c] text-sm mb-2">YUBILEY TAKLIFI</div>
              <div className="text-[#8a6d5c] text-3xl font-bold mb-2">{firstName}</div>
              <div className="text-[#8a6d5c] text-4xl font-bold mb-4">{age} YUBILEY</div>
              <div className="text-[#8a6d5c] text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-[#8a6d5c] text-sm mb-1">VAQT: {time}</div>
              <div className="text-[#8a6d5c] text-sm mb-4">MANZIL: {truncateText(location, 60)}</div>

              {additionalInfo && (
                <div className="text-[#8a6d5c] text-xs italic mt-2">
                  {truncateText(additionalInfo, 100)}
                </div>
              )}
            </div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#8a6d5c]"></div>
            <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#8a6d5c]"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#8a6d5c]"></div>
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#8a6d5c]"></div>
          </div>
        </div>
      );

    case 'modern':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-gradient-to-br from-indigo-500 to-purple-800 overflow-hidden">
            {/* Abstract background elements */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-indigo-400 opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-purple-400 opacity-20 transform translate-x-1/4 translate-y-1/4"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%] bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-lg">
              <div className="text-white text-sm uppercase tracking-widest mb-2">Yubiley Tadbiri</div>
              <div className="text-white text-3xl font-bold mb-1">{firstName}</div>
              <div className="text-white text-4xl font-bold mb-4">{age}</div>

              <div className="w-16 h-1 bg-white mx-auto my-3"></div>

              <div className="text-white text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-white text-sm mb-1">VAQT: {time}</div>
              <div className="text-white text-sm mb-2">MANZIL: {truncateText(location, 60)}</div>

              {additionalInfo && (
                <div className="text-white text-xs mt-4">
                  {truncateText(additionalInfo, 100)}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 'ornate':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-[#e8d8c0] overflow-hidden">
            {/* Ornate border */}
            <div className="absolute top-0 left-0 right-0 bottom-0 border-[12px] border-[#b39a6a]"></div>

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #b39a6a, #b39a6a 10px, transparent 10px, transparent 20px)'
            }}></div>

            {/* Golden corner decorations */}
            <div className="absolute top-4 left-4 w-20 h-20" style={{
              backgroundImage: 'radial-gradient(circle at top left, #d4b26a 20%, transparent 21%)',
              backgroundSize: '10px 10px'
            }}></div>
            <div className="absolute top-4 right-4 w-20 h-20" style={{
              backgroundImage: 'radial-gradient(circle at top right, #d4b26a 20%, transparent 21%)',
              backgroundSize: '10px 10px'
            }}></div>
            <div className="absolute bottom-4 left-4 w-20 h-20" style={{
              backgroundImage: 'radial-gradient(circle at bottom left, #d4b26a 20%, transparent 21%)',
              backgroundSize: '10px 10px'
            }}></div>
            <div className="absolute bottom-4 right-4 w-20 h-20" style={{
              backgroundImage: 'radial-gradient(circle at bottom right, #d4b26a 20%, transparent 21%)',
              backgroundSize: '10px 10px'
            }}></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[70%]">
              <div className="text-[#7a5c29] text-lg mb-0 font-serif italic">Yubiley Taklifi</div>
              <div className="text-[#7a5c29] text-3xl font-bold font-serif mb-0">{firstName}</div>
              <div className="text-[#7a5c29] text-4xl font-bold font-serif mb-2">{age}</div>

              <div className="flex items-center justify-center my-2">
                <div className="w-16 h-[1px] bg-[#7a5c29]"></div>
                <div className="mx-2 text-[#7a5c29]">❧</div>
                <div className="w-16 h-[1px] bg-[#7a5c29]"></div>
              </div>

              <div className="text-[#7a5c29] text-sm mb-1 font-serif">SANA: {formattedDate}</div>
              <div className="text-[#7a5c29] text-sm mb-1 font-serif">VAQT: {time}</div>
              <div className="text-[#7a5c29] text-sm mb-2 font-serif">MANZIL: {truncateText(location, 50)}</div>

              {additionalInfo && (
                <div className="text-[#7a5c29] text-xs italic mt-2 font-serif">
                  {truncateText(additionalInfo, 100)}
                </div>
              )}

              <div className="flex items-center justify-center mt-3">
                <div className="w-24 h-[1px] bg-[#7a5c29]"></div>
                <div className="mx-2 text-[#7a5c29]">✦</div>
                <div className="w-24 h-[1px] bg-[#7a5c29]"></div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'minimalist':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-white overflow-hidden">
            {/* Simple border */}
            <div className="absolute top-4 left-4 right-4 bottom-4 border-[1px] border-gray-300"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%]">
              <div className="text-gray-400 text-xs uppercase tracking-[0.3em] mb-6">YUBILEY</div>
              <div className="text-gray-700 text-2xl font-light mb-1">{firstName}</div>
              <div className="text-gray-900 text-5xl font-light mb-6">{age}</div>

              <div className="w-10 h-[1px] bg-gray-300 mx-auto my-6"></div>

              <div className="text-gray-600 text-sm mb-1 font-light">{formattedDate}</div>
              <div className="text-gray-600 text-sm mb-1 font-light">{time}</div>
              <div className="text-gray-600 text-sm mb-4 font-light">{truncateText(location, 60)}</div>

              {additionalInfo && (
                <div className="text-gray-400 text-xs mt-6 font-light">
                  {truncateText(additionalInfo, 100)}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 'traditional':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-[#f5f0e8] overflow-hidden">
            {/* Traditional pattern border */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-[#c08552] opacity-80" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)'
            }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#c08552] opacity-80" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)'
            }}></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[85%]">
              <div className="text-[#5d4037] text-sm uppercase mb-1">Hurmatli mehmonlar</div>
              <div className="text-[#5d4037] text-3xl font-bold mb-1">{firstName}</div>
              <div className="text-[#5d4037] text-4xl font-bold mb-3">{age} YUBILEY</div>
              <div className="text-[#5d4037] text-sm mb-1">tantanasiga taklif etamiz</div>

              <div className="flex items-center justify-center my-3">
                <div className="w-20 h-[1px] bg-[#c08552]"></div>
                <div className="mx-3 text-[#c08552] text-xl">♦</div>
                <div className="w-20 h-[1px] bg-[#c08552]"></div>
              </div>

              <div className="text-[#5d4037] text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-[#5d4037] text-sm mb-1">VAQT: {time}</div>
              <div className="text-[#5d4037] text-sm mb-2">MANZIL: {truncateText(location, 60)}</div>

              {additionalInfo && (
                <div className="text-[#8d6e63] text-xs italic mt-2">
                  {truncateText(additionalInfo, 100)}
                </div>
              )}
            </div>

            {/* Upload image option */}
            {uploadedImage && (
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
                <div className="w-32 h-32 overflow-hidden border-4 border-[#c08552]">
                  <img src={uploadedImage} alt="Celebration" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'luxury':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-[#1a1a2e] overflow-hidden">
            {/* Luxury gold accents */}
            <div className="absolute top-0 left-0 right-0 bottom-0 border-[10px] border-[#c9a36f]"></div>
            <div className="absolute top-6 left-6 right-6 bottom-6 border-[1px] border-[#c9a36f]"></div>

            {/* Corner decorative elements */}
            <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-[#c9a36f]"></div>
            <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-[#c9a36f]"></div>
            <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-[#c9a36f]"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-[#c9a36f]"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[75%]">
              <div className="text-[#c9a36f] text-sm tracking-widest uppercase mb-2">Yubiley Taklifi</div>
              <div className="text-[#c9a36f] text-3xl font-bold mb-1">{firstName}</div>
              <div className="text-[#c9a36f] text-5xl font-bold mb-3">{age}</div>

              <div className="flex items-center justify-center my-3">
                <div className="w-12 h-[1px] bg-[#c9a36f]"></div>
                <div className="mx-3 text-[#c9a36f]">★</div>
                <div className="w-12 h-[1px] bg-[#c9a36f]"></div>
              </div>

              <div className="text-[#c9a36f] text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-[#c9a36f] text-sm mb-1">VAQT: {time}</div>
              <div className="text-[#c9a36f] text-sm mb-3">MANZIL: {truncateText(location, 50)}</div>

              {additionalInfo && (
                <div className="text-[#c9a36f] text-xs mt-3">
                  {truncateText(additionalInfo, 80)}
                </div>
              )}

              <div className="mt-4 text-[#c9a36f] text-xs tracking-wider uppercase">Tashrif buyurishingizni so'raymiz</div>
            </div>
          </div>
        </div>
      );

    case 'festive':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-gradient-to-r from-[#ff5e62] to-[#ff9966] overflow-hidden">
            {/* Festive confetti background */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px), radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px'
            }}></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[80%] bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg">
              <div className="text-white text-sm uppercase tracking-wider mb-1">Bayramona Yubiley</div>
              <div className="text-white text-3xl font-bold mb-1">{firstName}</div>
              <div className="text-white text-5xl font-bold mb-3">{age}</div>

              <div className="flex items-center justify-center my-3">
                <div className="text-white text-2xl">🎉</div>
                <div className="mx-2 w-20 h-[1px] bg-white"></div>
                <div className="text-white text-2xl">🎂</div>
                <div className="mx-2 w-20 h-[1px] bg-white"></div>
                <div className="text-white text-2xl">🎉</div>
              </div>

              <div className="text-white text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-white text-sm mb-1">VAQT: {time}</div>
              <div className="text-white text-sm mb-2">MANZIL: {truncateText(location, 50)}</div>

              {additionalInfo && (
                <div className="text-white text-xs mt-3">
                  {truncateText(additionalInfo, 80)}
                </div>
              )}

              <div className="mt-2 text-white text-xs">Bayramga xush kelibsiz!</div>
            </div>
          </div>
        </div>
      );

    case 'photo-centric':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-gray-100 overflow-hidden">
            {/* Photo area - will use uploaded image or placeholder */}
            <div className="absolute inset-0">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Jubilee" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span className="text-white text-xl">Rasm yuklanmagan</span>
                </div>
              )}
              {/* Semi-transparent overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[70%] backdrop-blur-sm p-6 border border-white border-opacity-30 rounded-lg">
              <div className="text-white text-sm uppercase tracking-widest mb-1">Yubiley Tantanasi</div>
              <div className="text-white text-3xl font-bold mb-1">{firstName}</div>
              <div className="text-white text-5xl font-bold mb-3">{age}</div>

              <div className="w-16 h-[1px] bg-white mx-auto my-3"></div>

              <div className="text-white text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-white text-sm mb-1">VAQT: {time}</div>
              <div className="text-white text-sm mb-2">MANZIL: {truncateText(location, 50)}</div>

              {additionalInfo && (
                <div className="text-white text-xs italic mt-3">
                  {truncateText(additionalInfo, 80)}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 'geometric':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-[#1a2a3a] overflow-hidden">
            {/* Geometric patterns */}
            <div className="absolute top-0 left-0 w-full h-full">
              <svg width="100%" height="100%" viewBox="0 0 650 400" xmlns="http://www.w3.org/2000/svg">
                <pattern id="triangles" width="50" height="50" patternUnits="userSpaceOnUse">
                  <polygon points="25,5 45,40 5,40" fill="none" stroke="#2c4a6e" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#triangles)" />
              </svg>
            </div>

            <div className="absolute top-6 left-6 right-6 bottom-6 border-[1px] border-[#4a7eb5]"></div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[75%]">
              <div className="text-[#4a7eb5] text-sm uppercase tracking-widest mb-2">Yubiley Taklifi</div>
              <div className="text-[#a3c2e2] text-3xl font-bold mb-1">{firstName}</div>
              <div className="text-[#a3c2e2] text-5xl font-bold mb-3">{age}</div>

              <div className="flex items-center justify-center my-3">
                <div className="w-12 h-[1px] bg-[#4a7eb5]"></div>
                <div className="mx-3 text-[#4a7eb5]">◆</div>
                <div className="w-12 h-[1px] bg-[#4a7eb5]"></div>
              </div>

              <div className="text-[#a3c2e2] text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-[#a3c2e2] text-sm mb-1">VAQT: {time}</div>
              <div className="text-[#a3c2e2] text-sm mb-3">MANZIL: {truncateText(location, 50)}</div>

              {additionalInfo && (
                <div className="text-[#6e9fd4] text-xs mt-3">
                  {truncateText(additionalInfo, 80)}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    case 'nature':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-[650px] h-[400px] bg-[#f0f7e6] overflow-hidden">
            {/* Nature-inspired background elements */}
            <div className="absolute top-0 left-0 w-32 h-32">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,90 Q30,60 50,80 Q70,100 90,70 Q95,40 70,30 Q40,20 30,50 Q20,80 10,90 Z" fill="none" stroke="#88b06a" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-40 h-40">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,90 Q30,60 50,80 Q70,100 90,70 Q95,40 70,30 Q40,20 30,50 Q20,80 10,90 Z" fill="none" stroke="#88b06a" strokeWidth="1" />
              </svg>
            </div>

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[75%] p-7 bg-white bg-opacity-70 rounded-lg border border-[#88b06a]">
              <div className="text-[#4a752d] text-sm uppercase tracking-wider mb-1">Tabiatdagi Yubiley</div>
              <div className="text-[#4a752d] text-3xl font-bold mb-1">{firstName}</div>
              <div className="text-[#4a752d] text-5xl font-bold mb-3">{age}</div>

              <div className="flex items-center justify-center my-3">
                <div className="w-12 h-[1px] bg-[#88b06a]"></div>
                <div className="mx-3 text-[#88b06a]">❧</div>
                <div className="w-12 h-[1px] bg-[#88b06a]"></div>
              </div>

              <div className="text-[#4a752d] text-sm mb-1">SANA: {formattedDate}</div>
              <div className="text-[#4a752d] text-sm mb-1">VAQT: {time}</div>
              <div className="text-[#4a752d] text-sm mb-3">MANZIL: {truncateText(location, 50)}</div>

              {additionalInfo && (
                <div className="text-[#5d8a3c] text-xs italic mt-3">
                  {truncateText(additionalInfo, 80)}
                </div>
              )}
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-[650px] h-[400px] bg-gray-100 flex items-center justify-center">
            <div className="text-gray-500">Shablon tanlanmagan</div>
          </div>
        </div>
      );
  }
};

export default JubileeTemplate;
