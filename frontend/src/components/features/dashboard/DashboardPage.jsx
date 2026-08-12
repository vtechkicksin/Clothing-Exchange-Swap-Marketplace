import DashboardHeader from "./components/DashboardHeader";
import WelcomePanel from "./components/WelcomePanel";
import ImpactCard from "./components/ImpactCard";
import ActivityCard from "./components/ActivityCard";
import ListingCard from "./components/ListingCard";
import RecommendedList from "./components/RecommendedList";
import "./styles/DashboardPage.css";

const DashboardPage = ({ onLogout }) => {
  return (
    <div className="dashboard-page">
      <DashboardHeader onLogout={onLogout} />

      <main className="dashboard-main">
        <section className="left-column">
          <WelcomePanel />
          <ListingCard />
        </section>

        <aside className="right-column">
          <ImpactCard />
          <ActivityCard />
          <RecommendedList />
        </aside>
      </main>
    </div>
  );
};

export default DashboardPage;
