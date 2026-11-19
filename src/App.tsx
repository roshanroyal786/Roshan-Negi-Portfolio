import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import VideoEditsSection from './sections/VideoEditsSection'
import GraphicDesignSection from './sections/GraphicDesignSection'
import FooterSection from './sections/FooterSection'

function App() {
  return (
    <div style={{ overflowX: 'clip', background: '#0C0C0C', fontFamily: "'Kanit', sans-serif" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <VideoEditsSection />
      <GraphicDesignSection />
      <FooterSection />
    </div>
  )
}

export default App
