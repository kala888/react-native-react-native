import React from 'react'
import { Keyboard, TextInput } from 'react-native'
import { noop } from '@/nice-router/nice-router-util'

const EleInput = React.forwardRef((props, ref) => {
  const { onSubmitEditing = noop } = props

  const handleSubmitEditing = () => {
    onSubmitEditing()
    Keyboard.dismiss()
  }

  return <TextInput ref={ref} onSubmitEditing={handleSubmitEditing} {...props} />
})

export default EleInput
