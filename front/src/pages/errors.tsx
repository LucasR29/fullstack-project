import React from "react"
import { ErrorInfo, ReactNode } from "react"

class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = { hasError: false }
    }

    static getDerivedStateError(error: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log({ error, errorInfo })
    }
    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary