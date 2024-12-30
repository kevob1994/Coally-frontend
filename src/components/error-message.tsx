export function ErrorMessage({ message }: { message: string }): JSX.Element {
    return (
        <div className="text-red-500 flex items-center gap-2">
            <p className="text-sm">{message}</p>
        </div>
    )
}