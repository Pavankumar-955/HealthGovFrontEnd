import './Loading.css'

function Loading({ message = 'Hang tight! We are loading your content...' }) {
	return (
		<div className="loading-overlay" role="status" aria-live="polite">
			<div className="loading-card">
				<div className="loading-spinner" aria-hidden="true">
					<span className="loading-dot dot1" />
					<span className="loading-dot dot2" />
					<span className="loading-dot dot3" />
				</div>
				<div className="loading-message">
					<h2>Loading...</h2>
					<p>{message}</p>
				</div>
			</div>
		</div>
	)
}

export default Loading
