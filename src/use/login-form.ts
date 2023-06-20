import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export type FormField = { email: string; password: string }

export function useLoginForm() {
  const { handleSubmit, isSubmitting, submitCount } = useForm<FormField>()
  const router = useRouter()
  const { login } = useAuthStore()

  const {
    value: email,
    errorMessage: eError,
    resetField: eReset,
    handleBlur: eBlur,
  } = useField('email', yup.string().trim().required('Введите email').email('Необходимо ввести корректный email'))

  eReset({ value: 'test@mail.ru' })

  const isTooManyAttempts = computed(() => submitCount.value >= 3)

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => {
        submitCount.value = 0
      }, 5000)
    }
  })

  const MIN_LENGTH = 6

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
    resetField: pReset,
  } = useField(
    'password',
    yup.string().trim().required('Введите пароль').min(MIN_LENGTH, `Пароль должен быть ${MIN_LENGTH} и более символов`)
  )

  pReset({ value: '123456' })

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (values) await login(values)
      router.push('/')
    } catch (error) {
      /* empty */
    }
  })

  return {
    email,
    password,
    eError,
    eBlur,
    pError,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  }
}
