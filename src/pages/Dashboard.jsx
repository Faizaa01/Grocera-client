import { useState, useEffect } from "react";
import { GrDeliver, GrMoney, GrUserWorker } from "react-icons/gr";
import { FaBoxesStacked } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import StatCard from "../components/Dashboard/StatCard";
import Order from "../components/Dashboard/Order";
import img from "../assets/images/1.png";
import bg from "../assets/images/bg5.jpeg";
import authApiClient from "../services/auth-api-client";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authApiClient.get("/auth/users/me/");
        const groups = res.data.groups || [];
        const normalizedGroups = groups.map(g => g.toLowerCase());
        
        let userRole = "user";
        if (normalizedGroups.includes("admin")) userRole = "admin";
        else if (normalizedGroups.includes("seller")) userRole = "seller";
        setRole(userRole);

        if (userRole === "admin" || userRole === "seller") {
          const dashboardRes = await authApiClient.get("/dashboard/");
          setStats(dashboardRes.data);
        } else {
          setStats({});
        }
      } catch (err) {
        console.error("User fetch failed:", err);
        setRole("user");
      }
    };
    fetchUser();
  }, []);


  if (!role) {
    return (
      <div className="flex justify-center items-center py-10 min-h-screen">
        <span className="loading loading-spinner loading-xl text-black"></span>
      </div>
    );
  }

  const cards = [];
  if ((role === "admin" || role === "seller") && stats) {
    if (role === "admin") {
      cards.push(
        { icon: FaBoxesStacked, title: "Total Products", value: stats.total_products },
        { icon: GrDeliver, title: "Total Orders", value: stats.total_orders },
        { icon: FiUsers, title: "Total Users", value: stats.total_users },
        { icon: GrUserWorker, title: "Total Sellers", value: stats.total_sellers }
      );
    } else if (role === "seller") {
      cards.push(
        { icon: FaBoxesStacked, title: "Your Products", value: stats.total_products },
        { icon: GrDeliver, title: "Total Sales", value: stats.total_sales },
        { icon: FiUsers, title: "Total Users", value: stats.total_users },
        { icon: GrMoney, title: "Total Revenue", value: `$${stats.total_revenue?.toFixed(2) || 0}` }
      );
    }
  }

  return (
    <div>
      {(role === "admin" || role === "seller") && stats && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <StatCard
              key={index}
              icon={card.icon}
              title={card.title}
              value={card.value}
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative w-full mt-8">
        <img
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[420px] object-cover shadow-lg rounded-lg"
          src={img}
          alt="Dashboard"
        />
      </div>
      <Order />
    </div>
  );
}
