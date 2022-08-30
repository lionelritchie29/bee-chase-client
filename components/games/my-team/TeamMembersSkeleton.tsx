export default function TeamMembersSkeleton() {
  return (
    <>
      {[1, 2, 3].map((member) => (
        <li className='text-sm border-r border-l border-b p-2' key={member}>
          <div className='w-60 h-4 animate-pulse bg-gray-300 rounded'></div>
        </li>
      ))}
    </>
  );
}
