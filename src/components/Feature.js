import Image from "next/image"

const Feature = () => {
  return (
       <div className="h-screen bg-blue-200 w-full">
          <div className ="flex-col text-primary font-mono p-16 text-center">
            <h4 className="text-md text-neutral">Agenda Builder 101 </h4>
            <h1 className="text-[4vw] font-extrabold">Organise Your Task</h1>  
          </div>
          <div className ="flex justify-around flex-wrap">
            <Image
              src="/img/todo.png"
              alt="track"
              width={440}
              height={440}
              className = "hidden lg:block"
            />
            <div className ="text-xl text-primary text-left space-x-6 ml-4">
                <h1 className="text-4xl font-semibold mb-6">Features:</h1>
                <li className="mb-4"> To design an AI based system that  manages the users<br/> time according to priority of tasks.</li>
                <li className="mb-4"> To improve overall efficiency by organizing the workload<br/> in a balanced manner and tracking users habits.</li>
                <li className="mb-4"> To provide timely remainder for upcoming deadlines and <br/>scheduled tasks.</li>
                <li className="mb-4"> To promote cross referencing between  different scheduling <br/> platforms.</li>
            </div>
          </div>
        </div>
          )
}

export default Feature