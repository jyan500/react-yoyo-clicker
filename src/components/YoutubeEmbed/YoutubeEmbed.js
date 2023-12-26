import React from "react";
import PropTypes from "prop-types";
import "./YoutubeEmbed.css"

export const YoutubeEmbed = ({ embedId, iFrameDimensions }) => {
	const { width, height } = iFrameDimensions
	return (
	    <iframe
	    	className="video"
		    src={`https://www.youtube.com/embed/${embedId}`}
		    frameBorder="0"
		    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		    allowFullScreen
		    title="Embedded youtube"
	    />
	)
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};


