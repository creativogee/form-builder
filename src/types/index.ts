export type Field = {
  id: string
  elem: string // TODO string type e.g text-area
  type?: 'text' | 'checkbox' | 'number';
  label?: string
  required?: boolean
  placeholder?: string
  info?: string
  question?: string
  underline?: boolean
  title?: string
  align?: 'left' | 'right' | 'center'
  minimum?: number
  maximum?: number
}
