import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import NiceModal from "@ebay/nice-modal-react";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import SellerModal from "../components/Modal/SellerModal";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { sellers: [] } };
  }

  const sellers = await prisma.seller.findMany();
  return {
    props: { sellers },
  };
};

type SellerProps = { [key: string]: string; name: string };

type Props = {
  sellers: SellerProps[];
};

const PurchaseDrafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>卖货客户列表</h1>
        <div>没有权限！</div>
      </Layout>
    );
  }

  const onCreate = () => {
    NiceModal.show(SellerModal).then((newSeller) => {
      console.log("create new user", newSeller);
    });
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl font-bold underline">卖货客户列表</h1>
        <Button color="primary" onClick={onCreate}>
          新增 +
        </Button>
        <main>
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default PurchaseDrafts;
