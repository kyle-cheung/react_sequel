import { type NextPageWithLayout } from "@/pages/_app";
import { getLayout } from "@/layouts/MainLayout";
import { Fragment } from "react";
import { Text } from "@chakra-ui/react";

const History: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Text>hi</Text>
    </Fragment>
  );
};

export default History;

History.getLayout = getLayout;
