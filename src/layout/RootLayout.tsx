import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        {/* HEADER */}
        <Header />

        <Outlet />
      </main>
      {/* MAIN SECTION */}

      {/* FOOTER */}
      <footer className="p-10 text-center bg-gray-800 mt-10">
        <p className="text-white">
          {/* SOMETHING MEANINGFULL FOR URL SHORTNER APP */}
          URL Shortner App
        </p>
      </footer>
    </div>
  );
};

export default RootLayout;
