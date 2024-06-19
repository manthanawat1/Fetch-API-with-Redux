"use client";

import React, { useState } from "react";
import Image from "next/image";

import { IProduct } from "@/types/types";
import RatingBar from "@/components/RatingBar";
import LoveActionBtn from "@/components/LoveActionBtn";
import imageError from "@/public/image-error.png";
import "./ProductCard.css";

const ProductCard: React.FC<IProduct> = ({
  title,
  description,
  price,
  discountPercentage,
  discountedPrice,
  rating,
  thumbnail,
}) => {
  const [fallbackImage, setFallbackImage] = useState<boolean>(false);
  const [loveAction, setLoveAction] = useState<boolean>(false);

  const RatingTemplate = () => {
    if (rating && rating >= 3) {
      return (
        <div className="flex space-x-1 mt-3">
          <RatingBar rating={rating} />
        </div>
      );
    }
  };

  const PriceContainerTemplate = () => {
    if (discountedPrice?.toString() && discountPercentage?.toString()) {
      return (
        <>
          <span className="text-xl text-[#c45564]">฿{discountedPrice}</span>
          <span className="text-[#c7c7c7] line-through text-base">
            ฿{price}
          </span>
        </>
      );
    } else {
      return <span className="text-xl">฿{price}</span>;
    }
  };

  return (
    <div className="border-2 border-[#f5f5f5">
      <div className="h-[20rem] sm:h-[15rem] w-full relative">
        <Image
          alt={`${title}-${description}`}
          src={fallbackImage ? imageError : thumbnail}
          sizes="100vw"
          width={100}
          height={100}
          onError={() => setFallbackImage(true)}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="detail-product-container flex flex-col font-prompt p-4">
        <div className="font-prompt text-sm text-red">{title}</div>
        <RatingTemplate />
        <div className="flex items-center flex-wrap font-medium mt-3 mb-8 space-x-1">
          <PriceContainerTemplate />
          <span className="text-[#c7c7c7] text-base">/ชิ้น</span>
        </div>
        <button
          className="mb-2 mt-auto"
          onClick={() => setLoveAction(!loveAction)}
        >
          <LoveActionBtn action={loveAction} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
