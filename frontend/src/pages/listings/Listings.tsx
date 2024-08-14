import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Apartment } from "../../types/apartment";
import { getApartments } from "@/api/apartments/apartments";
import { FaBed, FaBath, FaRulerCombined, FaTag } from "react-icons/fa";

const ListingsPage: React.FC = () => {
  const [properties, setProperties] = useState<Partial<Apartment>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getApartments()
      .then((res) => {
        setProperties(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            className="block bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={`https://via.placeholder.com/400?text=${encodeURIComponent(
                property.title!
              )}`}
              alt={property.title}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{property.title}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <FaBed className="text-xl text-blue-500 mr-2" />
                <span>{property.bdrooms} Bedrooms</span>
              </div>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <FaBath className="text-xl text-blue-500 mr-2" />
                <span>{property.bthrooms} Bathrooms</span>
              </div>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <FaRulerCombined className="text-xl text-blue-500 mr-2" />
                <span>{property.sqft} sqft</span>
              </div>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <FaTag className="text-xl text-blue-500 mr-2" />
                <span>{property.status}</span>
              </div>
            </div>

            <p className="text-lg font-semibold text-blue-500 mt-4">
              Price: ${property.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
