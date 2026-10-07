import { ArrowRight, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HopeStoriesSection } from '@/components/sections/HopeStoriesSection';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { LookingForHope } from './components/LookingForHope';

export default function LandingPage() {
  return (
    <LookingForHope>
      {/* War Room Section */}
      <section className="px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-[#6b634d] to-zinc-900 border-none overflow-hidden shadow-2xl relative group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-white/10 transition-colors duration-700"></div>

            <CardContent className="p-10 md:p-16 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold tracking-widest uppercase mb-2">
                  <Smartphone className="w-4 h-4" />
                  Free app
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white font-poppins leading-tight">
                  Prayer War Room <br />
                  <span className="text-zinc-400 text-2xl md:text-3xl font-medium">
                    by HopeBegins
                  </span>
                </h2>
                <p className="text-lg text-zinc-300 max-w-xl leading-relaxed">
                  A free app to help you build a stronger prayer life. Follow a
                  guided prayer time, keep a private prayer journal, and keep
                  track of answered prayers with family and friends.
                </p>
                <div className="pt-4">
                  <TrackedLink
                    href="https://warroom.hopebegins.today"
                    target="_blank"
                    rel="noopener noreferrer"
                    linkName="war_room"
                    className="inline-flex items-center justify-center bg-white text-zinc-900 hover:bg-zinc-100 transition-all duration-300 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 group/btn"
                  >
                    Enter War Room
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </TrackedLink>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <HopeStoriesSection />
    </LookingForHope>
  );
}
