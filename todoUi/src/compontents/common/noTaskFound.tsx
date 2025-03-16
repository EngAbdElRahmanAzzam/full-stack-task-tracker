import { colors } from "../../data/styles"

const NoTaskFound = () => {
  return (
    <div className={`${colors.mainColorText} text-2xl font-extralight py-20 flex flex-col items-center gap-2`}>
        <img className="w-[300px]" src="noTaskFound.jpg"/>
        <p>
            There is not any task to display
        </p>
    </div>
  )
}

export default NoTaskFound