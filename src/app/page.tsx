'use client';

import { useState, useEffect } from 'react';

const fontCategories = {
  'Sans Serif': ['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway', 'Poppins', 'Source Sans Pro', 'PT Sans', 'Ubuntu', 'Nunito', 'Arimo', 'Titillium Web', 'Noto Sans', 'Droid Sans', 'Fira Sans', 'Work Sans', 'Karla', 'Rubik', 'Inter', 'Hind', 'Cabin', 'Oxygen', 'Libre Franklin', 'Quicksand', 'Varela Round', 'IBM Plex Sans', 'Exo', 'Exo 2', 'Overpass', 'Red Hat Display', 'Red Hat Text', 'Heebo', 'Assistant', 'Secular One', 'Alef', 'Aclonica', 'Acme', 'Comfortaa', 'Dosis', 'ABeeZee', 'Abel', 'Advent Pro', 'Alata', 'Aldrich', 'Alexandria', 'Amaranth', 'Anaheim', 'Andika', 'Antic', 'Antonio', 'Anybody', 'Asap', 'Asap Condensed', 'Athiti', 'Atkinson Hyperlegible', 'Average Sans', 'B612', 'Balsamiq Sans', 'Barlow', 'Barlow Condensed', 'Barlow Semi Condensed', 'Basic', 'Be Vietnam Pro', 'Belleza', 'BenchNine', 'Blinker', 'Boogaloo', 'Bubblegum Sans', 'Bubbler One', 'Buda', 'Cabin Condensed', 'Cagliostro', 'Cairo', 'Cambay', 'Candal', 'Cantarell', 'Capriola', 'Carter One', 'Catamaran', 'Chakra Petch', 'Changa', 'Chivo', 'Commissioner', 'Convergence', 'Cuprum', 'DM Sans'],
  'Serif': ['Playfair Display', 'Merriweather', 'Crimson Text', 'Libre Baskerville', 'PT Serif', 'Roboto Slab', 'Droid Serif', 'Source Serif Pro', 'Cormorant Garamond', 'EB Garamond', 'Crimson Pro', 'Spectral', 'Cardo', 'Lora', 'Vollkorn', 'Alegreya', 'Old Standard TT', 'Abril Fatface', 'Cinzel', 'Playfair Display SC', 'Cormorant', 'Yeseva One', 'Philosopher', 'Martel', 'Gentium Plus', 'Domine', 'Bitter', 'Zilla Slab', 'Slabo 27px', 'IBM Plex Serif', 'Abhaya Libre', 'Alice', 'Amiri', 'Andada Pro', 'Antic Slab', 'Arbutus Slab', 'Arvo', 'Baskervville', 'Bellefair', 'Bevan', 'BioRhyme', 'Bodoni Moda', 'Bree Serif', 'Brygada 1918', 'Buenard', 'Caladea', 'Cambo', 'Cantata One', 'Castoro', 'Caudex', 'Crete Round', 'Cormorant Infant', 'Cormorant SC', 'Cormorant Unicase', 'Cormorant Upright', 'Coustard', 'Cutive', 'DM Serif Display', 'DM Serif Text', 'Della Respira'],
  'Monospace': ['Inconsolata', 'Source Code Pro', 'Space Mono', 'JetBrains Mono', 'Fira Code', 'Courier New', 'Monaco', 'Consolas', 'Menlo', 'Roboto Mono', 'PT Mono', 'Ubuntu Mono', 'Overpass Mono', 'IBM Plex Mono', 'Azeret Mono', 'B612 Mono', 'Cutive Mono', 'DM Mono', 'Courier Prime', 'Cousine'],
  'Display': ['Oswald', 'Fjalla One', 'Anton', 'Bebas Neue', 'Impact', 'Righteous', 'Fredoka One', 'Alfa Slab One', 'Bungee', 'Russo One', 'Permanent Marker', 'Creepster', 'Archivo', 'Archivo Narrow', 'Archivo Black', 'Frank Ruhl Libre', 'Aileron', 'Akronim', 'Audiowide', 'Autour One', 'Berkshire Swash', 'Big Shoulders Display', 'Big Shoulders Text', 'Bigelow Rules', 'Bigshot One', 'Black Han Sans', 'Black Ops One', 'Blackletter', 'Bowlby One', 'Bowlby One SC', 'Bungee Hairline', 'Bungee Inline', 'Bungee Outline', 'Bungee Shade', 'Butcherman', 'Cabin Sketch', 'Caesar Dressing', 'Calistoga', 'Cantora One', 'Changa One', 'Chango', 'Chau Philomene One', 'Chela One', 'Chelsea Market', 'Cherry Cream Soda', 'Chewy', 'Chicle', 'Chonburi', 'Cinzel Decorative', 'Coda', 'Coda Caption', 'Codystar', 'Coiny', 'Combo', 'Comic Neue', 'Coming Soon', 'Concert One', 'Condiment', 'Content', 'Contrail One', 'Cookie', 'Copse', 'Corben', 'Courgette', 'Covered By Your Grace', 'Crafty Girls', 'Croissant One', 'Crushed', 'Cute Font'],
  'Script': ['Dancing Script', 'Pacifico', 'Lobster', 'Great Vibes', 'Satisfy', 'Kaushan Script', 'Amatic SC', 'Caveat', 'Shadows Into Light', 'Indie Flower', 'Butterfly Kids', 'Calligraffitti', 'Carattere', 'Caveat Brush', 'Cedarville Cursive', 'Charm', 'Charmonman', 'Cherry Swash', 'Chilanka', 'Clicker Script', 'Damion', 'Delius', 'Delius Swash Caps', 'Delius Unicase', 'Devonshire', 'Bilbo', 'Bilbo Swash Caps']
};

