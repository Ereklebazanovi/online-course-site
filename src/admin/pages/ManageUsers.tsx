import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

interface UserRecord {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const usersData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email || "—",
            displayName: data.displayName || "—",
            isAdmin: data.isAdmin || false,
          };
        });

        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: ColumnsType<UserRecord> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Display Name",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (val: boolean) =>
        val ? <Tag color="blue">Yes</Tag> : <Tag>No</Tag>,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={users}
        loading={loading}
      />
    </div>
  );
};

export default ManageUsers;
