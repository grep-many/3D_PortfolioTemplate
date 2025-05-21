import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../../styles';
import { EarthCanvas } from '../canvas';
import { SectionWrapper } from '../../hoc';
import { slideIn } from '../../utils/motion';
import { Tilt } from 'react-tilt';
import Modal from '../Modal';

const Contact = () => {

   const formRef = useRef<HTMLFormElement>(null);
   const [form, setForm] = useState<ContactInput>({
      name: '',
      email: '',
      message: '',
   });
   const [modalContent, setModalContent] = useState<ModalContent>({
      title: '',
      message: '',
      isError: false,
   });
   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const validateForm = (): boolean => (
      form.name.trim() === '' ||
        form.email.trim() === '' ||
        form.message.trim() === ''
   );

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if (!validateForm()) {

         await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
               from_name: form.name,
               to_name: 'Aiden Brooks',
               from_email: form.email,
               to_email: import.meta.env.VITE_TOEMAIL,
               from_message: form.message,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
         )
            .then(() => {
               setIsModalVisible(true);
               setModalContent({
                  title: 'Success!',
                  message: 'Thank you. I will get back to you as soon as possilbe.',
                  isError: false,
               });
               setForm({
                  name: '',
                  email: '',
                  message: '',
               });
            }, (err) => {
               console.error('Something went wrong while sending feedback!', err);
               setIsModalVisible(true);
               setModalContent({
                  title: 'Error!',
                  message: 'Ahh, something went wrong. Please try again.',
                  isError: true,
               });
            });
      }
      setLoading(false);
   };

   return (
      <>
         <div className='flex xl:mt-12 xl:flex-row flex-col-reverse gap-10 overflow-hidden'>
            <motion.div
               variants={slideIn('left', 'tween', 0.2, 1)}
            >
               <Tilt
                  options={{
                     max: 45,
                     scale: 1,
                     speed: 450,
                  }}
                  className="flex-[0.75] bg-black-100 p-8 rounded-2xl md:m-[50px]"
               >
                  <p className={styles.sectionSubText}>Get in touch</p>
                  <h3 className={styles.sectionHeadText}>Contact.</h3>

                  <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
                     <label className='flex flex-col'>
                        <span className="text-white font-medium mb-4">
                                    Your Name
                        </span>
                        <input
                           type="text"
                           name="name"
                           value={form.name}
                           onChange={handleChange}
                           placeholder="What's your name?"
                           className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                     </label>
                     <label className='flex flex-col'>
                        <span className="text-white font-medium mb-4">
                                    Your Email
                        </span>
                        <input
                           type="text"
                           name="email"
                           value={form.email}
                           onChange={handleChange}
                           placeholder="What's your email?"
                           className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                     </label>
                     <label className='flex flex-col'>
                        <span className="text-white font-medium mb-4">
                                    Your Message
                        </span>
                        <textarea
                           rows={7}
                           name="message"
                           value={form.message}
                           onChange={handleChange}
                           placeholder="What do you want to say?"
                           className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                        />
                     </label>
                     <button
                        type='submit'
                        disabled={loading || validateForm()}
                        className={`bg-tertiary w-fit outline-none py-3 px-8 text-white font-bold shadow-md shadow-primary rounded-xl  ${loading || validateForm() && 'cursor-not-allowed'}`}
                     >
                        {loading ? 'Sending...' : 'Submit'}
                     </button>
                  </form>
               </Tilt>
            </motion.div>

            <motion.div
               variants={slideIn('right', 'tween', 0.2, 1)}
               className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
            >
               <EarthCanvas />
            </motion.div>
         </div>
         {isModalVisible && <Modal setIsModalVisible={setIsModalVisible} {...modalContent} />}
      </>
   );
};

export default SectionWrapper(Contact, 'contact');
