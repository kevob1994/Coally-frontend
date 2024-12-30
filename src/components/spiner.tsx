export function Spinner(): JSX.Element {
  return (
    <div className='flex items-center justify-center'>
      <div
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-800 border-t-transparent'
        role='status'
      >
      </div>
    </div>
  );
}
