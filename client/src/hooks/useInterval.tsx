import { useEffect, useRef } from "react"

function useInterval(callback: () => void, delay: number | null, pause: boolean) {
	const savedCallback = useRef(callback)

	// Remember the latest callback if it changes.
	useEffect(
		() => {
			savedCallback.current = callback
		},
		[ callback ]
	)

	// Set up the interval.
	useEffect(
		() => {
			// Don't schedule if no delay is specified.
			if (delay === null) {
				return
			}

			const id = setInterval(() => savedCallback.current(), delay)
			if (pause) clearInterval(id)

			return () => clearInterval(id)
		},
		[ delay, pause ]
	)
}

export default useInterval
