-- CreateEnum
CREATE TYPE "ApartmentStatus" AS ENUM ('NEW', 'CONTINGENT', 'SOLD', 'WITHDRAWN', 'BACK_ON_MARKET', 'EXPIRED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "ApartmentStatus" NOT NULL,
    "directions" TEXT,
    "description" TEXT,
    "pool" BOOLEAN,
    "waterfront" BOOLEAN,
    "bthrooms" INTEGER NOT NULL,
    "bdrooms" INTEGER NOT NULL,
    "sqft" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
