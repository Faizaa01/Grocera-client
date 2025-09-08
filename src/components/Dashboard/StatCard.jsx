const StatCard = ({ icon: Icon, title, value, style }) => {
  return (
    <div className="card shadow-md bg-gradient-to-br rounded-xl" style={style}>
      <div className="card-body p-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-white/60">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-serif font-medium text-gray-800">{title}</h3>
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
