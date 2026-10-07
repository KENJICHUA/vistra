import React from "react";
import { useState } from "react";

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const toggleModal = () => setIsOpen((prev) => !prev);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal,
    };
}

interface ModalTriggerProps {
    children: React.ReactNode;
    modal: (props: {
        isOpen: boolean;
        closeModal: () => void;
    }) => React.ReactNode;
    className?: string;
}

export function ModalTrigger({
                                 children,
                                 modal,
                                 className = "",
                             }: ModalTriggerProps) {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className={className}
            >
                {children}
            </button>

            {modal({
                isOpen,
                closeModal,
            })}
        </>
    );
}