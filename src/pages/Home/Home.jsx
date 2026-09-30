import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '../../constants/routes';
import { SERVICES } from '../../constants/services';

// Stat counter sub-component for premium scroll feel
function StatItem({ value, label, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value.replace(/,/g, ''));
    if (isNaN(end)) {
      setTimeout(() => setDisplayValue(value), 0);
      return;
    }
    const duration = 1200;
    const increment = end / (duration / 16); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const formattedDisplay = typeof displayValue === 'number'
    ? displayValue.toLocaleString('en-IN')
    : displayValue;

  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-dark mb-2 tracking-tight">
        {prefix}{formattedDisplay}{suffix}
      </div>
      <div className="text-ink-muted text-sm md:text-base font-bold tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    stars: 5,
    text: "Much easier to install and use than most plug-ins and as a solo founder I really really love that free tier at first! We all need to start somewhere.",
    name: "Maria Petrenko",
    date: "Mar 19, 2026",
    avatar: "https://ui-avatars.com/api/?name=Maria+Petrenko&background=0D8ABC&color=fff",
  },
  {
    stars: 5,
    text: "Very easy to implement, adjust and deploy the widgets. The widgets looks great and the dashboard is super user friendly! I ran into a minor issue and the support team was very quick...",
    name: "Tim Lestander",
    date: "Jan 8, 2026",
    avatar: "https://ui-avatars.com/api/?name=Tim+Lestander&background=555&color=fff",
  },
  {
    stars: 5,
    text: "This is exactly what I was looking for. I wouldn't say I'm completely technically adept but needed a solid reliable solution. Was very easy to implement...",
    name: "Priya Mehta",
    date: "Dec 4, 2025",
    avatar: "https://ui-avatars.com/api/?name=Priya+Mehta&background=random",
  },
  {
    stars: 5,
    text: "SBS Financials has transformed my portfolio. Their SIP recommendations are spot-on, and their ongoing rebalancing advice has kept me on track.",
    name: "Rajesh Patel",
    date: "Mar 19, 2026",
    avatar: "https://ui-avatars.com/api/?name=Rajesh+Patel&background=random",
  },
  {
    stars: 5,
    text: "Extremely professional tax planning advice. Saved me significant tax using customized ELSS options while building long-term equity wealth.",
    name: "Amit Sharma",
    date: "Jan 8, 2026",
    avatar: "https://ui-avatars.com/api/?name=Amit+Sharma&background=random",
  }
];

