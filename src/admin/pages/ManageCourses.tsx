import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Space,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  BookOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AddCourseModal from "../components/AddCourseModal";

const { Title, Paragraph } = Typography;

const ManageCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "courses"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(data);
    } catch (err) {
      message.error("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id: string) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      message.success("Course deleted successfully.");
      fetchCourses();
    } catch {
      message.error("Failed to delete course.");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (val: string) => (
        <span className="capitalize text-blue-600">{val}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val: number) => `$${val}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<BookOutlined />}
            size="small"
            onClick={() => navigate(`/admin/courses/${record.id}/lessons`)}
          >
            Lessons
          </Button>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => {
              setEditingCourse(record);
              setAddModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={() => deleteCourse(record.id)}
          >
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3}>Manage Courses</Title>
          <Paragraph type="secondary">
            View, edit, or delete courses and manage lessons per course.
          </Paragraph>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-blue-600"
          onClick={() => {
            setEditingCourse(null);
            setAddModalOpen(true);
          }}
        >
          Add Course
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={courses}
        loading={loading}
        pagination={{ pageSize: 8 }}
        bordered
      />

      <AddCourseModal
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setEditingCourse(null);
        }}
        onSuccess={fetchCourses}
        initialValues={editingCourse}
      />
    </div>
  );
};

export default ManageCourses;
