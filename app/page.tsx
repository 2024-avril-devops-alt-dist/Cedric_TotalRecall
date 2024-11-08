import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Total Recall api",
  description: "Mongodb and prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <h1 className="flex justify-center ">
            Total Recall api
          </h1>
        </div>
      </body>
    </html>
  );
}
