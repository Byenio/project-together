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
import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
} from "~/app/_components/icons";
import { api } from "~/trpc/react";

export default function PostTypeList() {
  const list = api.postType.getAll.useQuery().data;

  if (!list) return null;

  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn>TYP POSTU</TableColumn>
        <TableColumn maxWidth={100}>AKCJE (COMING SOON)</TableColumn>
      </TableHeader>
      <TableBody>
        {list.map((item) => (
          <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <div className=" flex items-center gap-4">
                <Tooltip content="Edytuj">
                  <span className="text-lg text-default-400 opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Przejdź do postów">
                  <span className="text-lg text-default-400 opacity-50">
                    <ExternalLinkIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Usuń">
                  <span className="text-lg text-danger opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
