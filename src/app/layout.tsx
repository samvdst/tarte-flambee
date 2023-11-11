import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { isAdmin } from "~/server/api/trpc";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import {
  ExternalLink,
  ExternalLinkIcon,
  Github,
  GithubIcon,
  LucideGithub,
  TwitterIcon,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Tarte Flambee | NoWay4u_Sir",
  description: "Created by samvdst",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const userIsAdmin = isAdmin(session?.user?.name);
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          {userIsAdmin && (
            <nav className="flex space-x-3 text-white underline">
              <Link href="/">Startseite</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          )}
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
          <footer className="flex space-x-4">
            <Link
              className="flex items-center space-x-1 underline"
              href="https://github.com/samvdst/tarte-flambee"
            >
              <span>OpenSource auf Github</span>
              <GithubIcon className="h-4 w-4" />
            </Link>
            <Link
              className="flex items-center space-x-1 underline"
              href="https://twitter.com/samvdst"
            >
              <span>Made by samvdst</span>
              <TwitterIcon className="h-4 w-4" />
            </Link>
          </footer>
        </main>
      </body>
    </html>
  );
}
