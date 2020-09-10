import Toast from 'teaset/components/Toast/Toast'

export default class GlobalToast {
  static show({ text, duration = 2000 }) {
    Toast.show({ text, duration, position: 'center' })
  }
}
