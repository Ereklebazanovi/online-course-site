import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Switch,
  InputNumber,
  Popconfirm,
  Space,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const ManageLessons = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any | null>(null);
  const [form] = Form.useForm();

  const fetchLessons = async () => {
    setLoading(true);
    const ref = collection(db, "courses", courseId!, "lessons");
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setLessons(data);
    setLoading(false);
  };

  const handleAdd = async (values: any) => {
    try {
      await addDoc(collection(db, "courses", courseId!, "lessons"), {
        ...values,
        isPreview: values.isPreview || false,
        position: values.position ?? 999,
        createdAt: serverTimestamp(),
      });
      message.success("Lesson added");
      setModalOpen(false);
      form.resetFields();
      fetchLessons();
    } catch {
      message.error("Failed to add lesson");
    }
  };

  const handleEdit = async (values: any) => {
    try {
      await updateDoc(
        doc(db, "courses", courseId!, "lessons", editingLesson.id),
        {
          ...values,
          isPreview: values.isPreview || false,
          position: values.position ?? 999,
        }
      );
      message.success("Lesson updated");
      setModalOpen(false);
      form.resetFields();
      setEditingLesson(null);
      fetchLessons();
    } catch {
      message.error("Failed to update lesson");
    }
  };

  const deleteLesson = async (lessonId: string) => {
    try {
      await deleteDoc(doc(db, "courses", courseId!, "lessons", lessonId));
      message.success("Lesson deleted");
      fetchLessons();
    } catch {
      message.error("Failed to delete lesson");
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Lessons</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingLesson(null);
            setModalOpen(true);
          }}
        >
          Add Lesson
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={lessons}
        columns={[
          { title: "Title", dataIndex: "title" },
          { title: "Position", dataIndex: "position" },
          {
            title: "Preview",
            dataIndex: "isPreview",
            render: (val) => (val ? "Yes" : "No"),
          },
          {
            title: "Actions",
            render: (_: any, record: any) => (
              <Space>
                {/* ✏️ Edit */}
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => {
                    form.setFieldsValue(record);
                    setEditingLesson(record);
                    setModalOpen(true);
                  }}
                >
                  Edit
                </Button>

                {/* ❌ Delete */}
                <Popconfirm
                  title="Delete this lesson?"
                  onConfirm={() => deleteLesson(record.id)}
                >
                  <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        loading={loading}
        pagination={false}
      />

      <Modal
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingLesson(null);
        }}
        onOk={() => form.submit()}
        title={editingLesson ? "Edit Lesson" : "Add Lesson"}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editingLesson ? handleEdit : handleAdd}
        >
          <Form.Item
            name="title"
            label="Lesson Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="videoUrl"
            label="YouTube Link"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Order">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="isPreview"
            label="Preview Video"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageLessons;