const allFonts = Object.values(fontCategories).flat();

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentFont, setCurrentFont] = useState('Inter');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Fonts');
  const [selectedPaletteType, setSelectedPaletteType] = useState<string>('Monochromatic');
  const [savedFonts, setSavedFonts] = useState<string[]>([]);
  const [savedPalettes, setSavedPalettes] = useState<Array<{name: string, palette: typeof currentPalette}>>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAllFonts, setShowAllFonts] = useState(false);
  const [showAllPalettes, setShowAllPalettes] = useState(false);
  const [isMobileDashboardOpen, setIsMobileDashboardOpen] = useState(false);
  const [currentPalette, setCurrentPalette] = useState({
    primary: '#374151',    // gray-700
    secondary: '#1f2937',  // gray-800
    background: '#111827', // gray-900
    text: '#ffffff',       // white
    accent: '#6b7280'      // gray-500
  });
  const displayText = inputText || "i'm lazy";

  const loadGoogleFont = (fontName: string) => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  const getFilteredFonts = () => {
    if (selectedCategory === 'All Fonts') return allFonts;
    return fontCategories[selectedCategory as keyof typeof fontCategories] || [];
  };

  const animateAndChangeFont = (newFont: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentFont(newFont);
      loadGoogleFont(newFont);
      setTimeout(() => setIsAnimating(false), 50);
    }, 150);
  };

  const randomizeFont = () => {
    const filteredFonts = getFilteredFonts();
    if (filteredFonts.length === 0) return;
    const randomFont = filteredFonts[Math.floor(Math.random() * filteredFonts.length)];
    animateAndChangeFont(randomFont);
  };

  const toggleSaveFont = () => {
    if (savedFonts.includes(currentFont)) {
      setSavedFonts(prev => prev.filter(font => font !== currentFont));
    } else {
      setSavedFonts(prev => [...prev, currentFont]);
    }
  };

  const selectSavedFont = (font: string) => {
    animateAndChangeFont(font);
  };

  const hslToHex = (h: number, s: number, l: number) => {
    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    let r, g, b;
    if (sDecimal === 0) {
      r = g = b = lDecimal;
    } else {
      const q = lDecimal < 0.5 ? lDecimal * (1 + sDecimal) : lDecimal + sDecimal - lDecimal * sDecimal;
      const p = 2 * lDecimal - q;
      r = hue2rgb(p, q, hDecimal + 1/3);
      g = hue2rgb(p, q, hDecimal);
      b = hue2rgb(p, q, hDecimal - 1/3);
    }
    
    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };



  const generateRandomPalette = () => {
    const baseHue = Math.floor(Math.random() * 360);
    const baseSaturation = 60 + Math.floor(Math.random() * 30); // 60-90% saturation
    
    let newPalette;
    
    switch (selectedPaletteType) {
      case 'Complementary':
        // Base color and its complement (180° apart)
        const complementHue = (baseHue + 180) % 360;
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),
          secondary: hslToHex(baseHue, baseSaturation - 10, 30),
          background: hslToHex(baseHue, baseSaturation - 20, 10),
          text: '#ffffff',
          accent: hslToHex(complementHue, baseSaturation, 60)
        };
        break;
        
      case 'Analogous':
        // Colors adjacent on color wheel (30° apart)
        const analogous1 = (baseHue + 30) % 360;
        const analogous2 = (baseHue - 30 + 360) % 360;
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),
          secondary: hslToHex(analogous1, baseSaturation - 10, 35),
          background: hslToHex(baseHue, baseSaturation - 20, 10),
          text: '#ffffff',
          accent: hslToHex(analogous2, baseSaturation, 65)
        };
        break;
        
      case 'Triadic':
        // Three colors evenly spaced (120° apart)
        const triadic1 = (baseHue + 120) % 360;
        const triadic2 = (baseHue + 240) % 360;
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),
          secondary: hslToHex(triadic1, baseSaturation - 10, 35),
          background: hslToHex(baseHue, baseSaturation - 20, 10),
          text: '#ffffff',
          accent: hslToHex(triadic2, baseSaturation, 65)
        };
        break;
        
      default: // Monochromatic
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),        // Medium lightness
          secondary: hslToHex(baseHue, baseSaturation - 10, 30), // Darker
          background: hslToHex(baseHue, baseSaturation - 20, 10), // Very dark
          text: '#ffffff',                                       // White text for contrast
          accent: hslToHex(baseHue, baseSaturation, 70)         // Lighter shade
        };
    }
    
    setCurrentPalette(newPalette);
  };

  const toggleSavePalette = () => {
    const paletteExists = savedPalettes.some(p => 
      JSON.stringify(p.palette) === JSON.stringify(currentPalette)
    );
    
    if (paletteExists) {
      setSavedPalettes(prev => prev.filter(p => 
        JSON.stringify(p.palette) !== JSON.stringify(currentPalette)
      ));
    } else {
      const paletteNumber = savedPalettes.length + 1;
      const paletteName = `Palette ${paletteNumber}`;
      setSavedPalettes(prev => [...prev, { name: paletteName, palette: currentPalette }]);
    }
  };

  const selectSavedPalette = (palette: typeof currentPalette) => {
    setCurrentPalette(palette);
  };



  useEffect(() => {
    // Generate random font and palette on initial load
    const randomFont = allFonts[Math.floor(Math.random() * allFonts.length)];
    
    // Generate random palette type
    const paletteTypes = ['Monochromatic', 'Complementary', 'Analogous', 'Triadic'];
    const randomPaletteType = paletteTypes[Math.floor(Math.random() * paletteTypes.length)];
    
    // Set random palette type first
    setSelectedPaletteType(randomPaletteType);
    
    // Generate random palette with the selected type
    const baseHue = Math.floor(Math.random() * 360);
    const baseSaturation = 60 + Math.floor(Math.random() * 30); // 60-90% saturation
    
    let newPalette;
    
    switch (randomPaletteType) {
      case 'Complementary':
        const complementHue = (baseHue + 180) % 360;
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),
          secondary: hslToHex(baseHue, baseSaturation - 10, 30),
          background: hslToHex(baseHue, baseSaturation - 20, 10),
          text: '#ffffff',
          accent: hslToHex(complementHue, baseSaturation, 60)
        };
        break;
        
      case 'Analogous':
        const analogous1 = (baseHue + 30) % 360;
        const analogous2 = (baseHue - 30 + 360) % 360;
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),
          secondary: hslToHex(analogous1, baseSaturation - 10, 35),
          background: hslToHex(baseHue, baseSaturation - 20, 10),
          text: '#ffffff',
          accent: hslToHex(analogous2, baseSaturation, 65)
        };
        break;
        
      case 'Triadic':
        const triadic1 = (baseHue + 120) % 360;
        const triadic2 = (baseHue + 240) % 360;
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),
          secondary: hslToHex(triadic1, baseSaturation - 10, 35),
          background: hslToHex(baseHue, baseSaturation - 20, 10),
          text: '#ffffff',
          accent: hslToHex(triadic2, baseSaturation, 65)
        };
        break;
        
      default: // Monochromatic
        newPalette = {
          primary: hslToHex(baseHue, baseSaturation, 50),
          secondary: hslToHex(baseHue, baseSaturation - 10, 30),
          background: hslToHex(baseHue, baseSaturation - 20, 10),
          text: '#ffffff',
          accent: hslToHex(baseHue, baseSaturation, 70)
        };
    }
    
    // Apply random font and palette
    setCurrentFont(randomFont);
    setCurrentPalette(newPalette);
    loadGoogleFont(randomFont);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "I'm Lazy - Font & Color Palette Generator",
    "description": "Generate random Google Fonts and color palettes instantly. Create monochromatic, complementary, analogous, and triadic color schemes.",
    "url": "https://im-lazy.vercel.app",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "I'm Lazy Design Tools"
    },
    "featureList": [
      "Random Google Font Generator",
      "Color Palette Generator",
      "Monochromatic Color Schemes",
      "Complementary Color Schemes", 
      "Analogous Color Schemes",
      "Triadic Color Schemes",
      "Font Collection Management",
      "Palette Collection Management"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="h-screen flex flex-col lg:flex-row transition-colors duration-500 overflow-hidden" style={{ backgroundColor: currentPalette.background }}>
      
      {/* Mobile Dashboard Dropdown Button */}
      <div className="lg:hidden w-full p-4 border-b transition-all duration-500" style={{ 
        backgroundColor: currentPalette.secondary,
        borderColor: `${currentPalette.accent}50`
      }}>
        <button
          onClick={() => setIsMobileDashboardOpen(!isMobileDashboardOpen)}
          className="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
          style={{ 
            backgroundColor: `${currentPalette.primary}20`,
            color: currentPalette.text
          }}
        >
          <span className="text-lg font-semibold">Collections</span>
          <div 
            className={`w-6 h-6 transition-transform duration-200 ${isMobileDashboardOpen ? 'rotate-180' : ''}`}
            style={{ 
              backgroundColor: currentPalette.text,
              mask: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e") no-repeat center`,
              maskSize: 'contain',
              WebkitMask: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e") no-repeat center`,
              WebkitMaskSize: 'contain'
            }}
          />
        </button>
      </div>

      {/* Dashboard Content - Mobile: Dropdown, Desktop: Sidebar */}
      <div className={`
        ${isMobileDashboardOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} 
        lg:max-h-none lg:opacity-100 
        overflow-hidden lg:overflow-y-auto 
        transition-all duration-300 ease-in-out
        w-full lg:w-80 lg:border-r p-0 lg:p-6 
        relative flex-shrink-0
        lg:block z-10
      `} style={{ 
        backgroundColor: currentPalette.secondary,
        borderColor: `${currentPalette.accent}50`
      }}>
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full blur-3xl animate-pulse transition-colors duration-500" style={{ backgroundColor: currentPalette.primary }}></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full blur-2xl animate-pulse transition-colors duration-500" style={{ backgroundColor: currentPalette.accent, animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 p-4 lg:p-0">
          {/* Dashboard Header - Hidden on mobile since we have the dropdown button */}
          <div className="hidden lg:block text-center mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold transition-colors duration-500" style={{ 
              color: currentPalette.text
            }}>
              Dashboard
            </h2>
          </div>
          

          
          {/* Saved Fonts Section */}
          <div className="space-y-2 lg:space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base lg:text-lg font-semibold transition-colors duration-500" style={{ color: currentPalette.text }}>Font Collection</h3>
              <div className="flex-1 h-px transition-all duration-500" style={{ 
                backgroundColor: `${currentPalette.accent}60`
              }}></div>
            </div>
            
            {savedFonts.length === 0 ? (
              <div className="text-center py-4 lg:py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: `${currentPalette.secondary}80` }}>
                  <div 
                    className="w-8 h-8"
                    style={{ 
                      backgroundColor: currentPalette.primary,
                      mask: `url(/book.svg) no-repeat center`,
                      maskSize: 'contain',
                      WebkitMask: `url(/book.svg) no-repeat center`,
                      WebkitMaskSize: 'contain',
                      opacity: 0.6
                    }}
                  />
                </div>
                <p className="text-sm mb-2 transition-colors duration-500" style={{ color: currentPalette.accent }}>No fonts in your collection</p>
                <p className="text-xs transition-colors duration-500" style={{ color: `${currentPalette.accent}80` }}>Click the bookmark to save fonts</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(showAllFonts ? savedFonts : savedFonts.slice(0, 2)).map((font, index) => (
                  <div key={font} className="group relative">
                    <div className="backdrop-blur-sm border rounded-lg overflow-hidden transition-all duration-300" style={{ 
                      backgroundColor: `${currentPalette.background}E6`,
                      borderColor: `${currentPalette.accent}4D`
                    }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${currentPalette.accent}80`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = `${currentPalette.accent}4D`}>
                      <div className="flex items-center">
                        {/* Main content area */}
                        <button
                          onClick={() => selectSavedFont(font)}
                          className="flex-1 text-left p-3 hover:bg-white/5 transition-colors"
                        >
                          <div className="font-medium text-sm mb-1 truncate transition-colors duration-500" style={{ fontFamily: font, color: currentPalette.text }}>
                            {displayText}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs transition-colors duration-500" style={{ color: currentPalette.accent }}>Link:</span>
                            <a
                              href={`https://fonts.google.com/specimen/${font.replace(/\s+/g, '+')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-mono hover:underline transition-colors duration-200"
                              style={{ color: currentPalette.primary }}
                              onMouseEnter={(e) => e.currentTarget.style.color = currentPalette.accent}
                              onMouseLeave={(e) => e.currentTarget.style.color = currentPalette.primary}
                            >
                              {font}
                            </a>
                          </div>
                        </button>
                        
                        {/* Delete button */}
                        <div className="p-2 border-l transition-colors duration-500" style={{ borderColor: `${currentPalette.accent}50` }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSavedFonts(prev => prev.filter(f => f !== font));
                            }}
                            className="p-1 hover:bg-red-500/20 rounded transition-all duration-200 group/delete"
                          >
                            <div 
                              className="w-4 h-4 opacity-60 hover:opacity-100 group-hover/delete:scale-110 transition-all duration-200"
                              style={{ 
                                backgroundColor: '#ef4444',
                                mask: `url(/delete.svg) no-repeat center`,
                                maskSize: 'contain',
                                WebkitMask: `url(/delete.svg) no-repeat center`,
                                WebkitMaskSize: 'contain'
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {savedFonts.length > 2 && (
                  <button
                    onClick={() => setShowAllFonts(!showAllFonts)}
                    className="w-full text-center py-2 text-sm transition-colors duration-200"
                    style={{ color: currentPalette.accent }}
                    onMouseEnter={(e) => e.currentTarget.style.color = currentPalette.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = currentPalette.accent}
                  >
                    {showAllFonts ? 'View Less' : `View More (${savedFonts.length - 2} more)`}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Saved Palettes Section */}
          <div className="space-y-2 lg:space-y-4 mt-4 lg:mt-8">
            <div className="flex items-center gap-2">
              <h3 className="text-base lg:text-lg font-semibold transition-colors duration-500" style={{ color: currentPalette.text }}>Palette Collection</h3>
              <div className="flex-1 h-px transition-all duration-500" style={{ 
                backgroundColor: `${currentPalette.accent}60`
              }}></div>
            </div>
            
            {savedPalettes.length === 0 ? (
              <div className="text-center py-4 lg:py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-500" style={{ backgroundColor: `${currentPalette.secondary}80` }}>
                  <div 
                    className="w-8 h-8"
                    style={{ 
                      backgroundColor: currentPalette.primary,
                      mask: `url(/book.svg) no-repeat center`,
                      maskSize: 'contain',
                      WebkitMask: `url(/book.svg) no-repeat center`,
                      WebkitMaskSize: 'contain',
                      opacity: 0.6
                    }}
                  />
                </div>
                <p className="text-sm mb-2 transition-colors duration-500" style={{ color: currentPalette.accent }}>No palettes in your collection</p>
                <p className="text-xs transition-colors duration-500" style={{ color: `${currentPalette.accent}80` }}>Click the save-paint icon to save palettes</p>
              </div>
            ) : (
              <div className="space-y-2">
                {(showAllPalettes ? savedPalettes : savedPalettes.slice(0, 2)).map((savedPalette, index) => (
                  <div key={index} className="group relative">
                    <div className="backdrop-blur-sm border rounded-lg overflow-hidden transition-all duration-300" style={{ 
                      backgroundColor: `${currentPalette.background}E6`,
                      borderColor: `${currentPalette.accent}4D`
                    }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${currentPalette.accent}80`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = `${currentPalette.accent}4D`}>
                      <div className="flex items-center">
                        {/* Main content area */}
                        <button
                          onClick={() => selectSavedPalette(savedPalette.palette)}
                          className="flex-1 text-left p-3 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-sm mb-1 transition-colors duration-500" style={{ color: currentPalette.text }}>
                                {savedPalette.name}
                              </div>
                              <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: savedPalette.palette.primary }}></div>
                                <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: savedPalette.palette.secondary }}></div>
                                <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: savedPalette.palette.background }}></div>
                                <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: savedPalette.palette.accent }}></div>
                              </div>
                            </div>
                            <div className="text-xs font-mono transition-colors duration-500 leading-tight text-right" style={{ color: `${currentPalette.accent}CC` }}>
                              <div>{savedPalette.palette.primary} {savedPalette.palette.secondary}</div>
                              <div>{savedPalette.palette.background} {savedPalette.palette.accent}</div>
                            </div>
                          </div>
                        </button>
                        
                        {/* Delete button */}
                        <div className="p-2 border-l transition-colors duration-500" style={{ borderColor: `${currentPalette.accent}50` }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSavedPalettes(prev => prev.filter((_, i) => i !== index));
                            }}
                            className="p-1 hover:bg-red-500/20 rounded transition-all duration-200 group/delete"
                          >
                            <div 
                              className="w-4 h-4 opacity-60 hover:opacity-100 group-hover/delete:scale-110 transition-all duration-200"
                              style={{ 
                                backgroundColor: '#ef4444',
                                mask: `url(/delete.svg) no-repeat center`,
                                maskSize: 'contain',
                                WebkitMask: `url(/delete.svg) no-repeat center`,
                                WebkitMaskSize: 'contain'
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {savedPalettes.length > 2 && (
                  <button
                    onClick={() => setShowAllPalettes(!showAllPalettes)}
                    className="w-full text-center py-2 text-sm transition-colors duration-200"
                    style={{ color: currentPalette.accent }}
                    onMouseEnter={(e) => e.currentTarget.style.color = currentPalette.primary}
                    onMouseLeave={(e) => e.currentTarget.style.color = currentPalette.accent}
                  >
                    {showAllPalettes ? 'View Less' : `View More (${savedPalettes.length - 2} more)`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div 
        className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 transition-colors duration-500 h-full overflow-y-auto" 
        style={{ backgroundColor: currentPalette.background }}
        onClick={() => {
          if (isMobileDashboardOpen) {
            setIsMobileDashboardOpen(false);
          }
        }}
      >
        {/* Main layout with aligned vertical list */}
        <div className="flex h-full w-full relative">
          
          {/* Large Display Text - Center */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center w-full">
              <h1 
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center break-words max-w-full transition-all duration-300 leading-tight ${
                  isAnimating ? 'opacity-60' : 'opacity-100'
                }`}
                style={{ 
                  fontFamily: currentFont,
                  color: currentPalette.text
                }}
              >
                {displayText}
              </h1>
            </div>
          </div>

          {/* Compact Vertical List - Bottom Left */}
          <div className="absolute bottom-4 left-4 space-y-3">
            
            {/* Type Something Input */}
            <div className="relative w-80">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused || inputText ? "" : "Type something..."}
                className="px-4 py-2 text-lg bg-transparent focus:outline-none w-full transition-colors duration-500 placeholder-opacity-60"
                style={{ 
                  color: currentPalette.text
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-500" style={{ backgroundColor: currentPalette.accent }}></div>
            </div>

            {/* SVG Icons */}
            <div className="flex items-center gap-3">
              <button
                onClick={randomizeFont}
                className="p-2 relative group"
                aria-label="Randomize font"
              >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap px-2 py-1 rounded" style={{ 
                  color: currentPalette.text,
                  backgroundColor: `${currentPalette.background}E6`
                }}>
                  Random Font
                </div>
                <div 
                  className="w-8 h-8 hover:scale-110 transition-all duration-500"
                  style={{ 
                    backgroundColor: currentPalette.primary,
                    mask: `url(/pencil.svg) no-repeat center`,
                    maskSize: 'contain',
                    WebkitMask: `url(/pencil.svg) no-repeat center`,
                    WebkitMaskSize: 'contain',
                    opacity: 1
                  }}
                />
              </button>

              <button
                onClick={generateRandomPalette}
                className="p-2 relative group"
                aria-label="Paint"
              >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap px-2 py-1 rounded" style={{ 
                  color: currentPalette.text,
                  backgroundColor: `${currentPalette.background}E6`
                }}>
                  Random Palette
                </div>
                <div 
                  className="w-8 h-8 hover:scale-110 transition-all duration-500"
                  style={{ 
                    backgroundColor: currentPalette.primary,
                    mask: `url(/paint.svg) no-repeat center`,
                    maskSize: 'contain',
                    WebkitMask: `url(/paint.svg) no-repeat center`,
                    WebkitMaskSize: 'contain',
                    opacity: 1
                  }}
                />
              </button>

              <button
                onClick={toggleSaveFont}
                className="p-2 relative group"
                aria-label="Save font"
              >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap px-2 py-1 rounded" style={{ 
                  color: currentPalette.text,
                  backgroundColor: `${currentPalette.background}E6`
                }}>
                  Save Font
                </div>
                <div 
                  className="w-8 h-8 hover:scale-110 transition-all duration-500"
                  style={{ 
                    backgroundColor: currentPalette.primary,
                    mask: `url(/bookmark.svg) no-repeat center`,
                    maskSize: 'contain',
                    WebkitMask: `url(/bookmark.svg) no-repeat center`,
                    WebkitMaskSize: 'contain',
                    opacity: 1
                  }}
                />
              </button>

              <button
                onClick={toggleSavePalette}
                className="p-2 relative group"
                aria-label="Save palette"
              >
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap px-2 py-1 rounded" style={{ 
                  color: currentPalette.text,
                  backgroundColor: `${currentPalette.background}E6`
                }}>
                  Save Palette
                </div>
                <div 
                  className="w-8 h-8 hover:scale-110 transition-all duration-500"
                  style={{ 
                    backgroundColor: currentPalette.primary,
                    mask: `url(/save-paint.svg) no-repeat center`,
                    maskSize: 'contain',
                    WebkitMask: `url(/save-paint.svg) no-repeat center`,
                    WebkitMaskSize: 'contain',
                    opacity: 1
                  }}
                />
              </button>
            </div>

            {/* Font Filter - Single Line */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setSelectedCategory('All Fonts')}
                className="px-2 py-1 text-xs transition-all duration-200 relative whitespace-nowrap flex-shrink-0"
                style={{ 
                  color: selectedCategory === 'All Fonts' ? currentPalette.text : currentPalette.accent 
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== 'All Fonts') {
                    e.currentTarget.style.color = currentPalette.text;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== 'All Fonts') {
                    e.currentTarget.style.color = currentPalette.accent;
                  }
                }}
              >
                All Fonts
                {selectedCategory === 'All Fonts' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-500" style={{ backgroundColor: currentPalette.text }}></div>
                )}
              </button>
              {Object.keys(fontCategories).map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="px-2 py-1 text-xs transition-all duration-200 relative whitespace-nowrap flex-shrink-0"
                  style={{ 
                    color: selectedCategory === category ? currentPalette.text : currentPalette.accent 
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.color = currentPalette.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.color = currentPalette.accent;
                    }
                  }}
                >
                  {category}
                  {selectedCategory === category && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-500" style={{ backgroundColor: currentPalette.text }}></div>
                  )}
                </button>
              ))}
            </div>

            {/* Palette Filter - Single Line */}
            <div className="flex items-center gap-2">
              {['Monochromatic', 'Complementary', 'Analogous', 'Triadic'].map(paletteType => (
                <button
                  key={paletteType}
                  onClick={() => setSelectedPaletteType(paletteType)}
                  className="px-2 py-1 text-xs transition-all duration-200 relative whitespace-nowrap"
                  style={{ 
                    color: selectedPaletteType === paletteType ? currentPalette.text : currentPalette.accent 
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPaletteType !== paletteType) {
                      e.currentTarget.style.color = currentPalette.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPaletteType !== paletteType) {
                      e.currentTarget.style.color = currentPalette.accent;
                    }
                  }}
                >
                  {paletteType}
                  {selectedPaletteType === paletteType && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-500" style={{ backgroundColor: currentPalette.text }}></div>
                  )}
                </button>
              ))}
            </div>

            {/* Current Font Name */}
            <div>
              <a 
                href={`https://fonts.google.com/specimen/${currentFont.replace(/\s+/g, '+')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono hover:scale-105 transition-all duration-200 cursor-pointer block"
                style={{ 
                  color: currentPalette.accent
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = currentPalette.text}
                onMouseLeave={(e) => e.currentTarget.style.color = currentPalette.accent}
              >
                Link: {currentFont}
              </a>
            </div>

            {/* Current Hex Codes */}
            <div>
              <div className="flex items-center gap-1 text-xs font-mono" style={{ color: `${currentPalette.accent}CC` }}>
                <span>{currentPalette.primary}</span>
                <span>•</span>
                <span>{currentPalette.secondary}</span>
                <span>•</span>
                <span>{currentPalette.background}</span>
                <span>•</span>
                <span>{currentPalette.accent}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
