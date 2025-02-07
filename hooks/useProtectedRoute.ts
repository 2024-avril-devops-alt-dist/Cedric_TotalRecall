// hooks/useProtectedRoute.ts
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useProtectedRoute = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    console.log('-------------------',session.user.role)
    if (!session || session.user.role === 'ADMIN') {
      router.push('/error');
    }
  }, [session, status, router]);

  return session;
};