function Home() {
  // Extract 4 main services for the preview section
  const previewServices = SERVICES.slice(0, 4);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 || window.matchMedia('(hover: none)').matches;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(hover: none)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouch || isSmallScreen);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Framer Motion Variants for hover cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: custom * 0.1 }
    })
  };

  const titleVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: isMobile ? 0 : 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { y: "100%" },
    visible: {
      y: isMobile ? 0 : "100%",
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: {
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 1 },
    visible: { scale: 1 },
    hover: { scale: 1.08, transition: { duration: 0.4 } }
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-white text-ink-dark pt-32 pb-24 md:pt-40 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-gray-100">
        {/* Abstract Gold Background Decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-green-700 tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            Ready to Build a Stronger <span className="text-gold-400 italic font-medium">Financial</span> Future?
          </h1>

          <p className="text-ink-muted text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Your financial goals deserve more than generic advice; they deserve a strategy built around you. At SBS Financial Services, we help individuals and families make confident financial decisions with smart planning, trusted guidance, and future focused investment solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ROUTES.CONTACT} className="btn-primary w-full sm:w-auto px-8 py-3.5 shadow-lg shadow-gold-400/15 flex items-center justify-center gap-2 group">
              <span>Get Started Today</span>
              <Icons.ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-250" />
            </Link>
            <Link to={ROUTES.SERVICES} className="btn-outline w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2">
              <span>Our Services</span>
              <Icons.Briefcase size={18} />
            </Link>
          </div>
        </div>

        {/* Decorative Gold Bottom Wave Accent (Restored) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40"></div>
      </section>

      {/* 2. Stats Bar (Clean White Layout) */}
      <section className="bg-white border-b border-gold-400/15 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-x divide-gold-400/20">
            <StatItem value="6" label="Years of Experience" suffix="+" />
            <StatItem value="500" label="Clients Served" suffix="+" />
            <StatItem value="50" label="Assets Under Advisory" prefix="₹ " suffix="cr+" />
            <StatItem value="10" label="Advisory Services" suffix="+" />
          </div>
        </div>
      </section>

      {/* 3. What We Offer (Services Preview) */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title section-title-accent inline-block">What We Do</h2>
            <p className="text-ink-muted text-body-lg mt-4">
              We provide future-focused financial solutions and investment strategies tailored to help you create lasting financial security and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {previewServices.map((service, idx) => {
              const IconComponent = Icons[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={!isMobile ? "hover" : undefined}
                  viewport={{ once: false, margin: isMobile ? "-25% 0px" : "-50px" }}
                  custom={idx}
                  variants={cardVariants}
                  className="product-hover-card w-full group"
                >
                  <div className="product-card-image-wrap">
                    
                    {/* Background Image */}
                    <motion.img
                      src={`/images/approach_step${(idx % 4) + 1}.png`}
                      alt={service.title}
                      className="product-card-bg-img"
                      variants={imageVariants}
                    />

                    {/* Top Right Tag */}
                    <span className="absolute top-4 right-4 z-20 bg-gold-400 text-green-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {service.title.split(' ')[0]}
                    </span>

                    {/* Dark Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 z-10"></div>

                    {/* Title Overlay (Visible before hover) */}
                    <motion.div
                      className="product-card-title-overlay absolute bottom-0 left-0 right-0 p-6 z-[15] text-white"
                      variants={titleVariants}
                    >
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-1 drop-shadow-md">
                        {service.title}
                      </h3>
                      {service.focusPoints && service.focusPoints[0] && (
                        <p className="text-gold-400 text-xs font-semibold drop-shadow-md">
                          {service.focusPoints[0]}
                        </p>
                      )}
                    </motion.div>

                    {/* Hover Content Sliding Up */}
                    <motion.div
                      className="product-card-content flex flex-col justify-between h-[75%]"
                      variants={contentVariants}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-white/20 text-white backdrop-blur-md rounded-lg shadow-sm border border-white/10">
                            {IconComponent ? <IconComponent size={20} /> : <Icons.HelpCircle size={20} />}
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-white drop-shadow-md">
                            {service.title}
                          </h3>
                        </div>
                        <p className="text-white/90 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 drop-shadow-sm">
                          {service.description}
                        </p>
                        {service.focusPoints && service.focusPoints[1] && (
                          <div className="w-full bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 mb-4 text-white/90 text-xs font-medium border-l-2 border-gold-400 border-t border-r border-b border-white/5">
                            {service.focusPoints[1]}
                          </div>
                        )}
                      </div>

                      <Link to={service.href} className="text-gold-400 hover:text-white font-semibold text-sm flex items-center gap-1 group/link transition-colors duration-250 mt-auto pb-2 drop-shadow-sm">
                        <span>Learn More</span>
                        <Icons.ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </motion.div>
                    
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us - Big Typography & Minimalist */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-700 tracking-tight max-w-2xl">
              A higher standard of <span className="text-gold-400 italic">wealth management.</span>
            </h2>
            <p className="text-ink-muted text-lg max-w-md lg:text-right">
              We stand apart through our client-first fiduciary commitment, customized portfolios, and proactive market advisory.
            </p>
          </div>

          <div className="border-t border-gold-400/30">
            {[
              { 
                num: '01',
                title: 'Certified Fiduciary Advisory', 
                desc: 'We adhere strictly to professional fiduciary standards. Your investment safety and financial success dictate every single decision we make.'
              },
              { 
                num: '02',
                title: 'Bespoke Tailored Strategies', 
                desc: 'We reject standard pre-packaged portfolios. Every blueprint we formulate is uniquely aligned with your specific life milestones and risk appetite.'
              },
              { 
                num: '03',
                title: 'Proven Track Record', 
                desc: 'Through multiple bull and bear markets, our proactive management has consistently protected capital while providing steady, compound growth.'
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="group border-b border-gold-400/30 py-10 md:py-16 flex flex-col md:flex-row md:items-start gap-6 md:gap-16 hover:bg-green-50/50 transition-colors duration-500 px-4 -mx-4 md:px-8 md:-mx-8 rounded-xl"
              >
                {/* Big Number */}
                <div className="text-6xl md:text-8xl font-light text-gold-400/40 group-hover:text-gold-400 transition-colors duration-500 leading-none md:w-32 shrink-0">
                  {item.num}
                </div>
                
                {/* Content */}
                <div className="flex-1 md:pt-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-4">{item.title}</h3>
                  <p className="text-ink-muted text-lg leading-relaxed max-w-3xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>



      {/* 7. Testimonials */}
      <section className="py-12 md:py-16 bg-slate-50 relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <h2 className="section-title section-title-accent inline-block">What Our Clients Say</h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Real testimonials from satisfied individuals who have reached financial freedom with our advice.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-hidden group py-4">
          {/* Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee gap-6 px-3">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div 
                key={idx} 
                className="w-[300px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                    </div>
                    {/* Google Logo */}
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Icons.Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {t.text}
                  </p>
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {t.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact CTA Strip */}
      <section className="bg-green-950 text-ink-dark py-16 px-4 md:px-8 text-center relative overflow-hidden border-t border-gold-400/10">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-3.5xl font-bold mb-4">Ready to Secure Your Wealth?</h2>
          <p className="text-ink-muted mb-8 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Book a complimentary introductory advisory session with one of our certified wealth planning experts.
          </p>
          <Link to={ROUTES.CONTACT} className="btn-primary px-8 py-3.5 inline-flex items-center gap-2 group shadow-lg shadow-gold-400/10">
            <span>Book Consultation</span>
            <Icons.Calendar size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
