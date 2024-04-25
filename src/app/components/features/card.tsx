'use client'
import classNames from "classnames"
import { useFeatureStore } from "./store"
import tech from "../../../../public/images/tech.svg"
import path from "../../../../public/images/path.svg"
import community from "../../../../public/images/community.svg"
import hours from "../../../../public/images/hours.svg"
import health from "../../../../public/images/health.svg"



type FeatureCardProps = {
    gradient : string,
    children : React.ReactNode
} & CardProps
type CardProps = {
    id : string
}

 const FeatureCard = ({gradient, children, id} : FeatureCardProps) => {
    const inViewfeature = useFeatureStore((state) => state.inViewFeature)
    return (
        <div 
            className={classNames(
                "absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br transition-opacity",
                gradient,
                inViewfeature === id ? "opacity-100" : "opacity-0"
                )}>
            {children}
        </div>)
}



  export const Tech = ({id} : CardProps) => {
    return(
        <FeatureCard id={id} gradient="from-[#f7f0ff] to-[#a78afe]">
            <img className="rounded-xl shadow-lg absolute w-[80%] top-[22%] left-[10%] sm:left-[18%] sm:top-[7%] sm:w-[65%]" src={tech.src}/>
            <p className="px-[5vw] absolute top-[56%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
                We always say that the right tools empower our employees to reach new heights. 
                Joining our team means gaining access to cutting-edge technology that isn't just
                 a part of our work—it's at the core of our innovation. From state-of-the-art 
                 software solutions to the latest hardware advancements, we invest in technology 
                 that propels our workforce forward. 

            </p>
            <p className="px-[5vw] absolute top-[82%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
                When you choose a career with us, you're not 
                 just applying for a job; you're entering a world where your skills and ideas are
                 amplified by the very best in the industry.
            </p>
        </FeatureCard>
    )
  }

  export const Path = ({id} : CardProps) => {
    return(
        <FeatureCard id={id} gradient="from-[#f5fbff] to-[#addeff]">
            <img className="rounded-xl shadow-lg absolute w-[80%] top-[27%] left-[11%] sm:left-[18%] sm:top-[7%] sm:w-[63%]" src={path.src}/>
            <p className="px-[5vw] absolute top-[56%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
                At Verdantia, we believe that every individual brings a unique set of skills, talents, 
                and aspirations to the table. That's why we're proud to foster an environment where you
                don't just have a job - you have a canvas to paint your career masterpiece!
            </p>
            <p className="px-[5vw] absolute top-[73%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
                Creativity thrives in every corner of Verdantia. Whether you're a marketer crafting 
                captivating campaigns, a designer shaping our brand identity, or a developer coding 
                the next generation of products, there's ample opportunity to express your creativity 
                and leave your mark on our company.
            </p>
        </FeatureCard>
    )
  }

  export const Community = ({id} : CardProps) => {

    return(
        <FeatureCard id={id} gradient="from-[#f5fff7] to-[#adf8ff]">
            <img className="rounded-xl shadow-lg absolute w-[80%] top-[22%] left-[10%] sm:left-[20.4%] sm:top-[7%] sm:w-[57%]" src={community.src}/>
            <p className="px-[5vw] absolute top-[56%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
            We understand that success extends beyond individual accomplishments—it thrives within a vibrant community. 
            We take pride in cultivating an inclusive environment where collaboration is not just encouraged but celebrated. 
            Our diverse team members bring a rich tapestry of experiences, ideas, and perspectives, fostering a sense of 
            belonging that transcends traditional workplace boundaries.
            </p>

        </FeatureCard>
    )
  }

  export const Hours = ({id} : CardProps) => {
    return(
        <FeatureCard id={id} gradient="from-[#f7fff5] to-[#adffd8]">
            <img className="rounded-xl shadow-lg absolute w-[70%] top-[20%] left-[16%] sm:left-[24.8%] sm:top-[7%] sm:w-[47%]" src={hours.src}/>
            <p className="px-[5vw] absolute top-[56%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
                Flexibility isn't just a perk—it's a philosophy that empowers our team to manage their work in a way that suits their individual preferences and lifestyles. Whether you're an early bird who thrives in the quiet hours of the morning or a night owl who does your best work after sunset, we believe in giving you the freedom to choose when and where you work best.
            </p>      
            <p className="px-[5vw] absolute top-[80%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
                At Verdantia, we prioritize flexibility because we know that when you have the freedom to work on your own terms, you're not just productive—you're fulfilled.
            </p>       
        </FeatureCard>
    )
  }

  export const Health = ({id} : CardProps) => {
    return(
        <FeatureCard id={id} gradient="from-[#fff7f5] to-[#ffd8ad]">
            <img className="rounded-xl shadow-lg absolute w-[70%] top-[22%] left-[16%] sm:left-[25.8%] sm:top-[7%] sm:w-[47%]" src={health.src}/>
            <p className="px-[5vw] absolute top-[56%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
            At Verdantia, our healthcare plan goes beyond just basic coverage; it includes a range of benefits such as preventative care, mental health services, and wellness programs, all aimed at empowering you to live your best life both inside and outside of the workplace, because we believe that when you're healthy and thriving, you can bring your full self to everything you do.            </p>              
            <p className="px-[5vw] absolute top-[80%] text-[0] sm:text-[1vw] text-[#3e3e3e]">
            With our healthcare plan, you can rest assured knowing that we've got you covered, from routine check-ups to unexpected emergencies, so you can focus on what matters most—your health and happiness.
            </p>

        </FeatureCard>
    )
  }