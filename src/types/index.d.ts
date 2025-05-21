
declare type TCommonProps = {
    title?: string;
    name?: string;
    icon?: string;
};

declare type TExperience = {
    companyName: string;
    iconBg: string;
    date: string;
    points: string[];
} & Required<Omit<TCommonProps, 'name'>>;

declare type TTestimonial = {
    testimonial: string;
    designation: string;
    company: string;
    image: string;
} & Required<Pick<TCommonProps, 'name'>>;

declare type TProject = {
    description: string;
    tags: {
        name: string;
        color: string;
    }[];
    image: string;
    sourceCodeLink: string;
} & Required<Pick<TCommonProps, 'name'>>;

declare type TTechnology = Required<Omit<TCommonProps, 'title'>>;

declare type TNavLink = {
    id: string;
} & Required<Pick<TCommonProps, 'title'>>;

declare type TService = Required<Omit<TCommonProps, 'name'>>;

declare type TMotion = {
    direction: 'up' | 'down' | 'left' | 'right' | '';
    type: 'tween' | 'spring' | 'just' | '';
    delay: number;
    duration: number;
};

declare type IServiceCard = {
    index: number;
    title: string;
    icon: string;
}

declare module 'react-vertical-timeline-component';
declare module 'maath/random/dist/maath-random.esm';

declare type ContactInput = {
    name: string;
    email: string;
    message: string;
}

declare type ModalContent = {
    title: string;
    message: string;
    isError:boolean;
}

declare type ModalProps = {
    title: string;
    message: string;
    isError: boolean;
    setIsModalVisible:(value:boolean)=>void;
}
