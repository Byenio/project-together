import { api } from "~/trpc/server"

export default async function PostTypeList() {

  const typeList = await api.postType.getAll.query();

  return (
    <ul className="list-disc">
      {
        typeList.map(type => (
          <li key={type.id}>{type.name}</li>
        ))
      }
    </ul>
  )
}