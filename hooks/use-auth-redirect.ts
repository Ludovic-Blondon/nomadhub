import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect(isSuccess: boolean, redirectTo = "/") {
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push(redirectTo);
    }
  }, [isSuccess, router, redirectTo]);
}
