import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({ children, open, onClose, className = '' }) => {
    const dialog = useRef()

    useEffect(() => {
        // puede cambiar el ref.. entonces.. es recomendable guardarla en una variable
        const modal = dialog.current

        if (open) {
            modal.showModal()
        }

        return () => {
            modal.close()
        }
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>, document.getElementById('modal')
    )
}