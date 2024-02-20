import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { changelog } from "./changelog";

export default function Changelog() {
  return changelog.map((update) => (
    <Card className="m-auto mt-4 max-w-[600px]">
      <CardHeader className="flex-col items-start px-8 pb-0 pt-4">
        <p className="text-4xl font-bold">{update.version}</p>
        <small className="text-default-500">{update.releaseDate}</small>
      </CardHeader>
      <CardBody>
        {update.type.map((type) => (
          <>
            <Divider className="mx-auto my-4 w-[94%]" />
            <Chip
              size="sm"
              color="secondary"
              className="mx-4 mb-2 min-w-[42px] text-center"
            >
              {type.name}
            </Chip>
            <div className="px-12 text-sm text-default-500">
              <ul className="list-outside">
                {type.changes.map((change) => (
                  <li className="list-disc">{change.description}</li>
                ))}
              </ul>
            </div>
          </>
        ))}
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  ));
}
