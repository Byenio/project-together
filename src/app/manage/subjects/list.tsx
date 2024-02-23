"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import SubjectDelete from "./subject-delete";

export default function SubjectList({
  list,
  refetch,
}: {
  list: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  refetch: any;
}) {
  return (
    <Table isStriped>
      <TableHeader>
        <TableColumn>PRZEDMIOT</TableColumn>
        <TableColumn width={10}>AKCJE</TableColumn>
      </TableHeader>
      <TableBody>
        {list.map((item, index) => (
          <TableRow key={`${item.name}-${index}`}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <div className=" flex items-center gap-4">
                {/* <Tooltip content="Edytuj">
                  <span className="text-lg text-default-400 opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip> */}
                {/* <Link href={`/search?subject=${item.id}`}>
                  <Tooltip content="Przejdź do postów">
                    <span className="text-lg text-default-400">
                      <ExternalLinkIcon />
                    </span>
                  </Tooltip>
                </Link> */}
                <Tooltip color="danger" content="Usuń">
                  <SubjectDelete id={item.id} refetch={refetch} />
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
