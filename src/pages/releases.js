import React from 'react'
import { timeline, releases } from '@/lib/projectData'

const Release = () => {

  const releasesKeys = Object.keys(releases).reverse()
  const timelineKeys = Object.keys(timeline)
  return (
    <>
      <div>
        <h2>Timeline</h2>
        {timelineKeys.forEach((key, index) => {
          return (
            <div key={index}><h3>{key + ' : ' + timeline[key].title}</h3> <h4>{timeline[key].description}</h4></div>
          )
        })}
      </div>
      {/* <div>
        <h2>Releases</h2>
        {releasesKeys.forEach((key, index) => {
          const release = releases[key]
          return (
            <div key={index}><h3>{release.title + ' : ' + release.version}</h3> <h4>{release.description}</h4></div>
          )
        })}
      </div> */}
    </>
  )
}


export default Release