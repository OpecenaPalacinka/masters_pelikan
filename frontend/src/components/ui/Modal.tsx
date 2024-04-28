import { cx } from '@/lib/cva'
import { ModalOverlay as RACModalOverlay, Modal as RACModal } from 'react-aria-components'
import type {
  ModalOverlayProps as RACModalOverlayProps,
  DialogProps as RACDialogProps
} from 'react-aria-components'

type ModalOverlayProps = RACModalOverlayProps

export const ModalOverlay = (props: ModalOverlayProps) => {
  const { className, children, ...overlayProps } = props

  return (
    <RACModalOverlay
      className={cx(
        'fixed left-0 top-0 isolate z-20 flex h-[100dvh] w-full items-center justify-center bg-black/25 p-4 text-center',
        className
      )}
      {...overlayProps}
    >
      {children}
    </RACModalOverlay>
  )
}

type ModalProps = Omit<RACDialogProps, 'children'> & {
  children: React.ReactNode
}

export const Modal = (props: ModalProps) => {
  const { className, children, ...dialogProps } = props

  return (
    <RACModal
      className={cx(
        'max-h-full w-full max-w-md rounded-lg border border-gray-200 bg-white bg-clip-padding px-5 py-4 text-left align-middle text-slate-900 shadow-xl outline-none',
        className
      )}
      {...dialogProps}
    >
      {children}
    </RACModal>
  )
}
