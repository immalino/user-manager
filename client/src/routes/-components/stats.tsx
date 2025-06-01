import { Heart, Shield, Zap } from "lucide-react";

const Stats = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Built with ❤️ for Developers
        </h2>
        <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
          Modern, responsive, and intuitive user management solution
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Fast</h3>
            <p className="opacity-90">
              Lightning-fast performance and smooth interactions
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Secure</h3>
            <p className="opacity-90">
              Built with security and privacy in mind
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Beautiful</h3>
            <p className="opacity-90">Designed for the best user experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Stats;
