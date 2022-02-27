import React, { useEffect, useState } from "react";

function VideoPreview(props) {

    const [covidVideos, setCovidVideos] = useState([]);
    const [nonCovidVideos, setNonCovidVideos] = useState([]);
    // move this to parent
    //toggle videos

    useEffect(() => {
        fetchVideos()
    }, []);

    const list = [];

    // fetch all videos

    // videos with COVID-19 in the title will go in a serparate array
    function fetchVideos(){
        // Where we're fetching data from
        fetch("https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyDXGwBHzog56FMxQyusEwWXyp67ZZYqDHo&part=snippet&channelId=UCL03ygcTgIbe36o2Z7sReuQ&maxResults=50").then(response => response.json())
        .then((data) => {
            setNonCovidVideos(data.items);
        });

        fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?key=AIzaSyDXGwBHzog56FMxQyusEwWXyp67ZZYqDHo&playlistId=PLogA9DP2_vSekxHP73PXaKD6nbOK56CJw&o&part=snippet")
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
            list.push(
                <div key={video.etag}>
                    <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                    <div>
                        <h1>{video.snippet.title}</h1>
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