import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ModalOverlay, ModalContent, ModalHeader, ModalBody, CloseButton } from './ui';

interface ModalProps {
  title: React.ReactNode;
  onClose: () => void;
  onSave?: () => void;
  dirty?: boolean;
  fullscreen?: boolean;
  children: React.ReactNode;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [contenteditable="true"], [tabindex]:not([tabindex="-1"])';

const Modal: React.FC<ModalProps> = ({ title, onClose, onSave, dirty, fullscreen, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const onSaveRef = useRef(onSave);
  const dirtyRef = useRef(dirty);

  useEffect(() => {
    onCloseRef.current = onClose;
    onSaveRef.current = onSave;
    dirtyRef.current = dirty;
  });

  const requestClose = () => {
    if (dirty && !window.confirm('Есть несохранённые изменения. Закрыть без сохранения?')) return;
    onClose();
  };

  const requestCloseRef = useRef(requestClose);
  useEffect(() => {
    requestCloseRef.current = requestClose;
  });

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        requestCloseRef.current();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        onSaveRef.current?.();
        return;
      }
      if (e.key === 'Enter') {
        const target = e.target instanceof HTMLElement ? e.target : null;
        if (!target) return;
        if (target.closest('textarea, [contenteditable="true"], button, a, select')) return;
        e.preventDefault();
        onSaveRef.current?.();
        return;
      }
      if (e.key === 'Tab' && contentRef.current) {
        const focusables = Array.from(
          contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        const inside = active instanceof Node && contentRef.current.contains(active);
        if (e.shiftKey && (!inside || active === first)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (!inside || active === last)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <ModalOverlay
      $fullscreen={fullscreen}
      onClick={(e) => e.target === e.currentTarget && requestClose()}
    >
      <ModalContent ref={contentRef} $fullscreen={fullscreen}>
        <ModalHeader>
          {title}
          <CloseButton onClick={requestClose} aria-label="Закрыть">
            <X />
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
