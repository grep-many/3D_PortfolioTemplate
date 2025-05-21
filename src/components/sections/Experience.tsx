import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../../styles';
import { experiences } from '../../constants';
import { SectionWrapper } from '../../hoc';
import { textVariant } from '../../utils/motion';
import React from 'react';
import { Tilt } from 'react-tilt';

const ExperienceCard: React.FC<TExperience> = ({ date, iconBg, icon, companyName, title, points }) => (
   <VerticalTimelineElement
      contentStyle={{ background: '#1d1836', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid #232631' }}
      date={date}
      iconStyle={{ background: iconBg }}
      icon={
         <div className="h-full w-full flex justify-center items-center">
            <img src={icon} alt={companyName} className="w-[60%] h-[60%] object-contain" />
         </div>
      }
   >
      <Tilt
         options={{
            max: 45,
            scale: 1,
            speed: 450,
         }}
         className="cursor-pointer"
      >
         <h3 className="text-white text-[24px] font-bold">{title}</h3>
         <p className="text-secondary text-[60px] font-semibold" style={{ margin: 0 }}>{companyName}</p>
         <ul className="mt-5 list-disc ml-5 space-y-2">
            {points.map((point, index) => (
               <li
                  key={`experience-point-${index}`}
                  className="text-white-100 text-[14px] pl-1 tracking-wider"
               >
                  {point}
               </li>
            ))}
         </ul>
      </Tilt>
   </VerticalTimelineElement>
);

const Experience = () => {
   return (
      <>
         <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>What I have done so far</p>
            <h2 className={styles.sectionHeadText}>Work Experience.</h2>
         </motion.div>

         <div className="mt-20 flex flex-col">
            <VerticalTimeline>
               {experiences.map((experience, index) => <ExperienceCard key={index} {...experience} />)}
            </VerticalTimeline>
         </div>
      </>
   );
};

export default SectionWrapper(Experience, 'work');
