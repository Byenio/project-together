"use client";

import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { ExternalLinkIcon } from "~/app/(components)/icons";
import { refetchPostsTypesType } from "./refetch-wrapper";
import PostTypeDelete from "./type-delete";

export default function PostTypeList({
  list,
  refetch,
}: {
  list: { id: string; name: string; createdAt: Date; updatedAt: Date }[];
  refetch: refetchPostsTypesType;
}) {
  return (
    <Table isStriped>
      <TableHeader>
        <TableColumn>TYP POSTU</TableColumn>
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
                <Link href={`/search?type=${item.id}`}>
                  <Tooltip content="Przejdź do postów">
                    <span className="text-lg text-default-400">
                      <ExternalLinkIcon />
                    </span>
                  </Tooltip>
                </Link>
                <Tooltip color="danger" content="Usuń">
                  <PostTypeDelete id={item.id} refetch={refetch} />
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
