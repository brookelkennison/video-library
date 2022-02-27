import React, {useState} from "react"
import VideoPreview from "./components/VideoPreview"

function App () {
  const [showCovidVideos, ToggleCovidVideos] = useState(true); 

  const handleToggle = (bool) => {
    ToggleCovidVideos(bool)
};

  return (
    <>
    <button onClick={(() => {handleToggle(false)})}>All Videos</button>
    <button onClick={(() => {handleToggle(true)})}>COVID 19 Videos</button>
    <VideoPreview showCovidVideos={showCovidVideos} />
    </>
  )
}

export default App
