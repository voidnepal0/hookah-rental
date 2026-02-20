"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ImageProps } from "next/image";
import DummyImage from "@/public/dummy.svg";

type HandledImageProps = ImageProps & {
  previewOnClick?: boolean;
  trigger?: any;
  description?: any;
};

const HandledImage = ({
  src: originalSrc,
  alt = "-",
  className = "",
  previewOnClick = true,
  trigger = undefined,
  description = undefined,
  ...rest
}: HandledImageProps) => {
  const [actualSrc, setActualSrc] = useState(() => {
    if (!originalSrc || originalSrc.toString().trim() === "") {
      return DummyImage;
    }
    if (typeof originalSrc === "string" && originalSrc.startsWith("/upload")) {
      return `${process.env.NEXT_PUBLIC_IMAGE_BASEURL?.replace(
        /\/$/,
        "",
      )}${originalSrc}`;
    }
    return originalSrc;
  });

  const isDummy = actualSrc === DummyImage;

  return (
    <Image
      src={actualSrc ?? DummyImage.src}
      alt={alt}
      className={`${className} transition-all duration-300 ${
        !isDummy ? "brightness-75" : "brightness-100"
      }`}
      onError={() => setActualSrc(DummyImage.src)}
      {...rest}
    />
  );
};

export default HandledImage;
