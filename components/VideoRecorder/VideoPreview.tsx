import React from "react";
const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
	const videoRef = React.useRef(null);

	React.useEffect(() => {
		if (videoRef.current && stream) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);
	if (!stream) {
		return null;
	}
	return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};
export default VideoPreview;
