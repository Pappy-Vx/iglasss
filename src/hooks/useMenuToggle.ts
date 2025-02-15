import { useState } from 'react';

export const useMenuToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return { isOpen, toggleMenu };
};
