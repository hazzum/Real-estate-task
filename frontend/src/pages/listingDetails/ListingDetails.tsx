import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Apartment } from "../../types/apartment";
import { getApartmentDetails } from "@/api/apartments/apartments";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTag,
  FaWater,
  FaSwimmingPool,
} from "react-icons/fa";

const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Partial<Apartment> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApartmentDetails(id!)
      .then((res) => {
        setProperty(res);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!property) return <div>Property not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src={`https://via.placeholder.com/800x400?text=${encodeURIComponent(
            property.title!
          )}`}
          alt={property.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          {property.address || "N/A"}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
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

        {/* Pool and Waterfront Tags */}
        <div className="mb-6">
          {property.pool && (
            <span className="inline-flex items-center bg-blue-100 text-blue-500 text-sm font-medium mr-2 px-3 py-1 rounded-full">
              <FaSwimmingPool className="mr-1" /> Pool
            </span>
          )}
          {property.waterfront && (
            <span className="inline-flex items-center bg-blue-100 text-blue-500 text-sm font-medium px-3 py-1 rounded-full">
              <FaWater className="mr-1" /> Waterfront
            </span>
          )}
        </div>

        <p className="text-lg font-semibold text-blue-500 mb-4">
          Price: ${property.price}
        </p>
        <p className="text-gray-700 mb-6">
          {property.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
