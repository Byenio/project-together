import { api } from "~/trpc/server"

export default async function SubjectList() {

  const subjectList = await api.subject.getAll.query();

  return (
    <ul className="list-disc">
      {
        subjectList.map(subject => (
          <li key={subject.id}>{subject.name}</li>
        ))
      }
    </ul>
  )
}