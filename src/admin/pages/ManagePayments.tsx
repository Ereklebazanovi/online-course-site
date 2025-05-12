import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Payment {
  id: string;
  userId: string;
  amount: number;
  courseId: string;
  status: string;
}

const ManagePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]); // ✅ Typed properly
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const snapshot = await getDocs(collection(db, "payments"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Payment[];
      setPayments(data);
      setLoading(false);
    };
    fetchPayments();
  }, []);

  const columns: ColumnsType<Payment> = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Course ID", dataIndex: "courseId", key: "courseId" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Payments</h2>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={payments}
        loading={loading}
      />
    </div>
  );
};

export default ManagePayments;
