import { apiFetch } from "./api";

export interface Destination {
  id: number;
  name: string;
  region: string;
  tours: number;
  image: string;
}

interface Package {
  _id: string;
  destination: string;
  images: string[];
}

export async function getPopularDestinations(): Promise<Destination[]> {

  const packages = await apiFetch<Package[]>("/packages");

  console.log("PACKAGES =", packages);

  const destinationMap = new Map<
    string,
    {
      tours: number;
      image: string;
    }
  >();

  packages.forEach((pkg) => {

    if (!destinationMap.has(pkg.destination)) {

      destinationMap.set(pkg.destination, {
        tours: 1,
        image: pkg.images?.[0] || "/images/placeholder.jpg",
      });

    } else {

      destinationMap.get(pkg.destination)!.tours++;

    }

  });

  return Array.from(destinationMap.entries()).map(
    ([destination, value], index) => ({
      id: index + 1,
      name: destination,
      region: "Tour Destination",
      tours: value.tours,
      image: value.image,
    })
  );
}