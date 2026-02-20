import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const getFetch = async () => {
      try {
        setState((s) => ({ ...s, isLoading: true, hasError: null }));

        const resp = await fetch(url, { signal: controller.signal });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

        const data = await resp.json();

        setState({
          data,
          isLoading: false,
          hasError: null,
        });
      } catch (error) {
        if (error.name === "AbortError") return;
        setState({
          data: null,
          isLoading: false,
          hasError: error.message ?? "Error",
        });
      }
    };

    getFetch();
    return () => controller.abort();
  }, [url]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};