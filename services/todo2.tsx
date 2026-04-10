// import { useQuery } from '@tanstack/react-query'

// function Todos() {
//   const { data, isPending, error } = useQuery({
//     queryKey: ['todos'],
//     queryFn: () => fetch('/api/todos/{type}/{id}').then(r => r.json()),
//   })

//   if (isPending) return <span>Loading...</span>
//   if (error) return <span>Oops!</span>

//   return <ul>{data.map(t => <li key={t.id}>{t.title}</li>)}</ul>
// }

// export default Todos