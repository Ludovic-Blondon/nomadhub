import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect(isSuccess: boolean, defaultRedirectTo = "/") {
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      // Get redirect parameter from current URL
      const urlParams = new URLSearchParams(window.location.search);
      const redirectTo = urlParams.get("redirect") || defaultRedirectTo;

      router.push(redirectTo);
    }
  }, [isSuccess, router, defaultRedirectTo]);
}
