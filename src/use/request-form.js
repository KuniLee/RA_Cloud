import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useRequestForm(fn) {
  const store = useStore()
  const { handleSubmit, isSubmitting, submitCount } = useForm({
    initialValues: {
      status: 'active',
    },
  })
  const router = useRouter()

  const { value: fio, errorMessage: fError, handleBlur: fBlur } = useField(
    'fio',
    yup
      .string()
      .trim()
      .required('Введите ФИО клиента')
    //.email('Необходимо ввести корректный email')
  )

  const { value: phone, errorMessage: pError, handleBlur: pBlur } = useField(
    'phone',
    yup
      .string()
      .trim()
      .required('Введите телефон')
    //.min(MIN_LENGTH, `Пароль должен быть ${MIN_LENGTH} и более символов`)
  )

  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount',
    yup
      .number()
      .required('Введите сумму')
      .min(0, `Сумма не может быть меньше нуля`)
  )

  const { value: status } = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    status,
    onSubmit,
    isSubmitting,

    fio,
    fBlur,
    fError,
    phone,
    pBlur,
    pError,
    amount,
    aBlur,
    aError,
  }
}
