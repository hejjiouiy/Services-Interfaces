import { useMemo } from "react";
import CountUp from "react-countup";

const statsData = [
  { count: 50, suffix: "+", label: "Available Services" },
  { count: 24, suffix: "/7", label: "Support Access" },
  { count: 15, suffix: "min", label: "Average Response" },
  { count: 100, suffix: "%", label: "Secure Platform" },
];

const StatsSection = () => {
  const stats = useMemo(() => {
    const styles = [
      { top: "top-0", right: "right-0", translateX: "translate-x-8", translateY: "-translate-y-8" },
      { top: "top-4", right: "right-2", translateX: "translate-x-10", translateY: "-translate-y-6" },
      { top: "top-2", right: "right-4", translateX: "translate-x-6", translateY: "-translate-y-10" },
    ];
    const sizes = ["w-16 h-16", "w-20 h-20", "w-24 h-24"];

    return statsData.map((stat) => {
  const style = styles[Math.floor(Math.random() * styles.length)];
  const size = sizes[Math.floor(Math.random() * sizes.length)];

  // Keep bubbles on left, vary bottom and left values
  const bottomOffsets = [
    { bottom: "bottom-0", left: "left-0", translateX: "-translate-x-8", translateY: "translate-y-8" },
    { bottom: "bottom-2", left: "left-2", translateX: "-translate-x-7", translateY: "translate-y-6" },
    { bottom: "bottom-4", left: "left-4", translateX: "-translate-x-6", translateY: "translate-y-7" },
    { bottom: "bottom-1", left: "left-3", translateX: "-translate-x-7", translateY: "translate-y-5" },
  ];
  const bottomBubble = bottomOffsets[Math.floor(Math.random() * bottomOffsets.length)];
  const bottomSize = sizes[Math.floor(Math.random() * sizes.length)];

  return { ...stat, style, size, bottomBubble, bottomSize };
});
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-14">
      {stats.map((stat, index) => (
        <div
          key={index}
          aria-label={stat.label}
          className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
        >
          {/* Dynamic Top-Right Bubble */}
          <div
            className={`absolute ${stat.style.top} ${stat.style.right} ${stat.size} bg-soft-gray rounded-full transform ${stat.style.translateX} ${stat.style.translateY}
              group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-500 ease-in-out`}
          > </div>

          {/* Dynamic Bottom Accent */}
            <div
            className={`absolute ${stat.bottomBubble.bottom} ${stat.bottomBubble.left} ${stat.bottomSize} bg-main-beige rounded-full transform ${stat.bottomBubble.translateX} ${stat.bottomBubble.translateY} group-hover:-translate-x-6 group-hover:translate-y-6 transition-all duration-500`}
            />
          {/* Stat Text */}
          <div className="relative z-10 text-center">
            <p className="text-4xl font-bold text-main-green mb-1 group-hover:scale-110 transition-transform duration-300">
              <CountUp end={stat.count} duration={2} />{stat.suffix}
            </p>
            <p className="text-darker-beige text-sm uppercase tracking-wider font-medium">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
