
export interface Props {
  title: string
  ideas: string[]
}

function Card({ title, ideas }: Props) {
  return (
    <div className="Card"
      style={{ flexBasis: "100%", flex: "1" }}
    >
      <h2>{title}</h2>
      <ul>
        {
          ideas.map((idea) => {
            return (
              <li>
                <input type="checkbox" />
                {idea}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Card
