import Image from "next/image";
import { ErrorBoxX } from "public/images/icons/ErrorBoxX";
import { FC } from "react";

interface Props {
  message: string;
}

export const ErrorBox : FC<Props> = ({message}) => {


  return (
    <div className="flex w-fit items-center gap-2 bg-pink-100 border rounded-2xl text-primary text-sm border-primary p-1">
      <ErrorBoxX/> {message}
    </div>
  )
}