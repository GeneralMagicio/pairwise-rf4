import { WarningBoxIcon } from "public/images/icons/WarningBoxIcon";
import { FC } from "react";

interface Props {
  message: string;
}

export const InfoBox : FC<Props> = ({message}) => {


  return (
    <div className="flex w-fit items-center gap-2 bg-[#FFFAEB] border rounded-2xl text-[#B54708] text-xs border-[#FEC84B] py pl-2 pr-3">
     <WarningBoxIcon/> {message}
    </div>
  )
}