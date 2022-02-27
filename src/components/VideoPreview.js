import React, { useEffect, useState } from "react";

function VideoPreview(props) {

    // Improvements
        // Only render a video on Click



    const [covidVideos, setCovidVideos] = useState([]);
    const [nonCovidVideos, setNonCovidVideos] = useState([]);
    // move this to parent
    //toggle videos

    useEffect(() => {
        fetchVideos()
    }, []);

    const list = [];

    // videos with COVID-19 in the title will go in a serparate array
    function fetchVideos(){
        // Where we're fetching data from
        fetch("https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyD-y9MrdrHxyCUpNuqsrPYKfWSdYw2zo-E&part=snippet&channelId=UCL03ygcTgIbe36o2Z7sReuQ&maxResults=10").then(response => response.json())
        .then((data) => {
            setNonCovidVideos(data.items);
            console.log(data.items)
        });

        fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?key=AIzaSyD-y9MrdrHxyCUpNuqsrPYKfWSdYw2zo-E&playlistId=PLogA9DP2_vSekxHP73PXaKD6nbOK56CJw&part=snippet")
        .then(response => response.json())
        .then((data) => {
            setCovidVideos(data.items);
        });
    }

        let videos = null;
        if (props.showCovidVideos) {
            videos = covidVideos
        } else {
            videos = nonCovidVideos
        }

        videos.forEach((video) => {

            let videoId = ''
            if (video.snippet.playlistId && (video.snippet.playlistId === "PLogA9DP2_vSekxHP73PXaKD6nbOK56CJw")) {
                videoId = video.snippet.resourceId.videoId
            } else {
                videoId = video.id.videoId
            }
  

            list.push(
                <div key={video.etag}>
                    <iframe title={video.snippet.title} id="player" type="text/html" width="640" height="390"
                        src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"></iframe>
                    <div>
                         {/* multiple replaces can probably be refactored */}
                        <h1>{(video.snippet.title).replace("&amp;", "&").replace("&#39;", "'")}</h1>
                        <p>{video.snippet.description}</p>
                    </div>
                    <br/>
                </div>
            );
        });
    
  return (
    <>{list}</>
  )
}

export default VideoPreview