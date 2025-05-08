import { FC, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, message } from "antd";

import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

import TextArea from "antd/lib/input/TextArea";
import { v4 as uuidv4 } from "uuid";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCourseModal: FC<Props> = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (values: any) => {
    setSubmitting(true);
    try {
      const courseId = uuidv4();
      const courseRef = doc(db, "courses", courseId);

      // 1. Create course document
      await setDoc(courseRef, {
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        thumbnailUrl: values.thumbnailUrl || "",
        videoUrl: values.videoUrl || "",
        createdAt: serverTimestamp(),
      });

      // 2. Create default lesson
      await setDoc(doc(courseRef, "lessons", "intro"), {
        title: "Welcome & Introduction",
        videoUrl: values.videoUrl || "",
        isPreview: true,
        position: 1,
      });

      message.success("Course and default lesson added successfully!");
      form.resetFields();
      onClose();
      onSuccess();
    } catch (err) {
      console.error("Error adding course:", err);
      message.error("Failed to add course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={submitting}
      title="Add New Course"
      okText="Add Course"
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Course Title"
          rules={[{ required: true }]}
        >
          <Input id="course-title" placeholder="Enter course title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={3} placeholder="Short description of the course" />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber
            min={0}
            className="w-full"
            formatter={(val) => `$ ${val}`}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Choose a category">
            <Select.Option value="english">English</Select.Option>
            <Select.Option value="math">Math</Select.Option>
            <Select.Option value="science">Science</Select.Option>
            <Select.Option value="georgian">Georgian</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="thumbnailUrl" label="Thumbnail URL">
          <Input placeholder="Optional image or video preview URL" />
        </Form.Item>
        <Form.Item name="videoUrl" label="Intro Video (YouTube)">
          <Input placeholder="Optional video link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCourseModal;
