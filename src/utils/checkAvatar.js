import fish1 from '../assets/images/avatars/fish.svg'
import fish2 from '../assets/images/avatars/blowfish.svg'
import fish3 from '../assets/images/avatars/tropical.svg'

const avatarIcons = [fish1, fish2, fish3]

export const checkAvatar = (id) => {
  return avatarIcons[id - 1]
}
