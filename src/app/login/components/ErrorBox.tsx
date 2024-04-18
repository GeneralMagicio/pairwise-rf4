import Image from "next/image";
import { ErrorBoxX } from "public/images/icons/ErrorBoxX";
import { FC } from "react";

interface Props {
  message: string;
}

export const ErrorBox : FC<Props> = ({message}) => {


  return (
    <div className="flex w-fit items-center gap-2 bg-[#FFD1D5] border rounded-2xl text-primary text-xs border-primary py pl-2 pr-3">
      <ErrorBoxX/> {message}
    </div>
  )
}