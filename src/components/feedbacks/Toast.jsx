import { useEffect } from 'react'
import './Toast.css'

function Toast({
	message = '',
	type = 'info',
	visible = true,
	duration = 4000,
	onClose,
	actionText,
	onAction,
}) {
	useEffect(() => {
		if (!visible || !onClose) {
			return undefined
		}

		const timer = setTimeout(() => {
			onClose()
		}, duration)

		return () => clearTimeout(timer)
	}, [visible, duration, onClose])

	if (!visible) {
		return null
	}

	return (
		<div className={`toast-toast toast-${type}`} role="status" aria-live="polite">
			<div className="toast-content">
				<span className="toast-message">{message}</span>
				{actionText && onAction ? (
					<button className="toast-action" type="button" onClick={onAction}>
						{actionText}
					</button>
				) : null}
			</div>
			{onClose ? (
				<button className="toast-close" type="button" onClick={onClose} aria-label="Dismiss notification">
					×
				</button>
			) : null}
		</div>
	)
}

export default Toast
