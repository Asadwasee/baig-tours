"use client";

import { useEffect, useState } from "react";
import {
  Destination,
  getPopularDestinations,
} from "@/services/destination";

export function usePopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPopularDestinations();
        setDestinations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    destinations,
    loading,
    error,
  };
}