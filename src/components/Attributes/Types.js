import { useSelector } from 'react-redux'

export const Text = ({ taskId, attrId }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  ).attributes.find((attr) => attr.id == attrId)
  return (
    <div className="innerCard flex-col">
      <span className="p-auto m-auto text-xl">{attribute.value}</span>
      <span className="p-auto  m-auto text-sm">{attribute.name}</span>
    </div>
  )
}
export const Option = ({ taskId, attrId }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  ).attributes.find((attr) => attr.id == attrId)
  return (
    <div className="innerCard flex-col">
      <span className="p-auto m-auto text-xl">{attribute.value}</span>
      <span className="p-auto  m-auto text-sm">{attribute.name}</span>
    </div>
  )
}

export const MultipleOption = ({ taskId, attrId }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  ).attributes.find((attr) => attr.id == attrId)
  let values = attribute.value ? JSON.parse(attribute.value) : []
  let options = attribute.options
  return (
    <div className="innerCard flex-col">
      <div className="flex flex-wrap justify-evenly">
        {values.map((value, index) => {
          return (
            <span key={index} className="m-1 text-xl">
              {value}
              <br />
            </span>
          )
        })}
      </div>
      <span className="text-sm">{attribute.name}</span>
    </div>
  )
}
