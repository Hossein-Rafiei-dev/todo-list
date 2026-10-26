import type { Metadata } from "next";
import "./globals.css";
import TaskContaxtProvider from "./components/TaskContaxt";

export const metadata: Metadata = {
  title: "ToDo List | Stay Productive",
  description: "Organize your tasks and make every day count.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <TaskContaxtProvider>{children}</TaskContaxtProvider>
      </body>
    </html>
  );
}