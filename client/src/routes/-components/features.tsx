import { cn } from "@/lib/utils";
import { Search, Shield, UserPlus, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Manage Users",
      description:
        "View and organize all your users in one beautiful interface",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: UserPlus,
      title: "Add New Users",
      description: "Easily add new users with our intuitive form system",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find any user quickly with our powerful search functionality",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Secure & Safe",
      description: "Your data is protected with enterprise-grade security",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage users efficiently and effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <div
                className={cn(
                  "w-14 h-14 bg-gradient-to-r rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
                  feature.color
                )}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
