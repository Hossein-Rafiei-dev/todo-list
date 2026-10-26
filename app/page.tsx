
import Header from "./components/Left-side/Header";
import Sidebar from "./components/Left-side/Sidebar";
import AddTask from "./components/Left-side/AddTask";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f3f5fb] p-3 sm:p-5 lg:p-6">
      {/* Soft background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="absolute right-1/3 top-1/3 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      {/* Main application shell */}
      <div className="relative mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1600px] flex-col rounded-[24px] border border-white/70 bg-white/20 p-3 shadow-[0_20px_80px_rgba(31,41,55,0.06)] backdrop-blur-sm sm:min-h-[calc(100vh-2.5rem)] sm:rounded-[28px] sm:p-4 lg:min-h-[calc(100vh-3rem)] lg:p-5">
        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="grid flex-1 grid-cols-1 items-stretch gap-3 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] md:gap-3 lg:grid-cols-[minmax(250px,0.9fr)_minmax(0,1.6fr)]">
          {/* Sidebar */}
          <div className="min-w-0">
            <Sidebar />
          </div>

          {/* Task section */}
          <div className="min-w-0">
            <AddTask />
          </div>
        </div>
      </div>
    </main>
  );
}
