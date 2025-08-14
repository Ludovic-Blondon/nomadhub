"use client";
import { Card, CardBody, CardFooter, Image, Link } from "@heroui/react";

export default function Home() {
  const list = [
    {
      id: 1,
      city: "Paris",
      neighborhood: "1st arrondissement",
      img: "/images/pexels-chaitaastic-1918291-optimized.jpeg",
      price: "$5.50",
    },
    {
      id: 2,
      city: "Marseille",
      neighborhood: "2nd arrondissement",
      img: "/images/pexels-fotoaibe-813692-optimized.jpeg",
      price: "$3.00",
    },
    {
      id: 3,
      city: "Lyon",
      neighborhood: "3rd arrondissement",
      img: "/images/pexels-fotoaibe-1571460-optimized.jpeg",
      price: "$10.00",
    },
    {
      id: 4,
      city: "Marseille",
      neighborhood: "4th arrondissement",
      img: "/images/pexels-fotoaibe-1571468-optimized.jpeg",
      price: "$5.30",
    },
    {
      id: 5,
      city: "Paris",
      neighborhood: "5th arrondissement",
      img: "/images/pexels-fotoaibe-1643384-optimized.jpeg",
      price: "$15.70",
    },
    {
      id: 6,
      city: "Marseille",
      neighborhood: "6th arrondissement",
      img: "/images/pexels-john-tekeridis-21837-1428348-optimized.jpeg",
      price: "$8.00",
    },
    {
      id: 7,
      city: "Paris",
      neighborhood: "7th arrondissement",
      img: "/images/pexels-medhat-ayad-122846-439227-optimized.jpeg",
      price: "$7.50",
    },
    {
      id: 8,
      city: "Paris",
      neighborhood: "8th arrondissement",
      img: "/images/pexels-pixabay-271624-optimized.jpeg",
      price: "$12.20",
    },
    {
      id: 9,
      city: "Lyon",
      neighborhood: "9th arrondissement",
      img: "/images/pexels-zvolskiy-2082087-optimized.jpeg",
      price: "$12.20",
    },
    {
      id: 10,
      city: "Rennes",
      neighborhood: "10th arrondissement",
      img: "/images/pexels-pixabay-271816-optimized.jpeg",
      price: "$12.20",
    },
    {
      id: 11,
      city: "Marseille",
      neighborhood: "11th arrondissement",
      img: "/images/pexels-homelane-com-492179-1776574-optimized.jpeg",
      price: "$12.20",
    },
    {
      id: 12,
      city: "Paris",
      neighborhood: "12th arrondissement",
      img: "/images/pexels-donaldtong94-189333-optimized.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="gap-2 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {list.map((item) => (
        <Card
          key={item.id}
          isPressable
          as={Link}
          href={`/bargain/${item.id}`}
          shadow="sm"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.city}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <p>
              <b>{item.city}</b>
              <i className="text-default-500"> {item.neighborhood}</i>
            </p>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
