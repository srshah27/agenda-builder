import { createApi } from 'unsplash-js'
import { useState } from 'react'

const Unsplash = () => {
  const [photosResponse, setPhotosResponse] = useState('')

  const api = createApi({
    accessKey: 'nnOeJ5UiUg5N7gdRgYJKIowx302W06P6hczamY3yHfQ'
  })

  api.search
    .getPhotos({ query: 'cat', orientation: 'landscape' })
    .then((result) => {
      setPhotosResponse(result.response.results[0].urls.regular)
      console.log(result.response.results[0].urls.regular)
    })
    .catch(() => {
      console.log('something went wrong!')
    })

  // const { urls } = photosResponse
  return (
    <div>
      <div>
        <img src={photosResponse} alt="Unsplash" />
      </div>
    </div>
  )
}

export default Unsplash
