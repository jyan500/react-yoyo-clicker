import React from "react"
import { FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import { styles } from "../../assets/styles"

export const Footer = () => {
	return (
		<div className = "flex justify-center items-center p-8 bg-gray-50">
			<div className = "flex flex-row">
				<a className = "p-4" href="https://www.instagram.com/jyan.yoyo/?hl=en"><FaInstagram className={styles.icon}/></a>
				<a className = "p-4" href="https://www.github.com/jyan500/react-yoyo-clicker"><FaGithub className={styles.icon} /></a>
				<a className = "p-4" href="https://www.youtube.com/"><FaYoutube className={styles.icon}/></a>
			</div>
		</div>
	)
}