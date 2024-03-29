export const Timeline = ({ timeline, timelineKeys }) => {
  return (
    <div className="mt-6 mb-36">
      {Object.keys(timeline).map((version) => (
        <div key={version} className="relative pb-8">
          {version !== timelineKeys[timelineKeys.length - 1] && (
            <span
              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
              aria-hidden="true"
            ></span>
          )}
          <div className="relative flex items-start space-x-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 ring-8 ring-white">
                <span className="font-medium text-white">v{version}</span>
              </div>
            </div>
            <div className="flex-1 max-sm:w-44 md:w-96">
              <div>
                <div className="text-sm text-gray-500 max-sm:hidden">
                  {timeline[version].title}
                </div>
                <div
                  className={` absolute font-medium text-gray-900 sm:hidden  ${
                    timeline[version].title.length > 22 ? 'top-0' : 'top-2.5'
                  }`}
                >
                  {timeline[version].title}
                </div>
                <p className="font-medium text-gray-900 max-sm:hidden">
                  {timeline[version].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
