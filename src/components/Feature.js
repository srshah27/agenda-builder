import Image from "next/image"

const Feature = () => {
  return (
       <div className="h-screen bg-blue-50 w-full">
          <div className ="flex-col text-primary font-mono p-32 text-center">
            <h4 className="text-md text-neutral">Agenda Builder 101 </h4>
            <h1 className="text-[4vw] font-extrabold">Organise Your Task</h1>  
          </div>
          <div className ="flex justify-around flex-wrap">
            <Image
              src="/img/todo.png"
              alt="track"
              width={380}
              height={380}
              className = "hidden lg:block"
            />
            <div className ="text-2xl text-primary text-left space-x-6">
                <h1 className="text-3xl font-semibold mb-6">Features:</h1>
                
                <li className="mb-2"> To design an AI based system that  manages the user's<br/> time according to priority of tasks.</li>
                <li className="mb-2"> To improve overall efficiency by organizing the workload<br/> in a balanced manner and tracking user's habits.</li>
                <li className="mb-2"> To provide timely remainder for upcoming deadlines and <br/>scheduled tasks.</li>
                <li className="mb-2"> To promote cross referencing between  different scheduling <br/> platforms.</li>
            </div>
          </div>
        </div>
          )
}

export default Feature