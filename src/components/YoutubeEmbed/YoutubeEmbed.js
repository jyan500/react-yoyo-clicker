import React from "react";
import PropTypes from "prop-types";
import "./YoutubeEmbed.css"

export const YoutubeEmbed = ({ embedId }) => {
	return (
		<div className = "flex justify-center w-full">
		    <iframe
		    	className="video"
			    src={`https://www.youtube.com/embed/${embedId}`}
			    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			    allowFullScreen
			    title="Embedded youtube"
		    />
	    </div>
	)
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};


