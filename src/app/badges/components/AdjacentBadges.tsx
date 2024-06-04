import Image from "next/image"
import { BadgeData } from "./BadgeCard"

interface Props extends BadgeData {}

const Badge = ({src, alt, count} : {src: string, alt: string, count: number}) => {

  const left = count === 1 ? "left-[25%]" : count === 2 ? "left-[35%]" : count === 3 ? "left-[45%]" : count === 4 ? "left-[55%]" : "left-[25%]"
  return (
    <div className={`absolute rounded ${left}`}>
      <Image src={src} width={40} height={40} alt={alt}/>
    </div>
  )

}
export const AdjacentBadges : React.FC<Props> = ({badgeholderPoints, delegatePoints, holderPoints, recipientsPoints}) => {

  let count = 1
  return (
    <div className="flex relative h-[60px] w-full justify-center">
      {holderPoints && holderPoints > 0 && count++ && <Badge src="/images/badges/1.png" alt="holder badge" count={count}/>}
      {delegatePoints && delegatePoints > 0 && count++ && <Badge src="/images/badges/2.png" alt="delegate badge" count={count}/>}
      {badgeholderPoints === 1 && count++ && <Badge src="/images/badges/3.png" alt="badge-holder badge" count={count}/>}
      {recipientsPoints === 1 && count++ && <Badge src="/images/badges/4.png" alt="recipient badge" count={count}/>}
    </div>
  )
}