import Image from 'next/image'
import todoImage from '../../../public/svg/todo.svg'

const Feature = () => {
  return (
    <div className="h-screen w-full bg-white">
      <div className="text-primary flex-col p-16 text-center">
        <h4 className="text-md text-neutral">Agenda Builder 101 </h4>
        <h1 className="text-6xl font-extrabold">Organise Your Task</h1>
      </div>
      <div className="flex flex-wrap justify-around">
        <Image src={todoImage} alt="track" className="hidden lg:block" />
        <div className="text-primary ml-4 space-x-6 text-left text-xl">
          <h1 className="mb-6 text-4xl font-semibold">Features:</h1>
          <li className="mb-4">
            {' '}
            To seamlessly help people involved collaborate and <br /> build an
            agenda.
          </li>
          <li className="mb-4">
            {' '}
            To design an application system that manages the user&apos;s
            <br /> time according to priority of tasks.
          </li>
          <li className="mb-4">
            {' '}
            To improve overall efficiency by organizing the workload
            <br /> in a balanced manner and tracking users habits.
          </li>
          <li className="mb-4">
            {' '}
            To provide links to materials relevant to the scheduled <br />
            tasks and ease the modification using drag and drop method.
          </li>
        </div>
      </div>
    </div>
  )
}

export default Feature
