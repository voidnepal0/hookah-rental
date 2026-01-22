import toast from 'react-hot-toast'

export const useToast = () => {
  const success = (message: string) => {
    return toast.success(message, {
      duration: 3000,
      position: 'top-right',
    })
  }

  const error = (message: string) => {
    return toast.error(message, {
      duration: 4000,
      position: 'top-right',
    })
  }

  const loading = (message: string) => {
    return toast.loading(message, {
      position: 'top-right',
    })
  }

  const info = (message: string) => {
    return toast(message, {
      duration: 3000,
      position: 'top-right',
      icon: 'ℹ️',
    })
  }

  const dismiss = (toastId?: string) => {
    return toast.dismiss(toastId)
  }

  return {
    success,
    error,
    loading,
    info,
    dismiss,
  }
}

export default useToast
